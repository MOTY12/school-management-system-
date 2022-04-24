import { isMongoId, IsMongoId, IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator";


export class CreateTuckshopDto {
    @IsMongoId()
    @IsNotEmpty()
    readonly user: String;

    @IsString()
    @IsNotEmpty()
    readonly name: String;

    @IsString()
    @IsNotEmpty()
    readonly location: String;

    @IsString()
    @IsNotEmpty()
    readonly category: String;

    @IsString()
    @IsOptional()
    readonly tuckshopID: String;

    @IsString()
    @IsOptional()
    readonly imageUrl: String;

}

export class GetTuckshopDto{
    @IsMongoId()
    @IsNotEmpty()
    readonly tuckshopId: string;
}


export class GetAllTuckshopssDto{
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



export class UpdateTuckshopDto{
    @IsOptional()
    @IsString()
    user: String;

    @IsOptional()
    @IsString()
    name: String;

    @IsOptional()
    @IsString()
    location: String;

    @IsOptional()
    @IsString()
    category: String;

    @IsOptional()
    @IsString()
    tuckshopID: String;

    @IsOptional()
    @IsString()
    imageUrl: String;
}
