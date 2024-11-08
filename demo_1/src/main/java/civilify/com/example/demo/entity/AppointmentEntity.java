package civilify.com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDate; // Use LocalDate for DATE
import java.time.LocalTime; // Use LocalTime for TIME

@Entity
@Table(name = "APPOINTMENT")
public class AppointmentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int appointment_id; // Corresponds to appointment_id
    
    private int client_id; // Corresponds to client_id

    private int lawyer_id; // Corresponds to lawyer_id

    private LocalDate date; // Use LocalDate for DATE type

    private LocalTime time; // Use LocalTime for TIME type

    // Default constructor
    public AppointmentEntity() {
    }

    // Parameterized constructor
    public AppointmentEntity(int appointment_id, int client_id, int lawyer_id, LocalDate date, LocalTime time) {
        this.appointment_id = appointment_id;
        this.client_id = client_id;
        this.lawyer_id = lawyer_id;
        this.date = date;
        this.time = time;
    }

    // Getters and Setters
    public int getAppointmentId() {
        return appointment_id;
    }

    public void setAppointmentId(int appointment_id) {
        this.appointment_id = appointment_id;
    }

    public int getClientId() {
        return client_id;
    }

    public void setClientId(int client_id) {
        this.client_id = client_id;
    }

    public int getLawyerId() {
        return lawyer_id;
    }

    public void setLawyerId(int lawyer_id) {
        this.lawyer_id = lawyer_id;
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
