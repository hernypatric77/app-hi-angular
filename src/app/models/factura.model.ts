
export interface FacturaModel{
  id: string,
  numeroFactura: string,
  fecha: string,
  total: number,
  idCliente: number,
  idProvedor: number,
  idProducto: number,
  estado: string;
}
