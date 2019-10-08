package com.colinfindlay.avobank.rest.repository;

import com.arangodb.ArangoCollection;
import com.arangodb.ArangoDB;
import com.arangodb.ArangoDatabase;
import com.colinfindlay.avobank.rest.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ProductRepository {

    private final ArangoDB arangoDB;

    @Autowired
    public ProductRepository(ArangoDB arangoDB) {
        this.arangoDB = arangoDB;
    }

    public Product get(String productId){
        ArangoDatabase database = arangoDB.db("avobank");
        ArangoCollection collection = database.collection("Product");
        return collection.getDocument(productId, Product.class);
    }

}