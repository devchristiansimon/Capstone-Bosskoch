package com.example.backend.service;


import com.example.backend.model.BossKochModelReceipt;
import com.example.backend.repository.BossKochRepository;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class BossKochServiceTest {

    BossKochRepository mockrepo = mock(BossKochRepository.class);
    BossKochService service = new BossKochService(mockrepo);

    @Test
    void getAllReceipts_shouldReturn_ListWithElementReceipts_whenCalled(){
        //GIVEN
        List<String> zutaten= List.of("käse","fisch","eier");
        BossKochModelReceipt newBossKochModelReceipt = new BossKochModelReceipt("1", "Lasagne", "mit Sahne", 120, "indisch", "schwer", zutaten, "alles zusammen irgendwie", true, false, "Robert", "test");
        List<BossKochModelReceipt> expected = List.of(newBossKochModelReceipt);

        when(mockrepo.findAll()).thenReturn(expected);

        //THEN
        List<BossKochModelReceipt> actual = service.getAllBossKochData();

        //WHEN
        verify(mockrepo).findAll();
        assertEquals(actual, expected);
    }
    @Test
    void getAllReceipts_shouldSave(){
        List<String> zutaten= List.of("käse","fisch","eier");
        //GIVEN
        BossKochModelReceipt newReceipt = new BossKochModelReceipt("1", "Lasagne", "mit Sahne", 120, "indisch", "schwer", zutaten, "alles zusammen irgendwie", true, false, "Robert", "test");

        when(mockrepo.save(newReceipt)).thenReturn(newReceipt);

        //WHEN
        BossKochModelReceipt actual = service.addNewReceipt(newReceipt);

        //THEN
        verify(mockrepo).save(newReceipt);
        assertEquals(actual, newReceipt);
    }
}