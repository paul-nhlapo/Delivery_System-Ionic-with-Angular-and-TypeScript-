import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurant, RestaurantService } from '../services/restaurant.service';
import { CartItem, CartService } from '../services/cart.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  restaurants$: Observable<Restaurant[]> = new Observable<Restaurant[]>();
  filteredRestaurants$: Observable<Restaurant[]>= new Observable<Restaurant[]>();
  cartCount: number = 0;

  constructor(private restaurantService: RestaurantService,private cartService: CartService) {
    this.restaurants$ = this.restaurantService.getRestaurants();
    this.filteredRestaurants$ = this.restaurants$;
  }

  searchRestaurants(event: any) {
    const searchTerm = event.target.value.trim().toLowerCase();

    if (searchTerm && searchTerm.trim() !== '') {
      this.filteredRestaurants$ = this.restaurants$.pipe(
        // Use the filter operator to filter the restaurants based on the search term
        map((restaurants: Restaurant[]) =>
          restaurants.filter((restaurant) =>
            restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            restaurant.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            restaurant.name.toUpperCase().includes(searchTerm.toUpperCase()) ||
            restaurant.type.toUpperCase().includes(searchTerm.toUpperCase())
          )
        )
        );
      } else {
        this.filteredRestaurants$ = this.restaurants$;
      }
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
          deliveryPrice: (this.cartService.calculateDeliveryCost() )

        };
        this.cartService.addItemToCart(newCartItem);
      }

      localStorage.setItem('cart', JSON.stringify(currentItems));

      this.cartCount = currentItems.length;
    }

    ngOnInit() {
      this.restaurants$ = this.restaurantService.getRestaurants();

      const cartItems = localStorage.getItem('cart');
      if (cartItems !== null) {
        this.cartService.updateCartItems(JSON.parse(cartItems));
        const currentItems = this.cartService.getAllItems();
        this.cartCount = currentItems.length;
        const totalCost = this.cartService.calculateDeliveryCost();

      }
    }



}
