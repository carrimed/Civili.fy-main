package civilify.com.example.demo.service;

import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import civilify.com.example.demo.entity.ClientEntity;
import civilify.com.example.demo.entity.LawyerEntity;
import civilify.com.example.demo.repository.ClientRepository;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

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
    
    
    
    public ClientEntity findById(int clientId) {
        Optional<ClientEntity> client = clientRepository.findById(clientId);
        return client.orElse(null); // If client is not found, return null
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
    public ClientEntity validateUser(String loginField, String password) {
        ClientEntity client = null;

        // If the login field contains "@" symbol, treat it as email
        if (loginField.contains("@")) {
            client = clientRepository.findByEmail(loginField);  // Find by email
        } else {
            client = clientRepository.findByUsername(loginField);  // Otherwise, treat it as username
        }

        // If the client is found and the password matches
        if (client != null && client.getPassword().equals(password)) {
            return client;  // Return the ClientEntity object
        }

        return null;  // If no client is found or password does not match
    }
    

    public ClientEntity save(ClientEntity client) {
        return clientRepository.save(client); // Use the JpaRepository's save method
    }
     
    
    /*public boolean validateUser(int clientId, String password) {
        ClientEntity client = getClientById(clientId);
        if (client == null) {
            return false;
        }
    }  */
}
