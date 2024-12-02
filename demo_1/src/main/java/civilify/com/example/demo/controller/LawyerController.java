package civilify.com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import civilify.com.example.demo.entity.ClientEntity;
import civilify.com.example.demo.entity.LawyerEntity;
import civilify.com.example.demo.service.LawyerService;

import java.io.IOException;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/lawyer")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "*"})
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
    
    // lawyer login
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginClient(@RequestBody Map<String, String> loginData) {
        String loginField = loginData.get("loginField");  // This can be either username or email
        String password = loginData.get("password");

        // Call the service method to validate the user
        LawyerEntity lawyer = lawyerService.validateUser(loginField, password);

        Map<String, Object> response = new HashMap<>();

        if (lawyer != null) {
            // If the client is valid, return client ID and success message
            response.put("lawyerId", lawyer.getId());
            response.put("message", "Login successful");
            return ResponseEntity.ok(response);
        } else {
            // If validation fails, return error message
            response.put("message", "Invalid username/email or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }
    
    
    // Get Client by ID
    @GetMapping("/findById/{lawyerId}")
    public ResponseEntity<LawyerEntity> getLawyerById(@PathVariable int lawyerId) {
        try {
            LawyerEntity lawyer = lawyerService.getLawyerById(lawyerId);
            return ResponseEntity.ok(lawyer);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
    
    @PostMapping("/uploadProfilePicture")
    public ResponseEntity<String> uploadProfilePicture(
            @RequestParam("profilePicture") MultipartFile file, 
            @RequestParam int lawyerId) {
        try {
            // Retrieve the client by ID
            LawyerEntity lawyer = lawyerService.findById(lawyerId);
            if (lawyer == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Client not found");
            }

            // Set the binary data
            lawyer.setProfilePicture(file.getBytes());

            // Save the updated client
            lawyerService.save(lawyer);

            return ResponseEntity.ok("Profile picture uploaded successfully");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload the profile picture");
        }
    }
    
    @PostMapping("/updateProfilePicture/{clientId}")
    public ResponseEntity<String> updateProfilePicture(
            @PathVariable int lawyerId,
            @RequestParam("profilePicture") MultipartFile file) {

        try {
            // Find the client by ID
            LawyerEntity lawyer = lawyerService.findById(lawyerId);
            if (lawyer == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Client not found");
            }

            // Convert the MultipartFile to a byte array
            byte[] profilePicture = file.getBytes();

            // Update the profile picture
            lawyer.setProfilePicture(profilePicture);

            // Save the updated client
            lawyerService.save(lawyer);

            return ResponseEntity.ok("Profile picture updated successfully");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload profile picture");
        }
    }
    
    @GetMapping("/getProfilePicture/{lawyerId}")
    public ResponseEntity<String> getProfilePicture(@PathVariable int lawyerId) {
        LawyerEntity lawyer = lawyerService.findById(lawyerId);
        if (lawyer == null || lawyer.getProfilePicture() == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Profile picture not found");
        }

        // Encode binary data to Base64
        String base64Image = Base64.getEncoder().encodeToString(lawyer.getProfilePicture());

        // Return the Base64 string
        return ResponseEntity.ok(base64Image);
    }

    // Read functionality (GET all lawyers)
    @GetMapping("/getAllLawyers")
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
    @DeleteMapping("/deleteById/{lawyer_id}")
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