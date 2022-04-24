import { IsString, IsNotEmpty, IsOptional, IsIn, IsMongoId, IsDateString, IsNumberString } from "class-validator";
import { ObjectId } from "mongoose";


export class CreateStudentDto {
    @IsString()
    @IsNotEmpty()
    readonly firstName: String;

    @IsString()
    @IsOptional()
    readonly middleName: String;

    @IsString()
    @IsNotEmpty()
    readonly lastName: String;

    @IsMongoId()
    @IsNotEmpty()
    readonly class: ObjectId;

    @IsNotEmpty()
    @IsString()
    readonly guardianFirstName: String

    @IsNotEmpty()
    @IsString()
    readonly guardianLastName: String

    @IsNotEmpty()
    @IsString()
    readonly guardianEmailAddress: String;

    @IsOptional()
    @IsDateString()
    readonly dateOfBirth: Date;

    @IsOptional()
    @IsString()
    readonly imageUrl: String;
}

export class UpdateStudentDto {
    @IsString()
    @IsOptional()
    readonly firstName: String;

    @IsString()
    @IsOptional()
    readonly middleName: String;

    @IsString()
    @IsOptional()
    readonly lastName: String;

    @IsMongoId()
    @IsOptional()
    readonly class: ObjectId;

    @IsNotEmpty()
    @IsOptional()
    readonly guardianFirstName: String

    @IsNotEmpty()
    @IsOptional()
    readonly guardianLastName: String

    @IsNotEmpty()
    @IsOptional()
    readonly guardianEmailAddress: String;

    @IsOptional()
    @IsDateString()
    readonly dateOfBirth: Date;

    @IsOptional()
    @IsString()
    readonly studentID: String;

    @IsOptional()
    @IsString()
    readonly imageUrl: String;

    @IsOptional()
    @IsIn(['active', 'inactive'])
    readonly status: String;
}

export class GetAllStudentsDto {
    @IsOptional()
    @IsNumberString()
    readonly page: number;

    @IsOptional()
    @IsNumberString()
    readonly limit: number;

    @IsOptional()
    @IsMongoId()
    readonly guardian: string;

    @IsOptional()
    @IsMongoId()
    readonly class: string;
}

export class GetStudentDto {
    @IsMongoId()
    readonly studentId: string;
}
