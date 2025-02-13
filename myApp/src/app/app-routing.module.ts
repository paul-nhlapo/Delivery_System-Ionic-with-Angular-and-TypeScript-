import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AccountPage } from './pages/tabs/account/account.page'; // Import the AccountPage component
import { CartPage } from './pages/tabs/cart/cart.page'; // Import the CartPage component

const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
  {
    path: 'account', 
    component: AccountPage 
  },
  {
    path: 'cart', 
    component: CartPage 
  },
  {
    path:'home',
    loadChildren: () => import('./pages/tabs/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
