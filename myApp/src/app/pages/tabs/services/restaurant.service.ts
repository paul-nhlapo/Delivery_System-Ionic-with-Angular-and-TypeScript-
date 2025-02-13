// import { Restaurant } from './restaurant.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Restaurant {
  id: number;
  name: string;
  dishName: string;
  image: string;
  type: string;
  ratings: number;
  distance: string;
  price: number;
  description: string;
  timeAway: string;
}

export interface Menu{
  id: number;
  name: string;
  // image: string;
  price: number;
  // description: string;

}

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private  cartItems: {numItems: number, restaurant: Restaurant}[] = [];
  private  restaurants: Restaurant[] = [
    {
      id: 1,
      name: 'Jollof of Africa',
      dishName: 'Jollof Rice',
      image: 'assets/jollof1.jpeg',
      type: 'Nigerian Cuisine',
      ratings: 4.5,
      distance: "2.5 kms away",
      price: 150,
      description: 'Taste of Africa',
      timeAway: "30 min away"
    },
    {
      id: 2,
      name: 'Kasi 1 Stop',
      dishName: 'Kota',
      image: 'assets/Kota.jpg',
      type: 'South African Go to meal',
      ratings: 10,
      distance: "0.5 kms away",
      price: 60,
      description: 'The best Kota in town',
      timeAway: "10 min away"
    },
    {
      id: 3,
      name: 'Kung Fu Kitchen',
      dishName: 'Sushi platter',
      image: 'assets/Sushi.jpg',
      type: 'Chiness Cuisine',
      ratings: 8,
      distance: "3.5 kms way",
      price: 80,
      description: 'The only Sushi that matters',
      timeAway: "45 min away"
    },
    {
      id: 4,
      name: 'The Indian Joint',
      dishName: 'Chicken Briyani',
      image: 'assets/Briyani.jpeg',
      type: 'Indian Cuisine',
      ratings: 9.5,
      distance: "0 km away",
      price: 35,
      description: "The only fast food place that's fast",
      timeAway: "5 min away"
    },
    {
      id: 5,
      name: 'Kasi Joint',
      dishName: 'Brai Mix',
      image: 'assets/Shisayanma.jpg',
      type: 'Kasi flavour',
      ratings: 10,
      distance: "0 kms away",
      price: 60,
      description: 'Everyday meal for real man',
      timeAway: "6 min away"
    }
  ];

  constructor() { }

  getRestaurants(): Observable<Restaurant[]> {
    return of(this.restaurants);
  }

  getRestaurant(id: number): Restaurant[]{
    return this.restaurants.filter(restaurant => restaurant.id === id);
  }

  getCartItems(): {numItems: number, restaurant: Restaurant}[]{
    return this.cartItems;
  }
  clearCart(){
    this.cartItems = [];
  }

  addToCart(restaurant: Restaurant){
    const index = this.cartItems.findIndex(item => item.restaurant.id === restaurant.id);
    if(index){
      this.cartItems[index].numItems++;
    }else
    this.cartItems.push({numItems: 1, restaurant});
  }

  search(searchMeal: string): Restaurant[]{
    if(!searchMeal){
      return this.restaurants;
    }
    return this.restaurants.filter(restaurant => restaurant.dishName === searchMeal);
  }

}
