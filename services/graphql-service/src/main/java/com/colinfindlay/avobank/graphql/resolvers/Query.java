package com.colinfindlay.avobank.graphql.resolvers;

import com.colinfindlay.avobank.graphql.model.Account;
import com.colinfindlay.avobank.graphql.model.Client;
import com.colinfindlay.avobank.graphql.repository.ClientRepository;
import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Query implements GraphQLQueryResolver {

    private final ClientRepository clientRepository;

    @Autowired
    public Query(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }


    public Client getClient(String id){
        Client client = this.clientRepository.get(id);
        return client;
    }

    public Account getAccount(Client client){
        Account account = new Account();
        return account;
    }

}
