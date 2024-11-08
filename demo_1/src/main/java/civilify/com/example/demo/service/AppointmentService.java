package civilify.com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import civilify.com.example.demo.entity.AppointmentEntity;
import civilify.com.example.demo.entity.ClientEntity;
import civilify.com.example.demo.entity.LawyerEntity;
import civilify.com.example.demo.repository.AppointmentRepository;
import civilify.com.example.demo.repository.ClientRepository;
import civilify.com.example.demo.repository.LawyerRepository;

import java.util.List;

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
        ClientEntity client = clientRepository.findById(clientId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid client ID"));
        LawyerEntity lawyer = lawyerRepository.findById(lawyerId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid lawyer ID"));
        
        appointment.setClient(client);
        appointment.setLawyer(lawyer);
        
        return appointmentRepository.save(appointment);
    }

    // Get all appointments
    public List<AppointmentEntity> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    // Update appointment details
    public AppointmentEntity updateAppointment(int appointmentId, AppointmentEntity updatedAppointment, int clientId, int lawyerId) {
        AppointmentEntity appointmentToUpdate = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new IllegalArgumentException("Appointment not found"));

        ClientEntity client = clientRepository.findById(clientId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid client ID"));
        LawyerEntity lawyer = lawyerRepository.findById(lawyerId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid lawyer ID"));

        appointmentToUpdate.setDate(updatedAppointment.getDate());
        appointmentToUpdate.setTime(updatedAppointment.getTime());
        appointmentToUpdate.setClient(client);
        appointmentToUpdate.setLawyer(lawyer);
        
        return appointmentRepository.save(appointmentToUpdate);
    }

    // Delete an appointment by ID
    public void deleteAppointment(int appointmentId) {
        appointmentRepository.deleteById(appointmentId);
    }
}
