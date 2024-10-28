package civilify.com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import civilify.com.example.demo.entity.CaseEntity;

import java.util.List;

@Repository
public interface CaseRepository extends JpaRepository<CaseEntity, Integer> {

    // Method to find cases by status
    List<CaseEntity> findByStatus(String status);
    
    // Additional custom query methods can be added here if needed
}
