import { Routes } from "@angular/router";
import { CartComponent } from "./shared/features/cart/cart.component";
import { ContactComponent } from "./shared/features/contact/contact.component";
import { HomeComponent } from "./shared/features/home/home.component";

export const APP_ROUTES: Routes = [
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "products",
    loadChildren: () =>
      import("./products/products.routes").then((m) => m.PRODUCTS_ROUTES)
  },
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: 'cart', component: CartComponent },
  {
    path: "contact", component: ContactComponent,
  },
];
