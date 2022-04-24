import { IsIn, IsMongoId, IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator";


export class CreateSessionDto{

    @IsString()
    @IsNotEmpty()
    name: String;

    @IsString()
    @IsIn(["1st", "2nd", "3rd"])
    term: String;

    @IsOptional()
    @IsString()
    @IsIn(["active", "inactive"])
    status
}

export class GetAllSessionDto{
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

export class GetSessionDto {
    @IsMongoId()
    @IsString()
    readonly sessionId: string;
}

export class UpdateSessionDto{

    @IsString()
    @IsOptional()
    name: String;

    @IsOptional()
    @IsString()
    @IsIn(["1st", "2nd", "3rd"])
    term: String;

    @IsOptional()
    @IsString()
    @IsIn(["active", "inactive"])
    status: String;
}