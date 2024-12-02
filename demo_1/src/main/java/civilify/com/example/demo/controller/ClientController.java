package civilify.com.example.demo.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import civilify.com.example.demo.entity.ClientEntity;
import civilify.com.example.demo.service.ClientService;
import io.jsonwebtoken.lang.Collections;

import java.io.File;
import java.io.IOException;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/client")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "*"})
public class ClientController {

    @Autowired
    private ClientService clientService;
    
    
    @PostMapping("/postClientRecord")
    public ResponseEntity<ClientEntity> postClientRecord(@RequestBody ClientEntity client) {
        ClientEntity createdClient = clientService.postClientRecord(client);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdClient);
    } 

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginClient(@RequestBody Map<String, String> loginData) {
        String loginField = loginData.get("loginField");  // This can be either username or email
        String password = loginData.get("password");

        // Call the service method to validate the user
        ClientEntity client = clientService.validateUser(loginField, password);

        Map<String, Object> response = new HashMap<>();

        if (client != null) {
            // If the client is valid, return client ID and success message
            response.put("clientId", client.getId());
            response.put("message", "Login successful");
            return ResponseEntity.ok(response);
        } else {
            // If validation fails, return error message
            response.put("message", "Invalid username/email or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }
    
    @PostMapping("/uploadProfilePicture")
    public ResponseEntity<String> uploadProfilePicture(
            @RequestParam("profilePicture") MultipartFile file, 
            @RequestParam int clientId) {
        try {
            // Retrieve the client by ID
            ClientEntity client = clientService.findById(clientId);
            if (client == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Client not found");
            }

            // Set the binary data
            client.setProfilePicture(file.getBytes());

            // Save the updated client
            clientService.save(client);

            return ResponseEntity.ok("Profile picture uploaded successfully");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload the profile picture");
        }
    }
    
    @PostMapping("/updateProfilePicture/{clientId}")
    public ResponseEntity<String> updateProfilePicture(
            @PathVariable int clientId,
            @RequestParam("profilePicture") MultipartFile file) {

        try {
            // Find the client by ID
            ClientEntity client = clientService.findById(clientId);
            if (client == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Client not found");
            }

            // Convert the MultipartFile to a byte array
            byte[] profilePicture = file.getBytes();

            // Update the profile picture
            client.setProfilePicture(profilePicture);

            // Save the updated client
            clientService.save(client);

            return ResponseEntity.ok("Profile picture updated successfully");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload profile picture");
        }
    }
    
    @GetMapping("/getProfilePicture/{clientId}")
    public ResponseEntity<String> getProfilePicture(@PathVariable int clientId) {
        ClientEntity client = clientService.findById(clientId);
        if (client == null || client.getProfilePicture() == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Profile picture not found");
        }

        // Encode binary data to Base64
        String base64Image = Base64.getEncoder().encodeToString(client.getProfilePicture());

        // Return the Base64 string
        return ResponseEntity.ok(base64Image);
    }

	 // Get all Clients
    @GetMapping("/getAllClients")
    public ResponseEntity<List<ClientEntity>> getAllClients() {
        try {
            List<ClientEntity> clients = clientService.getAllClients();
            if (clients.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);  // No clients found
            }
            return ResponseEntity.ok(clients);  // Return the list of clients
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);  // Handle unexpected errors
        }
    }
    
    // Get Client by ID
    @GetMapping("/findById/{clientId}")
    public ResponseEntity<ClientEntity> getClientById(@PathVariable int clientId) {
        try {
            ClientEntity client = clientService.getClientById(clientId);
            return ResponseEntity.ok(client);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);  // Client not found
        }
    }

    // Update Client details
    @PutMapping("/putClientDetails/{client_id}")
    public ResponseEntity<ClientEntity> updateClientDetails(@PathVariable("client_id") int clientId, @RequestBody ClientEntity newClientDetails) {
        try {
            ClientEntity updatedClient = clientService.updateClientDetails(clientId, newClientDetails);
            return ResponseEntity.ok(updatedClient);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();  // Client not found
        }
    }

    // Delete Client
    @DeleteMapping("/deleteById/{client_id}")
    public ResponseEntity<String> deleteClient(@PathVariable("client_id") int clientId) {
        String message = clientService.deleteById(clientId);
        if (message.contains("NOT found")) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);  // Client not found
        }
        return ResponseEntity.status(HttpStatus.OK).body(message);  // Client successfully deleted
    }
}
