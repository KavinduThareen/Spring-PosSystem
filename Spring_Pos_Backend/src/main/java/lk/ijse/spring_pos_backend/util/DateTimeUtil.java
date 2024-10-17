package lk.ijse.spring_pos_backend.util;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class DateTimeUtil {
    public static String getCurrentDateTime() {
        return LocalDateTime.now().toString();
    }

    public static String getCurrentDate() {
        return LocalDate.now().toString();
    }
}
