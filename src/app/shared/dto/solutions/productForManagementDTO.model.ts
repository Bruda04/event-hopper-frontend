import {SimplePriceDTO} from '../prices/simplePriceDTO.model';
import {SimpleCategoryDTO} from '../categories/simpleCategoryDTO.model';
import {ProductStatus} from '../../model/productStatus.model';
import {SimpleEventTypeDTO} from '../eventTypes/SimpleEventTypeDTO.model';

export interface ProductForManagementDTO {
  id: string;
  name: string;
  description: string;
  pictures: string[];
  isAvailable: boolean;
  isVisible: boolean;
  status: ProductStatus;
  price: SimplePriceDTO;
  category: SimpleCategoryDTO;
  eventTypes: SimpleEventTypeDTO[];
}
