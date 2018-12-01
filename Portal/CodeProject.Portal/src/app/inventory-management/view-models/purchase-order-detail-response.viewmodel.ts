
import { ResponseModel } from '../../shared-models/response.model';
import { PurchaseOrderDetailViewModel } from './purchase-order-detail.viewmodel';

export class PurchaseOrderDetailViewModelResponse extends ResponseModel  {
    public entity: PurchaseOrderDetailViewModel;
}
