package lk.ijse.spring_pos_backend.service;



import lk.ijse.spring_pos_backend.CustomerObj.CustomerResponse;
import lk.ijse.spring_pos_backend.dto.CustomerDTO;

import java.util.List;

public interface CustomerService {
    String saveCustomer(CustomerDTO customerDTO);
    void updateCustomer(String id, CustomerDTO customerDTO);
    void deleteCustomer(String id);
    CustomerResponse getCustomerById(String id);
    List<CustomerDTO> getAllCustomers();
}
