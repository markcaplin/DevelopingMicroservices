
import { ResponseModel } from '../../shared-models/response.model';
import { ProductViewModel } from './product.viewmodel';

export class ProductViewModelResponse extends ResponseModel  {
    public entity: ProductViewModel;
}
