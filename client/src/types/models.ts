// Type definitions for the application models

export interface Document {
  id: string;
  original_title?: string;
  image_url?: string;
  authors?: string[];
  original_publication_year?: string | number;
  isbn?: string;
  average_rating?: string | number;
  ratings_count?: string | number;
  [key: string]: any; // Allow for additional dynamic properties
}

export interface SearchResult {
  document: Document;
  score?: number;
}

export interface FacetValue {
  value: string;
  count: number;
  selected: boolean;
}

export interface Facet {
  fieldName: string;
  values: FacetValue[];
}
