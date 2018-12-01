import { UploadProductMasterComponent } from './upload-product-master/upload-product-master.component';

import { PurchaseOrderInquiryComponent } from './purchase-order-inquiry/purchase-order-inquiry.component';
import { SalesOrderInquiryComponent } from './sales-order-inquiry/sales-order-inquiry.component';

import { InventoryManagementNavBarComponent } from './inventory-management-nav-bar/inventory-management-nav-bar.component';
import { PurchaseOrderReceivingComponent } from './purchase-order-receiving/purchase-order-receiving.component';
import { SalesOrderShipmentsComponent } from './sales-order-shipments/sales-order-shipments.component';

import { ProductMaintenanceComponent } from './product-maintenance/product-maintenance.component';
import { ProductInquiryComponent } from './product-inquiry/product-inquiry.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InventoryManagementRoutingModule } from './inventory-management.routing';

import { MaterialModule } from '../material.module';

@NgModule({
    imports: [
        InventoryManagementRoutingModule,
        CommonModule,
        FormsModule,
        MaterialModule
    ],
    declarations: [ProductInquiryComponent, PurchaseOrderInquiryComponent, ProductMaintenanceComponent, 
        UploadProductMasterComponent, PurchaseOrderReceivingComponent, SalesOrderInquiryComponent, 
        SalesOrderShipmentsComponent, InventoryManagementNavBarComponent]
})
export class InventoryManagementModule { }

