package civilify.com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    
    //deletelawyerbyname
    public String deleteLawyerByName(String name) {
        List<LawyerEntity> lawyers = lawyerRepo.findByName(name); // Assume findByName is implemented
        if (!lawyers.isEmpty()) {
            for (LawyerEntity lawyer : lawyers) {
                lawyerRepo.delete(lawyer); // Delete each lawyer with the given name
            }
            return "Lawyer(s) with name " + name + " successfully deleted!";
        } else {
            return "Lawyer with name " + name + " NOT found!";
        }
    }

    // Update operation
    public LawyerEntity updateLawyer(int lawyer_id, LawyerEntity updatedLawyer) {
        Optional<LawyerEntity> existingLawyerOpt = lawyerRepo.findById(lawyer_id);
        if (existingLawyerOpt.isPresent()) {
            LawyerEntity existingLawyer = existingLawyerOpt.get();
            existingLawyer.setName(updatedLawyer.getName());
            existingLawyer.setSpecialization(updatedLawyer.getSpecialization());
            existingLawyer.setContactNumber(updatedLawyer.getContactNumber());
            existingLawyer.setUsername(updatedLawyer.getUsername());
            existingLawyer.setPassword(updatedLawyer.getPassword());
            return lawyerRepo.save(existingLawyer);
        }
        return null;
    }

    // Delete operation
    public String deleteLawyer(int lawyer_id) {
    	String msg;
        if (lawyerRepo.existsById(lawyer_id)) {  // Check if the user exists
            lawyerRepo.deleteById(lawyer_id);    // Pass the correct userId
            msg = "Lawyer with ID " + lawyer_id + " successfully deleted!";
        } else {
            msg = "Lawyer with ID " + lawyer_id + " NOT found!";
        }
        return msg;
    }
}


