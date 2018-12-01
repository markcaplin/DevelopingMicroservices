

import { ResponseModel } from '../../shared-models/response.model';
import { PurchaseOrderViewModel } from './purchase-order.viewmodel';

export class PurchaseOrderViewModelResponse extends ResponseModel  {
    public entity: PurchaseOrderViewModel;
}


