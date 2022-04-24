import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateProductDto, GetAllProductDto, UpdateProductDto } from "./dto/product.dto";
import { Product } from "./interfaces/product.interface";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly ProductModel: Model<Product>) { }
  async create(userInfo: any, createProductDto: CreateProductDto) {
    let createProduct = new this.ProductModel({
      organization: userInfo.organization._id,
      tuckshop: createProductDto.tuckshop,
      name: createProductDto.name,
      category: createProductDto.category,
      price: createProductDto.price,
      quantity: createProductDto.quantity,
      sku: createProductDto.sku,
      description: createProductDto.description,
      imageUrl: createProductDto.imageUrl,
    })
    const productCreated = await createProduct.save()
    return {
      statusCode: HttpStatus.OK,
      message: "Product created successfully.",
      data: productCreated
    }
  }


  //find all products by tuckshop 
  async findAll(userInfo: any, queryString: GetAllProductDto) {
    let pageOptions = {
      page: queryString.page || 0,
      limit: (queryString.limit ? (queryString.limit > 100 ? 100 : queryString.limit) : 25),
      status: (queryString.status && ['active', 'inactive'].includes(queryString.status) ? queryString.status : "active"),
    }
    let modelParameter: any = {
      organization: userInfo.organization._id,
      tuckshop: queryString.tuckshop ?? '',
      status: pageOptions.status ?? 'active',
      isDeleted: false
    };
    if(!queryString.tuckshop) delete modelParameter.tuckshop;

    const productsCount = await this.ProductModel.countDocuments(modelParameter).exec();
    const Products = await this.ProductModel.find(modelParameter)
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit * 1)
      .exec();

    return {
      statusCode: HttpStatus.OK,
      message: "Products fetched successfully.",
      data: Products,
      pagination: {
        total: productsCount,
        pages: Math.ceil(productsCount / pageOptions.limit),
        page: pageOptions.page,
        limit: pageOptions.limit
      }
    }
  }


  async findOne(userInfo: any, productId: string) {
    let modelParameter: any = {
      _id: productId,
      organization: userInfo.organization._id,
      isDeleted: false
    };

    const result = await this.ProductModel.findOne({ modelParameter })
    if (!result) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Product does not exist.",
      }
    }
    return {
      statusCode: HttpStatus.OK,
      message: "Product fetched successfully.",
      data: result
    }
  }

  async update(userInfo: any, classId: string, updateProductDto: UpdateProductDto) {

    const updateProduct = await this.ProductModel.findOne({
      _id: classId,
      organization: userInfo.organization._id,
      isDeleted: false
    })
    if (!updateProduct) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Product does not exist.",
      }
    }
    if (updateProductDto.name) updateProduct.name = updateProductDto.name;
    if (updateProductDto.category) updateProduct.category = updateProductDto.category;
    if (updateProductDto.price) updateProduct.price = updateProductDto.price;
    if (updateProductDto.description) updateProduct.description = updateProductDto.description;
    if (updateProductDto.quantity) updateProduct.quantity = updateProductDto.quantity;
    if (updateProductDto.sku) updateProduct.sku = updateProductDto.sku;
    if (updateProductDto.imageUrl) updateProduct.imageUrl = updateProductDto.imageUrl;
    if (updateProductDto.status) updateProduct.status = updateProductDto.status;
    updateProduct.updatedAt = new Date();
    await updateProduct.save();
    return {
      statusCode: HttpStatus.OK,
      message: "Product updated successfully.",
      data: updateProduct
    }
  }

  //delete products
  async remove(userInfo: any, productId: string) {
    const removeProduct = await this.ProductModel.findOne({
      _id: productId,
      organization: userInfo.organization._id,
      isDeleted: false
    }).exec();
    if (!removeProduct) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Product does not exist.",
      }
    }

    removeProduct.isDeleted = true;
    removeProduct.deletedAt = new Date();
    removeProduct.updatedAt = new Date();
    await removeProduct.save();
    return {
      statusCode: HttpStatus.OK,
      message: "Product deleted successfully.",
    }
  }







}