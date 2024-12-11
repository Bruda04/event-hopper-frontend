export interface UpdateServiceDTO {
  name: string;
  description: string;
  pictures: string[];
  available: boolean;
  visible: boolean;
  eventTypesIds: string[];
  durationMinutes: number;
  reservationWindowDays: number;
  cancellationWindowDays: number;
  autoAccept: boolean;
}
