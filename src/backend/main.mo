import Time "mo:core/Time";
import Int "mo:core/Int";
import Map "mo:core/Map";
import List "mo:core/List";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Persistent model
  public type LeadId = Nat;

  public type LeadInquiry = {
    fullName : Text;
    email : Text;
    phone : Text;
    country : Text;
    productInterest : Text;
    message : Text;
    timestamp : Int;
  };

  // Comparator for sorting leads
  module LeadInquiry {
    public func compare(a : (LeadId, LeadInquiry), b : (LeadId, LeadInquiry)) : Order.Order {
      Int.compare(b.1.timestamp, a.1.timestamp);
    };
  };

  // State
  let leads = Map.empty<LeadId, LeadInquiry>();

  // Functionality

  public shared ({ caller }) func submitInquiry(inquiry : LeadInquiry) : async Bool {
    let id = leads.size();
    let lead : LeadInquiry = {
      fullName = inquiry.fullName;
      email = inquiry.email;
      phone = inquiry.phone;
      country = inquiry.country;
      productInterest = inquiry.productInterest;
      message = inquiry.message;
      timestamp = Time.now();
    };
    leads.add(id, lead);
    true;
  };

  public query ({ caller }) func getAllLeads() : async [(LeadId, LeadInquiry)] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all leads");
    };
    leads.toArray().sort();
  };

  public shared ({ caller }) func deleteLeadById(id : LeadId) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete leads");
    };
    if (not leads.containsKey(id)) {
      Runtime.trap("Lead not found");
    };
    leads.remove(id);
  };

  public query ({ caller }) func searchLeads(keyword : Text) : async [(LeadId, LeadInquiry)] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can search leads");
    };
    leads.entries().filter(
      func((_, lead)) {
        let lowerKeyword = keyword.toLower();
        lead.fullName.contains(#text lowerKeyword) or
        lead.email.contains(#text lowerKeyword) or
        lead.phone.contains(#text lowerKeyword) or
        lead.country.contains(#text lowerKeyword) or
        lead.productInterest.contains(#text lowerKeyword) or
        lead.message.contains(#text lowerKeyword)
      }
    ).toArray().sort();
  };

  public query ({ caller }) func filterLeadsByCountry(country : Text) : async [(LeadId, LeadInquiry)] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can filter leads");
    };
    leads.entries().filter(
      func((_, lead)) {
        lead.country == country;
      }
    ).toArray().sort();
  };

  public query ({ caller }) func filterLeadsByProductInterest(productInterest : Text) : async [(LeadId, LeadInquiry)] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can filter leads");
    };
    leads.entries().filter(
      func((_, lead)) {
        lead.productInterest == productInterest;
      }
    ).toArray().sort();
  };

  public query ({ caller }) func totalLeadsCount() : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view lead statistics");
    };
    leads.size();
  };

  public query ({ caller }) func getLeadById(id : LeadId) : async LeadInquiry {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view lead details");
    };
    switch (leads.get(id)) {
      case (null) { Runtime.trap("Lead not found") };
      case (?lead) { lead };
    };
  };
};
