import {SimplePriceDTO} from '../prices/simplePriceDTO.model';
import {SimpleCategoryDTO} from '../categories/simpleCategoryDTO.model';
import {SimpleEventTypeDTO} from '../eventTypes/SimpleEventTypeDTO.model';
import {SimpleServiceProviderDTO} from '../users/serviceProvider/SimpleServiceProviderDTO.model';
import {SimpleCommentDTO} from '../comments/simpleCommentDTO.model';
import {ConversationPreviewDTO} from '../messages/conversationPreviewDTO.model';
import {SimpleEventDTO} from '../events/simpleEventDTO.model';


export interface SolutionDetailsDTO {
  id: string;
  name: string;
  description: string;
  price: SimplePriceDTO;
  category: SimpleCategoryDTO;
  eventTypes: SimpleEventTypeDTO[];
  available: boolean;
  pictures: string[];
  provider: SimpleServiceProviderDTO;
  rating: number;
  comments: SimpleCommentDTO[];
  service: boolean;
  durationMinutes: number;
  reservationWindowDays: number;
  cancellationWindowDays: number;
  favorite: boolean;
  pendingComment: boolean;
  pendingRating: boolean;
  conversationInitialization: ConversationPreviewDTO;
  applicableEvents: SimpleEventDTO[];
}
