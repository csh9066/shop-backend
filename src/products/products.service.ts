import { ProductImgUrl, Product, ProductTag } from './entities/';
import { CreateProductDto } from './dto/create-product.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductTag)
    private productTagRepository: Repository<ProductTag>,
    @InjectRepository(ProductImgUrl)
    private productImgUrlRepository: Repository<ProductImgUrl>,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    user: User,
  ): Promise<Product> {
    const newTags = await this.createTags(createProductDto.tags);
    const newUrls = await this.createImgUrls(createProductDto.imgUrls);

    const newProduct = await this.productRepository.create({
      ...createProductDto,
      imgUrls: newUrls,
      tags: newTags,
      owner: user,
    });

    return await this.productRepository.save(newProduct);
  }

  async findById(id: string): Promise<Product> {
    const product = await this.productRepository.findOne(id);

    if (!product) {
      throw new NotFoundException();
    }
    return product;
  }

  private async createTags(tags: string[]): Promise<ProductTag[]> {
    if (!tags || tags.length <= 0) {
      return;
    }

    const newTags = await this.productTagRepository.create(
      tags.map((tag) => ({ tag })),
    );

    return this.productTagRepository.save(newTags);
  }

  private async createImgUrls(imgUrls: string[]): Promise<ProductImgUrl[]> {
    const newUrls = await this.productImgUrlRepository.create(
      imgUrls.map((url) => ({ url })),
    );

    return await this.productImgUrlRepository.save(newUrls);
  }
}
