package com.example.bookStore.demo.Service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {



    private final JavaMailSender javaMailSender;

    @Value("${spring.mail.properties.mail.smtp.from}")
    private  String fromEmail;


    public void SendOtpOnSignup(String UserEmail, String otp ){
        log.info("Attempting to send OTP email to: {}", UserEmail);
        
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(UserEmail);
            message.setSubject("otp verification");
            message.setText("welcome to bookstore , you can shop the variety of book here.\n  your otp for signup is " + otp );
            
            javaMailSender.send(message);
            log.info("✅ OTP email sent successfully to: {}", UserEmail);
            
        } catch (MailException e) {
            log.error("❌ Failed to send OTP email to: {}. Error: {}", UserEmail, e.getMessage(), e);
            throw new RuntimeException("Failed to send OTP email. Please check SMTP configuration. Error: " + e.getMessage(), e);
        } catch (Exception e) {
            log.error("❌ Unexpected error while sending OTP email to: {}. Error: {}", UserEmail, e.getMessage(), e);
            throw new RuntimeException("Unexpected error while sending OTP email: " + e.getMessage(), e);
        }
    }

    public void sendForgotPassword(String email, String otp){
        log.info("Attempting to send password reset OTP to: {}", email);
        
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setText("your otp for the password reset is " + otp);
            message.setSubject("reset-otp");
            message.setFrom(fromEmail);

            javaMailSender.send(message);
            log.info("✅ Password reset OTP sent successfully to: {}", email);
            
        } catch (MailException e) {
            log.error("❌ Failed to send password reset OTP to: {}. Error: {}", email, e.getMessage(), e);
            throw new RuntimeException("Failed to send password reset OTP. Please check SMTP configuration. Error: " + e.getMessage(), e);
        } catch (Exception e) {
            log.error("❌ Unexpected error while sending password reset OTP to: {}. Error: {}", email, e.getMessage(), e);
            throw new RuntimeException("Unexpected error while sending password reset OTP: " + e.getMessage(), e);
        }
    }



}
