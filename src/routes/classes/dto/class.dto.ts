import { Type } from "class-transformer";
import { IsIn, IsMongoId, IsNotEmpty, IsNumberString, IsObject, IsOptional, IsString } from "class-validator";

export class CreateClassDto {

    @IsString()
    name: String;

    @IsString()
    level: String;

    @IsString()
    @IsIn(['class', 'alumni'])
    type: String;

    @IsString()
    classHead: String;

    @IsString()
    imageUrl: String;

}

export class UpdateClassDto {

    @IsOptional()
    @IsString()
    name: String;

    @IsOptional()
    @IsString()
    level: String;

    @IsOptional()
    @IsString()
    type: String;

    @IsOptional()
    @IsString()
    classHead: String;
    
    @IsOptional()
    @IsString()
    imageUrl: String;
}

export class GetClassDto {
    @IsMongoId()
    readonly classId: string;
}

export class GetAllClassesDto {
    @IsOptional()
    @IsNumberString()
    readonly page: number;

    @IsOptional()
    @IsNumberString()
    readonly limit: number;

    @IsOptional()
    @IsString()
    readonly type: string;
}