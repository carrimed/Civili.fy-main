package civilify.com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import civilify.com.example.demo.entity.LawyerEntity;
import civilify.com.example.demo.service.LawyerService;

import java.util.List;

@RestController
@RequestMapping("/api/lawyer")
public class LawyerController {

    @Autowired
    private LawyerService lawyerService;

    // Health check endpoint
    @GetMapping("/print")
    public String print() {
        return "Hello, Lawyer Management System";
    }

    // Create functionality (POST)
    @PostMapping("/create")
    public ResponseEntity<LawyerEntity> createLawyer(@RequestBody LawyerEntity lawyer) {
        LawyerEntity createdLawyer = lawyerService.createLawyer(lawyer);
        return new ResponseEntity<>(createdLawyer, HttpStatus.CREATED);
    }

    // Read functionality (GET all lawyers)
    @GetMapping("/getAll")
    public ResponseEntity<List<LawyerEntity>> getAllLawyers() {
        List<LawyerEntity> lawyers = lawyerService.getAllLawyers();
        return lawyers.isEmpty() ? 
               new ResponseEntity<>(HttpStatus.NO_CONTENT) : 
               new ResponseEntity<>(lawyers, HttpStatus.OK);
    }

    // Update functionality (PUT) - Fixed to use @PathVariable for lawyer_id
    @PutMapping("/update/{lawyerId}")
    public ResponseEntity<LawyerEntity> updateLawyer(@PathVariable int lawyerId, @RequestBody LawyerEntity updatedLawyer) {
        LawyerEntity lawyer = lawyerService.updateLawyer(lawyerId, updatedLawyer);
        return lawyer != null ? 
               new ResponseEntity<>(lawyer, HttpStatus.OK) : 
               new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Delete functionality (DELETE)
    @DeleteMapping("/deleteLawyer/{lawyer_id}")
    public void deleteLawyer(@PathVariable int lawyer_id) {
        lawyerService.deleteLawyer(lawyer_id);
    }
    
    // New Delete
    // Delete functionality (DELETE by name)
    @DeleteMapping("/deleteLawyerByName/{name}")
    public String deleteLawyerByName(@PathVariable String name) {
        return lawyerService.deleteLawyerByName(name);
    }
    }