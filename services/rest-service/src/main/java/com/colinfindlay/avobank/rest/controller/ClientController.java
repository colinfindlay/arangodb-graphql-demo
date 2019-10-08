package com.colinfindlay.avobank.rest.controller;

import com.colinfindlay.avobank.rest.model.Client;
import com.colinfindlay.avobank.rest.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ClientController {

    private final ClientRepository clientRepository;

    @Autowired
    public ClientController(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    @GetMapping("/client/{clientId}")
    public Client get(@PathVariable("clientId") String clientId){
        return clientRepository.get(clientId);
    }

}
