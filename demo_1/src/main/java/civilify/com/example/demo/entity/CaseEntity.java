package civilify.com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "CASEDETAILS")
public class CaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Makes caseId auto-increment
    private int case_id;

    private String description;
    private String status;

    // Default constructor
    public CaseEntity() {
        super();
    }

    // Parameterized constructor
    public CaseEntity(int case_id, String description, String status) {
        super();
        this.case_id = case_id;
        this.description = description;
        this.status = status;
    }

    // Getters and Setters
    public int getCaseId() {
        return case_id;
    }

    public void setCaseId(int case_id) {
        this.case_id = case_id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
