package civilify.com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    @SuppressWarnings("null")
	@PostMapping("/create")
    public ResponseEntity<AppointmentEntity> postAppointmentRecord(
            @RequestBody AppointmentEntity appointment,
            @RequestParam int clientId,
            @RequestParam int lawyerId) {
        try {
            AppointmentEntity createdAppointment = appointmentService.createAppointment(appointment, clientId, lawyerId);
            return new ResponseEntity<>(createdAppointment, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    // Get all appointments
    @GetMapping("/getAll")
    public ResponseEntity<List<AppointmentEntity>> getAllAppointments() {
        List<AppointmentEntity> appointments = appointmentService.getAllAppointments();
        if (appointments.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(appointments, HttpStatus.OK);
    }

    // Update appointment details with client and lawyer IDs
    @SuppressWarnings("null")
	@PutMapping("/update/{appointmentId}")
    public ResponseEntity<AppointmentEntity> putAppointmentDetails(
            @PathVariable int appointmentId,
            @RequestBody AppointmentEntity updatedAppointment,
            @RequestParam int clientId,
            @RequestParam int lawyerId) {
        try {
            AppointmentEntity updated = appointmentService.updateAppointment(appointmentId, updatedAppointment, clientId, lawyerId);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    // Delete an appointment by ID
    @DeleteMapping("/delete/{appointmentId}")
    public ResponseEntity<String> deleteAppointment(@PathVariable int appointmentId) {
        String result = appointmentService.deleteAppointment(appointmentId);
        if (result.contains("not found")) {
            return new ResponseEntity<>(result, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
    }

}
