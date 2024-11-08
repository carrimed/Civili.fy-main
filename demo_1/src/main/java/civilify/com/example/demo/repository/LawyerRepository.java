package civilify.com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import civilify.com.example.demo.entity.LawyerEntity;

@Repository
public interface LawyerRepository extends JpaRepository<LawyerEntity, Integer> {
	 List<LawyerEntity> findByName(String name); // Add this line
}
