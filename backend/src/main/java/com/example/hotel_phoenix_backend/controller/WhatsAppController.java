package com.example.hotel_phoenix_backend.controller;

import com.example.hotel_phoenix_backend.service.WhatsAppService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/whatsapp")
@CrossOrigin(origins = "http://localhost:5173")
public class WhatsAppController {

    @Autowired
    private WhatsAppService whatsAppService;

    @PostMapping("/registration")
    public ResponseEntity<?> notifyRegistration(@RequestBody Map<String, String> payload) {
        String phone = payload.get("phone");
        String name = payload.get("name");
        if (phone != null && !phone.isEmpty()) {
            whatsAppService.sendRegistrationSuccess(phone, name != null ? name : "Guest");
        }
        return ResponseEntity.ok(Map.of("message", "Registration notification sent if phone is provided."));
    }

    @PostMapping("/login")
    public ResponseEntity<?> notifyLogin(@RequestBody Map<String, String> payload) {
        String phone = payload.get("phone");
        String name = payload.get("name");
        if (phone != null && !phone.isEmpty()) {
            whatsAppService.sendLoginAlert(phone, name != null ? name : "Guest");
        }
        return ResponseEntity.ok(Map.of("message", "Login notification sent if phone is provided."));
    }

    @PostMapping("/payment")
    public ResponseEntity<?> notifyPayment(@RequestBody Map<String, String> payload) {
        String phone = payload.get("phone");
        String name = payload.get("name");
        String amount = payload.get("amount");
        if (phone != null && !phone.isEmpty()) {
            whatsAppService.sendPaymentSuccess(phone, name != null ? name : "Guest", amount != null ? amount : "the due amount");
        }
        return ResponseEntity.ok(Map.of("message", "Payment notification sent if phone is provided."));
    }
}
