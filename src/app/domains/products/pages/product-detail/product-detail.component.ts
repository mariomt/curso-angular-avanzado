import { Component, inject, input, linkedSignal, effect } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ProductService } from '@shared/services/product.service';
import { CartService } from '@shared/services/cart.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { environment } from '@env/environment';
import { MetaTagsService } from '@shared/services/meta-tags.service';
import { RelatedComponent } from '../../components/related/related.component';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, NgOptimizedImage, RelatedComponent],
  templateUrl: './product-detail.component.html',
})
export default class ProductDetailComponent {
  readonly slug = input.required<string>();

  productRs = rxResource({
    request: () => ({
      slug: this.slug(),
    }),
    loader: ({ request }) => {
      return this.productService.getOne(request.slug);
    },
  });

  cover = linkedSignal({
    source: this.productRs.value,
    computation: (prod, previousValue) => {
      if (prod && prod.images.length > 0) {
        return prod.images[0];
      }
      return previousValue?.value;
    },
  });

  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private metaService = inject(MetaTagsService);

  constructor() {
    effect(() => {
      const product = this.productRs.value();
      if (product) {
        this.metaService.updateMetaTags({
          title: product.title,
          description: product.description,
          image: product.images[0],
          url: `${environment.domain}/product/${product.slug}`,
        });
      }
    });
  }

  changeCover(newImg: string) {
    this.cover.set(newImg);
  }

  addToCart() {
    const product = this.productRs.value();
    if (product) {
      this.cartService.addToCart(product);
    }
  }
}
