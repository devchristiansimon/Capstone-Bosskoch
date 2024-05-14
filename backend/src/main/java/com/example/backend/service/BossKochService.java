package com.example.backend.service;


import com.example.backend.model.BossKochModelReceipt;
import com.example.backend.repository.BossKochRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BossKochService {
    private final BossKochRepository repo;

    public List<BossKochModelReceipt> getAllBossKochData(){
        return repo.findAll();
    }

    public BossKochModelReceipt addNewReceipt(BossKochModelReceipt newReceipt) {
        BossKochModelReceipt receipt = new BossKochModelReceipt(
                newReceipt.getId(),
                newReceipt.getRecipeName(),
                newReceipt.getAdditional(),
                newReceipt.getTimeInMinutes(),
                newReceipt.getNationality(),
                newReceipt.getDifficulty(),
                newReceipt.getIngredients(),
                newReceipt.getMaking(),
                newReceipt.isVegetarian(),
                newReceipt.isVegan(),
                newReceipt.getUser(),
                newReceipt.getImageSrc()
        );
        repo.save(receipt);
        return receipt;
    }
}
