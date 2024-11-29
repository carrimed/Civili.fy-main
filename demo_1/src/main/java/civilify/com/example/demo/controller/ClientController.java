package civilify.com.example.demo.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import civilify.com.example.demo.entity.ClientEntity;
import civilify.com.example.demo.service.ClientService;

import java.util.List;
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

    // Client login
    @PostMapping("/login")
    public ResponseEntity<String> loginClient(@RequestBody ClientEntity client) {
        boolean isValidUser = clientService.validateUser(client.getUsername(), client.getPassword());
        if (isValidUser) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }

    // Get all Clients
    @GetMapping("/getAllClients")
    public ResponseEntity<List<ClientEntity>> getAllClients() {
        List<ClientEntity> clients = clientService.getAllClients();
        if (clients.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();  // No clients found
        }
        return ResponseEntity.ok(clients);
    }

    // Get Client by ID
    @GetMapping("/findById")
    public ResponseEntity<ClientEntity> getClientById(@RequestParam int clientId) {
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
    @DeleteMapping("/deleteClient/{client_id}")
    public ResponseEntity<String> deleteClient(@PathVariable("client_id") int clientId) {
        String message = clientService.deleteClient(clientId);
        if (message.contains("NOT found")) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);  // Client not found
        }
        return ResponseEntity.status(HttpStatus.OK).body(message);  // Client successfully deleted
    }
}
