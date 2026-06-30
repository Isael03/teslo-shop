import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductImage } from './product-image.entity';
import { User } from '../../auth/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'products' })
export class Product {

  @ApiProperty({
    example: '7fbc511c-dca9-4e89-85b2-b9ef1c5a879f',
    description: 'Product id',
    uniqueItems:true
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'T-Shirt Teslo',
    description: 'Product name',
    uniqueItems:true
  })
  @Column('text', {
    unique: true,
  })
  title: string;

  @ApiProperty({
    example: 'Price',
    description: 'Product price',
    uniqueItems:true
  })
  @Column('float', { default: 0 })
  price: number;

  @ApiProperty({
    example: 'lorem Ipsum',
    description: 'Product description',
    default: null
  })
  @Column('text', { nullable: true })
  description: string;

  @ApiProperty({
    example: 't_shirt_teslo',
    description: 'Product Slug - for SEO',
    uniqueItems:true
  })
  @Column('text', { unique: true })
  slug: string;

  @ApiProperty({
    example: 10,
    description: 'Product stock',
    default:0
  })
  @Column('int', { default: 0 })
  stock: number;

  @ApiProperty({
    example: ['M', 'XM', 'XXL'],
    description: 'Product size',
  })
  @Column('text', { array: true })
  sizes: string[];

  @ApiProperty({
    example: 'women',
    description: 'Product gender',
  })
  @Column('text')
  gender: string;

  @ApiProperty({
    example: ['shirt', 'pants'],
    description: 'Product tags',
    default:[]
  })
  @Column('text', { array: true, default: [] })
  tags: string[];

  //images
  @OneToMany(
    () => ProductImage,
    productImage => productImage.product,
    { cascade: true, eager: true })
  images?: ProductImage[];

  @ManyToOne(() => User, user => user.product, {eager:true})
  user: User;

  @BeforeInsert()
  checkSlugInsert() {

    if (!this.slug) {
      this.slug = this.title;
    }

    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll('\'', '')
      .replaceAll('’', '');
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    if (this.title) {
      this.slug = this.title;
    }

    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll('\'', '')
      .replaceAll('’', '');
  }

}
