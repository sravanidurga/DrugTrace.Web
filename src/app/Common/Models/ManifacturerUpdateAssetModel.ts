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
    assetid:string ;
    assetname: string ;
    manuowner: string ;
    ownerrole: string ;
    distowner: string ;
}