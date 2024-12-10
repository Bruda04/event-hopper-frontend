import {SimpleCategoryDTO} from '../../admin-dashboard/model/simpleCategoryDTO.model';
import {SimpleEventTypeDTO} from '../../admin-dashboard/model/simpleEventTypeDTO.model';

interface SimplePriceDTO {
  id: string;
  price: number;
  discount: number;
  finalPrice: number;
  timestamp: string;
}

export interface ServiceManagementDTO {
    id?: string
    name: string;
    description: string;
    price: SimplePriceDTO;
    visible: boolean;
    available: boolean;
    durationMinutes: number;
    cancellationWindowDays: number;
    reservationWindowDays: number;
    autoAccept: boolean;
    category: SimpleCategoryDTO;
    eventType: SimpleEventTypeDTO[];
}
