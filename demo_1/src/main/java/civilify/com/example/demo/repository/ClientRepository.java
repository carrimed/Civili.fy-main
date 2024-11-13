package civilify.com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import civilify.com.example.demo.entity.ClientEntity;

import java.util.List;
@Repository
public interface ClientRepository extends JpaRepository<ClientEntity, Integer> {
    
}
