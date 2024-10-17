package lk.ijse.spring_pos_backend.dao;


import lk.ijse.spring_pos_backend.entity.CustomerEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerDAO extends JpaRepository<CustomerEntity, String> {}
