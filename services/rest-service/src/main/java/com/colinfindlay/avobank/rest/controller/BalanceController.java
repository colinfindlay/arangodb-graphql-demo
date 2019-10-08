package com.colinfindlay.avobank.rest.controller;

import com.colinfindlay.avobank.rest.model.Balance;
import com.colinfindlay.avobank.rest.repository.BalanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BalanceController {

    private final BalanceRepository balanceRepository;

    @Autowired
    public BalanceController(BalanceRepository balanceRepository) {
        this.balanceRepository = balanceRepository;
    }


    @GetMapping("/balance/{accountId}")
    public Balance get(@PathVariable("accountId") String accountId){
        return balanceRepository.get(accountId);
    }

}