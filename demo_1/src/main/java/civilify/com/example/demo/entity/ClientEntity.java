package civilify.com.example.demo.entity;

import jakarta.persistence.*;
import java.time.LocalDate;  // Recommended: use LocalDate instead of java.sql.Date

@Entity
@Table(name = "CLIENT")
public class ClientEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "client_id")
    private int clientId;

    @Column(name = "username", unique = true, nullable = false)
    private String username;
    private String email;
    private String name;
    private String contactNumber;
    private String password;

    @Column(name = "birthdate", nullable = true)
    private LocalDate birthdate;  // Use LocalDate instead of java.sql.Date

    @Column(name = "age", nullable = false)
    private int age;

    @Column(name = "occupation")
    private String occupation;

    @Column(name = "civil_status")
    private String civilStatus;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "zipcode")
    private String zipcode;

    @Lob
    @Column(name = "profile_picture", columnDefinition = "LONGBLOB")  // Add column to store profile picture path or filename
    private byte[] profilePicture;

    // Default constructor
    public ClientEntity() {
        super();
    }

    // Parameterized constructor
    public ClientEntity(int clientId, String username, String name, String email, String contactNumber,
                        String password, LocalDate birthdate, int age, String occupation, String civilStatus,
                        String address, String zipcode, byte[] profilePicture) {
        this.clientId = clientId;
        this.username = username;
        this.name = name;
        this.email = email;
        this.contactNumber = contactNumber;
        this.password = password;
        this.birthdate = birthdate;
        this.age = age;
        this.occupation = occupation;
        this.civilStatus = civilStatus;
        this.address = address;
        this.zipcode = zipcode;
        this.profilePicture = profilePicture;
    }

    // Getters and Setters
    public int getId() {
        return clientId;
    }

    public void setClientId(int clientId) {
        this.clientId = clientId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LocalDate getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(LocalDate birthdate) {
        this.birthdate = birthdate;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getOccupation() {
        return occupation;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public String getCivilStatus() {
        return civilStatus;
    }

    public void setCivilStatus(String civilStatus) {
        this.civilStatus = civilStatus;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getZipcode() {
        return zipcode;
    }

    public void setZipcode(String zipcode) {
        this.zipcode = zipcode;
    }

    public byte[] getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(byte[] profilePicture) {
        this.profilePicture = profilePicture;
    }
}
