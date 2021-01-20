import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImgUrl, Product, ProductTag } from './entities';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductImgUrl, ProductTag])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
