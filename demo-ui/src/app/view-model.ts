
export namespace ViewModel {

    export interface Client {
        firstName: string;
        lastName: string;
        accounts: Array<Account>;
    }

    export interface Account {
        accountNumber: string;
        productCode: string;
        product: Product;
        branch: Branch;
        balance: Balance;

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

}
