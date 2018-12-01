import { SupplierMaintenanceComponent } from './supplier-maintenance/supplier-maintenance.component';
import { SupplierInquiryComponent } from './supplier-inquiry/supplier-inquiry.component';
import { PurchaseOrderMaintenanceComponent } from './purchase-order-maintenance/purchase-order-maintenance.component';
import { PurchaseOrderInquiryComponent } from './purchase-order-inquiry/purchase-order-inquiry.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { PurchaseOrderManagementRoutingModule } from './purchase-order-management.routing';
import { PurchaseOrderManagementNavBarComponent } from './purchase-order-management-nav-bar/purchase-order-management-nav-bar.component';
import { DeletePurchaseOrderLineItemDialogComponent } from './purchase-order-maintenance/purchase-order-maintenance.component';
import { SubmitPurchaseOrderDialogComponent } from './purchase-order-maintenance/purchase-order-maintenance.component';

@NgModule({
    imports: [
        PurchaseOrderManagementRoutingModule,
        CommonModule,
        FormsModule,
        MaterialModule
    ],
    entryComponents: [DeletePurchaseOrderLineItemDialogComponent, SubmitPurchaseOrderDialogComponent],
    declarations: [SupplierInquiryComponent, SupplierMaintenanceComponent,
        PurchaseOrderInquiryComponent, PurchaseOrderMaintenanceComponent,
        PurchaseOrderManagementNavBarComponent, DeletePurchaseOrderLineItemDialogComponent, SubmitPurchaseOrderDialogComponent]
})
export class PurchaseOrderManagementModule {
}
