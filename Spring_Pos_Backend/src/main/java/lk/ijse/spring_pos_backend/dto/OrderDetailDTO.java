package lk.ijse.spring_pos_backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

import lk.ijse.spring_pos_backend.CustomerObj.OrderResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrderDetailDTO implements Serializable, OrderResponse {
    private String orderId;

    private String itemCode;

    private int qty;

    private double unitPrice;
    private double total;
}
