package civilify.com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import civilify.com.example.demo.entity.AdminEntity;
import civilify.com.example.demo.repository.AdminRepository;

import java.util.List;

@Service
public class AdminService {

    private AdminRepository adminRepo;

    @Autowired
    public AdminService(AdminRepository adminRepo) {
        this.adminRepo = adminRepo;
    }

    public List<AdminEntity> getAllAdmins() {
        return adminRepo.findAll();
    }

    public AdminEntity getAdminById(int id) {
        return adminRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Admin not found with id: " + id));
    }

    public AdminEntity getAdminByUsername(String username) {
        return adminRepo.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Admin not found with username: " + username));
    }

    public AdminEntity createAdmin(AdminEntity admin) {
        return adminRepo.save(admin);
    }

    public AdminEntity updateAdmin(int id, AdminEntity updatedAdmin) {
        AdminEntity existingAdmin = getAdminById(id);
        existingAdmin.setUsername(updatedAdmin.getUsername());
        existingAdmin.setPassword(updatedAdmin.getPassword());
        return adminRepo.save(existingAdmin);
    }

    public void deleteAdmin(int id) {
        AdminEntity admin = getAdminById(id);
        adminRepo.delete(admin);
    }
}