package com.example.hotel_phoenix_backend.service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class WhatsAppService {

    @Value("${twilio.account.sid:}")
    private String accountSid;

    @Value("${twilio.auth.token:}")
    private String authToken;

    @Value("${twilio.phone.number:}")
    private String twilioPhoneNumber;

    private boolean isConfigured = false;

    @PostConstruct
    public void init() {
        if (accountSid != null && !accountSid.isEmpty() && 
            authToken != null && !authToken.isEmpty()) {
            Twilio.init(accountSid, authToken);
            isConfigured = true;
            System.out.println("Twilio WhatsApp integration initialized successfully.");
        } else {
            System.out.println("Twilio credentials not found. WhatsApp messages will be mocked.");
        }
    }

    private void sendMessage(String toPhoneNumber, String messageBody) {
        // Remove spaces and dashes
        toPhoneNumber = toPhoneNumber.replaceAll("[\\s-]", "");
        
        // If it's a 10-digit number, assume India (+91)
        if (toPhoneNumber.length() == 10 && !toPhoneNumber.startsWith("+")) {
            toPhoneNumber = "+91" + toPhoneNumber;
        } else if (!toPhoneNumber.startsWith("+") && !toPhoneNumber.startsWith("whatsapp:+")) {
            toPhoneNumber = "+" + toPhoneNumber; 
        }
        
        String to = toPhoneNumber.startsWith("whatsapp:") ? toPhoneNumber : "whatsapp:" + toPhoneNumber;
        String from = twilioPhoneNumber.startsWith("whatsapp:") ? twilioPhoneNumber : "whatsapp:" + twilioPhoneNumber;

        System.out.println("Attempting to send WhatsApp message to: " + to);

        if (isConfigured) {
            try {
                Message message = Message.creator(
                        new PhoneNumber(to),
                        new PhoneNumber(from),
                        messageBody)
                        .create();
                System.out.println("WhatsApp message sent successfully: " + message.getSid());
            } catch (Exception e) {
                System.err.println("Failed to send WhatsApp message: " + e.getMessage());
            }
        } else {
            // Mocking the message logic
            System.out.println("=================================================");
            System.out.println("[MOCK WHATSAPP] To: " + to);
            System.out.println("Message: " + messageBody);
            System.out.println("=================================================");
        }
    }

    public void sendRegistrationSuccess(String toPhoneNumber, String name) {
        String msg = String.format("Hello %s! You have successfully registered at Hotel Phoenix. We look forward to serving you.", name);
        sendMessage(toPhoneNumber, msg);
    }

    public void sendLoginAlert(String toPhoneNumber, String name) {
        String msg = String.format("Alert: New login detected for your Hotel Phoenix account (%s). If this wasn't you, please contact support immediately.", name);
        sendMessage(toPhoneNumber, msg);
    }

    public void sendBookingConfirmation(String toPhoneNumber, String name, String roomType, String dates) {
        String msg = String.format("Booking Confirmed! %s, your %s room has been booked for %s. Thank you for choosing Hotel Phoenix.", name, roomType, dates);
        sendMessage(toPhoneNumber, msg);
    }

    public void sendPaymentSuccess(String toPhoneNumber, String name, String amount) {
        String msg = String.format("Payment Successful! We have received your payment of %s for your booking at Hotel Phoenix, %s.", amount, name);
        sendMessage(toPhoneNumber, msg);
    }
}
