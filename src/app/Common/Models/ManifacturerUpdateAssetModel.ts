export class ManifacturerUpdateAssetModel {
    constructor(obj?:any){
        if(obj!= null){
            Object.keys(obj).forEach(key => {
                this[key] = obj[key];
            });
        }
        else{

        }
    }
    AssetNumber: string;
    AssetName: string;
    Owner: string;
    OwnerRole: string;
    Distributor: string;
}