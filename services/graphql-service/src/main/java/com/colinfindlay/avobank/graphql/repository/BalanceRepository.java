package com.colinfindlay.avobank.graphql.repository;

import com.arangodb.ArangoCollection;
import com.arangodb.ArangoDB;
import com.arangodb.ArangoDatabase;
import com.colinfindlay.avobank.graphql.model.Balance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BalanceRepository {

    private final ArangoDB arangoDB;

    @Autowired
    public BalanceRepository(ArangoDB arangoDB) {
        this.arangoDB = arangoDB;
    }

    public Balance get(String accountId){
        ArangoDatabase database = arangoDB.db("avobank");
        ArangoCollection collection = database.collection("Balance");
        return collection.getDocument(accountId, Balance.class);
    }

}