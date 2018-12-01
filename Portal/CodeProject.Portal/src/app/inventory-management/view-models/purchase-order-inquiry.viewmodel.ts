import { PurchaseOrderViewModel } from '../view-models/purchase-order.viewmodel';

export class PurchaseOrderInquiryViewModel {
    public supplierName: string;
    public currentPageNumber: number;
    public currentPageIndex: number;
    public pageSize: number;
    public sortDirection: string;
    public sortExpression: string;
    public totalPages: number;
    public totalPurchaseOrders: number;
    public purchaseOrders: Array<PurchaseOrderViewModel>;
    public displayedColumns: Array<string>;
    public pageSizeOptions: Array<number>;
}
