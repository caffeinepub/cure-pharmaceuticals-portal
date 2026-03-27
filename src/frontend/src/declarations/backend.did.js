/* eslint-disable */

// @ts-nocheck

import { IDL } from '@icp-sdk/core/candid';

export const UserRole = IDL.Variant({
  'admin' : IDL.Null,
  'user' : IDL.Null,
  'guest' : IDL.Null,
});
export const LeadId = IDL.Nat;
export const LeadInquiry = IDL.Record({
  'country' : IDL.Text,
  'fullName' : IDL.Text,
  'email' : IDL.Text,
  'message' : IDL.Text,
  'timestamp' : IDL.Int,
  'productInterest' : IDL.Text,
  'phone' : IDL.Text,
});
export const ShowcaseImageId = IDL.Nat;
export const ShowcaseImage = IDL.Record({
  'url' : IDL.Text,
  'caption' : IDL.Text,
  'addedAt' : IDL.Int,
});

export const idlService = IDL.Service({
  '_initializeAccessControlWithSecret' : IDL.Func([IDL.Text], [], []),
  'assignCallerUserRole' : IDL.Func([IDL.Principal, UserRole], [], []),
  'deleteLeadById' : IDL.Func([LeadId], [], []),
  'filterLeadsByCountry' : IDL.Func(
      [IDL.Text],
      [IDL.Vec(IDL.Tuple(LeadId, LeadInquiry))],
      ['query'],
    ),
  'filterLeadsByProductInterest' : IDL.Func(
      [IDL.Text],
      [IDL.Vec(IDL.Tuple(LeadId, LeadInquiry))],
      ['query'],
    ),
  'getAllLeads' : IDL.Func(
      [],
      [IDL.Vec(IDL.Tuple(LeadId, LeadInquiry))],
      ['query'],
    ),
  'getCallerUserRole' : IDL.Func([], [UserRole], ['query']),
  'getLeadById' : IDL.Func([LeadId], [LeadInquiry], ['query']),
  'isCallerAdmin' : IDL.Func([], [IDL.Bool], ['query']),
  'searchLeads' : IDL.Func(
      [IDL.Text],
      [IDL.Vec(IDL.Tuple(LeadId, LeadInquiry))],
      ['query'],
    ),
  'submitInquiry' : IDL.Func([LeadInquiry], [IDL.Bool], []),
  'totalLeadsCount' : IDL.Func([], [IDL.Nat], ['query']),
  'addShowcaseImage' : IDL.Func([IDL.Text, IDL.Text], [ShowcaseImageId], []),
  'getAllShowcaseImages' : IDL.Func(
      [],
      [IDL.Vec(IDL.Tuple(ShowcaseImageId, ShowcaseImage))],
      ['query'],
    ),
  'deleteShowcaseImage' : IDL.Func([ShowcaseImageId], [], []),
});

export const idlInitArgs = [];

export const idlFactory = ({ IDL }) => {
  const UserRole = IDL.Variant({
    'admin' : IDL.Null,
    'user' : IDL.Null,
    'guest' : IDL.Null,
  });
  const LeadId = IDL.Nat;
  const LeadInquiry = IDL.Record({
    'country' : IDL.Text,
    'fullName' : IDL.Text,
    'email' : IDL.Text,
    'message' : IDL.Text,
    'timestamp' : IDL.Int,
    'productInterest' : IDL.Text,
    'phone' : IDL.Text,
  });
  const ShowcaseImageId = IDL.Nat;
  const ShowcaseImage = IDL.Record({
    'url' : IDL.Text,
    'caption' : IDL.Text,
    'addedAt' : IDL.Int,
  });
  
  return IDL.Service({
    '_initializeAccessControlWithSecret' : IDL.Func([IDL.Text], [], []),
    'assignCallerUserRole' : IDL.Func([IDL.Principal, UserRole], [], []),
    'deleteLeadById' : IDL.Func([LeadId], [], []),
    'filterLeadsByCountry' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(IDL.Tuple(LeadId, LeadInquiry))],
        ['query'],
      ),
    'filterLeadsByProductInterest' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(IDL.Tuple(LeadId, LeadInquiry))],
        ['query'],
      ),
    'getAllLeads' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(LeadId, LeadInquiry))],
        ['query'],
      ),
    'getCallerUserRole' : IDL.Func([], [UserRole], ['query']),
    'getLeadById' : IDL.Func([LeadId], [LeadInquiry], ['query']),
    'isCallerAdmin' : IDL.Func([], [IDL.Bool], ['query']),
    'searchLeads' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(IDL.Tuple(LeadId, LeadInquiry))],
        ['query'],
      ),
    'submitInquiry' : IDL.Func([LeadInquiry], [IDL.Bool], []),
    'totalLeadsCount' : IDL.Func([], [IDL.Nat], ['query']),
    'addShowcaseImage' : IDL.Func([IDL.Text, IDL.Text], [ShowcaseImageId], []),
    'getAllShowcaseImages' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(ShowcaseImageId, ShowcaseImage))],
        ['query'],
      ),
    'deleteShowcaseImage' : IDL.Func([ShowcaseImageId], [], []),
  });
};

export const init = ({ IDL }) => { return []; };
