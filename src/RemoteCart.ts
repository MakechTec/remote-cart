import axios from "axios";
import {Cart} from "@makechtec/cart-guidelines";
import {CartItem} from "@makechtec/cart-guidelines";

export class RemoteCart implements Cart{

    url: string = "";

    go(url:string = ""){
        this.url = url;
        return this;
    }

    list(onSuccess: Function): void {
        this.simpleCall(onSuccess);
    }
    clean(onSuccess: Function): void {
        this.removeCall(onSuccess);
    }
    add(item: CartItem, onSuccess: Function): void {
        axios.post(this.url, {
            attributes: JSON.stringify(item.attributes),
        }).then(response => {
            onSuccess(response.data);
        }).catch(error => {
            this.handleError(error);
        });
    }
    remove(item: CartItem, onSuccess: Function): void {
        this.removeCall(onSuccess);
    }
    find(id: number, onSuccess: Function): void {
        this.simpleCall(onSuccess);
    }
    total(attributeName: string, onSuccess: Function): void {
        this.simpleCall(onSuccess);
    }
    numberOfItems(onSuccess: Function): void {
        this.simpleCall(onSuccess);
    }

    handleError(error: any){
        console.log(error);
    }

    simpleCall(onSuccess: Function){
        axios.get(this.url).then(response => {
            onSuccess(response.data);
        }).catch(error => {
            this.handleError(error);
        });
    }

    removeCall(onSuccess: Function){
        axios.delete(this.url).then(response => {
            onSuccess(response.data);
        }).catch(error => {
            this.handleError(error);
        });
    }
    
}
