package lk.ijse.spring_pos_backend.dao;


import lk.ijse.spring_pos_backend.entity.ItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemDAO extends JpaRepository<ItemEntity, String> {}
