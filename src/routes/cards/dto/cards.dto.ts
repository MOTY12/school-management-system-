import { Type } from "class-transformer";
import { IsDateString, IsIn, IsMongoId, IsNotEmpty, IsNumber, IsNumberString, IsObject, IsOptional, IsString, ValidateIf } from "class-validator";
import { ObjectId } from "mongoose";

export class GuestDto {
    @IsString()
    @IsNotEmpty()
    readonly name: String;

    @IsString()
    @IsOptional()
    readonly emailAddress: String;

    @IsString()
    @IsNotEmpty()
    readonly phoneNumber: String;

    @IsNumber()
    @IsNotEmpty()
    readonly amount: Number;

} 

export class AssignCardDto {
    @IsIn(['student', 'special'])
    @IsNotEmpty()
    readonly cardType: 'student' | 'special';

    @IsString()
    @IsNotEmpty()
    readonly cardNumber: String;

    @IsMongoId()
    @ValidateIf(n => n.assignmentType === 'student')
    readonly student: String;
    
    @IsObject()
    @ValidateIf(n => n.assignmentType === 'special')
    @Type(() => GuestDto)
    readonly guest: GuestDto;
}

export class UpdateCardDto {
    @IsIn(['active', 'inactive', 'blocked', 'stolen', 'lost'])
    @IsNotEmpty()
    readonly status: 'active' | 'inactive' | 'blocked' | 'stolen' | 'lost';
}

export class GetAllCardsDto {
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
    @IsIn(['student', 'special'])
    readonly cardType: 'student' | 'special';

    @IsOptional()
    @IsDateString()
    fromDate: any

    @IsOptional()
    @IsDateString()
    toDate: any
}

export class GetCardDto {
    @IsMongoId()
    readonly cardId: string;
}

export class GetCardTransactionDto {
    @IsMongoId()
    readonly cardId: string;

    @IsMongoId()
    @IsOptional()
    readonly transactionId: string;
}


export class CreateCardTransactionDto {

    @IsNotEmpty()
    @IsIn(['topup', 'purchase', 'withdrawal'])
    readonly transactionType: 'topup' | 'purchase'| 'withdrawal';

    @ValidateIf(n => n.transactionType === 'purchase')
    @IsMongoId()
    readonly order: ObjectId;

    @IsNotEmpty()
    @IsIn(['online', 'offline'])
    readonly transactionMode: 'online' | 'offline';

    @IsNumber()
    @IsNotEmpty()
    readonly amount:Number

    @IsString()
    @IsOptional()
    readonly narration: String

    @IsString()
    @IsOptional()
    readonly paymentReference: String

    @IsOptional()
    @IsString()
    readonly imageUrl: String

    @IsOptional()
    @IsIn(['successful', 'failed', 'pending', 'processing'])
    readonly status: 'successful' | 'failed' | 'pending' | 'processing'
}
