import { UploadProductMasterComponent } from './upload-product-master/upload-product-master.component';
import { PurchaseOrderReceivingComponent } from './purchase-order-receiving/purchase-order-receiving.component';
import { ProductMaintenanceComponent } from './product-maintenance/product-maintenance.component';
import { ProductInquiryComponent } from './product-inquiry/product-inquiry.component';
import { PurchaseOrderInquiryComponent } from './purchase-order-inquiry/purchase-order-inquiry.component';
import { SalesOrderInquiryComponent } from './sales-order-inquiry/sales-order-inquiry.component';
import { SalesOrderShipmentsComponent } from './sales-order-shipments/sales-order-shipments.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const InventoryManagementRoutes: Routes = [
    { path: '', component: ProductMaintenanceComponent },
    { path: 'product-maintenance', component: ProductMaintenanceComponent},
    { path: 'product-inquiry', component: ProductInquiryComponent },
    { path: 'upload-product-master', component: UploadProductMasterComponent },
    { path: 'purchase-order-receiving', component: PurchaseOrderReceivingComponent },
    { path: 'purchase-order-inquiry', component: PurchaseOrderInquiryComponent },
    { path: 'sales-order-inquiry', component: SalesOrderInquiryComponent },
    { path: 'sales-order-shipping', component: SalesOrderShipmentsComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(InventoryManagementRoutes)
    ],
    exports: [RouterModule]
})
export class InventoryManagementRoutingModule { }
