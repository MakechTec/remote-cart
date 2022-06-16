import axios from "axios";
import {Cart} from "@makechtec/cart-guidelines";
import {CartItem} from "@makechtec/cart-guidelines";

export class RemoteCart implements Cart{

    list(onSuccess: Function, makeUrl: Function = defaultUrls.list): void {
        this.simpleCall(onSuccess, makeUrl());
    }
    clean(onSuccess: Function, makeUrl: Function = defaultUrls.clean): void {
        this.removeCall(onSuccess, makeUrl());
    }
    add(item: CartItem, onSuccess: Function, makeUrl = defaultUrls.add): void {
        axios.post(makeUrl(item), {
            attributes: JSON.stringify(item.attributes),
        }).then(response => {
            onSuccess(response.data);
        }).catch(error => {
            this.handleError(error);
        });
    }
    remove(item: CartItem, onSuccess: Function, makeUrl: Function = defaultUrls.remove): void {
        this.removeCall(onSuccess, makeUrl(item));
    }
    find(id: number, onSuccess: Function, makeUrl: Function = defaultUrls.find): void {
        this.simpleCall(onSuccess, makeUrl(id));
    }
    total(attributeName: string, onSuccess: Function, makeUrl: Function = defaultUrls.total): void {
        this.simpleCall(onSuccess, makeUrl(attributeName));
    }
    numberOfItems(onSuccess: Function, makeUrl: Function = defaultUrls.numberOfItems): void {
        this.simpleCall(onSuccess, makeUrl());
    }

    handleError(error: any){
        console.log(error);
    }

    simpleCall(onSuccess: Function, url: string){
        axios.get(url).then(response => {
            onSuccess(response.data);
        }).catch(error => {
            this.handleError(error);
        });
    }

    removeCall(onSuccess: Function, url: string){
        axios.delete(url).then(response => {
            onSuccess(response.data);
        }).catch(error => {
            this.handleError(error);
        });
    }
    
}

export const defaultUrls = {
    list: () => "/cart/list",
    clean: () => "/cart/clean",
    add: (item: CartItem) => `/cart/add/${item.id}`,
    remove: (item: CartItem) => `/cart/remove/${item.id}`,
    find: (id: number) => `/cart/find/${id}`,
    total: (attributeName: string) => `/cart/total/${attributeName}`,
    numberOfItems: () => "/cart/numberOfItems",
}
