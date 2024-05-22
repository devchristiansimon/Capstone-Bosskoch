package com.example.backend.repository;

import com.example.backend.model.BossKochModelReceipt;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface BossKochRepository extends MongoRepository<BossKochModelReceipt, String> {
    BossKochModelReceipt getById(String id);
}
