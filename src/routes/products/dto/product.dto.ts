import { isMongoId, IsMongoId, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
   
    @IsMongoId()
    @IsNotEmpty()
    tuckshop: String;

    @IsString()
    @IsNotEmpty()
    name: String;

    @IsString()
    @IsNotEmpty()
    category: String;

    @IsNumberString()
    @IsNotEmpty()
    price: number;

    @IsNumberString()
    @IsNotEmpty()
    quantity: number;

    @IsString()
    @IsOptional()
    sku: String;

    @IsString()
    @IsNotEmpty()
    description: String;

    @IsString()
    @IsOptional()
    imageUrl:String;
}


export class GetProductDto {
    @IsMongoId()
    readonly productId: string;
}

export class GetAllProductDto {
    @IsOptional()
    @IsNumberString()
    readonly page: number;

    @IsOptional()
    @IsNumberString()
    readonly limit: number;

    @IsOptional()
    @IsString()
    readonly status: string;

    @IsOptional()
    @IsMongoId()
    tuckshop: string;
}

export class UpdateProductDto {
   
    @IsOptional()
    @IsMongoId()
    tuckshop: String;

    @IsOptional()
    @IsString()
    name: String;

    @IsString()
    @IsOptional()
    category: String;

    @IsNumber()
    @IsOptional()
    price: number;

    @IsNumberString()
    @IsOptional()
    quantity: number;

    @IsNumberString()
    @IsOptional()
    sku: String;

    @IsNumberString()
    @IsOptional()
    description: String;

    @IsNumberString()
    @IsOptional()
    imageUrl:String;

    @IsNumberString()
    @IsOptional()
    status: String;
}