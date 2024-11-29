package civilify.com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import civilify.com.example.demo.entity.ClientEntity;
import civilify.com.example.demo.entity.LawyerEntity;
import java.util.List;

@Repository
public interface LawyerRepository extends JpaRepository<LawyerEntity, Integer> {
    
	public LawyerEntity findByUsername(String username);
	public LawyerEntity findByEmail(String email);
    // Custom query method to find lawyers by name
    List<LawyerEntity> findByName(String name);
    
}
