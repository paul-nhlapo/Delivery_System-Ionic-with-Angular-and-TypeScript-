import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  editMode = false;
  customer = { name: null, email: null, address: null };
  pastOrders: any[] = [];
  showOrderHistory = false;
  showHistory: any;

  constructor(
    private router: Router,
    public alertController: AlertController,
  ) {}

  ngOnInit() {
    // Load customer details from local storage
    const customerJson = localStorage.getItem('customer');
    if (customerJson) {
      this.customer = JSON.parse(customerJson);
    }

    const pastOrdersJson = localStorage.getItem('pastOrders');
    if (pastOrdersJson) {
      this.pastOrders = JSON.parse(pastOrdersJson);
    }
  }

  async openHelpModal() {
    const alert = await this.alertController.create({
      header: 'Need Help?',
      message: 'For help with your account, please contact us at Wedeliver@food.co.za',
      buttons: ['OK']
    });
    await alert.present();
  }

  async saveDetails() {
    // Check if form fields are empty
    if (!this.customer.name || !this.customer.email || !this.customer.address) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Please fill in all fields',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // Save customer details to local storage
    localStorage.setItem('customer', JSON.stringify(this.customer));

    // Update delivery address in past orders
    this.pastOrders.forEach(order => {
      if (order.deliveryOption === 'personal') {
        order.address = this.customer.address;
      }
    });
    localStorage.setItem('pastOrders', JSON.stringify(this.pastOrders));

    // Display success message
    const alert = await this.alertController.create({
      header: 'Success',
      message: 'Details saved',
      buttons: ['OK']
    });
    await alert.present();

    // Disable edit mode
    this.editMode = false;
  }

  async editDetails() {
    // Enable edit mode
    this.editMode = true;
  }

  reorder(order: any) {
    // Save order to local storage
    localStorage.setItem('cart', JSON.stringify(order.items));

    // Navigate to cart page
    this.router.navigate(['/tabs/cart']);
  }

  toggleHistory() {
    // Toggle display of past orders
    this.showOrderHistory = !this.showOrderHistory;
  }

  async clearHistory() {
    const alert = await this.alertController.create({
      header: 'Confirm Clear History',
      message: 'Are you sure you want to clear your order history?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Clear',
          handler: () => {
            localStorage.removeItem('pastOrders');
            this.pastOrders = [];
          }
        }
      ]
    });
    await alert.present();
  }
}
