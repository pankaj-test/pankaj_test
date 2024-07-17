// UniversityService.ts

import { fetchUniversities } from "../../services/ApiService";
import toast from 'react-hot-toast';
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../../utils/StorageUtil";
import University from "../../models/University";

class UniversityService {
  static async fetchAndCacheUniversities() {
    try {
      const cachedData = getFromLocalStorage("universities");
      if (cachedData) {
        return cachedData;
      } else {
        const data = await fetchUniversities();
        saveToLocalStorage("universities", data);
        return data;
      }
    } catch (error) {
      console.error(error);
      toast.error("Something Went wrong while fetching universties, Please try again later");
    }
  }

}

export default UniversityService;
