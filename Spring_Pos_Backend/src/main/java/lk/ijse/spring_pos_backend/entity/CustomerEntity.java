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
@Table(name = "customers")
@Entity
public class CustomerEntity implements Serializable {
    @Id
    private String customerId;
    private String name;
    private String address;
    @Column(unique = true)
    private String email;
    @Column(unique = true)
    private int mobile;
    private String lastUpdatedAt;
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    private List<OrderEntity> orders;
}
