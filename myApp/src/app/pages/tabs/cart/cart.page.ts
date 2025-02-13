import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CartService, CartItem } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  delivery = false;
  deliveryOption = 'office';
  deliveryInstructions = '';
  deliveryInstructionsHidden = true;
  officeAddress = '';
  personalAddress = '';

  constructor(
    private cartService: CartService,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    const officeAddressJson = localStorage.getItem('officeAddress');
    if (officeAddressJson) {
      this.officeAddress = JSON.parse(officeAddressJson);
    }

    const personalAddressJson = localStorage.getItem('personalAddress');
    if (personalAddressJson) {
      this.personalAddress = JSON.parse(personalAddressJson);
    }
  }

  toggleDeliveryInstructions() {
    this.deliveryInstructionsHidden = !this.deliveryInstructionsHidden;
  }

  public getCartService(): CartService {
    return this.cartService;
  }

  async makePayment() {
    let totalCost = this.cartService.calculateTotalCost();
    if (this.delivery) {
      totalCost += 35; // Adding delivery fee
    }

    const cartItems = this.cartService.getAllItems();
    const pastOrders = JSON.parse(localStorage.getItem('pastOrders') || '[]');
    pastOrders.push({
      items: cartItems,
      totalCost,
      deliveryInstructions: this.deliveryInstructions,
      delivery: this.delivery,
      deliveryOption: this.deliveryOption,
      address: this.deliveryOption === 'office' ? this.officeAddress : this.personalAddress
    });
    localStorage.setItem('pastOrders', JSON.stringify(pastOrders));

    localStorage.setItem('deliveryInstructions', this.deliveryInstructions);

    if (this.deliveryOption === 'office') {
      localStorage.setItem('officeAddress', JSON.stringify(this.officeAddress));
    } else if (this.deliveryOption === 'personal') {
      localStorage.setItem('personalAddress', JSON.stringify(this.personalAddress));
    }

    const alert = await this.alertController.create({
      header: 'Payment successful!',
      message: 'Total cost: R' + totalCost.toFixed(2),
      buttons: ['OK'],
    });

    await alert.present();

    this.cartService.clearCart();

    this.router.navigate(['/tabs/account']);
  }

  getCartItems() {
    return this.cartService.getAllItems();
  }

  removeItem(item: CartItem) {
    this.cartService.removeItem(item);
  }
}
