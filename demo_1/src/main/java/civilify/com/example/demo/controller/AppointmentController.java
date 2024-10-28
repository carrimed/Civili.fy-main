package civilify.com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import civilify.com.example.demo.entity.AppointmentEntity;
import civilify.com.example.demo.service.AppointmentService;

import java.util.List;

@RestController
@RequestMapping("/api/Appointment")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping("/postAppointmentRecord")
    public AppointmentEntity postAppointmentRecord(@RequestBody AppointmentEntity appointment) {
        return appointmentService.createAppointment(appointment);
    }

    @GetMapping("/getAllAppointments")
    public List<AppointmentEntity> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    @PutMapping("/putAppointmentDetails/{appointment_id}")
    public AppointmentEntity putAppointmentDetails(@PathVariable int appointment_id, @RequestBody AppointmentEntity updatedAppointment) {
        return appointmentService.updateAppointment(appointment_id, updatedAppointment);
    }

    @DeleteMapping("/deleteAppointment/{appointmentId}")
    public String deleteAppointment(@PathVariable int appointmentId) {
        appointmentService.deleteAppointment(appointmentId);
        return "Appointment with ID " + appointmentId + " has been deleted.";
    }

}
