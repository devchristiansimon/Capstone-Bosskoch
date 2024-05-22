package com.example.backend.controller;

import com.example.backend.model.BossKochModelReceipt;
import com.example.backend.service.BossKochService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/boss")
@RequiredArgsConstructor

public class AppController {
    private final BossKochService bossKochService;

    @GetMapping
    public List<BossKochModelReceipt> getAllBossKochData(){
        return bossKochService.getAllBossKochData();
    }

    @PostMapping
    public BossKochModelReceipt addNewReceipt(@RequestBody BossKochModelReceipt newReceipt){
        return bossKochService.addNewReceipt(newReceipt);
    }

    @GetMapping("{id}")
    BossKochModelReceipt getTodoById(@PathVariable String id) {
        return bossKochService.getById(id);
    }
}
