const server = 'https://restaurant-production-6bb9.up.railway.app/';

const URLS = {
  REGISTER: `${server}api/v1/registration/`,
  LOGIN: `${server}api/v1/token/`,
  REFRESH_TOKEN: `${server}api/v1/token/refresh/`,
  NEW_TABLE: `${server}admin/backend_drf/table/add/`,
  TABLES: `${server}api/v1/tables/`
}

export { URLS };