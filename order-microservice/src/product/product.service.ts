import { ConflictException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ResponseHandler } from 'src/common/utils/response-handler';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }
  async create(createProductDto: CreateProductDto) {
    const { name, price, description, imageUrl, stock, isActive } = createProductDto;
    // check if product already exists
    const productExists = await this.productRepository.findOne({ where: { name } });
    if (productExists) {
      throw new ConflictException('Product already exists');
    }
    // create product
    const product = this.productRepository.create({
      name,
      price,
      description,
      imageUrl,
      stock,
      isActive,
    });
    // save product
    await this.productRepository.save(product);
    return ResponseHandler.successResponse(
      product,
      'Product created successfully',
      201,
    );
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
