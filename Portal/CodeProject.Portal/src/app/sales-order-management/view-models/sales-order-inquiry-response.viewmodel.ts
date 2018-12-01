

import { ResponseModel } from '../../shared-models/response.model';
import { SalesOrderViewModel } from './sales-order.viewmodel';

export class SalesOrderInquiryViewModelResponse extends ResponseModel  {
    public entity: Array<SalesOrderViewModel>;
}
