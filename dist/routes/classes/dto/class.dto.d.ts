export declare class CreateClassDto {
    name: String;
    level: String;
    type: String;
    classHead: String;
    imageUrl: String;
}
export declare class UpdateClassDto {
    name: String;
    level: String;
    type: String;
    classHead: String;
    imageUrl: String;
}
export declare class GetClassDto {
    readonly classId: string;
}
export declare class GetAllClassesDto {
    readonly page: number;
    readonly limit: number;
    readonly type: string;
}
