
import { SupplierViewModel } from '../view-models/supplier.viewmodel';

export class SupplierInquiryViewModel {
    public supplierName: string;
    public currentPageNumber: number;
    public currentPageIndex: number;
    public pageSize: number;
    public sortDirection: string;
    public sortExpression: string;
    public totalPages: number;
    public totalSuppliers: number;
    public suppliers: Array<SupplierViewModel>;
    public displayedColumns: Array<string>;
    public pageSizeOptions: Array<number>;
}
