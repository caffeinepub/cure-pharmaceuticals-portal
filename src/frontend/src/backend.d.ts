import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type LeadId = bigint;
export interface LeadInquiry {
    country: string;
    fullName: string;
    email: string;
    message: string;
    timestamp: bigint;
    productInterest: string;
    phone: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteLeadById(id: LeadId): Promise<void>;
    filterLeadsByCountry(country: string): Promise<Array<[LeadId, LeadInquiry]>>;
    filterLeadsByProductInterest(productInterest: string): Promise<Array<[LeadId, LeadInquiry]>>;
    getAllLeads(): Promise<Array<[LeadId, LeadInquiry]>>;
    getCallerUserRole(): Promise<UserRole>;
    getLeadById(id: LeadId): Promise<LeadInquiry>;
    isCallerAdmin(): Promise<boolean>;
    searchLeads(keyword: string): Promise<Array<[LeadId, LeadInquiry]>>;
    submitInquiry(inquiry: LeadInquiry): Promise<boolean>;
    totalLeadsCount(): Promise<bigint>;
}
