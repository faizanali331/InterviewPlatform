package com.mockinterview.support.controller;

import com.mockinterview.support.dto.CreateQueryRequest;
import com.mockinterview.support.dto.QueryResponse;
import com.mockinterview.support.service.ContactQueryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class ContactQueryController {

    private final ContactQueryService service;

    // Public: anyone on the landing page can send a question.
    @PostMapping("/api/v1/public/queries")
    public ResponseEntity<Map<String, Long>> create(@Valid @RequestBody CreateQueryRequest request) {
        Long id = service.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("id", id));
    }

    @GetMapping("/api/v1/admin/queries")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<List<QueryResponse>> list() {
        return ResponseEntity.ok(service.listAll());
    }

    @PostMapping("/api/v1/admin/queries/{id}/resolve")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<QueryResponse> resolve(@PathVariable Long id) {
        return ResponseEntity.ok(service.resolve(id));
    }
}