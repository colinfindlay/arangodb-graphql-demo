package com.colinfindlay.avobank.rest.repository;

import com.arangodb.ArangoCollection;
import com.arangodb.ArangoDB;
import com.arangodb.ArangoDatabase;
import com.colinfindlay.avobank.rest.model.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AccountRepository {

    private final ArangoDB arangoDB;

    @Autowired
    public AccountRepository(ArangoDB arangoDB) {
        this.arangoDB = arangoDB;
    }

    public Account get(String accountId){
        ArangoDatabase database = arangoDB.db("avobank");
        ArangoCollection collection = database.collection("Account");
        return collection.getDocument(accountId, Account.class);
    }

}
