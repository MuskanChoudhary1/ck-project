
package com.cloudbalance.cloudbalance_backend.controller;

import com.cloudbalance.cloudbalance_backend.service.CostService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/cost")
public class CostController {

    private final CostService costService;

    public CostController(CostService costService) {
        this.costService = costService;
    }

    @GetMapping
    public List<Map<String, Object>> getCost(
            @RequestParam(defaultValue = "SERVICE") String groupBy,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate
    ) {

//        throw new RuntimeException("e");
        return costService.getCost(groupBy, startDate, endDate);
    }
}
