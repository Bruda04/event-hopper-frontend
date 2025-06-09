export interface CreateProductDTO {
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
}
