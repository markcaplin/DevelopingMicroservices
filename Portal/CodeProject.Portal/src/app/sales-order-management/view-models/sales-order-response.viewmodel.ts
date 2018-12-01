
import { ResponseModel } from '../../shared-models/response.model';
import { SalesOrderViewModel } from './sales-order.viewmodel';

export class SalesOrderViewModelResponse extends ResponseModel  {
    public entity: SalesOrderViewModel;
}

