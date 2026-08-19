package com.example.acservice;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    public static record BookingRequest(
        String customerName,
        String phone,
        String serviceType,
        String address,
        LocalDate preferredDate
    ) {}

    @PostMapping
    public ResponseEntity<String> createBooking(@RequestBody BookingRequest request) {
        // Business logic: process and persist booking details
        System.out.println("Received AC Service Booking for: " + request.customerName());
        return ResponseEntity.ok("Booking successfully created for " + request.customerName());
    }
}
