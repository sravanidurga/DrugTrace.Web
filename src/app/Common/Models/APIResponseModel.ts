import { AssetModel } from './AssetModel';

export class APIResponseModel {
    constructor(obj?:any){
        if(obj!= null){
            Object.keys(obj).forEach(key => {
                this[key] = obj[key];
            });
        }
        else{

        }
    }
    Key:string;
    Record:AssetModel;
}