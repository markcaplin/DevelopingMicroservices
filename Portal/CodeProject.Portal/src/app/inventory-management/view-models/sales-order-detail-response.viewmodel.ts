

import { ResponseModel } from '../../shared-models/response.model';
import { SalesOrderDetailViewModel } from './sales-order-detail.viewmodel';

export class SalesOrderDetailViewModelResponse extends ResponseModel  {
    public entity: SalesOrderDetailViewModel;
}
