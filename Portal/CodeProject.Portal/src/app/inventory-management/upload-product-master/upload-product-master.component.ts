
import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../shared-components-services/session.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-upload-product-master',
  templateUrl: './upload-product-master.component.html',
  styleUrls: ['./upload-product-master.component.css']
})
export class UploadProductMasterComponent implements OnInit {

  public uploadUrl: string;
  public httpHeaders: HttpHeaders;

  constructor(private sessionService: SessionService) {

    /* this.httpHeaders = new HttpHeaders();
    const securityToken: string = localStorage.getItem('token');
    if (securityToken != null) {
        let tokenString = `Bearer ${securityToken}`;
        this.httpHeaders = new HttpHeaders()
          .set('authorization', tokenString)
          .set('Content-Type', 'multipart/form-data');
    }*/

    this.httpHeaders = new HttpHeaders();
    const securityToken: string = localStorage.getItem('token');
    if (securityToken != null) {
        let tokenString = `Bearer ${securityToken}`;
        this.httpHeaders = new HttpHeaders()
          .set('authorization', tokenString);
    }

    this.uploadUrl = this.sessionService.appSettings.inventoryManagementWebApiUrl + 'product/uploadproductmasterfile';
  }

  ngOnInit() {
  }

}
