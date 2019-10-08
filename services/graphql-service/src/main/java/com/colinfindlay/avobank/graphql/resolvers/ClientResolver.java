package com.colinfindlay.avobank.graphql.resolvers;

import com.colinfindlay.avobank.graphql.model.Account;
import com.colinfindlay.avobank.graphql.model.Client;
import com.colinfindlay.avobank.graphql.repository.AccountRepository;
import com.coxautodev.graphql.tools.GraphQLResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ClientResolver implements GraphQLResolver<Client> {

    private final AccountRepository accountRepository;

    @Autowired
    public ClientResolver(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }


    public List<Account> getAccounts(Client client){
        return client.getAccounts()
                .stream()
                .map(x -> accountRepository.get(x))
                .collect(Collectors.toList());
    }

}
