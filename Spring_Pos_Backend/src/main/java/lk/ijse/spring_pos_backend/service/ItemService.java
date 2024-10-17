package lk.ijse.spring_pos_backend.service;


import lk.ijse.spring_pos_backend.CustomerObj.ItemResponse;
import lk.ijse.spring_pos_backend.dto.ItemDTO;

import java.util.List;

public interface ItemService {
    String saveItem(ItemDTO itemDTO);
    void updateItem(String id, ItemDTO itemDTO);
    void deleteItem(String id);
    ItemResponse getItemById(String id);
    List<ItemDTO> getAllItems();
}
