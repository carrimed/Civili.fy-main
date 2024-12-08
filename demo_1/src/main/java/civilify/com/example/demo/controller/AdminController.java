package civilify.com.example.demo.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import civilify.com.example.demo.entity.AdminEntity;
import civilify.com.example.demo.service.AdminService;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "*"})
public class AdminController {

    @Autowired
    private AdminService adminService;

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
    
 	// POST endpoint for login
    @PostMapping("/login")
    public String login(@RequestBody AdminEntity admin) {
        // Authenticate by username and password
        AdminEntity existingAdmin = adminService.getAllAdmins().stream()
                .filter(a -> a.getUsername().equals(admin.getUsername()) && a.getPassword().equals(admin.getPassword()))
                .findFirst()
                .orElse(null);

        if (existingAdmin != null) {
            // If authentication is successful
            return "Login successful";
        } else {
            // If authentication fails
            throw new IllegalArgumentException("Invalid username or password");
        }
    }
}
