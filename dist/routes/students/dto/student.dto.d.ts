import { ObjectId } from "mongoose";
export declare class CreateStudentDto {
    readonly firstName: String;
    readonly middleName: String;
    readonly lastName: String;
    readonly class: ObjectId;
    readonly guardianFirstName: String;
    readonly guardianLastName: String;
    readonly guardianEmailAddress: String;
    readonly dateOfBirth: Date;
    readonly imageUrl: String;
}
export declare class UpdateStudentDto {
    readonly firstName: String;
    readonly middleName: String;
    readonly lastName: String;
    readonly class: ObjectId;
    readonly guardianFirstName: String;
    readonly guardianLastName: String;
    readonly guardianEmailAddress: String;
    readonly dateOfBirth: Date;
    readonly studentID: String;
    readonly imageUrl: String;
    readonly status: String;
}
export declare class GetAllStudentsDto {
    readonly page: number;
    readonly limit: number;
    readonly guardian: string;
    readonly class: string;
}
export declare class GetStudentDto {
    readonly studentId: string;
}
