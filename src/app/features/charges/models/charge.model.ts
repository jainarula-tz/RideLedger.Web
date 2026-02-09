export interface ChargeFormData {
  rideId: string;
  fareAmount: number;
  serviceDate: Date;
  description: string;
  accountId: string;
}

export interface ChargeRequest {
  rideId: string;
  accountId: string;
  fareAmount: number;
  serviceDate: string; // ISO date string for API
  description: string;
}

export interface ChargeResponse {
  transactionId: string;
  accountId: string;
  rideId: string;
  fareAmount: number;
  recordedAt: Date;
}
