import { IsString, IsNotEmpty, IsOptional, IsMongoId, IsDateString, IsNumberString, IsIn, IsNumber, IsBoolean, IsBooleanString } from "class-validator";
import { ObjectId } from "mongoose";


export class CreateTuitionDto {
    @IsNotEmpty()
    @IsString()
    readonly tuitionName: String

    @IsMongoId()
    @IsNotEmpty()
    readonly session: ObjectId;

    @IsNotEmpty()
    @IsIn(["1st", "2nd", "3rd"])
    term: String;

    @IsMongoId()
    @IsNotEmpty()
    readonly bankDetails: ObjectId;

    @IsMongoId()
    @IsOptional()
    readonly class: ObjectId;

    @IsNotEmpty()
    @IsNumber()
    readonly amount: Number

    @IsNotEmpty()
    @IsString()
    readonly currency: String;

    @IsOptional()
    @IsString()
    readonly description: String;
}

export class UpdateTuitionDto {

    @IsMongoId()
    @IsOptional()
    readonly bankDetails: ObjectId;

    @IsOptional()
    @IsString()
    readonly description: String;

    @IsOptional()
    @IsIn(['active', 'inactive'])
    readonly status: String;
}

export class GetAllTuitionsDto {
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
    readonly session: string;

    @IsOptional()
    @IsMongoId()
    readonly class: string;

    @IsOptional()
    @IsMongoId()
    readonly bankDetails: string;
}

export class GetAssignedTuitionsDto {
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
    readonly tuition: string;

    @IsOptional()
    @IsIn(['outstanding', 'complete', 'all'])
    readonly paymentProgress: string;
}

export class GetAllAssignedTuitionsDto {
    @IsOptional()
    @IsNumberString()
    readonly page: number;

    @IsOptional()
    @IsNumberString()
    readonly limit: number;

    @IsOptional()
    @IsMongoId()
    readonly student: string;
}

export class GetTuitionDto {
    @IsMongoId()
    readonly tuitionId: string;
}

export class CreateTuitionTransactionDto {
    @IsMongoId()
    @IsNotEmpty()
    readonly session: ObjectId;

    @IsNotEmpty()
    @IsIn(["1st", "2nd", "3rd"])
    term: String;

    @IsMongoId()
    @IsNotEmpty()
    readonly assignedTuition: ObjectId;

    @IsMongoId()
    @IsNotEmpty()
    readonly student: ObjectId;

    @IsNumber()
    @IsNotEmpty()
    amount:Number

    @IsString()
    @IsOptional()
    narration: String

    @IsString()
    @IsNotEmpty()
    paymentReference: String

    @IsNotEmpty()
    @IsIn(['online', 'offline'])
    paymentMode: String

    @IsOptional()
    @IsString()
    imageUrl: String
}

export class AssignTuitionToStudentDto {
    @IsNotEmpty()
    @IsMongoId()
    readonly student: string;

    @IsNotEmpty()
    @IsMongoId()
    readonly tuition: string;
}
