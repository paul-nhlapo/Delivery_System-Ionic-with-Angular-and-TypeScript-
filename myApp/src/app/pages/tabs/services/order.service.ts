import { Injectable } from '@angular/core';
import { CartItem, CartService } from '../services/cart.service';


export interface Order {
  id: number;
  items: CartItem[];
  orderDate: Date;
  deliveryAddress: string;
  deliveryInstructions: string;
  totalCost: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {
  
  orderHistory: Order[] = [];
  
  constructor() { }

  getAllOrders(): Order[] {
    return this.orderHistory;
  }
  // In CartService
  addOrder(order: Order): void {
    let pastOrdersString = localStorage.getItem('pastOrders');
    let pastOrders = pastOrdersString ? JSON.parse(pastOrdersString) : [];
    pastOrders.push(order);
    localStorage.setItem('pastOrders', JSON.stringify(pastOrders));
  }
  
  placeOrder(order: any) {
    // Code to place order...
  
    // After order is successfully placed, save it to pastOrders in local storage
    let pastOrdersString = localStorage.getItem('pastOrders');
    let pastOrders = pastOrdersString ? JSON.parse(pastOrdersString) : [];
    pastOrders.push(order);
    localStorage.setItem('pastOrders', JSON.stringify(pastOrders));
  }

clearOrderHistory(): void {
  localStorage.setItem('pastOrders', JSON.stringify([]));
}

}