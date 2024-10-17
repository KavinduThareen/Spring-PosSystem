package lk.ijse.spring_pos_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "items")
@Entity
public class ItemEntity implements Serializable {
    @Id
    private String itemCode;
    private String category;
    private double unitPrice;
    private int qtyOnHand;
    private String registerDate;
    private String expireDate;
    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL)
    private List<OrderDetailEntity> orderDetails;
}
