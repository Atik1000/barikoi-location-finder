export type BarikoiLocation = {
  id?: string | number;
  name?: string;
  address?: string;
  address_bn?: string;
  area?: string;
  area_bn?: string;
  city?: string;
  city_bn?: string;
  postCode?: string | number;
  latitude?: number | string;
  longitude?: number | string;
  pType?: string;
  uCode?: string;
  [key: string]: unknown;
};

export type BarikoiSearchResponse = {
  places?: BarikoiLocation[];
  data?: BarikoiLocation[];
  results?: BarikoiLocation[];
  [key: string]: unknown;
};