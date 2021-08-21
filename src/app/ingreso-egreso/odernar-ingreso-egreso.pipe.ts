import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'odernarIngresoEgreso'
})
export class OdernarIngresoEgresoPipe implements PipeTransform {

  transform(items: any): any {
    if(items != undefined){

      let nuevo = [];
      for (let i = 0; i < items.length; i++) {
        if(items[i].tipo === "ingreso") nuevo.push(items[i]);
      }
      for (let i = 0; i < items.length; i++) {
        if(items[i].tipo === "egreso") nuevo.push(items[i]);
      }
      return nuevo;
      
    }
  }

}
