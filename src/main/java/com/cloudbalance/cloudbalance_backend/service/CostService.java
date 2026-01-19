package com.cloudbalance.cloudbalance_backend.service;

import com.cloudbalance.cloudbalance_backend.repository.CostRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CostService {

    private final CostRepository costRepository;

    private static final Set<String> ALLOWED_COLUMNS = Set.of(
            "SERVICE",
            "INSTANCE_TYPE",
            "ACCOUNT_ID",
            "USAGE_TYPE",
            "REGION",
            "PLATFORM",
            "TENANCY",
            "PURCHASE_OPTION",
            "USAGE_TYPE_GROUP",
            "API_OPERATION",
            "RESOURCE",
            "AVAILABILITY_ZONE",
            "LEGAL_ENTITY",
            "BILLING_ENTITY"
    );

    public CostService(CostRepository costRepository) {
        this.costRepository = costRepository;
    }

    public List<Map<String, Object>> getCost(
            String groupBy,
            String startDate,
            String endDate
    ) {
        String column = groupBy.toUpperCase();

        if (!ALLOWED_COLUMNS.contains(column)) {
            throw new RuntimeException("Invalid groupBy: " + groupBy);
        }

        // Default date range
        if (startDate == null || startDate.isEmpty()) startDate = "1900-01-01";
        if (endDate == null || endDate.isEmpty()) endDate = "2100-01-01";

        // Fetch flat list from repository
        List<Map<String, Object>> rows = costRepository.fetchCost(column, startDate, endDate);

        // Group by name/service
        Map<String, List<Map<String, Object>>> tempMap = new LinkedHashMap<>();

        for (Map<String, Object> row : rows) {
            String name = (String) row.get("NAME");
            String month = (String) row.get("MONTH");
            Double cost = ((Number) row.get("TOTALCOST")).doubleValue();

            Map<String, Object> monthObj = new HashMap<>();
            monthObj.put("month", month);
            monthObj.put("cost", cost);

            tempMap.computeIfAbsent(name, k -> new ArrayList<>()).add(monthObj);
        }

        // Convert to list of objects
        List<Map<String, Object>> result = new ArrayList<>();
        for (Map.Entry<String, List<Map<String, Object>>> entry : tempMap.entrySet()) {
            Map<String, Object> serviceObj = new HashMap<>();
            serviceObj.put("name", entry.getKey());
            serviceObj.put("monthlyCost", entry.getValue());
            result.add(serviceObj);
        }

        return result;
//        throw new RuntimeException("e");
    }
}

