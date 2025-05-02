import axios, { AxiosError } from "axios";

class UserService {
  public static async getToken(name: string, password: string): Promise<string | undefined> {
    try {
      // Try to log in on the API
      const res = await axios.post("/users/auth", { name, password });
      
      // Return the API token
      return res.data;
    } catch (e: any) {
      if (e.response) {
        if ((e as AxiosError).status === 400) {
          throw "Nesprávné uživatelské jméno nebo heslo";
        }

        throw e;
      }
    }
  }
}

export default UserService;
