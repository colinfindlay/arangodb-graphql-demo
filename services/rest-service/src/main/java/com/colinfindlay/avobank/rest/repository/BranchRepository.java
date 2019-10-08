package com.colinfindlay.avobank.rest.repository;

import com.arangodb.ArangoCollection;
import com.arangodb.ArangoDB;
import com.arangodb.ArangoDatabase;
import com.colinfindlay.avobank.rest.model.Branch;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BranchRepository {

    private final ArangoDB arangoDB;

    @Autowired
    public BranchRepository(ArangoDB arangoDB) {
        this.arangoDB = arangoDB;
    }

    public Branch get(String branchId){
        ArangoDatabase database = arangoDB.db("avobank");
        ArangoCollection collection = database.collection("Branch");
        return collection.getDocument(branchId, Branch.class);
    }

}

