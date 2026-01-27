package com.example.bookStore.demo.Mapper;

import com.example.bookStore.demo.Dtos.BookResponseDto;
import com.example.bookStore.demo.Entity.Book;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BookMapper {
    BookResponseDto toDto(Book book);
    Book toEntity(BookResponseDto bookDto);
}
