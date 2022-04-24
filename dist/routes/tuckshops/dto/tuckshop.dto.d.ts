export declare class CreateTuckshopDto {
    readonly user: String;
    readonly name: String;
    readonly location: String;
    readonly category: String;
    readonly tuckshopID: String;
    readonly imageUrl: String;
}
export declare class GetTuckshopDto {
    readonly tuckshopId: string;
}
export declare class GetAllTuckshopssDto {
    readonly page: number;
    readonly limit: number;
    readonly status: string;
}
export declare class UpdateTuckshopDto {
    user: String;
    name: String;
    location: String;
    category: String;
    tuckshopID: String;
    imageUrl: String;
}
