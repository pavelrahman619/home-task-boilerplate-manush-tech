// src/product/product.controller.ts
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  // List products
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  // Create a product
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  // Edit product
  @Put(':id')
  update(@Param('id') id: string, @Body() createProductDto: CreateProductDto) {
    return this.productService.update(+id, createProductDto);
  }

  // Disable product
  @Put('disable/:id')
  disable(@Param('id') id: string) {
    return this.productService.disable(+id);
  }

  // Enable product
  @Put('enable/:id')
  enable(@Param('id') id: string) {
    return this.productService.enable(+id);
  }

  @Get('enabled')
  findAllEnabled() {
    return this.productService.findAllEnabled();
  }
}
