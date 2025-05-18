import { CommonModule } from "@angular/common";
import { Component, OnInit, inject, signal, computed, OnDestroy } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CartService } from "app/products/data-access/cart.service";
import { Product } from "app/products/data-access/product.model";
import { ProductsService } from "app/products/data-access/products.service";
import { ProductFormComponent } from "app/products/ui/product-form/product-form.component";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextModule } from "primeng/inputtext";
import { RatingModule } from 'primeng/rating';
import { Subject, takeUntil } from "rxjs";

const emptyProduct: Product = {
  id: 0,
  code: "",
  name: "",
  description: "",
  image: "no-image.jpg",
  category: "",
  price: 0,
  quantity: 0,
  internalReference: "",
  shellId: 0,
  inventoryStatus: "INSTOCK",
  rating: 0,
  createdAt: 0,
  updatedAt: 0,
};

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
  standalone: true,
  imports: [DataViewModule, CardModule, ButtonModule, DialogModule, ProductFormComponent,
    CommonModule, RatingModule, FormsModule, InputTextModule, InputNumberModule],
})
export class ProductListComponent implements OnInit, OnDestroy {

  private readonly productsService = inject(ProductsService);
  public readonly products = this.productsService.products;
  private readonly cartService = inject(CartService);
  public readonly filter = signal("");
  public isDialogVisible = false;
  public isCreation = false;
  public readonly editedProduct = signal<Product>(emptyProduct);

  public readonly filteredProducts = computed(() => {
    const search = this.filter().toLowerCase();
    return this.products().filter(product =>
      product.name.toLowerCase().includes(search)
    );
  });
  public quantities: Record<number, number> = {};
  private destroy = new Subject<void>()
  ngOnDestroy(): void {
    this.destroy.next()
    this.destroy.complete()
  }

  ngOnInit() {
    this.productsService.get().pipe(
      takeUntil(this.destroy),
    ).subscribe(() => {
      this.products().forEach(product => {
        this.quantities[product.id] = this.cartService.getQuantity(product.id);
      });
    });

    // this.loadAllProductsFromDB()
    //this.AddProductToDB()
  }


  /******* TEST LOCAL API *******/
  loadAllProductsFromDB() {
    this.productsService.testApiFindAllProducts().pipe(
      takeUntil(this.destroy),
    )
      .subscribe()
  }
  AddProductToDB() {
    const obj: any = {
      category: "Informatique",
      code: "4343",
      createdAt: new Date().getTime(),
      description: "Laptop",
      id: 33,
      image: "",
      internalReference: "aa",
      inventoryStatus: "INSTOCK",
      name: "sd",
      price: 55,
      quantity: 3,
      rating: 3,
      shellId: 444,
      updatedAt: 0

    }
    this.productsService.testApiAddProduct(obj).pipe(
      takeUntil(this.destroy)
    ).subscribe(s =>
      this.loadAllProductsFromDB())
  }
  /*****************************/

  public onCreate() {
    this.isCreation = true;
    this.isDialogVisible = true;
    this.editedProduct.set(emptyProduct);
  }

  public onUpdate(product: Product) {
    this.isCreation = false;
    this.isDialogVisible = true;
    this.editedProduct.set(product);
  }

  public onDelete(product: Product) {
    this.productsService.delete(product.id).subscribe();
  }

  public onSave(product: Product) {
    if (this.isCreation) {
      this.productsService.create(product).subscribe();
    } else {
      this.productsService.update(product).subscribe();
    }
    this.closeDialog();
  }

  public onCancel() {
    this.closeDialog();
  }

  private closeDialog() {
    this.isDialogVisible = false;
  }



  public imageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = '/assets/images-produits/no-image.jpg';
  }
  public onAddToCart(product: Product) {
    this.cartService.addToCart(product);
    this.quantities[product.id] = this.cartService.getQuantity(product.id);
  }
  public isInCart(product: Product): boolean {
    return this.cartService.isInCart(product.id);
  }
  public onRemoveFromCart(product: Product) {
    this.cartService.removeFromCart(product.id);
  }
  onUpdateQuatity(product: Product) {
    const quantity = this.quantities[product.id];

    if (quantity <= 0 || quantity === null || quantity === undefined) {
      this.cartService.removeFromCart(product.id);
    } else {
      this.cartService.updateQuantity(product.id, quantity);
    }
  }
}
