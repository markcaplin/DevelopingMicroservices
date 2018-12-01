

import { ResponseModel } from '../../shared-models/response.model';
import { ProductViewModel } from './product.viewmodel';

export class ProductInquiryViewModelResponse extends ResponseModel  {
    public entity: Array<ProductViewModel>;
}
