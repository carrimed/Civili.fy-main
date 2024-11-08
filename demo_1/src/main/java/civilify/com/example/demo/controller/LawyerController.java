package civilify.com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import civilify.com.example.demo.entity.LawyerEntity;
import civilify.com.example.demo.service.LawyerService;


@RestController
@RequestMapping("/api/lawyer")
public class LawyerController {

    @Autowired
    private LawyerService lawyerService;
    
    @GetMapping("/print")
    public String print() {
        return "Hello, Lawyer Management System";
    }

    // Create functionality (POST)
    @PostMapping("/postLawyerRecord")
    public LawyerEntity postLawyerRecord(@RequestBody LawyerEntity lawyer) {
        return lawyerService.createLawyer(lawyer);
    }

    // Read functionality (GET all lawyers)
    @GetMapping("/getAllLawyers")
    public List<LawyerEntity> getAllLawyers() {
        return lawyerService.getAllLawyers();
    }

    // Update functionality (PUT)
    @PutMapping("/updateLawyer")
    public LawyerEntity updateLawyer(@RequestParam int lawyer_id, @RequestBody LawyerEntity updatedLawyer) {
        return lawyerService.updateLawyer(lawyer_id, updatedLawyer);
    }

    // Delete functionality (DELETE)
    @DeleteMapping("/deleteLawyer/{lawyer_id}")
    public void deleteLawyer(@PathVariable int lawyer_id) {
        lawyerService.deleteLawyer(lawyer_id);
    }
    
    //new Delete
 // Delete functionality (DELETE by name)
    @DeleteMapping("/deleteLawyerByName/{name}")
    public String deleteLawyerByName(@PathVariable String name) {
        return lawyerService.deleteLawyerByName(name);
    }
}
