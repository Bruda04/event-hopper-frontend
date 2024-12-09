import {SimpleEventTypeDTO} from './simpleEventTypeDTO.model';

export interface UpdateCategoryDTO {
    name: string;
    description: string;
    status: string;
    eventTypesIds: string[];
}
