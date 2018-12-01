import { SalesOrderMaintenanceComponent } from './sales-order-maintenance/sales-order-maintenance.component';
import { SalesOrderInquiryComponent } from './sales-order-inquiry/sales-order-inquiry.component';
import { CustomerMaintenanceComponent } from './customer-maintenance/customer-maintenance.component';
import { CustomerInquiryComponent } from './customer-inquiry/customer-inquiry.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const SalesOrderManagementRoutes: Routes = [
    { path: '', component: SalesOrderInquiryComponent },
    { path: 'customer-maintenance', component: CustomerMaintenanceComponent},
    { path: 'customer-maintenance/:id', component: CustomerMaintenanceComponent},
    { path: 'customer-inquiry', component: CustomerInquiryComponent },
    { path: 'sales-order-maintenance', component: SalesOrderMaintenanceComponent},
    { path: 'sales-order-maintenance/:id', component: SalesOrderMaintenanceComponent},
    { path: 'sales-order-inquiry', component: SalesOrderInquiryComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(SalesOrderManagementRoutes)
    ],
    exports: [RouterModule]
})
export class SalesOrderManagementRoutingModule { }

