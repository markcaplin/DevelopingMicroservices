
import { SalesOrderViewModel } from '../view-models/sales-order.viewmodel';

export class SalesOrderInquiryViewModel {
    public customerName: string;
    public currentPageNumber: number;
    public currentPageIndex: number;
    public pageSize: number;
    public sortDirection: string;
    public sortExpression: string;
    public totalPages: number;
    public totalSalesOrders: number;
    public salesOrders: Array<SalesOrderViewModel>;
    public displayedColumns: Array<string>;
    public pageSizeOptions: Array<number>;
}
