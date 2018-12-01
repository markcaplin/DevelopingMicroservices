
import { ProductViewModel } from './product.viewmodel';

export class ProductInquiryViewModel {
    public productNumber: string;
    public currentPageNumber: number;
    public currentPageIndex: number;
    public pageSize: number;
    public sortDirection: string;
    public sortExpression: string;
    public totalPages: number;
    public totalProducts: number;
    public products: Array<ProductViewModel>;
    public displayedColumns: Array<string>;
    public pageSizeOptions: Array<number>;
}
