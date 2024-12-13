import {SimplePriceDTO} from '../prices/simplePriceDTO.model';
import {SimpleCategoryDTO} from '../categories/simpleCategoryDTO.model';
import {SimpleEventTypeDTO} from '../eventTypes/simpleEventTypeDTO.model';

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
    eventTypes: SimpleEventTypeDTO[];
    pictures: string[];
}
