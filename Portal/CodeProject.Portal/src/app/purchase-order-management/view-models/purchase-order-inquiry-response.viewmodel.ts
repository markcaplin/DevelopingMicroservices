

import { ResponseModel } from '../../shared-models/response.model';
import { PurchaseOrderViewModel } from './purchase-order.viewmodel';

export class PurchaseOrderInquiryViewModelResponse extends ResponseModel  {
    public entity: Array<PurchaseOrderViewModel>;
}

