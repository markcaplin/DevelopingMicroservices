
import { SalesOrderDetailViewModel } from './sales-order-detail.viewmodel';

export class SalesOrderViewModel {

    constructor() {
        this.salesOrderDetails = new Array<SalesOrderDetailViewModel>();
        this.salesOrderDetailsOriginalValues = new Array<SalesOrderDetailViewModel>();
    }

    public salesOrderId: number;
    public salesOrderNumber: number;
    public accountId: number;
    public customerId: number;
    public customerName: string;
    public addressLine1: string;
    public addressLine2: string;
    public city: string;
    public region: string;
    public postalCode: string;
    public orderTotal: number;
    public orderTotalFormatted: string;
    public salesOrderStatusId: number;
    public salesOrderStatusDescription: string;
    public dateCreated: Date;
    public orderDate: string;
    public dateUpdated: Date;
    public salesOrderDetails: Array<SalesOrderDetailViewModel>;
    public salesOrderDetailsOriginalValues: Array<SalesOrderDetailViewModel>;
    public displayedColumns: Array<string>;

}
