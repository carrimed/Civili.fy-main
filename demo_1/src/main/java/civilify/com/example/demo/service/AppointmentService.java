package civilify.com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import civilify.com.example.demo.entity.AppointmentEntity;
import civilify.com.example.demo.entity.ClientEntity;
import civilify.com.example.demo.entity.LawyerEntity;
import civilify.com.example.demo.repository.AppointmentRepository;
import civilify.com.example.demo.repository.ClientRepository;
import civilify.com.example.demo.repository.LawyerRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private LawyerRepository lawyerRepository;

    // Create a new appointment
    public AppointmentEntity createAppointment(AppointmentEntity appointment, int clientId, int lawyerId) {
        // Validate client and lawyer
        ClientEntity client = clientRepository.findById(clientId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid client ID"));
        LawyerEntity lawyer = lawyerRepository.findById(lawyerId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid lawyer ID"));
        
        // Validate the appointment date (cannot be in the past)
        if (appointment.getDate().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("Appointment date cannot be in the past");
        }
        
        // Set the client and lawyer to the appointment
        appointment.setClient(client);
        appointment.setLawyer(lawyer);
        
        // Save and return the appointment
        return appointmentRepository.save(appointment);
    }

    // Get all appointments
    public List<AppointmentEntity> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    // Update appointment details
    public AppointmentEntity updateAppointment(int appointmentId, AppointmentEntity updatedAppointment, int clientId, int lawyerId) {
        // Find existing appointment
        AppointmentEntity appointmentToUpdate = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new IllegalArgumentException("Appointment not found"));

        // Validate client and lawyer
        ClientEntity client = clientRepository.findById(clientId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid client ID"));
        LawyerEntity lawyer = lawyerRepository.findById(lawyerId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid lawyer ID"));

        // Validate the appointment date (cannot be in the past)
        if (updatedAppointment.getDate().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("Appointment date cannot be in the past");
        }

        // Update appointment details
        appointmentToUpdate.setDate(updatedAppointment.getDate());
        appointmentToUpdate.setTime(updatedAppointment.getTime());
        appointmentToUpdate.setClient(client);
        appointmentToUpdate.setLawyer(lawyer);
        
        // Save and return the updated appointment
        return appointmentRepository.save(appointmentToUpdate);
    }

    // Delete an appointment by ID
    public String deleteAppointment(int appointmentId) {
        Optional<AppointmentEntity> appointment = appointmentRepository.findById(appointmentId);
        if (appointment.isPresent()) {
            appointmentRepository.deleteById(appointmentId);
            return "Appointment with ID " + appointmentId + " deleted successfully";
        } else {
            return "Appointment with ID " + appointmentId + " not found";
        }
    }

}
