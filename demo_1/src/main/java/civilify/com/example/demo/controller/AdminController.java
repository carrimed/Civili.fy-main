package civilify.com.example.demo.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import civilify.com.example.demo.entity.AdminEntity;
import civilify.com.example.demo.service.AdminService;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "*"})
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AdminEntity admin) {
        // Fetch the admin by username (instead of ID)
        AdminEntity foundAdmin = adminService.getAdminByUsername(admin.getUsername());
        
        if (foundAdmin != null && foundAdmin.getPassword().equals(admin.getPassword())) {
            // Return success response (you can include a token or other success message)
            return ResponseEntity.ok(new HashMap<String, String>() {/**
				 * 
				 */
				private static final long serialVersionUID = 1L;

			{
                put("success", "true");
            }});
        } else {
            // Invalid credentials
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                 .body("Invalid credentials");
        }
    }
    
    // Create a new admin
    @PostMapping("/createAdmin")
    public AdminEntity createAdmin(@RequestBody AdminEntity admin) {
        return adminService.createAdmin(admin);
    }

    // Get all admins
    @GetMapping("/getAllAdmins")
    public List<AdminEntity> getAllAdmins() {
        return adminService.getAllAdmins();
    }

    // Get an admin by ID
    @GetMapping("/getAdmin/{id}")
    public AdminEntity getAdminById(@PathVariable int id) {
        return adminService.getAdminById(id);
    }

    // Update admin details
    @PutMapping("/updateAdmin/{id}")
    public AdminEntity updateAdmin(
            @PathVariable int id,
            @RequestBody AdminEntity updatedAdmin) {
        return adminService.updateAdmin(id, updatedAdmin);
    }

    // Delete an admin by ID
    @DeleteMapping("/deleteAdmin/{id}")
    public String deleteAdmin(@PathVariable int id) {
        adminService.deleteAdmin(id);
        return "Admin with ID " + id + " has been deleted.";
    }
}