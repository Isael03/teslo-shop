import {
  IsArray,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {

  @ApiProperty({
    description: 'Product title (unique)',
    nullable:false,
    minLength:1
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  title: string;

  @ApiProperty({
    description: 'Product price',
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiProperty({
    description: 'Product description',
    nullable:true,
    minLength:1
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Product slug',
    nullable:true,
  })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty({
    description: 'Product stock',
    nullable:true,
    default:0
  })
  @IsInt()
  @IsPositive()
  @IsOptional()
  stock?: number;


  @ApiProperty({
    description: 'Product sizes',
    nullable:false,
  })
  @IsString({ each: true })
  @IsArray()
  sizes: string[];


  @ApiProperty({
    description: 'Product gender',
  })
  @IsIn(['men', 'women', 'kid', 'unisex'])
  gender: string;

  @ApiProperty({
    description: 'Product tags',
  })
  @IsArray()
  @IsString({ each: true })
  @Optional()
  tags:string[];

  @ApiProperty({
    description: 'Product images',
    nullable:true,

  })
  @IsString({ each: true })
  @IsArray()
  @Optional()
  images?: string[];
}
