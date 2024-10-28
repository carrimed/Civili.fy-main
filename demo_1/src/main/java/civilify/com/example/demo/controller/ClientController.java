package civilify.com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import civilify.com.example.demo.entity.ClientEntity;
import civilify.com.example.demo.service.ClientService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;



@RestController
@RequestMapping("/api/Client")
public class ClientController {
 
    @Autowired
    private ClientService ClientService;
    
    @PostMapping("/postClientRecord")
    public ClientEntity postClientRecord(@RequestBody ClientEntity client) {
        return ClientService.postClientRecord(client);
    }

    @GetMapping("/getAllClients")
    public List<ClientEntity> getAllClients() {
        return ClientService.getAllClients();
    }

    @GetMapping("/findByClientname")
    public List<ClientEntity> getClientsByUsername(@RequestParam String username) {
        return ClientService.getClientsByUsername(username);
    }
    
    @PutMapping("/putClientDetails")
    public ClientEntity putClientDetails(@RequestParam int Client_id, @RequestBody ClientEntity newClientDetails) {
        return ClientService.putClientDetails(Client_id, newClientDetails);
    }

    @DeleteMapping("/deleteClient/{ClientId}")
    public String deleteClient(@PathVariable("ClientId") int ClientId) {
        ClientService.deleteClient(ClientId);
        return "Client with ID " + ClientId + " has been deleted.";
    }
}
