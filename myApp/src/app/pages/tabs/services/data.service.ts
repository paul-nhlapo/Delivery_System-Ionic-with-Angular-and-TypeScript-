import { Injectable } from '@angular/core';
import { Restaurant } from './restaurant.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private restaurant: Array<any>=[];
  constructor() {
    let restaurant = localStorage.getItem('restaurant');
    if(restaurant){
      this.restaurant = JSON.parse(restaurant);
    }else{
      localStorage.setItem('restaurant', JSON.stringify(this.restaurant));
    }
   }

   getRestaurants(){
     return this.restaurant;
   }

   getRestaurantById(id:number){
    return this.restaurant.find(x => x.id === id);
   }
}
