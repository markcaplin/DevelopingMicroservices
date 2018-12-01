
export class ResponseModel {
    public returnStatus: Boolean;
    public returnMessage: string[];
    public errors: any[];
    public totalPages: number;
    public totalRows: number;
    public pageSize: number;
    public isAuthenicated: Boolean;
    public sortExpression: string;
    public sortDirection: string;
    public currentPageNumber: number;
}

