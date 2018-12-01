
import { CustomerViewModel } from '../view-models/customer.viewmodel';

export class CustomerInquiryViewModel {
    public customerName: string;
    public currentPageNumber: number;
    public currentPageIndex: number;
    public pageSize: number;
    public sortDirection: string;
    public sortExpression: string;
    public totalPages: number;
    public totalCustomers: number;
    public customers: Array<CustomerViewModel>;
    public displayedColumns: Array<string>;
    public pageSizeOptions: Array<number>;
}
