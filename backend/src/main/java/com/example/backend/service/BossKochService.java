package com.example.backend.service;


import com.example.backend.model.BossKochModelReceipt;
import com.example.backend.repository.BossKochRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

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
    public BossKochModelReceipt getById(String id) {
        return repo.getById(id);
    }

    public String deleteMovieById(String id) {
        try {
            repo.delete(repo.findById(id).orElseThrow());
            return "Movie with ID " + id + " successfully deleted";
        } catch (NoSuchElementException e){
            return "Movie with ID " + id + " not found.";
        }
    }

}