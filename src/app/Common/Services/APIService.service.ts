import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { AssetModel } from '../Models/AssetModel';
import { APIResponseModel } from '../Models/APIResponseModel';
import { ManifacturerUpdateAssetModel } from '../Models/ManifacturerUpdateAssetModel';


@Injectable()
export class APIService {
    constructor(private httpClient: HttpClient) { }
    

    getManifacturerSaleHistory(): Observable<Array<APIResponseModel>> {
        var params = new HttpParams()
         params = params.append('peer', 'peer0.manu.example.com')
         params = params.append('args', '')
        return this.httpClient.get<Array<APIResponseModel>>('salehistory_manu', { params: params })
    }

    createAssetManifacturer(asset:AssetModel): Observable<string> {
        
        var params = new HttpParams()
        // params = params.append('provider', provider)
        // params = params.append('isEdit', isEdit.toString())
        var body = { "peers": [], "args":[asset.assetname,asset.qrid,asset.boxid,asset.consignmentid,asset.manuowner,asset.MfgDate.toString()]}
        return this.httpClient.post<string>('manu_creation', body);
    }

    updateAssetManifacturer(asset:ManifacturerUpdateAssetModel): Observable<string> {
        
        var params = new HttpParams()
        // params = params.append('provider', provider)
        // params = params.append('isEdit', isEdit.toString())
        var body = { "peers": [], "args":[asset.manuowner,asset.distowner,""]}
        return this.httpClient.post<string>('manu_creation', body);
    }

    






}