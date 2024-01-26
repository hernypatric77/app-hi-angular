import { Component, OnInit } from '@angular/core';
import {DataSourceProduct} from "./data-source";
import {FormControl} from "@angular/forms";
import {Dialog} from "@angular/cdk/dialog";
import {BillingComponent} from "../billing/billing.component";
import {FacturaModel} from "@models/factura.model";
import {debounceTime} from "rxjs";
import { BillingService } from '@services/billing.service';

@Component({
  selector: 'app-billing-list',
  templateUrl: './billing-list.component.html',
  styleUrls: ['./billing-list.component.scss']
})
export class BillingListComponent implements OnInit {

  name: string='';

  dataSource= new DataSourceProduct();
  columns: string[] =['id', 'numeroFactura','fecha','total', 'actions']
  total = 0;
  inputSearch = new FormControl('',{nonNullable: true});
  numRegistro =5;

  constructor(
    public dialog: Dialog,
    private billingService: BillingService) {
  }
  openDialog()  {
    this.dialog.open(BillingComponent, {
      minWidth: '300px',
      data: {
        animal: 'lion',

      },
    });
  }

  openDialog2(facturaModel: FacturaModel)  {
    this.dialog.open(BillingComponent, {
      minWidth: '300px',
      data: {
        animal: 'panda',
        factura: facturaModel,
      },
    });
  }

  ngOnInit(): void {
    this.billingService.findFactura()
      .subscribe(data => {
        this.dataSource.init(data);
        this.total = this.dataSource.getTotal();
      })
    this.inputSearch.valueChanges
      .pipe(debounceTime(300))
      .subscribe(value => {
        this.dataSource.find(value);
      })
  }

  delete(facturaModel: FacturaModel) {
    this.dataSource.update(facturaModel.id, {estado: "I"});
    const datos: Partial<{ estado: string | null }> = {
      estado: "I",
    };
    this.billingService.editFactura(datos, facturaModel.id).subscribe(
      (respuesta) =>{
        console.log('Solicitud PUT exitosa:', respuesta);
      },
      (error) =>{
        console.error('Error en la solicitud POST:', error);
      }
    );
    this.billingService.findFactura()
      .subscribe(data => {
        this.dataSource.init(data);
        this.total = this.dataSource.getTotal();
      })
  }



  onSeleccionChange( event: any) {
    this.numRegistro = event.target.value;
    console.log(this.numRegistro);
    this.dataSource.rowsPresent(0,this.numRegistro);
  }
  pagination(ubicacion: number){
    this.dataSource.rowsPresent(ubicacion*this.numRegistro,
      ubicacion*this.numRegistro + parseInt(String(this.numRegistro)));
  }

}
