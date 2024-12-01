package civilify.com.example.demo.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import civilify.com.example.demo.entity.ClientEntity;
import civilify.com.example.demo.entity.LawyerEntity;
import civilify.com.example.demo.repository.LawyerRepository;

@Service
public class LawyerService {

    @Autowired
    private LawyerRepository lawyerRepo;

    // Create operation
    public LawyerEntity createLawyer(LawyerEntity lawyer) {
        return lawyerRepo.save(lawyer);
    }

    // Read operation
    public List<LawyerEntity> getAllLawyers() {
        return lawyerRepo.findAll();
    }
    
    // Get client by ID
    public LawyerEntity getLawyerById(int lawyerId) {
        return lawyerRepo.findById(lawyerId)
            .orElseThrow(() -> new NoSuchElementException("Client with ID " + lawyerId + " not found."));
    }
    
    
    public LawyerEntity findById(int lawyerId) {
        Optional<LawyerEntity> lawyer = lawyerRepo.findById(lawyerId);
        return lawyer.orElse(null); // If client is not found, return null
    }

    // Delete lawyer by name
    public String deleteLawyerByName(String name) {
        List<LawyerEntity> lawyers = lawyerRepo.findByName(name); // Assume findByName is implemented in LawyerRepository
        if (!lawyers.isEmpty()) {
            int deletedCount = 0;
            for (LawyerEntity lawyer : lawyers) {
                lawyerRepo.delete(lawyer); // Delete each lawyer with the given name
                deletedCount++;
            }
            return deletedCount + " Lawyer(s) with name '" + name + "' successfully deleted!";
        } else {
            return "Lawyer with name '" + name + "' NOT found!";
        }
    }

    // Update operation
    public LawyerEntity updateLawyer(int lawyerId, LawyerEntity updatedLawyer) {
        Optional<LawyerEntity> existingLawyerOpt = lawyerRepo.findById(lawyerId);
        if (existingLawyerOpt.isPresent()) {
            LawyerEntity existingLawyer = existingLawyerOpt.get();
            existingLawyer.setName(updatedLawyer.getName());
            existingLawyer.setSpecialization(updatedLawyer.getSpecialization());
            existingLawyer.setContactNumber(updatedLawyer.getContactNumber());
            existingLawyer.setUsername(updatedLawyer.getUsername());
            existingLawyer.setPassword(updatedLawyer.getPassword());
            existingLawyer.setEmail(updatedLawyer.getEmail());
            existingLawyer.setOfficeAddress(updatedLawyer.getOfficeAddress());
            existingLawyer.setBirthdate(updatedLawyer.getBirthdate());
            existingLawyer.setYearsOfExperience(updatedLawyer.getYearsOfExperience());
            existingLawyer.setZipcode(updatedLawyer.getZipcode());
            existingLawyer.setConsultationFee(updatedLawyer.getConsultationFee());
            existingLawyer.setHourlyRate(updatedLawyer.getHourlyRate());
            return lawyerRepo.save(existingLawyer);
        }
        return null; // Return null if lawyer with given ID doesn't exist
    }

    // Delete operation by ID
    public String deleteLawyer(int lawyerId) {
        String msg;
        if (lawyerRepo.existsById(lawyerId)) {  // Check if the lawyer exists by ID
            lawyerRepo.deleteById(lawyerId);    // Delete the lawyer by ID
            msg = "Lawyer with ID " + lawyerId + " successfully deleted!";
        } else {
            msg = "Lawyer with ID " + lawyerId + " NOT found!";
        }
        return msg;
    }
    
    public LawyerEntity validateUser(String loginField, String password) {
        LawyerEntity client = null;

        // If the login field contains "@" symbol, treat it as email
        if (loginField.contains("@")) {
            client = lawyerRepo.findByEmail(loginField);  // Find by email
        } else {
            client = lawyerRepo.findByUsername(loginField);  // Otherwise, treat it as username
        }

        // If the client is found and the password matches
        if (client != null && client.getPassword().equals(password)) {
            return client;  // Return the ClientEntity object
        }

        return null;  // If no client is found or password does not match
    }
    
    public LawyerEntity save(LawyerEntity lawyer) {
        return lawyerRepo.save(lawyer); // Use the JpaRepository's save method
    }
}
