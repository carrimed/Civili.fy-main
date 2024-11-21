package civilify.com.example.demo.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.time.LocalDate;
import java.time.LocalTime;
 
@Entity
@Table(name = "APPOINTMENT")
public class AppointmentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int appointment_id;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "client_id", nullable = false)  // Ensure the column name matches the DB column name
    private ClientEntity client;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "lawyer_id", nullable = false)  // Ensure the column name matches the DB column name
    private LawyerEntity lawyer;

    private LocalDate date;
    private LocalTime time;

    // Getters and Setters
    public int getAppointmentId() {
        return appointment_id;
    }

    public void setAppointmentId(int appointment_id) {
        this.appointment_id = appointment_id;
    }

    public ClientEntity getClient() {
        return client;
    }

    public void setClient(ClientEntity client) {
        this.client = client;
    }

    public LawyerEntity getLawyer() {
        return lawyer;
    }

    public void setLawyer(LawyerEntity lawyer) {
        this.lawyer = lawyer;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

}
