package com.example.bookStore.demo.Service;

import com.example.bookStore.demo.Dtos.CreateBookRequest;
import com.example.bookStore.demo.Dtos.UpdateRequestBook;
import com.example.bookStore.demo.Dtos.BookResponseDto;
import com.example.bookStore.demo.Entity.Book;
import com.example.bookStore.demo.Mapper.BookMapper;
import com.example.bookStore.demo.Repository.BookRepository;
import com.example.bookStore.demo.Repository.CartItemRepository;
import com.example.bookStore.demo.Repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;
    private final UserRepository userRepository;
    private final CartItemRepository cartItemRepository;
    private final BookMapper bookMapper;

    // Create book (admin only)
    public String createBookRequest(CreateBookRequest request) {
        if (bookRepository.findByTitleAndAuthor(request.getTitle(), request.getAuthor()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "This book is already available");
        }

        Book book = Book.builder()
                .genre(request.getGenre())
                .price(request.getPrice())
                .title(request.getTitle())
                .author(request.getAuthor())
                .description(request.getDescription())
                .publishedDate(request.getPublishedDate())
                .quantity(request.getQuantity())
                .imageUrl(request.getImageUrl())
                .featured(false)
                .build();

        bookRepository.save(book);
        return "Your book is successfully added";
    }

    // Get all books
    public List<BookResponseDto> getAllBooks() {
        return bookRepository.findAll()
                .stream()
                .map(bookMapper::toDto)
                .toList();
    }

    // Get book by ID
    public BookResponseDto getBookById(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Book not found"));
        return bookMapper.toDto(book);
    }

    // Update book (admin only)
    public BookResponseDto updateBook(Long id, UpdateRequestBook request) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find the book with this ID"));

        if (request.getTitle() != null) book.setTitle(request.getTitle());
        if (request.getAuthor() != null) book.setAuthor(request.getAuthor());
        if (request.getGenre() != null) book.setGenre(request.getGenre());
        if (request.getDescription() != null) book.setDescription(request.getDescription());
        if (request.getPrice() != null) book.setPrice(request.getPrice());
        if (request.getQuantity() != null) book.setQuantity(request.getQuantity());
        if (request.getPublishedDate() != null) book.setPublishedDate(request.getPublishedDate());
        if (request.getImageUrl() != null) book.setImageUrl(request.getImageUrl());

        return bookMapper.toDto(bookRepository.save(book));
    }

    // Delete book (admin only)
    public void deleteBook(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find the book with this ID"));

        bookRepository.deleteById(id);
    }


    public Page<BookResponseDto> getAllBooksPaginated(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        return bookRepository.findAll(pageable).map(bookMapper::toDto);
    }

    // Search books (with Specification + Sorting + Pagination)
    public Page<BookResponseDto> searchBooksAdvanced(
            String genre,
            String author,
            String title,
            Double minPrice,
            Double maxPrice,
            LocalDate startDate,
            LocalDate endDate,
            String sortBy,
            String direction,
            int page,
            int size
    ) {
        Specification<Book> spec = BookSpecification.hasGenre(genre)
                .and(BookSpecification.hasAuthor(author))
                .and(BookSpecification.hasTitle(title))
                .and(BookSpecification.priceBetween(minPrice, maxPrice))
                .and(BookSpecification.publishedDateBetween(startDate, endDate));

        Sort.Direction sortDirection;
        try {
            sortDirection = Sort.Direction.fromString(direction); // ASC or DESC
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid sort direction");
        }

        List<String> allowedFields = List.of("title", "author", "genre", "price", "publishedDate");
        if (!allowedFields.contains(sortBy)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid sorting field");
        }

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortBy));
        System.out.println("Total Books Found: " + bookRepository.findAll(spec).size()); // Consider replacing with logger
        return bookRepository.findAll(spec, pageable).map(bookMapper::toDto);


    }


    //get all genre

    public List<String> getAllGenres(){
        return bookRepository.getAllGenre();
    }



    //get all author

    public List<String> getAllAuthor(){
        return bookRepository.getAllAuthor();
    }


    //featured books

    public Page<BookResponseDto> getFeaturedBooks(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return bookRepository.findByFeaturedTrue(pageable).map(bookMapper::toDto);
    }


    public BookResponseDto setFeatured(Long bookId, boolean featured) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        book.setFeatured(featured);
        return bookMapper.toDto(bookRepository.save(book));
    }

    public List<BookResponseDto> getBestSellerBooks(int limit) {

        Pageable pageable = PageRequest.of(0, limit);

        List<Object[]> result =
                cartItemRepository.findBestSellingBooks(pageable);

        return result.stream()
                .map(obj -> bookMapper.toDto((Book) obj[0]))
                .toList();
    }




}
