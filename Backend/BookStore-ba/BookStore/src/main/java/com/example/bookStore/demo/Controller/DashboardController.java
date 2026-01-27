package com.example.bookStore.demo.Controller;

import com.example.bookStore.demo.Dtos.DashboardStatsResponse;
import com.example.bookStore.demo.Entity.Status;
import com.example.bookStore.demo.Repository.BookRepository;
import com.example.bookStore.demo.Repository.OrderRepository;
import com.example.bookStore.demo.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.LinkedHashMap;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class DashboardController {

    private final OrderRepository orderRepository;
    private final BookRepository bookRepository;
    private final UserRepository userRepository;

    @GetMapping("/stats")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<DashboardStatsResponse> getDashboardStats() {
        // 1. Counts
        long totalOrders = orderRepository.count();
        long totalBooks = bookRepository.count();
        long totalUsers = userRepository.count();
        
        // 2. Revenue
        BigDecimal revenueBD = orderRepository.getTotalRevenue();
        double totalRevenue = revenueBD != null ? revenueBD.doubleValue() : 0.0;

        // 3. Status Breakdown
        long newOrders = orderRepository.countByOrderDateAfter(LocalDateTime.now().minusDays(1)); 
        long pendingOrders = orderRepository.countByStatus(Status.PENDING);
        long completedOrders = orderRepository.countByStatus(Status.COMPLETED);
        long cancelledOrders = orderRepository.countByStatus(Status.CANCELLED);

        // 4. Monthly Sales (Last 12 Months) - Aggregation in Java
        LocalDateTime startDate = LocalDateTime.now().minusMonths(12);
        List<com.example.bookStore.demo.Entity.Order> completedOrdersList = orderRepository.findAllByStatusAndOrderDateAfter(Status.COMPLETED, startDate);
        
        Map<String, Double> monthlySalesMap = new LinkedHashMap<>();
        
        // Initialize last 12 months with 0
        for (int i = 11; i >= 0; i--) {
            LocalDateTime d = LocalDateTime.now().minusMonths(i);
            String monthName = d.getMonth().name();
            monthlySalesMap.put(monthName, 0.0);
        }

        // Aggregate
        for (com.example.bookStore.demo.Entity.Order order : completedOrdersList) {
            String month = order.getOrderDate().getMonth().name();
            double amount = order.getTotalPayable().doubleValue();
            monthlySalesMap.put(month, monthlySalesMap.getOrDefault(month, 0.0) + amount);
        }

        DashboardStatsResponse response = DashboardStatsResponse.builder()
                .totalOrders(totalOrders)
                .totalRevenue(totalRevenue)
                .totalBooks(totalBooks)
                .totalUsers(totalUsers)
                .newOrders(newOrders)
                .pendingOrders(pendingOrders)
                .completedOrders(completedOrders)
                .cancelledOrders(cancelledOrders)
                .monthlySales(monthlySalesMap)
                .build();

        return ResponseEntity.ok(response);
    }
}
