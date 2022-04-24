export declare class CreateBankDetailDto {
    readonly accountName: String;
    readonly accountNumber: String;
    readonly bankCode: String;
}
export declare class GetAllBankDetailsDto {
    readonly page: number;
    readonly limit: number;
    readonly status: string;
}
export declare class GetBankDetailDto {
    readonly bankDetailId: string;
}
export declare class UpdateBankDetailDto {
    accountName: String;
    accountNumber: String;
    bankCode: String;
}
