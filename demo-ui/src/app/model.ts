export interface Client {
    firstName: string;
    lastName: string;
    accounts: Array<string>;
}

export interface Account {

    accountNumber: string;
    sortCode: string;
    productCode: string;

}

export interface Branch {
    name: string;
    sortCode: string;
}

export interface Product {
    name: string;
    productCode: string;
}

export interface Balance {
    value: number;
}


