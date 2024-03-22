import { Component, inject, OnInit } from '@angular/core';
import { CardProductPublicComponent } from '../card-product-public/card-product-public.component';
import { Producto } from '../../core/models/producto';
import { ProductoService } from '../../core/services/producto.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-productos-publicados',
  standalone: true,
  imports: [CardProductPublicComponent],
  templateUrl: './productos-publicados.component.html',
  styleUrl: './productos-publicados.component.css'
})
export class ProductosPublicadosComponent {

  productos: Producto[] = []

  private readonly productoService = inject(ProductoService)
  private readonly authService = inject(AuthService)


  constructor() {

  }

  ngOnInit(): void {
    const id: number = this.authService.getUsuarioSesion()?.usuario_id || 1
    this.productoService.getProductosUsuario(id).subscribe(
      (result) => {
        if (result) {
          this.productos = result
        }
      },
      (error) => {
        console.error(error);

      });
  }

}
