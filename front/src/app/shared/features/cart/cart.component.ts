import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from 'app/products/data-access/cart.service';
import { Product } from 'app/products/data-access/product.model';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, InputNumberModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  private readonly cartService = inject(CartService);
  readonly cart = this.cartService.cart;
  public src!: string
  quantities: { [key: number]: number } = {};
  remove(productId: number) {
    this.cartService.removeFromCartByIndex(productId);
  }
  public imageError(event: Event) {
    const img = event.target as HTMLImageElement;

  }
  getQuantity(productId: number): number {
    return this.cartService.getQuantity(productId);
  }
  onUpdateQuantity(product: Product) {
    const quantity = product.quantity;

    if (quantity <= 0 || quantity === null || quantity === undefined) {
      this.cartService.removeFromCart(product.id);
    } else {
      this.cartService.updateQuantity(product.id, quantity);
    }
  }
}
