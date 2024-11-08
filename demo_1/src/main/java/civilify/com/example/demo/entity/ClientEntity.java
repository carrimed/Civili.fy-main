package civilify.com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
@Table(name = "CLIENT")
public class ClientEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int client_id;
    
    @Column(unique = true) // Ensure the username is unique
    private String username;

    private String name;
    //private String username;
    private String contact_number;
    private String password;

    // Default constructor
    public ClientEntity() {
        super();
    }

    // Parameterized constructor
    public ClientEntity(int client_id, String name, String username, String contact_number, String password) {
        super();
        this.client_id = client_id;
        this.name = name;
        this.username = username;
        this.contact_number = contact_number;
        this.password = password;
    }

    // Getters and Setters
    public int getClientId() {
        return client_id;
    }

    public void setClientId(int client_id) {
        this.client_id = client_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
    
   
    
    public String getContactNumber() {
    	return contact_number;
    }
    public void setContactNumber(String contact_number) {
    	this.contact_number = contact_number;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
