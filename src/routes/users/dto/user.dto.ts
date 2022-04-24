import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsOptional, IsObject, ValidateNested, IsIn, IsMongoId, IsNumber, IsNumberString } from "class-validator";

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

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    readonly firstName: String;

    readonly middleName: String;

    @IsString()
    @IsNotEmpty()
    readonly lastName: String;

    @IsOptional()
    @IsString()
    readonly phoneNumber: String;

    @IsNotEmpty()
    @IsString()
    readonly emailAddress: String;

    @IsString()
    readonly password: String;

    @IsIn(['Admin', 'Tuckshop', 'Guardian'], {
        message: 'role is required.'
    })
    readonly role: String

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => AddressDto)
    readonly address: AddressDto
}

export class UpdateUserDto {

    @IsOptional()
    @IsString()
    readonly firstName: String;

    @IsOptional()
    @IsString()
    readonly middleName: String;

    @IsOptional()
    @IsString()
    readonly lastName: String;

    @IsOptional()
    @IsString()
    readonly phoneNumber: String;

    @IsOptional()
    @IsString()
    readonly emailAddress: String;

    @IsOptional()
    @IsString()
    readonly imageUrl: String;

    @IsOptional()
    @IsIn(['Super-Admin', 'Admin', 'Tuckshop', 'Guardian'])
    readonly role: String

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => AddressDto)
    readonly address: AddressDto;

    readonly status: String;
}

export class GetUserDto {
    @IsMongoId()
    readonly userId: string;
}

export class GetAllUsersDto {

    @IsOptional()
    @IsNumberString()
    readonly page: number;

    @IsOptional()
    @IsNumberString()
    readonly limit: number;

    @IsOptional()
    @IsString()
    readonly role: string;
}

export class LoginDto {
    @IsString()
    readonly emailAddress: String;

    @IsString()
    readonly password: String;

    @IsString()
    readonly userAgent: String;
}

export class ResetPasswordDto {
    @IsString()
    readonly emailAddress: String;

    @IsString()
    readonly password: String;

    @IsString()
    readonly userAgent: String;

    @IsString()
    readonly resetToken: String;
}

export class VerifyEmailDto {
    @IsString()
    readonly verificationToken: String;
}

export class ChangePasswordDto {
    @IsString()
    readonly oldPassword: String;
    
    @IsString()
    readonly newPassword: String;
}