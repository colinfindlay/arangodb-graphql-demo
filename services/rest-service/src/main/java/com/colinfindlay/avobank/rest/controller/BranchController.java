package com.colinfindlay.avobank.rest.controller;

import com.colinfindlay.avobank.rest.model.Branch;
import com.colinfindlay.avobank.rest.repository.BranchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BranchController {

    private final BranchRepository branchRepository;

    @Autowired
    public BranchController(BranchRepository branchRepository) {
        this.branchRepository = branchRepository;
    }


    @GetMapping("/branch/{branchId}")
    public Branch get(@PathVariable("branchId") String branchId){
        return branchRepository.get(branchId);
    }

}

