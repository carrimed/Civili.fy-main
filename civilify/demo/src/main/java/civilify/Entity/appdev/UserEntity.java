package civilify.Entity.appdev;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
@Table(name = "USER")
public class UserEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // This makes userId auto-increment
    private int userId;

    private String name;
    private String username;
    private String password;

    // Default constructor
    public UserEntity() {
        super();
    }

    // Parameterized constructor
    public UserEntity(int userId, String name, String username, String password) {
        super();
        this.userId = userId;
        this.name = name;
        this.username = username;
        this.password = password;
    }

    // Getters and Setters
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
