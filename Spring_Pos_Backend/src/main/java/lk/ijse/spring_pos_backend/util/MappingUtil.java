package lk.ijse.spring_pos_backend.util;

import lk.ijse.spring_pos_backend.dto.CustomerDTO;
import lk.ijse.spring_pos_backend.dto.ItemDTO;
import lk.ijse.spring_pos_backend.entity.CustomerEntity;
import lk.ijse.spring_pos_backend.entity.ItemEntity;
import lk.ijse.spring_pos_backend.entity.OrderDetailEntity;
import lk.ijse.spring_pos_backend.entity.OrderEntity;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class MappingUtil {
    @Autowired
    private ModelMapper modelMapper;

    //mapping by customer entity & dto
    public CustomerDTO convertToCustomerDTO(CustomerEntity entity){
        return modelMapper.map(entity, CustomerDTO.class);
    }

    public CustomerEntity convertToCustomerEntity(CustomerDTO dto){
        return modelMapper.map(dto, CustomerEntity.class);
    }

    public List<CustomerDTO> convertToCustomerDTOList(List<CustomerEntity> customerEntities) {
        List<CustomerDTO> customerDTOs = new ArrayList<>();

        for (CustomerEntity entity : customerEntities) {
            CustomerDTO dto = new CustomerDTO();
            dto.setCustomerId(entity.getCustomerId());
            dto.setName(entity.getName());
            dto.setAddress(entity.getAddress());
            dto.setEmail(entity.getEmail());
            dto.setMobile(entity.getMobile());
            dto.setLastUpdatedAt(entity.getLastUpdatedAt());
            customerDTOs.add(dto);
        }
        return customerDTOs;
    }


    //mapping by item entity & dto
    public ItemDTO convertToItemDTO(ItemEntity entity){
        return modelMapper.map(entity, ItemDTO.class);
    }

    public ItemEntity convertToItemEntity(ItemDTO dto){
        return modelMapper.map(dto, ItemEntity.class);
    }

    public List<ItemDTO> convertToItemDTOList(List<ItemEntity> entities){
        List<ItemDTO> itemDTOS = new ArrayList<>();

        for (ItemEntity entity : entities) {
            ItemDTO dto = new ItemDTO();
            dto.setItemCode(entity.getItemCode());
            dto.setCategory(entity.getCategory());
            dto.setUnitPrice(entity.getUnitPrice());
            dto.setQtyOnHand(entity.getQtyOnHand());
            dto.setRegisterDate(entity.getRegisterDate());
            dto.setExpireDate(entity.getExpireDate());
            itemDTOS.add(dto);
        }
        return itemDTOS;
    }

    //mapping by order entity & dto
    public OrderEntity convertToOrderEntity(OrderDTO dto){
        return modelMapper.map(dto, OrderEntity.class);
    }

    //mapping by order details entity & dto
    public OrderDetailEntity convertToOrderDetailEntity(OrderDetailDTO dto){
        return modelMapper.map(dto, OrderDetailEntity.class);
    }
}
