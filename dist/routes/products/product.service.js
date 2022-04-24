"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ProductsService = class ProductsService {
    constructor(ProductModel) {
        this.ProductModel = ProductModel;
    }
    async create(userInfo, createProductDto) {
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
        });
        const productCreated = await createProduct.save();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Product created successfully.",
            data: productCreated
        };
    }
    async findAll(userInfo, queryString) {
        var _a, _b;
        let pageOptions = {
            page: queryString.page || 0,
            limit: (queryString.limit ? (queryString.limit > 100 ? 100 : queryString.limit) : 25),
            status: (queryString.status && ['active', 'inactive'].includes(queryString.status) ? queryString.status : "active"),
        };
        let modelParameter = {
            organization: userInfo.organization._id,
            tuckshop: (_a = queryString.tuckshop) !== null && _a !== void 0 ? _a : '',
            status: (_b = pageOptions.status) !== null && _b !== void 0 ? _b : 'active',
            isDeleted: false
        };
        if (!queryString.tuckshop)
            delete modelParameter.tuckshop;
        const productsCount = await this.ProductModel.countDocuments(modelParameter).exec();
        const Products = await this.ProductModel.find(modelParameter)
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit * 1)
            .exec();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Products fetched successfully.",
            data: Products,
            pagination: {
                total: productsCount,
                pages: Math.ceil(productsCount / pageOptions.limit),
                page: pageOptions.page,
                limit: pageOptions.limit
            }
        };
    }
    async findOne(userInfo, productId) {
        let modelParameter = {
            _id: productId,
            organization: userInfo.organization._id,
            isDeleted: false
        };
        const result = await this.ProductModel.findOne({ modelParameter });
        if (!result) {
            return {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: "Product does not exist.",
            };
        }
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Product fetched successfully.",
            data: result
        };
    }
    async update(userInfo, classId, updateProductDto) {
        const updateProduct = await this.ProductModel.findOne({
            _id: classId,
            organization: userInfo.organization._id,
            isDeleted: false
        });
        if (!updateProduct) {
            return {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: "Product does not exist.",
            };
        }
        if (updateProductDto.name)
            updateProduct.name = updateProductDto.name;
        if (updateProductDto.category)
            updateProduct.category = updateProductDto.category;
        if (updateProductDto.price)
            updateProduct.price = updateProductDto.price;
        if (updateProductDto.description)
            updateProduct.description = updateProductDto.description;
        if (updateProductDto.quantity)
            updateProduct.quantity = updateProductDto.quantity;
        if (updateProductDto.sku)
            updateProduct.sku = updateProductDto.sku;
        if (updateProductDto.imageUrl)
            updateProduct.imageUrl = updateProductDto.imageUrl;
        if (updateProductDto.status)
            updateProduct.status = updateProductDto.status;
        updateProduct.updatedAt = new Date();
        await updateProduct.save();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Product updated successfully.",
            data: updateProduct
        };
    }
    async remove(userInfo, productId) {
        const removeProduct = await this.ProductModel.findOne({
            _id: productId,
            organization: userInfo.organization._id,
            isDeleted: false
        }).exec();
        if (!removeProduct) {
            return {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: "Product does not exist.",
            };
        }
        removeProduct.isDeleted = true;
        removeProduct.deletedAt = new Date();
        removeProduct.updatedAt = new Date();
        await removeProduct.save();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Product deleted successfully.",
        };
    }
};
ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Product')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=product.service.js.map