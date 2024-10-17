package lk.ijse.spring_pos_backend.controller;

import jakarta.validation.Valid;

import lk.ijse.spring_pos_backend.CustomerObj.ItemResponse;
import lk.ijse.spring_pos_backend.dto.ItemDTO;
import lk.ijse.spring_pos_backend.exception.DataPersistFailedException;
import lk.ijse.spring_pos_backend.exception.ItemNotFoundException;
import lk.ijse.spring_pos_backend.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/items")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class ItemController {
    @Autowired
    private final ItemService itemService;

    static Logger logger = LoggerFactory.getLogger(ItemController.class);

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> saveItem(@Valid @RequestBody ItemDTO itemDTO) {
        if (itemDTO == null) {
            return ResponseEntity.badRequest().build();
        } else {
            try {
                itemService.saveItem(itemDTO);
                logger.info("Item saved : " + itemDTO);
                return ResponseEntity.created(null).build();
            } catch (DataPersistFailedException e) {
                return ResponseEntity.badRequest().build();
            } catch (Exception e) {
                logger.error(e.getMessage());
                return ResponseEntity.internalServerError().build();
            }
        }
    }

    @GetMapping(value = "/{itemCode}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ItemResponse getItemById(@PathVariable("itemCode") String itemCode) {
        return itemService.getItemById(itemCode);
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<ItemDTO> getAllItems() {
        return itemService.getAllItems();
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PatchMapping(value = "/{itemCode}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> updateItem(@Valid @RequestBody ItemDTO itemDTO, @PathVariable("itemCode") String itemCode) {
        if (itemDTO == null || itemCode == null) {
            return ResponseEntity.badRequest().build();
        } else {
            try {
                itemService.updateItem(itemCode, itemDTO);
                logger.info("Item updated : " + itemDTO);
                return ResponseEntity.noContent().build();
            } catch (DataPersistFailedException e) {
                return ResponseEntity.badRequest().build();
            } catch (Exception e) {
                logger.error(e.getMessage());
                return ResponseEntity.internalServerError().build();
            }
        }
    }

    @DeleteMapping("/{itemCode}")
    public ResponseEntity<Void> deleteItem(@PathVariable("itemCode") String itemCode) {
        try {
            itemService.deleteItem(itemCode);
            logger.info("Item deleted : " + itemCode);
            return ResponseEntity.noContent().build();
        } catch (ItemNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            logger.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
}
