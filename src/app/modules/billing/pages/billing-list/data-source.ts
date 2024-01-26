import {DataSource} from "@angular/cdk/collections";

import {BehaviorSubject, Observable} from "rxjs";
import {data} from "autoprefixer";
import {FacturaModel} from "@models/factura.model";

export class  DataSourceProduct extends DataSource<FacturaModel>{

  data = new BehaviorSubject <FacturaModel[]>([]);
  originalData: FacturaModel[] = [];
  connect(): Observable<FacturaModel[]> {
    return this.data;
  }

  init(factura: FacturaModel[]){
    this.originalData = factura;
    const newFacturas =this.originalData.slice(0,5)
    this.data.next(newFacturas);
  }

  getTotal(){
    const  products = this.data.getValue();
    return products
      .map(item => item.total)
      .reduce((price, total) => price+total, 0);
  }
  disconnect(): void {
  }

  update(id: FacturaModel['id'], changes: Partial<FacturaModel>) {
    const products = this.data.getValue();
    const productIndex = products.findIndex(item => item.id === id);//0===false
    if (productIndex !== -1) {
      products[productIndex] = {
        ...products[productIndex],
        ...changes,
      }
      this.data.next(products);
    }
  }

  find(query: string){
    const newProducts = this.originalData.filter(item =>
      (item.numeroFactura + item.id + item.total ).toLowerCase().includes(query.toLowerCase()));
    this.data.next(newProducts);
  }

  rowsPresent(ini: number, cantidad: number){
    const newProducts =this.originalData.slice(ini,cantidad)
    this.data.next(newProducts);
  }

}
