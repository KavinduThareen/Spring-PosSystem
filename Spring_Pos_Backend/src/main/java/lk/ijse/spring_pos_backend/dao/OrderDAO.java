package lk.ijse.spring_pos_backend.dao;


import lk.ijse.spring_pos_backend.entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDAO extends JpaRepository<OrderEntity, String> {}
