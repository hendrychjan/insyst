import axios, { AxiosError } from "axios";
import { Types } from "mongoose";
import { LocationFormValues } from "../forms/LocationForm";

export interface ILocation {
  _id: Types.ObjectId;
  title: string;
  description?: string;
  parentLocation?: Types.ObjectId;
  owner: Types.ObjectId;
  path?: ILocation[];
}

const ENDPOINT = "/locations";

export default class LocationsService {
  public static async getLocations(options?: {
    parent?: string;
  }): Promise<ILocation[]> {
    try {
      const res = await axios.get(ENDPOINT, {
        params: options,
      });
      return res.data;
    } catch (e) {
      throw e;
    }
  }

  public static async getLocationById(
    id: Types.ObjectId,
    options: { path: boolean }
  ): Promise<ILocation> {
    const res = await axios.get(`${ENDPOINT}/${id}`, {
      params: options,
    });

    return res.data as ILocation;
  }

  public static async createLocation(
    location: LocationFormValues
  ): Promise<ILocation> {
    const res = await axios.post(ENDPOINT, location);

    return res.data as ILocation;
  }

  public static async deleteLocation(
    locationId: Types.ObjectId
  ): Promise<void> {
    await axios.delete(`${ENDPOINT}/${locationId}`);
  }
}
