
import { ResponseModel } from '../../shared-models/response.model';
import { CustomerViewModel } from './customer.viewmodel';

export class CustomerViewModelResponse extends ResponseModel  {
    public entity: CustomerViewModel;
}

