package civilify.com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import civilify.com.example.demo.entity.ClientEntity;
import civilify.com.example.demo.repository.ClientRepository;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ClientService {

    @Autowired
    private ClientRepository urepo;

    public ClientEntity postClientRecord(ClientEntity client) {
        return urepo.save(client);
    }

    public List<ClientEntity> getAllClients() {
        return urepo.findAll();
    }

    public ClientEntity getClientById(int clientId) {
        return urepo.findById(clientId).orElse(null);
    }

    public ClientEntity updateClientDetails(int clientId, ClientEntity newClientDetails) {
        ClientEntity user = urepo.findById(clientId)
            .orElseThrow(() -> new NoSuchElementException("Client with ID " + clientId + " not found."));
        
        user.setName(newClientDetails.getName());
        user.setUsername(newClientDetails.getUsername());
        user.setContactNumber(newClientDetails.getContactNumber());
        user.setPassword(newClientDetails.getPassword());

        return urepo.save(user);
    }

    public String deleteClient(int clientId) {
        if (urepo.existsById(clientId)) {
            urepo.deleteById(clientId);
            return "User with ID " + clientId + " successfully deleted!";
        } else {
            return "User with ID " + clientId + " NOT found!";
        }
    }

    public boolean validateUser(int clientId, String password) {
        ClientEntity client = getClientById(clientId);
        if (client == null) {
            return false; 
        } else {
            return client.getPassword().equals(password); 
        }
    }
}
