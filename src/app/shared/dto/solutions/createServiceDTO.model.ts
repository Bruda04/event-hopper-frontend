export interface CreateServiceDTO {
  name: string;
  description: string;
  pictures: string[];
  available: boolean;
  visible: boolean;
  basePrice: number;
  discount: number;
  finalPrice: number;
  categoryId: string;
  eventTypesIds: string[];
  durationMinutes: number;
  reservationWindowDays: number;
  cancellationWindowDays: number;
  autoAccept: boolean;
}
