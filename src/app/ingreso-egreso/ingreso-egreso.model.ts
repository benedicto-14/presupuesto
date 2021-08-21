export class IngresoEgreso {
    
    descripcion:string;
    monto:number;
    tipo:string;
    uid?:string;

    //Crea el objeto apartir del que recibe de lo contrario es null
    constructor( objeto:any ){

        this.descripcion = objeto && objeto.descripcion || null;
        this.monto       = objeto && objeto.monto       || null;
        this.tipo        = objeto && objeto.tipo        || null;
        /* this.uid         = objeto && objeto.uid         || null; */

    }

}