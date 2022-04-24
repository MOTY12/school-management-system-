export declare class CreateSessionDto {
    name: String;
    term: String;
    status: any;
}
export declare class GetAllSessionDto {
    readonly page: number;
    readonly limit: number;
    readonly status: string;
}
export declare class GetSessionDto {
    readonly sessionId: string;
}
export declare class UpdateSessionDto {
    name: String;
    term: String;
    status: String;
}
