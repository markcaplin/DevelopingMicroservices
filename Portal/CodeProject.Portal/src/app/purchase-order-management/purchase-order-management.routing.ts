import { PurchaseOrderMaintenanceComponent } from './purchase-order-maintenance/purchase-order-maintenance.component';
import { PurchaseOrderInquiryComponent } from './purchase-order-inquiry/purchase-order-inquiry.component';
import { SupplierMaintenanceComponent } from './supplier-maintenance/supplier-maintenance.component';
import { SupplierInquiryComponent } from './supplier-inquiry/supplier-inquiry.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const PurchaseOrderManagementRoutes: Routes = [
    { path: '', component: PurchaseOrderInquiryComponent },
    { path: 'supplier-maintenance', component: SupplierMaintenanceComponent},
    { path: 'supplier-maintenance/:id', component: SupplierMaintenanceComponent},
    { path: 'supplier-inquiry', component: SupplierInquiryComponent },
    { path: 'purchase-order-maintenance', component: PurchaseOrderMaintenanceComponent},
    { path: 'purchase-order-maintenance/:id', component: PurchaseOrderMaintenanceComponent},
    { path: 'purchase-order-inquiry', component: PurchaseOrderInquiryComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(PurchaseOrderManagementRoutes)
    ],
    exports: [RouterModule]
})
export class PurchaseOrderManagementRoutingModule { }

