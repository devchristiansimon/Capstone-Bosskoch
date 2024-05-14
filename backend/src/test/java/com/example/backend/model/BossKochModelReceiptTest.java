package com.example.backend.model;

import com.example.backend.repository.BossKochRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureMockMvc
class BossKochModelReceiptTest {
    @Autowired
    private MockMvc mvc;

    @Autowired
    private BossKochRepository repository;

    @DirtiesContext
    @Test
    void expectListOfReceipt_whenCallingHttpGet() throws Exception {
        List<String> zutaten= List.of("käse","fisch","eier");
        repository.save(new BossKochModelReceipt("3", "Pizza", "mit Salami", 120, "indisch", "leicht", zutaten, "irgendwas", false, false, "Ronny", "pic.png"));

        mvc.perform((MockMvcRequestBuilders.get("/api/boss")))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(
                        """

                        [
                             {
                              "id": "3",
                                      "recipeName": "Pizza",
                                      "additional": "mit Salami",
                                      "timeInMinutes": 120,
                                      "nationality": "indisch",
                                      "difficulty": "leicht",
                                      "ingredients": ["käse","fisch","eier"],
                                      "making": "irgendwas",
                                      "vegetarian": false,
                                      "vegan": false,
                                      "user": "Ronny",
                                      "imageSrc": "pic.png"
                             }       
                         ]

                        """
                ));
    }

    @DirtiesContext
    @Test
    void postReceipt_shouldReturnNewReceipt() throws Exception {
        mvc.perform(MockMvcRequestBuilders.post("/api/boss")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(
                                """
                                     {
                                      "id": "3",
                                      "recipeName": "Pizza",
                                      "additional": "mit Salami",
                                      "timeInMinutes": 120,
                                      "nationality": "indisch",
                                      "difficulty": "leicht",
                                      "ingredients": ["käse","fisch","eier"],
                                      "making": "irgendwas",
                                      "vegetarian": false,
                                      "vegan": false,
                                      "user": "Ronny",
                                      "imageSrc": "pic.png"
                                     }       
                                """
                        ))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(
                        """
                             {
                              "id": "3",
                                      "recipeName": "Pizza",
                                      "additional": "mit Salami",
                                      "timeInMinutes": 120,
                                      "nationality": "indisch",
                                      "difficulty": "leicht",
                                      "ingredients": ["käse","fisch","eier"],
                                      "making": "irgendwas",
                                      "vegetarian": false,
                                      "vegan": false,
                                      "user": "Ronny",
                                      "imageSrc": "pic.png"
                             }       
                        """
                ))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").isNotEmpty());
    }

}