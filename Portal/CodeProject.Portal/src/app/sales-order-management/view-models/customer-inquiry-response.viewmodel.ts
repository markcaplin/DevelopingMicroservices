
import { ResponseModel } from '../../shared-models/response.model';
import { CustomerViewModel } from './customer.viewmodel';

export class CustomerInquiryViewModelResponse extends ResponseModel  {
    public entity: Array<CustomerViewModel>;
}
