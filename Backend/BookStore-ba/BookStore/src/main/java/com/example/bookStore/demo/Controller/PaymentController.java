package com.example.bookStore.demo.Controller;

import com.example.bookStore.demo.Service.OrderService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/payment")
@CrossOrigin(origins = "http://localhost:5173")
public class PaymentController {

    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;

    private final OrderService orderService;

    public PaymentController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/create-order/{amount}")
    public ResponseEntity<String> createOrder(@PathVariable int amount) throws RazorpayException {
        RazorpayClient razorpay = new RazorpayClient(keyId, keySecret);
        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amount * 100); // Amount in paise
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", "txn_123456");

        Order order = razorpay.orders.create(orderRequest);
        return ResponseEntity.ok(order.toString());
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyPayment(@RequestBody Map<String, Object> data) throws RazorpayException {
        String orderId = (String) data.get("razorpay_order_id");
        String paymentId = (String) data.get("razorpay_payment_id");
        String signature = (String) data.get("razorpay_signature");
        Long dbOrderId = Long.parseLong(data.get("db_order_id").toString());

        JSONObject options = new JSONObject();
        options.put("razorpay_order_id", orderId);
        options.put("razorpay_payment_id", paymentId);
        options.put("razorpay_signature", signature);

        boolean validSignature = Utils.verifyPaymentSignature(options, keySecret);

        if (validSignature) {
            orderService.updatePaymentStatus(dbOrderId, paymentId, "PAID");
            return ResponseEntity.ok("Payment verified successfully");
        } else {
            return ResponseEntity.badRequest().body("Payment verification failed");
        }
    }

    @GetMapping("/key")
    public ResponseEntity<String> getKey() {
        return ResponseEntity.ok(keyId);
    }
}
