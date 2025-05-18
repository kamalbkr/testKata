import { HttpClient } from '@angular/common/http'
import { computed, Injectable, signal } from '@angular/core'
import { Observable } from 'rxjs'
import { Product } from './product.model'

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly _cart = signal<Product[]>([])
  public readonly cart = this._cart.asReadonly()
  public readonly cartCount = computed(() => this._cart().map(m => m.quantity).
    reduce((acc: number, cur: number) => {
      return acc + cur
    }, 0))

  constructor() { }

  addToCart(product: Product) {
    const cart = this._cart();
    const existingProduct = cart.find(p => p.id === product.id)

    if (existingProduct) {
      existingProduct.quantity += 1
    } else {
      this._cart.update(cart => [...cart, { ...product, quantity: 1 }])
    }
  }

  removeFromCart(productId: number) {
    this._cart.update((cart) => cart.filter(p => p.id !== productId))
  }

  isInCart(productId: number): boolean {
    return this._cart().some(p => p.id === productId)
  }
  removeFromCartByIndex(index: number) {
    this._cart.update((cart) => cart.filter((p, i) => index !== i))
  }
  getQuantity(productId: number): number {
    const product = this._cart().find(p => p.id === productId);
    return product ? product.quantity : 0
  }
  updateQuantity(productId: number, quantity: number) {

    const cart = this._cart();
    const productIndex = cart.findIndex(p => p.id === productId)
    if (productIndex >= 0) {

      if (quantity <= 0) {
        this._cart.update(cart => cart.filter((p, i) => i !== productIndex));
      } else {
        const updatedCart = [...cart];
        updatedCart[productIndex] = {
          ...updatedCart[productIndex],
          quantity: quantity
        };
        this._cart.set(updatedCart);
      }
    }
  }


}

