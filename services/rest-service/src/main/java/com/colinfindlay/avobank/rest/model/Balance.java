package com.colinfindlay.avobank.rest.model;

import java.math.BigDecimal;

public class Balance {

    private BigDecimal value;

    public BigDecimal getValue() {
        return value;
    }

    public void setValue(BigDecimal value) {
        this.value = value;
    }
}
