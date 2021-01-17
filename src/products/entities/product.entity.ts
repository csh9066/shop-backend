import { ProductImgUrl } from './product-img-url.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ProductTag } from './product-tag.entity';

export enum ProductCategory {
  BEAUTY = 'beauty',
  MENS_CLOTHING = 'mens_clothing',
  WOMEN_CLOTHING = 'women_clothing',
  BOOK = 'book',
  CAMERA = 'camera',
  INSTRUMENT = 'instrument',
  BABY = 'baby',
  HOUSEHOLD_GOODS = 'household_goods',
  HANDMADE = 'handmade',
  DIGITAL = 'digital',
  TICKET = 'ticket',
  FURNITURE = 'furniture',
  GAME = 'game',
  FOOD = 'food',
}

export enum ProductStatus {
  USED = 'used',
  NEW = 'new',
  ALMOST_NEW = 'almost_new',
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column({ type: 'enum', enum: ProductCategory })
  category: ProductCategory;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: ProductStatus })
  status: ProductStatus;

  @Column()
  price: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => ProductTag, (tag) => tag.product, {
    nullable: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  tags: ProductTag[];

  @OneToMany(() => ProductImgUrl, (imgUrl) => imgUrl.product, {
    onDelete: 'CASCADE',
    eager: true,
  })
  imgUrls: ProductImgUrl[];

  @ManyToOne(() => User, (user) => user.products)
  owner: User;
}
