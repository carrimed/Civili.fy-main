package civilify.com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import civilify.com.example.demo.entity.ClientEntity;
import civilify.com.example.demo.service.ClientService;
import civilify.com.example.demo.model.LoginRequest; // Assuming you have created this model
import civilify.com.example.demo.model.LoginResponse; // Assuming you have created this model
import civilify.com.example.demo.model.ErrorResponse; // Assuming you have created this model

import java.util.List;

@RestController
@RequestMapping("/api/Client")
@CrossOrigin(origins = "http://localhost:3000")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @PostMapping("/postClientRecord")
    public ResponseEntity<ClientEntity> postClientRecord(@RequestBody ClientEntity client) {
        ClientEntity createdClient = clientService.postClientRecord(client);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdClient);
    }

    @GetMapping("/getAllClients")
    public List<ClientEntity> getAllClients() {
        return clientService.getAllClients();
    }

    @GetMapping("/findByUsername")
    public ClientEntity getClientByUsername(@RequestParam String username) {
        return clientService.getClientByUsername(username);
    }
    
    @PutMapping("/putClientDetails/{client_id}")
    public ResponseEntity<ClientEntity> updateClientDetails(@PathVariable("client_id") int clientId, @RequestBody ClientEntity newClientDetails) {
        ClientEntity updatedClient = clientService.updateClientDetails(clientId, newClientDetails);
        return updatedClient != null ? ResponseEntity.ok(updatedClient) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/deleteClient/{client_id}")
    public ResponseEntity<String> deleteClient(@PathVariable("client_id") int client_id) {
        String message = clientService.deleteClient(client_id);
        return ResponseEntity.ok(message);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        boolean isValidUser = clientService.validateUser(loginRequest.getUsername(), loginRequest.getPassword());
        if (isValidUser) {
            return ResponseEntity.ok(new LoginResponse(true, "Login successful"));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Invalid username or password"));
        }
    }

    @GetMapping("/getCurrentAccount")
    public ResponseEntity<ClientEntity> getCurrentAccount(@RequestParam String username) {
        ClientEntity client = clientService.getClientByUsername(username);
        return client != null ? ResponseEntity.ok(client) : ResponseEntity.notFound().build();
    }
}

