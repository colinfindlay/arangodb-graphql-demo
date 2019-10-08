package com.colinfindlay.avobank.rest.repository;

import com.arangodb.ArangoCollection;
import com.arangodb.ArangoDB;
import com.arangodb.ArangoDatabase;
import com.colinfindlay.avobank.rest.model.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ClientRepository {

    private final ArangoDB arangoDB;

    @Autowired
    public ClientRepository(ArangoDB arangoDB) {
        this.arangoDB = arangoDB;
    }

    public Client get(String clientId){
        ArangoDatabase database = arangoDB.db("avobank");
        ArangoCollection collection = database.collection("Client");
        return collection.getDocument(clientId, Client.class);
    }

}
