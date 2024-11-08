package civilify.com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import civilify.com.example.demo.entity.AppointmentEntity;


@Repository
public interface AppointmentRepository extends JpaRepository<AppointmentEntity, Integer> {
}
