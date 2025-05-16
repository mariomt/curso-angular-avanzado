import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  resource,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import { ProductComponent } from '@products/components/product/product.component';

import { Product } from '@shared/models/product.model';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-list',
  imports: [CommonModule, ProductComponent, RouterLinkWithHref],
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ListComponent {
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  readonly slug = input<string>();

  // catrgoriesResource = rxResource({
  //   loader: () => this.categoryService.getAll(),
  // });

  // Sin RXjs
  catrgoriesResourceWithoutRxjs = resource({
    loader: () => this.categoryService.getAllPromise(),
  });

  productResource = rxResource({
    request: () => {
      return {
        category_slug: this.slug(),
      };
    },
    loader: ({ request }) => this.productService.getProducts(request),
  });

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  resetCategories() {
    this.catrgoriesResourceWithoutRxjs.set([]);
  }

  reloadCategories() {
    this.catrgoriesResourceWithoutRxjs.reload();
  }

  reloadProduct() {
    this.productResource.reload();
  }
}
