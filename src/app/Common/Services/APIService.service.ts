import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { AssetModel } from '../Models/AssetModel';
import { APIResponseModel } from '../Models/APIResponseModel';
import { ManifacturerUpdateAssetModel } from '../Models/ManifacturerUpdateAssetModel';
import "rxjs/add/operator/map";


@Injectable()
export class APIService {
    constructor(private httpClient: HttpClient) { }
    

    getManifacturerSaleHistory(): Observable<any> {
        var params = new HttpParams()
         params = params.append('peer', 'peer0.manu.example.com')
         params = params.append('args', JSON.stringify(['sravani']))
        return this.httpClient.get<any>('SaleHistory_Manu', { params: params });
    }

    createAssetManifacturer(asset:AssetModel): Observable<string> {
        
        var params = new HttpParams()
        // params = params.append('provider', provider)
        // params = params.append('isEdit', isEdit.toString())
        var body = { "peers": ['peer0.manu.example.com'], "args":[asset.assetname,asset.qrid,asset.boxid,asset.consignmentid,asset.manuowner,asset.MfgDate.toString()]}
        return this.httpClient.post<string>('manu_creation', body);
    }

    updateAssetManifacturer(asset:ManifacturerUpdateAssetModel): Observable<string> {
        
        var params = new HttpParams()
        // params = params.append('provider', provider)
        // params = params.append('isEdit', isEdit.toString())
        var body = { "peers": ['peer0.manu.example.com'], "args":[asset.distowner,asset.manuowner,asset.consignmentid]}
        console.log(body);
        return this.httpClient.post<string>('manu_saletransaction', body);
    }

    
    

    getDistributorSaleHistory(): Observable<any> {
        var params = new HttpParams()
         params = params.append('peer', 'peer0.manu.example.com')
         params = params.append('args', JSON.stringify(['prabhu']))
        return this.httpClient.get<any>('SaleHistory_Dist', { params: params });
    }


    updateAssetDistributor(asset:AssetModel): Observable<string> {
        
        var params = new HttpParams()
        // params = params.append('provider', provider)
        // params = params.append('isEdit', isEdit.toString())
        var body = { "peers": ['peer0.manu.example.com'], "args":[asset.wholeowner,asset.distowner,asset.consignmentid]}
        console.log(body);
        return this.httpClient.post<string>('dist_sale_transaction', body);
    }

    getWholesalerSaleHistory(): Observable<any> {
        var params = new HttpParams()
         params = params.append('peer', 'peer0.manu.example.com')
         params = params.append('args', JSON.stringify(['prabhu']))
        return this.httpClient.get<any>('SaleHistory_Wsale', { params: params });
    }


    updateAssetWholeSaler(asset:AssetModel): Observable<string> {
        
        var params = new HttpParams()
        // params = params.append('provider', provider)
        // params = params.append('isEdit', isEdit.toString())
        var body = { "peers": ['peer0.manu.example.com'], "args":[asset.RetailerOwner,asset.wholeowner,asset.consignmentid]}
        console.log(body);
        return this.httpClient.post<string>('ws_sale_transaction', body);
    }




}