package civilify.com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import civilify.com.example.demo.entity.ClientEntity;
import civilify.com.example.demo.repository.ClientRepository;

import java.util.List;
import java.util.NoSuchElementException;

import javax.naming.NameNotFoundException;


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

    public List<ClientEntity> getClientsByUsername(String username) {
        return urepo.findByUsername(username);
    }

    @SuppressWarnings("finally")
    public ClientEntity putClientDetails(int client_id, ClientEntity newClientDetails) {
        ClientEntity user = new ClientEntity();
        try {
            user = urepo.findById(client_id).orElseThrow(() -> 
                new NoSuchElementException("User with ID " + client_id + " not found."));
            
            user.setName(newClientDetails.getName());
            user.setUsername(newClientDetails.getUsername());
            user.setContactNumber(newClientDetails.getContactNumber());
            user.setPassword(newClientDetails.getPassword());
        } catch (NoSuchElementException nex) {
            throw new NameNotFoundException("Client with ID " + client_id + " not found.");
        } finally {
            return urepo.save(user);
        }
    }

    public String deleteClient(int userId) {
        String msg;
        if (urepo.existsById(userId)) {  // Check if the user exists
            urepo.deleteById(userId);    // Pass the correct userId
            msg = "User with ID " + userId + " successfully deleted!";
        } else {
            msg = "User with ID " + userId + " NOT found!";
        }
        return msg;
    }

}
