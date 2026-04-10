export type BarikoiLocation = {
  id?: string | number;
  name?: string;
  address?: string;
  area?: string;
  city?: string;
  postCode?: string;
  latitude?: number;
  longitude?: number;
  [key: string]: unknown;
};

export type BarikoiSearchResponse = {
  places?: BarikoiLocation[];
  data?: BarikoiLocation[];
  results?: BarikoiLocation[];
  [key: string]: unknown;
};