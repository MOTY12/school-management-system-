declare class AddressDto {
    readonly street: String;
    readonly city: String;
    readonly state: String;
    readonly country: String;
}
export declare class CreateOrganizationDto {
    readonly name: String;
    readonly phoneNumber: String;
    readonly emailAddress: String;
    readonly adminFirstName: String;
    readonly adminLastName: String;
    readonly adminEmailAddress: String;
    readonly logoUrl: String;
    readonly address: AddressDto;
}
export declare class UpdateOrganizationDto {
    readonly name: String;
    readonly phoneNumber: String;
    readonly emailAddress: String;
    readonly logoUrl: String;
    readonly address: AddressDto;
}
export declare class GetOrganizationDto {
    readonly organizationId: string;
}
export {};
