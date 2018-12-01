import { HttpErrorResponse } from '@angular/common/http';
import { HttpService } from './../../shared-components-services/http.service';
import { AlertService } from './../../shared-components-services/alert.service';
import { SessionService } from './../../shared-components-services/session.service';
import { Component, OnInit } from '@angular/core';
import { ProductViewModel } from '../view-models/product.viewmodel';
import { ProductViewModelResponse } from '../view-models/product-response.viewmodel';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-maintenance',
  templateUrl: './product-maintenance.component.html',
  styleUrls: ['./product-maintenance.component.css']
})
export class ProductMaintenanceComponent implements OnInit {

  public productViewModel: ProductViewModel;
  private routerSubscription: Subscription;

  constructor(private sessionService: SessionService, private router: Router, private route: ActivatedRoute,
    private alertService: AlertService, private httpService: HttpService) {

    this.productViewModel = new ProductViewModel();
    this.productViewModel.productNumber = '';
    this.productViewModel.description = '';
    this.productViewModel.binLocation = '';
    this.productViewModel.productId = 0;

  }

  ngOnInit() {
    this.routerSubscription = this.route.queryParams.subscribe(params => {
      this.productViewModel.productId = +params['id'] || 0;
      if (this.productViewModel.productId > 0) {
        this.getProduct();
      }
    });
  }

  private getProduct() {

    let url = this.sessionService.appSettings.inventoryManagementWebApiUrl + 'product/getproduct';
    this.httpService.HttpPost<ProductViewModelResponse>(url, this.productViewModel)
      .subscribe((response: ProductViewModelResponse) => {
        this.getProductSuccess(response);
      }, response => this.getProductFailed(response));

  }

  private getProductSuccess(response: ProductViewModelResponse) {
    let productViewModel: ProductViewModel = response.entity;
    this.productViewModel = productViewModel;
  }

  private getProductFailed(error: HttpErrorResponse) {

    let errorResponse: ProductViewModelResponse = error.error;

    if (error.status > 0) {
      this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
    } else {
      this.alertService.ShowErrorMessage(error.message);
    }

  }

  public createOrUpdateProduct() {
    let product = new ProductViewModel();
    product = this.productViewModel;

    let url = '';
    if (product.productId === 0) {
      url = this.sessionService.appSettings.inventoryManagementWebApiUrl +  'product/createproduct';
    } else {
      url = this.sessionService.appSettings.inventoryManagementWebApiUrl +  'product/updateproduct';
    }

    this.httpService.HttpPost<ProductViewModelResponse>(url, product).subscribe((response: ProductViewModelResponse) => {
      this.createOrUpdateProductSuccess(response);
    }, response => this.createOrUpdateProductFailed(response));

  }

  private createOrUpdateProductSuccess(response: ProductViewModelResponse) {
    let productViewModel: ProductViewModel = response.entity;
    this.productViewModel.productId = productViewModel.productId;
    const message = 'Product successfully saved.';
    this.alertService.ShowSuccessMessage(message);
  }

  private createOrUpdateProductFailed(error: HttpErrorResponse) {
    let errorResponse: ProductViewModelResponse = error.error;
    if (error.status > 0) {
      this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
    } else {
      this.alertService.ShowErrorMessage(error.message);
    }
  }

}
