import { Component, Input, inject } from '@angular/core';
import { ProductoService } from '../../../core/services/producto.service';
import { Producto } from '../../../core/models/producto';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {

  @Input('id') productoId!: string;

  producto!: Producto
  imagen!: string;
  statusMonedaSm = 'disabled'
  statusMonedaQ = 'disabled'
  statusTrueque = 'disabled'
  statusSesion = false;

  private readonly router = inject(Router)
  private readonly productoService = inject(ProductoService)
  private readonly authService = inject(AuthService)

  constructor() {
    this.statusSesion =  this.authService.getUsuarioSesion()? true: false;
  }

  ngOnInit(): void {
    const param = this.productoId.split('-')[0]
    const id = parseInt(param, 10)
    this.productoService.getProdcutoId(id).subscribe(
      (result) => {
        this.producto = result
        this.getImagenProducto();
        this.statusMonedaQ = (this.producto.moneda_local === 0) ? 'disabled' : '';
        this.statusMonedaSm = (this.producto.moneda_sistema === 0) ? 'disabled' : '';
        this.statusTrueque = (this.producto.permite_trueque === 0) ? 'disabled' : '';
      },
      (error) => {

      }
    )

  }

  getImagenProducto() {
    if (this.producto) {
      const filename: string = this.producto.url_foto.split('/').pop() || '';
      this.productoService.getImage(filename).subscribe(
        (result) => {
          this.createImageFromBlob(result)
        },
        (error) => {
          console.error(error)
        }
      )
    } else {
      this.imagen = ''
    }
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imagen = reader.result as string;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }

  goBack() {
    this.router.navigate(['area-productos/home'])
  }

}
