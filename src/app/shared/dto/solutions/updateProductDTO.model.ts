export interface UpdateProductDTO {
  name: string;
  description: string;
  pictures: string[];
  available: boolean;
  visible: boolean;
  eventTypesIds: string[];
}
