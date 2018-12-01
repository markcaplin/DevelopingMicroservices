
export class SalesOrderDetailViewModel {
    public salesOrderDetailId: number;
    public salesOrderId: number;
    public productId: number;
    public productMasterId: number;
    public productNumber: string;
    public productDescription: string;
    public unitPrice: number;
    public unitPriceFormatted: string;
    public orderQuantity: number;
    public shippedQuantity: number;
    public currentShippedQuantity: number;
    public orderTotal: number;
    public orderQuantityFormatted: string;
    public shippedQuantityFormatted: string;
    public currentShippedQuantityFormatted: string;
    public dateCreated: Date;
    public dateUpdated: Date;
    public editCurrentShippedQuantity: Boolean;
    public editQuantity: Boolean;
    public editUnitPrice: Boolean;
    public editProductNumber: Boolean;
    public editMode: Boolean;
    public disableSaveButton: Boolean;
    public disableEditButton: Boolean;
    public disableAddButton: Boolean;
    public disableCancelButton: Boolean;
    public disableDeleteButton: Boolean;
}
