const SERVER = 'https://restaurant-production-6bb9.up.railway.app/';

const URLS = {
  REGISTER: `${SERVER}api/v1/registration/`,
  LOGIN: `${SERVER}api/v1/token/`,
  REFRESH_TOKEN: `${SERVER}api/v1/token/refresh/`,
  NEW_TABLE: `${SERVER}admin/backend_drf/table/add/`,
  TABLES: `${SERVER}api/v1/tables/`,
  PROFILE: `${SERVER}api/v1/me/profile/`,
  UPDATE_NAME: `${SERVER}api/v1/me/profile/update/`,
  UPDATE_PASSWORD: `${SERVER}api/v1/me/profile/update-password/`,
  BOOKING: `${SERVER}api/v1/bookings/`,
}

export { URLS };