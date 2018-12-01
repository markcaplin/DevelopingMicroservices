
import { ResponseModel } from '../../shared-models/response.model';
import { SupplierViewModel } from './supplier.viewmodel';

export class SupplierInquiryViewModelResponse extends ResponseModel  {
    public entity: Array<SupplierViewModel>;
}

