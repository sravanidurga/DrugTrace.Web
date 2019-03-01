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
        CustomerOwner: string ;
        MfgDate: string ;
        RetailerOwner: string ;
        assetid:string ;
        assetname: string ;
        boxid: string ;
        consignmentid: string ;
        customerphone: string ;
        distowner: string ;
        manuowner: string ;
        ownerid: string ;
        ownerrole: string ;
        qrid: string ;
        wholeowner: string;
    }