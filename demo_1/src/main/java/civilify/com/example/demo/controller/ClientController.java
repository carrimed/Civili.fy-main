package civilify.com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import civilify.com.example.demo.entity.ClientEntity;
import civilify.com.example.demo.service.ClientService;

import java.util.List;

@RestController
@RequestMapping("/api/Client")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "*"})
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

    @GetMapping("/findById")
    public ResponseEntity<ClientEntity> getClientById(@RequestParam int clientId) {
        ClientEntity client = clientService.getClientById(clientId);
        return client != null ? ResponseEntity.ok(client) : ResponseEntity.notFound().build();
    }

    @PutMapping("/putClientDetails/{client_id}")
    public ResponseEntity<ClientEntity> updateClientDetails(@PathVariable("client_id") int clientId, @RequestBody ClientEntity newClientDetails) {
        ClientEntity updatedClient = clientService.updateClientDetails(clientId, newClientDetails);
        return updatedClient != null ? ResponseEntity.ok(updatedClient) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/deleteClient/{client_id}")
    public ResponseEntity<String> deleteClient(@PathVariable("client_id") int clientId) {
        String message = clientService.deleteClient(clientId);
        return ResponseEntity.ok(message);
    }
}
