package com.cloudbalance.cloudbalance_backend.repository;

import java.util.*;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository

public class CostRepository {

    private final JdbcTemplate snowflakeJdbcTemplate;

    public CostRepository(@Qualifier("snowflakeJdbcTemplate") JdbcTemplate snowflakeJdbcTemplate) {
        this.snowflakeJdbcTemplate = snowflakeJdbcTemplate;
    }

    public List<Map<String, Object>> fetchCost(
            String groupBy,
            String startDate,
            String endDate
    ) {
        String sql = """	
        SELECT
            TO_CHAR(BILL_DATE, 'YYYY-MM') AS month,
            TO_VARCHAR(%s) AS name,
            SUM(COST) AS totalCost
        FROM COST_REPORT
        WHERE BILL_DATE BETWEEN ? AND ?
        GROUP BY
            month,
            TO_VARCHAR(%s)
        ORDER BY
            month
        """.formatted(groupBy, groupBy);


        return snowflakeJdbcTemplate.queryForList(sql, startDate, endDate);
    }
}