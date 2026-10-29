package com.mockinterview.support.service;

import com.mockinterview.common.ResourceNotFoundException;
import com.mockinterview.support.dto.CreateQueryRequest;
import com.mockinterview.support.dto.QueryResponse;
import com.mockinterview.support.entity.ContactQuery;
import com.mockinterview.support.repository.ContactQueryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ContactQueryService {

    private final ContactQueryRepository repository;

    @Transactional
    public Long create(CreateQueryRequest request) {
        ContactQuery query = new ContactQuery();
        query.setName(request.getName().trim());
        query.setEmail(request.getEmail().trim());
        query.setPhone(request.getPhone());
        query.setVisitorType(request.getVisitorType());
        query.setMessage(request.getMessage().trim());
        return repository.save(query).getId();
    }

    @Transactional(readOnly = true)
    public List<QueryResponse> listAll() {
        return repository.findAllByOrderByCreatedAtDesc().stream().map(this::toResponse).toList();
    }

    @Transactional
    public QueryResponse resolve(Long id) {
        ContactQuery query = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Query not found with id: " + id));
        query.setStatus("RESOLVED");
        return toResponse(repository.save(query));
    }

    private QueryResponse toResponse(ContactQuery q) {
        return QueryResponse.builder()
                .id(q.getId())
                .name(q.getName())
                .email(q.getEmail())
                .phone(q.getPhone())
                .visitorType(q.getVisitorType())
                .message(q.getMessage())
                .status(q.getStatus())
                .createdAt(q.getCreatedAt())
                .build();
    }
}