package civilify.com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import civilify.com.example.demo.entity.CaseEntity;
import civilify.com.example.demo.repository.CaseRepository;

import java.util.List;
import java.util.NoSuchElementException;

import javax.naming.NameNotFoundException;

@Service
public class CaseService {

    @Autowired
    private CaseRepository crepo;

    public CaseEntity postCaseRecord(CaseEntity caseEntity) {
        return crepo.save(caseEntity);
    }

    public List<CaseEntity> getAllCases() {
        return crepo.findAll();
    }

    public List<CaseEntity> getCasesByStatus(String status) {
        return crepo.findByStatus(status); // Ensure you have this method in your repository
    }

    @SuppressWarnings("finally")
    public CaseEntity putCaseDetails(int case_id, CaseEntity newCaseDetails) {
        CaseEntity caseEntity = new CaseEntity();
        try {
            caseEntity = crepo.findById(case_id).orElseThrow(() -> 
                new NoSuchElementException("Case record with ID " + case_id + " not found."));
            
            caseEntity.setDescription(newCaseDetails.getDescription());
            caseEntity.setStatus(newCaseDetails.getStatus());
        } catch (NoSuchElementException nex) {
            throw new NameNotFoundException("Case record with ID " + case_id + " not found.");
        } finally {
            return crepo.save(caseEntity);
        }
    }

    /*public String deleteCase(int case_id) {
        String msg;
        if (crepo.existsById(case_id)) {  // Check if the case record exists
            crepo.deleteById(case_id);    // Pass the correct caseId
            msg = "Case record with ID " + case_id + " successfully deleted!";
        } else {
            msg = "Case record with ID " + case_id + " NOT found!";
        }
        return msg;
    }*/
    
    public String deleteCase(int case_id) {
        if (crepo.existsById(case_id)) {  // Check if the case record exists
            crepo.deleteById(case_id);    // Delete by caseId
            return "Case record with ID " + case_id + " successfully deleted!";
        } else {
            return "Case record with ID " + case_id + " NOT found!";
        }
    }
}
