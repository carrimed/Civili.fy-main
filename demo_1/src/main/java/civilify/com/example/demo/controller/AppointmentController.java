package civilify.com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import civilify.com.example.demo.entity.AppointmentEntity;
import civilify.com.example.demo.service.AppointmentService;

import java.util.List;

@RestController
@RequestMapping("/api/appointment")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    // Create a new appointment with client and lawyer IDs
    @PostMapping("/postAppointmentRecord")
    public AppointmentEntity postAppointmentRecord(
            @RequestBody AppointmentEntity appointment,
            @RequestParam int clientId,
            @RequestParam int lawyerId) {
        return appointmentService.createAppointment(appointment, clientId, lawyerId);
    }

    // Get all appointments
    @GetMapping("/getAllAppointments")
    public List<AppointmentEntity> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    // Update appointment details with client and lawyer IDs
    @PutMapping("/putAppointmentDetails/{appointmentId}")
    public AppointmentEntity putAppointmentDetails(
            @PathVariable int appointmentId,
            @RequestBody AppointmentEntity updatedAppointment,
            @RequestParam int clientId,
            @RequestParam int lawyerId) {
        return appointmentService.updateAppointment(appointmentId, updatedAppointment, clientId, lawyerId);
    }

    // Delete an appointment by ID
    @DeleteMapping("/deleteAppointment/{appointmentId}")
    public String deleteAppointment(@PathVariable int appointmentId) {
        appointmentService.deleteAppointment(appointmentId);
        return "Appointment with ID " + appointmentId + " has been deleted.";
    }
}
