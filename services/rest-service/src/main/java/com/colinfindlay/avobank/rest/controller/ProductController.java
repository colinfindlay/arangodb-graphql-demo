package com.colinfindlay.avobank.rest.controller;

import com.colinfindlay.avobank.rest.model.Product;
import com.colinfindlay.avobank.rest.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {

    private final ProductRepository productRepository;

    @Autowired
    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping("/product/{productId}")
    public Product get(@PathVariable("productId") String productId){
        return productRepository.get(productId);
    }

}