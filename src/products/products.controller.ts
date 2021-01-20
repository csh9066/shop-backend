import { User as UserEntity } from 'src/users/entities/user.entity';
import { ProductsService } from './products.service';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateProductDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../users/user.decorator';

@Controller('products')
export class ProductsController {
  constructor(private productsSerivce: ProductsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @User() user: UserEntity,
  ) {
    return await this.productsSerivce.create(createProductDto, user);
  }

  @Get('/:id')
  async findById(@Param('id') id: string) {
    return await this.productsSerivce.findById(id);
  }
}
