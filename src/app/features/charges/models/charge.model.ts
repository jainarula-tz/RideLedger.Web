export interface ChargeFormData {
  rideId: string;
  fareAmount: number;
  serviceDate: Date;
  fleetId: string;
  accountId: string;
}

export interface ChargeRequest {
  rideId: string;
  accountId: string;
  amount: number; // Changed from fareAmount to match backend
  serviceDate: string; // ISO date string for API
  fleetId: string; // Added required field
}

export interface ChargeResponse {
  ledgerEntryId: string; // Changed from transactionId to match backend
  accountId: string;
  rideId: string;
  amount: number; // Changed from fareAmount
  currency: string;
  serviceDate: Date;
  recordedAt: Date;
}
