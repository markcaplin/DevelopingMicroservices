
import { Routes } from '@angular/router';
import { AboutComponent } from './home-directory/about/about.component';
import { ContactComponent } from './home-directory/contact/contact.component';
import { HomeComponent } from './home-directory/home/home.component';

export const ApplicationRoutes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'home/home', component: HomeComponent },
    { path: 'home/contact', component: ContactComponent },
    { path: 'home/about', component: AboutComponent },
    {
        path: 'accountmanagement', loadChildren:
            '../app/account-management/account-management.module#AccountManagementModule'
    },
    {
        path: 'inventorymanagement', loadChildren:
            '../app/inventory-management/inventory-management.module#InventoryManagementModule'
    },
    {
        path: 'purchaseordermanagement', loadChildren:
            '../app/purchase-order-management/purchase-order-management.module#PurchaseOrderManagementModule'
    },
    {
        path: 'salesordermanagement', loadChildren:
            '../app/sales-order-management/sales-order-management.module#SalesOrderManagementModule'
    }
];

