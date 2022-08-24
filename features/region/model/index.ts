import { RegionResponse } from '../types'

export const parseRegion = (regionResponse: RegionResponse): string => {
  return regionResponse?.suggestions[0]?.data?.area;
}
