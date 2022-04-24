import { IsMongoId, IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator";


export class CreateBankDetailDto {
    @IsString()
    @IsNotEmpty()
    readonly accountName: String;

    @IsString()
    @IsNotEmpty()
    readonly accountNumber: String;

    @IsString()
    @IsNotEmpty()
    readonly bankCode: String;
}

export class GetAllBankDetailsDto {
    @IsOptional()
    @IsNumberString()
    readonly page: number;

    @IsOptional()
    @IsNumberString()
    readonly limit: number;

    @IsOptional()
    @IsString()
    readonly status: string;
}

export class GetBankDetailDto {
    @IsMongoId()
    @IsString()
    readonly bankDetailId: string;
}

export class UpdateBankDetailDto{

    @IsOptional()
    @IsString()
    accountName: String;

    @IsOptional()
    @IsString()
    accountNumber: String;

    @IsOptional()
    @IsString()
    bankCode: String;
}