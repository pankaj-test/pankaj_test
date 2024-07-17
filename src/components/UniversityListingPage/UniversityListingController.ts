import UniversityService from "./UniversityService";

class ListingController {
  static async fetchUniversities() {
    return await UniversityService.fetchAndCacheUniversities();
  }
}

export default ListingController;
