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

    public ClientEntity getClientByUsername(String username) {
        return urepo.findByUsername(username).stream().findFirst().orElse(null);
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

    public String deleteClient(int userId) {
        if (urepo.existsById(userId)) {
            urepo.deleteById(userId);
            return "User with ID " + userId + " successfully deleted!";
        } else {
            return "User with ID " + userId + " NOT found!";
        }
    }

    public boolean validateUser(String username, String password) {
        ClientEntity client = getClientByUsername(username);
        if (client == null) {
            return false; 
        } else {
            return client.getPassword().equals(password); 
        }
    }
}
