package com.example.backend.model;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@RequiredArgsConstructor

public class BossKochModelReceipt {
    private final String id;
    private final String recipeName;
    private final String additional;
    private final int timeInMinutes;
    private final String nationality;
    private final String difficulty;
    private final List<String> ingredients;
    private final String making;
    private final boolean vegetarian;
    private final boolean vegan;
    private final String user;
    private final String imageSrc;
}
