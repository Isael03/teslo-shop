import { Inject, Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { initialData, SeedProduct } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(private readonly productService: ProductsService) {
  }

  async runSeed() {
    await this.insertNewProducts();
    return 'Executed seed';
  }

  private async insertNewProducts() {

    await this.productService.deleteAllProducts();

    const products = initialData.products;

    const insertPromises: any = [];

    products.forEach(product => {
      insertPromises!.push(this.productService.create(product));
    });

    await Promise.all(insertPromises);
  }

}
