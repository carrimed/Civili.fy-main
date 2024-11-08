package civilify.com.example.demo.entity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
//import jakarta.persistence.*;


@Entity
@Table(name = "LAWYER")
public class LawyerEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int lawyer_id;
    private String name;
    private String specialization;
    private String contact_number;
    private String username;
    private String password;

    // Getters and Setters
    public int getLawyerId() {
        return lawyer_id;
    }

    public void setLawyerId(int lawyer_id) {
        this.lawyer_id = lawyer_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }
    
    public String getContactNumber() {
    	return contact_number;
    }
    public void setContactNumber(String contact_number) {
    	this.contact_number = contact_number;
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