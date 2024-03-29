import {Component, Inject, Input} from '@angular/core';
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {BillingService} from "@services/billing.service";
import {FacturaModel} from "@models/factura.model";
export interface DialogData {
  tipoAccion: 'edit'|'create';
  factura: FacturaModel;
}

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
})
export class BillingComponent {

constructor(public dialogRef: DialogRef,
            @Inject(DIALOG_DATA) public data: DialogData,
            private billingService: BillingService,
            ) {
}
form = new FormGroup({
  numeroFactura: new FormControl ( this.data?.factura?.numeroFactura ?? '', Validators.required),
  idCliente: new FormControl(this.data?.factura?.idCliente ?? '', Validators.required),
  idProvedor: new FormControl({value: this.data?.factura?.idProvedor ?? '', disabled: this.data.tipoAccion==='edit'}
                                , Validators.required),
  idProducto: new FormControl( {value: this.data?.factura?.idProducto ?? '', disabled: this.data.tipoAccion==='edit' }
                                , Validators.required),
  estado: new FormControl('A'),
});


    validations(parametro: string){

      let field = this.form.get(parametro);
      let valido = field?.touched && field?.valid;
      let invalido= field?.touched && field?.invalid;

        return{
            'border-gray-300' : valido,
            'bg-gray-100' : valido,
            'border' : valido,

            'bg-red-50' : invalido,
            'border-red-500' : invalido,
            'text-red-900' : invalido,
            'focus:border-red-500' :invalido,
            'placeholder-red-700' : invalido,
        }
    }

  get numeroFacturaField(){
    return this.form.get('numFactura');
  }

  get idClienteField(){
    return this.form.get('idCliente');
  }

  get idProvedorField(){

    return this.form.get('idProvedor');
  }
  get idProductoField(){
    return this.form.get('idProducto');
  }

    save() {
        if(this.form.valid){
          const datos = this.form.value ;
      if (this.data?.factura?.id) {
        this.billingService.editFactura(datos, this.data.factura.id).subscribe(
          (respuesta) =>{
            console.log('Solicitud PUT exitosa:', respuesta);
          },
          (error) =>{
            console.error('Error en la solicitud POST:', error);
          }
        );
        this.dialogRef.close('actualizar');
        this.dialogRef.updatePosition();
      }else{
        this.billingService.savefactura(datos).subscribe(
          (respuesta) =>{
            console.log('Solicitud POST exitosa:', respuesta);

          },
          (error) =>{
            console.error('Error en la solicitud POST:', error);
          }
        )
        this.dialogRef.close('actualizar');
        this.dialogRef.updatePosition();
      }
        }

    }
}
