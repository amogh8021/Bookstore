package com.example.bookStore.demo.Dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookResponseDto {
    private Long id;
    private String author;
    private String title;
    private String genre;
    private String description;
    private Double price;
    private int quantity;
    private LocalDate publishedDate;
    private boolean featured;
    private String imageUrl;
}
