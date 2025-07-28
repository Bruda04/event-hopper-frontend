export interface EventType {
  id?: string;
  name: string;
  description?: string;
  events?: string[];
  suggestedSolutionCategories?: string[];
  isDeactivated: boolean;
}
