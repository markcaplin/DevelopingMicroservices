
import { CustomerMaintenanceComponent } from './customer-maintenance/customer-maintenance.component';
import { CustomerInquiryComponent } from './customer-inquiry/customer-inquiry.component';
import { SalesOrderMaintenanceComponent } from './sales-order-maintenance/sales-order-maintenance.component';
import { SalesOrderInquiryComponent } from './sales-order-inquiry/sales-order-inquiry.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { SalesOrderManagementRoutingModule } from './sales-order-management.routing';
import { SalesOrderManagementNavBarComponent } from './sales-order-management-nav-bar/sales-order-management-nav-bar.component';
import { DeleteSalesOrderLineItemDialogComponent } from './sales-order-maintenance/sales-order-maintenance.component';
import { SubmitSalesOrderDialogComponent } from './sales-order-maintenance/sales-order-maintenance.component';

@NgModule({
    imports: [
        SalesOrderManagementRoutingModule,
        CommonModule,
        FormsModule,
        MaterialModule
    ],
    entryComponents: [DeleteSalesOrderLineItemDialogComponent, SubmitSalesOrderDialogComponent],
    declarations: [CustomerInquiryComponent, CustomerMaintenanceComponent,
        SalesOrderInquiryComponent, SalesOrderMaintenanceComponent,
        SalesOrderManagementNavBarComponent, DeleteSalesOrderLineItemDialogComponent, SubmitSalesOrderDialogComponent]
})
export class SalesOrderManagementModule {
}
