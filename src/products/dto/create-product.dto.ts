import {
  ArrayUnique,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { ProductCategory, ProductStatus } from '../entities/product.entity';

export class CreateProductDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsEnum(ProductCategory)
  category: ProductCategory;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  tags?: string[];

  @IsNotEmpty()
  @IsEnum(ProductStatus)
  status: ProductStatus;

  @IsNotEmpty()
  @IsArray()
  imgUrls: string[];

  @IsNotEmpty()
  @IsNumber()
  @Min(1000)
  @Max(99999999)
  price: number;
}
