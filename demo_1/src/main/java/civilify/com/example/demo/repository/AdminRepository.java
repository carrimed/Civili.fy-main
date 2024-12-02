package civilify.com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import civilify.com.example.demo.entity.AdminEntity;
import java.util.Optional;

public interface AdminRepository extends JpaRepository<AdminEntity, Integer> {

    Optional<AdminEntity> findByUsername(String username);

}