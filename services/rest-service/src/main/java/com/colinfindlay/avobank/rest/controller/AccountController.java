package com.colinfindlay.avobank.rest.controller;

import com.colinfindlay.avobank.rest.model.Account;
import com.colinfindlay.avobank.rest.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AccountController {

    private final AccountRepository accountRepository;

    @Autowired
    public AccountController(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @GetMapping("/account/{accountId}")
    public Account get(@PathVariable("accountId") String accountId){
        return accountRepository.get(accountId);
    }

}
