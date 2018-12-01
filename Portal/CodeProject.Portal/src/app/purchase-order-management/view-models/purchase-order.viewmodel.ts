
import { PurchaseOrderDetailViewModel } from './purchase-order-detail.viewmodel';

export class PurchaseOrderViewModel {

    constructor() {
        this.purchaseOrderDetails = new Array<PurchaseOrderDetailViewModel>();
        this.purchaseOrderDetailsOriginalValues = new Array<PurchaseOrderDetailViewModel>();
    }

    public purchaseOrderId: number;
    public purchaseOrderNumber: number;
    public accountId: number;
    public supplierId: number;
    public supplierName: string;
    public addressLine1: string;
    public addressLine2: string;
    public city: string;
    public region: string;
    public postalCode: string;
    public orderTotal: number;
    public orderTotalFormatted: string;
    public purchaseOrderStatusId: number;
    public purchaseOrderStatusDescription: string;
    public dateCreated: Date;
    public orderDate: string;
    public dateUpdated: Date;
    public purchaseOrderDetails: Array<PurchaseOrderDetailViewModel>;
    public purchaseOrderDetailsOriginalValues: Array<PurchaseOrderDetailViewModel>;
    public displayedColumns: Array<string>;

}
