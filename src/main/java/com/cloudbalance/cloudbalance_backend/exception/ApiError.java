package com.cloudbalance.cloudbalance_backend.exception;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;


@Data
@AllArgsConstructor
public class ApiError {

    private LocalDateTime timestamp;
    private int status;
    private String error;
    private Object message;

}
