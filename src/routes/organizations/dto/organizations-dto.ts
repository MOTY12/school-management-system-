import { Type } from "class-transformer";
import { IsMongoId, IsNotEmpty, IsObject, IsOptional, IsString, MaxLength, MinLength, ValidateNested } from "class-validator";

class AddressDto {
    @IsString()
    readonly street: String;

    @IsString()
    readonly city: String;

    @IsString()
    readonly state: String;

    @IsString()
    readonly country: String;
}

export class CreateOrganizationDto {

    @IsString()
    @IsNotEmpty()
    readonly name: String;

    @IsOptional()
    @IsString()
    readonly phoneNumber: String;

    @IsNotEmpty()
    @IsString()
    readonly emailAddress: String;

    @IsNotEmpty()
    @IsString()
    readonly adminFirstName: String

    @IsNotEmpty()
    @IsString()
    readonly adminLastName: String

    @IsNotEmpty()
    @IsString()
    readonly adminEmailAddress: String;

    @IsOptional()
    @IsString()
    readonly logoUrl: String;

    @IsNotEmpty()
    @IsObject()
    @ValidateNested()
    @Type(() => AddressDto)
    readonly address: AddressDto
}

export class UpdateOrganizationDto {
    @IsOptional()
    @IsString()
    readonly name: String;
    
    @IsOptional()
    @IsString()
    readonly phoneNumber: String;

    @IsOptional()
    @IsString()
    readonly emailAddress: String;

    @IsOptional()
    @IsString()
    readonly logoUrl: String;

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => AddressDto)
    readonly address: AddressDto
}

export class GetOrganizationDto {
    @IsMongoId()
    readonly organizationId: string;
}