package com.colinfindlay.avobank.graphql.resolvers;

import com.colinfindlay.avobank.graphql.model.Account;
import com.colinfindlay.avobank.graphql.model.Balance;
import com.colinfindlay.avobank.graphql.model.Branch;
import com.colinfindlay.avobank.graphql.model.Product;
import com.colinfindlay.avobank.graphql.repository.BalanceRepository;
import com.colinfindlay.avobank.graphql.repository.BranchRepository;
import com.colinfindlay.avobank.graphql.repository.ProductRepository;
import com.coxautodev.graphql.tools.GraphQLResolver;
import org.springframework.stereotype.Component;

@Component
public class AccountResolver implements GraphQLResolver<Account> {

    private final BranchRepository branchRepository;

    private final BalanceRepository balanceRepository;

    private final ProductRepository productRepository;

    public AccountResolver(BranchRepository branchRepository, BalanceRepository balanceRepository, ProductRepository productRepository) {
        this.branchRepository = branchRepository;
        this.balanceRepository = balanceRepository;
        this.productRepository = productRepository;
    }

    public Branch getBranch(Account account){
       return branchRepository.get(account.getSortCode());
    }

    public Balance getBalance(Account account){
        return balanceRepository.get(account.getAccountNumber());
    }

    public Product getProduct(Account account){
        return productRepository.get(account.getProductCode());
    }

}
