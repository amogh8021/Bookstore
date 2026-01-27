package com.example.bookStore.demo.Dtos;

import lombok.Builder;
import lombok.Data;

import java.util.Map;

@Data
@Builder
public class DashboardStatsResponse {
    private long totalOrders;
    private double totalRevenue;
    private long totalBooks;
    private long totalUsers;
    private long totalAuthors;
    
    // Order Status Breakdown
    private long newOrders;
    private long pendingOrders;
    private long completedOrders;
    private long cancelledOrders;

    // For Charts
    private Map<String, Double> monthlySales; // "JAN" -> 1500.00
    private Map<String, Long> orderStatusDistribution;
}
