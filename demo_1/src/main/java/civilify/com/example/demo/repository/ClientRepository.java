package civilify.com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import civilify.com.example.demo.entity.ClientEntity;
@Repository
public interface ClientRepository extends JpaRepository<ClientEntity, Integer> {
<<<<<<< Updated upstream
	public ClientEntity findByUsername(String username);

=======

	ClientEntity findByUsername(String username);
    
>>>>>>> Stashed changes
}
