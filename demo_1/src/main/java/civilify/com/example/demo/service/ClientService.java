package civilify.com.example.demo.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import civilify.com.example.demo.entity.ClientEntity;
import civilify.com.example.demo.repository.ClientRepository;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ClientService {
	
	/*@Autowired
	private ClientService clientService;*/

    private final ClientRepository clientRepository;

    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    // Create new Client record
    public ClientEntity postClientRecord(ClientEntity client) {
        // No password encoding, just save as is
        return clientRepository.save(client);
    }

    // Get all clients
    public List<ClientEntity> getAllClients() {
        return clientRepository.findAll();
    }

    // Get client by ID
    public ClientEntity getClientById(int clientId) {
        return clientRepository.findById(clientId)
            .orElseThrow(() -> new NoSuchElementException("Client with ID " + clientId + " not found."));
    }

    // Update client details
    @Transactional
    public ClientEntity updateClientDetails(int clientId, ClientEntity newClientDetails) {
        ClientEntity client = clientRepository.findById(clientId)
            .orElseThrow(() -> new NoSuchElementException("Client with ID " + clientId + " not found."));

        // Update client details (no password encryption)
        client.setName(newClientDetails.getName());
        client.setUsername(newClientDetails.getUsername());
        client.setContactNumber(newClientDetails.getContactNumber());

        // Update password only if it's provided
        if (newClientDetails.getPassword() != null && !newClientDetails.getPassword().isEmpty()) {
            client.setPassword(newClientDetails.getPassword());
        }

        return clientRepository.save(client);
    }

    // Delete client by ID
    public String deleteClient(int clientId) {
        if (clientRepository.existsById(clientId)) {
            clientRepository.deleteById(clientId);
            return "Client with ID " + clientId + " successfully deleted!";
        } else {
            return "Client with ID " + clientId + " NOT found!";
        }
    }
    
    
    //for token not yet implemented
    public boolean validateUser(String username, String password) {
        ClientEntity client = clientRepository.findByUsername(username);
        if (client == null) {
            return false;
        }
        return client.getPassword().equals(password);  // You can add password hashing here
    } 
     
    /*public boolean validateUser(int clientId, String password) {
        ClientEntity client = getClientById(clientId);
        if (client == null) {
            return false;
        }
    }  */
}
