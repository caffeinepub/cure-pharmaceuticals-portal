/* eslint-disable */

// @ts-nocheck

import type { ActorMethod } from '@icp-sdk/core/agent';
import type { IDL } from '@icp-sdk/core/candid';
import type { Principal } from '@icp-sdk/core/principal';

export type LeadId = bigint;
export interface LeadInquiry {
  'country' : string,
  'fullName' : string,
  'email' : string,
  'message' : string,
  'timestamp' : bigint,
  'productInterest' : string,
  'phone' : string,
}
export type ShowcaseImageId = bigint;
export interface ShowcaseImage {
  'url' : string,
  'caption' : string,
  'addedAt' : bigint,
}
export type UserRole = { 'admin' : null } |
  { 'user' : null } |
  { 'guest' : null };
export interface _SERVICE {
  '_initializeAccessControlWithSecret' : ActorMethod<[string], undefined>,
  'assignCallerUserRole' : ActorMethod<[Principal, UserRole], undefined>,
  'deleteLeadById' : ActorMethod<[LeadId], undefined>,
  'filterLeadsByCountry' : ActorMethod<[string], Array<[LeadId, LeadInquiry]>>,
  'filterLeadsByProductInterest' : ActorMethod<
    [string],
    Array<[LeadId, LeadInquiry]>
  >,
  'getAllLeads' : ActorMethod<[], Array<[LeadId, LeadInquiry]>>,
  'getCallerUserRole' : ActorMethod<[], UserRole>,
  'getLeadById' : ActorMethod<[LeadId], LeadInquiry>,
  'isCallerAdmin' : ActorMethod<[], boolean>,
  'searchLeads' : ActorMethod<[string], Array<[LeadId, LeadInquiry]>>,
  'submitInquiry' : ActorMethod<[LeadInquiry], boolean>,
  'totalLeadsCount' : ActorMethod<[], bigint>,
  'addShowcaseImage' : ActorMethod<[string, string], ShowcaseImageId>,
  'getAllShowcaseImages' : ActorMethod<[], Array<[ShowcaseImageId, ShowcaseImage]>>,
  'deleteShowcaseImage' : ActorMethod<[ShowcaseImageId], undefined>,
}
export declare const idlService: IDL.ServiceClass;
export declare const idlInitArgs: IDL.Type[];
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
