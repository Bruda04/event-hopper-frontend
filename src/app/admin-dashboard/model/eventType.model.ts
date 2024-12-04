export interface EventType {
  id?: number;
  name: string;
  description?: string;
  events?: string[];
  suggestedSolutionCategories?: string[];
  isDeactivated: boolean;
}
