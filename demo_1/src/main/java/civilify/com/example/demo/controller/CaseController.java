package civilify.com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import civilify.com.example.demo.entity.CaseEntity;
import civilify.com.example.demo.service.CaseService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@RestController
@RequestMapping("/api/case")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "*"})
public class CaseController {

    @Autowired
    private CaseService caseService;

    @PostMapping("/postCaseRecord")
    public CaseEntity postCaseRecord(@RequestBody CaseEntity caseEntity) {
        return caseService.postCaseRecord(caseEntity);
    }
    

    @GetMapping("/getAllCases")
    public List<CaseEntity> getAllCases() {
        return caseService.getAllCases();
    }

    @GetMapping("/findByStatus")
    public List<CaseEntity> findByStatus(@RequestParam String status) {
        return caseService.getCasesByStatus(status);
    }

    @PutMapping("/putCaseDetails")
    public CaseEntity putCaseDetails(@RequestParam int case_id, @RequestBody CaseEntity newCaseDetails) {
        return caseService.putCaseDetails(case_id, newCaseDetails);
    }

   /* @DeleteMapping("/deleteCase/{caseId}")
    public String deleteCase(@PathVariable("caseId") int caseId) {
        caseService.deleteCase(caseId);
        return "Case with ID " + caseId + " has been deleted.";
    }*/
    
    @DeleteMapping("/deleteCase/{case_id}")
    public ResponseEntity<String> deleteCase(@PathVariable("case_id") int case_id) {
        String resultMessage = caseService.deleteCase(case_id); // Assuming your service method returns a message
        if (resultMessage.contains("successfully deleted")) {
            return ResponseEntity.ok(resultMessage); // Return 200 OK with success message
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(resultMessage); // Return 404 NOT FOUND if deletion failed
        }
    }
//I LAB APPDEV
}
