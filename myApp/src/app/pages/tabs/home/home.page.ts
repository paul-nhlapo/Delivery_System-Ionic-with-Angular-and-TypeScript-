// Importing necessary components and services from Angular and Ionic
import { Component, OnInit } from '@angular/core';
import { IonicSlides } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Restaurant, RestaurantService } from '../services/restaurant.service';
import { CartItem, CartService } from '../services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  swiperModules = [IonicSlides];
  restaurants$: Observable<Restaurant[]> = new Observable<Restaurant[]>();
  counter: number = 0;

  constructor(
    private restaurantService: RestaurantService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.restaurants$ = this.restaurantService.getRestaurants();
    this.updateCartCounter();
  }

  addToCart(restaurant: Restaurant) {
    const currentItems = this.cartService.getAllItems();
    const existingItem = currentItems.find(item => item.menu.id === restaurant.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      const newCartItem: CartItem = {
        menu: restaurant,
        quantity: 1,
        orderAddress: "Mashwabana Corner",
        orderDate: new Date(),
        hasDelivery: true,
        deliveryPrice: 0.00
      };
      this.cartService.addItemToCart(newCartItem);
    }

    localStorage.setItem('cart', JSON.stringify(currentItems));
    this.updateCartCounter();
  }

  updateCartCounter() {
    const cartItems = localStorage.getItem('cart');
    if (cartItems !== null) {
      const currentItems = this.cartService.getAllItems();
      this.counter = currentItems.length;
      const totalCost = this.cartService.calculateDeliveryCost();
    }
  }
}
