export interface DecodedToken {
  id: string;
  role: string;
  [key: string]: any; // Allow additional fields if needed
}
