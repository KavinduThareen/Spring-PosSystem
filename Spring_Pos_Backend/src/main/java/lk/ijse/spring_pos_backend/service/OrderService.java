package lk.ijse.spring_pos_backend.service;


import lk.ijse.spring_pos_backend.dto.OrderDTO;

public interface OrderService {
    String saveOrder(OrderDTO orderDTO);
}
