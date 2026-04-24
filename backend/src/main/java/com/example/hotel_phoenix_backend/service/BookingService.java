package com.example.hotel_phoenix_backend.service;

import com.example.hotel_phoenix_backend.entity.Booking;
import com.example.hotel_phoenix_backend.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public Booking createBooking(Booking booking) {
        // Calculate Total Price
        double basePrice = 0;
        String roomType = booking.getRoomType();
        
        if ("Deluxe".equalsIgnoreCase(roomType)) basePrice = 8500;
        else if ("Suite".equalsIgnoreCase(roomType)) basePrice = 14000;
        else if ("Presidential".equalsIgnoreCase(roomType)) basePrice = 28000;
        else basePrice = 5000; // Standard

        long nights = ChronoUnit.DAYS.between(booking.getCheckInDate(), booking.getCheckOutDate());
        if (nights < 1) nights = 1;

        booking.setTotalPrice(basePrice * nights);
        booking.setStatus("CONFIRMED");

        return bookingRepository.save(booking);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Optional<Booking> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }

    public boolean deleteBooking(Long id) {
        return bookingRepository.findById(id).map(booking -> {
            bookingRepository.delete(booking);
            return true;
        }).orElse(false);
    }

    public Optional<Booking> updateBooking(Long id, Booking bookingDetails) {
        return bookingRepository.findById(id).map(booking -> {
            booking.setFullName(bookingDetails.getFullName());
            booking.setRoomType(bookingDetails.getRoomType());
            booking.setCheckInDate(bookingDetails.getCheckInDate());
            booking.setCheckOutDate(bookingDetails.getCheckOutDate());
            booking.setGuests(bookingDetails.getGuests());
            booking.setSpecialRequest(bookingDetails.getSpecialRequest());
            
            return createBooking(booking); 
        });
    }
}
