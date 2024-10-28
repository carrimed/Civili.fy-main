package civilify.com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import civilify.com.example.demo.entity.AppointmentEntity;
import civilify.com.example.demo.repository.AppointmentRepository;

import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    // Create a new appointment
    public AppointmentEntity createAppointment(AppointmentEntity appointment) {
        return appointmentRepository.save(appointment);
    }

    // Get all appointments
    public List<AppointmentEntity> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    // Update appointment details
    public AppointmentEntity updateAppointment(int appointmentId, AppointmentEntity updatedAppointment) {
        Optional<AppointmentEntity> existingAppointment = appointmentRepository.findById(appointmentId);
        if (existingAppointment.isPresent()) {
            AppointmentEntity appointmentToUpdate = existingAppointment.get();
            // Update fields
            appointmentToUpdate.setDate(updatedAppointment.getDate());
            appointmentToUpdate.setTime(updatedAppointment.getTime());
            return appointmentRepository.save(appointmentToUpdate);
        } else {
            // Handle case where appointment does not exist
            return null; // or throw an exception
        }
    }

    // Delete an appointment by ID
    public void deleteAppointment(int appointmentId) {
        appointmentRepository.deleteById(appointmentId);
    }
}

