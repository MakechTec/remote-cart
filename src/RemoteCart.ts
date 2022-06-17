import axios from "axios";
import {Cart} from "@makechtec/cart-guidelines";
import {CartItem} from "@makechtec/cart-guidelines";

export class RemoteCart implements Cart{

    host: string;
    defaultUrls = {
        list: () => this.host+"/cart/list",
        clean: () => this.host+"/cart/clean",
        add: (item: CartItem) => this.host+`/cart/add/${item.id}`,
        remove: (item: CartItem) => this.host+`/cart/remove/${item.id}`,
        find: (id: number) => this.host+`/cart/find/${id}`,
        total: (attributeName: string) => this.host+`/cart/total/${attributeName}`,
        numberOfItems: () => this.host+"/cart/numberOfItems",
    };

    constructor(host: string = "http://localhost:8000", defaultUrls: any = {}){
        this.host = host;
        this.defaultUrls = {...this.defaultUrls, ...defaultUrls};
    }

    list(onSuccess: Function, makeUrl: Function = this.defaultUrls.list): void {
        this.simpleCall(onSuccess, makeUrl());
    }
    clean(onSuccess: Function, makeUrl: Function = this.defaultUrls.clean): void {
        this.removeCall(onSuccess, makeUrl());
    }
    add(item: CartItem, onSuccess: Function, makeUrl = this.defaultUrls.add): void {
        axios.post(makeUrl(item), {
            attributes: JSON.stringify(item.attributes),
        }).then(response => {
            onSuccess(response.data);
        }).catch(error => {
            this.handleError(error);
        });
    }
    remove(item: CartItem, onSuccess: Function, makeUrl: Function = this.defaultUrls.remove): void {
        this.removeCall(onSuccess, makeUrl(item));
    }
    find(id: number, onSuccess: Function, makeUrl: Function = this.defaultUrls.find): void {
        this.simpleCall(onSuccess, makeUrl(id));
    }
    total(attributeName: string, onSuccess: Function, makeUrl: Function = this.defaultUrls.total): void {
        this.simpleCall(onSuccess, makeUrl(attributeName));
    }
    numberOfItems(onSuccess: Function, makeUrl: Function = this.defaultUrls.numberOfItems): void {
        this.simpleCall(onSuccess, makeUrl());
    }

    handleError(error: any){
        console.log(error);
    }

    simpleCall(onSuccess: Function, url: string){
        axios.get(url).then(response => {
            let data = response.data;
            onSuccess(data);
        }).catch(error => {
            this.handleError(error);
        });
    }

    removeCall(onSuccess: Function, url: string){
        axios.delete(url).then(response => {
            let data = response.data;
            onSuccess(data);
        }).catch(error => {
            this.handleError(error);
        });
    }
    
}

