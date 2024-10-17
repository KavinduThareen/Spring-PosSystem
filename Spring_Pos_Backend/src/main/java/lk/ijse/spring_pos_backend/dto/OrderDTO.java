package lk.ijse.spring_pos_backend.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lk.ijse.spring_pos_backend.CustomerObj.OrderResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrderDTO implements Serializable, OrderResponse {
    private String orderId;
    private String customerId;
    private List<OrderDetailDTO> orderDetails;
    private String orderDateTime;
    private double total;
    private String paymentMethod;
}
