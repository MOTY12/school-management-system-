import { Type } from "class-transformer";
import { IsArray, IsMongoId, IsIn, IsNotEmpty, IsNumber, IsNumberString, IsObject, IsOptional, isString, IsString, Validate, ValidateNested, ValidateIf, validate, isMongoId } from "class-validator"

export class GuestDto{
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsIn(['staff', 'non-staff'])
    @IsNotEmpty()
    readonly customerType: String
}

export class ProductDto {
    @IsMongoId()
    @IsNotEmpty()
    readonly product: String;
    
    @IsNumber()
    @IsNotEmpty()
    readonly quantity: Number;
}

export class CreateOrderDto{
    @IsOptional()
    @IsMongoId()
    readonly tuckshop: String;

    @IsMongoId()
    @ValidateIf((o) => o.orderMode === 'online')
    readonly assignedCard: String;

    @IsOptional()
    @IsIn(['online', 'offline'])
    readonly orderMode: 'online' | 'offline';

    @IsObject()
    @ValidateIf((o) => o.orderMode === 'offline')
    @ValidateNested()
    @Type(() => GuestDto)
    readonly guest: GuestDto;
    
    @IsNotEmpty()
    @IsArray()
    @ValidateNested()
    readonly products: ProductDto[]
}

export class GetAllOrdersDto{
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
    readonly student: string;

    @IsOptional()
    @IsMongoId()
    readonly tuckshop: string;
}


export class GetOrderDto{
    @IsMongoId()
    @IsString()
    readonly orderId: string;
}

export class GetAllOrderItemsDto{
    @IsOptional()
    @IsString()
    readonly orderId: string;

}