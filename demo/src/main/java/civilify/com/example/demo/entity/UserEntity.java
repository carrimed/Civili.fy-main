package civilify.com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
@Table(name = "User")
public class UserEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // This makes userId auto-increment
    private int user_id;

    private String name;
    private String username;
    private String contact_number;
    private String password;

    // Default constructor
    public UserEntity() {
        super();
    }

    // Parameterized constructor
    public UserEntity(int user_id, String name, String username, String contact_number, String password) {
        super();
        this.user_id = user_id;
        this.name = name;
        this.username = username;
        this.contact_number = contact_number;
        this.password = password;
    }

    // Getters and Setters
    public int getUserId() {
        return user_id;
    }

    public void setUserId(int user_id) {
        this.user_id = user_id;
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
