package civilify.com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import civilify.com.example.demo.DTO.LawyerSearchCriteria;
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
            response.put("lawyerId", lawyer.getLawyerId());
            response.put("message", "Login successful");
            return ResponseEntity.ok(response);
        } else {
            // If validation fails, return error message
            response.put("message", "Invalid username/email or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
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
    
    @PostMapping("/updateProfilePicture/{lawyer_id}")
    public ResponseEntity<String> updateProfilePicture(
            @PathVariable int lawyerId,
            @RequestParam("profilePicture") MultipartFile file) {

        try {
            // Find the lawyer by ID
            LawyerEntity lawyer = lawyerService.findById(lawyerId);
            if (lawyer == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Lawyer not found");
            }

            // Convert the MultipartFile to a byte array
            byte[] profilePicture = file.getBytes();

            // Update the profile picture
            lawyer.setProfilePicture(profilePicture);

            // Save the updated lawyer
            lawyerService.save(lawyer);

            return ResponseEntity.ok("Profile picture updated successfully");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload profile picture");
        }
    }
    
 
    @CrossOrigin(origins = "*")
    @GetMapping("/search")
    public ResponseEntity<List<LawyerEntity>> searchLawyers(
        @RequestParam(required = false) String category,
        @RequestParam(required = false) String lawyerType,
        @RequestParam(required = false) Integer minRate,
        @RequestParam(required = false) Integer maxRate
    ) {
        
        LawyerSearchCriteria criteria = new LawyerSearchCriteria();
        criteria.setCategory(category);
        criteria.setLawyerType(lawyerType);
        criteria.setMinRate(minRate);
        criteria.setMaxRate(maxRate);

        List<LawyerEntity> lawyers = lawyerService.searchLawyers(criteria);

        // Debugging: Log number of records found
        System.out.println("Number of lawyers found: " + lawyers.size());

        return lawyers.isEmpty() ? 
               new ResponseEntity<>(HttpStatus.NO_CONTENT) : 
               new ResponseEntity<>(lawyers, HttpStatus.OK);
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
    
    @GetMapping("/getAllLawyers")
    public ResponseEntity<List<LawyerEntity>> getAllLawyers() {
        List<LawyerEntity> lawyers = lawyerService.getAllLawyers();
        return lawyers.isEmpty() ? 
               new ResponseEntity<>(HttpStatus.NO_CONTENT) : 
               new ResponseEntity<>(lawyers, HttpStatus.OK);
    }
    
    @GetMapping("/getLawyerByName/{name}")
    public ResponseEntity<List<LawyerEntity>> getLawyerByName(@PathVariable String name) {
        List<LawyerEntity> lawyers = lawyerService.getLawyerByName(name);
        return lawyers.isEmpty() ? 
               new ResponseEntity<>(HttpStatus.NO_CONTENT) : 
               new ResponseEntity<>(lawyers, HttpStatus.OK);
    }

    // Read functionality (GET all lawyers)
   /* @GetMapping("/getAllLawyers")
    public ResponseEntity<List<LawyerEntity>> getAllLawyers() {
        List<LawyerEntity> lawyers = lawyerService.getAllLawyers();
        return lawyers.isEmpty() ? 
               new ResponseEntity<>(HttpStatus.NO_CONTENT) : 
               new ResponseEntity<>(lawyers, HttpStatus.OK);
    } */

    // Update functionality (PUT) - Fixed to use @PathVariable for lawyer_id
    @PutMapping("/update/{lawyerId}")
    public ResponseEntity<LawyerEntity> updateLawyer(@PathVariable int lawyerId, @RequestBody LawyerEntity updatedLawyer) {
        LawyerEntity lawyer = lawyerService.updateLawyer(lawyerId, updatedLawyer);
        return lawyer != null ? 
               new ResponseEntity<>(lawyer, HttpStatus.OK) : 
               new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

 // Delete functionality (DELETE by ID)
    @DeleteMapping("/deleteById/{lawyer_id}")
    public ResponseEntity<String> deleteLawyer(@PathVariable int lawyerId) {
        try {
            lawyerService.deleteLawyer(lawyerId);
            return ResponseEntity.ok("Lawyer with ID " + lawyerId + " successfully deleted.");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Lawyer with ID " + lawyerId + " not found.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while deleting the lawyer.");
        }
    }
    
    // New Delete
    // Delete functionality (DELETE by name)
    @DeleteMapping("/deleteLawyerByName/{name}")
    public String deleteLawyerByName(@PathVariable String name) {
        return lawyerService.deleteLawyerByName(name);
    }
    
    }