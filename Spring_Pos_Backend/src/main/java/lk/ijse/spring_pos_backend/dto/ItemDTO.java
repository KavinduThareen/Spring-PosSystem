package lk.ijse.spring_pos_backend.dto;

import jakarta.validation.constraints.*;

import lk.ijse.spring_pos_backend.CustomerObj.ItemResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ItemDTO implements Serializable, ItemResponse {
    private String itemCode;
    private String category;
    private double unitPrice;
    private int qtyOnHand;
    private String registerDate;
    private String expireDate;
}
