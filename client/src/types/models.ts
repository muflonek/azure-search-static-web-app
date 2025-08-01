// Type definitions for the application models

export interface Document {
  id: string;
  original_title?: string;
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
