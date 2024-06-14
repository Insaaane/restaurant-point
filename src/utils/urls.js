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
  RESERVATIONS: `${SERVER}api/v1/me/bookings/`,
  ADMIN_RESERVATIONS_ALL: `${SERVER}api/v1/admin/bookings/all/`,
  ADMIN_RESERVATIONS_VERIFY: `${SERVER}api/v1/admin/bookings/verification/`,
  ADMIN_DECISION: `${SERVER}api/v1/admin/bookings/`,
  MODERATION_TYPE: `${SERVER}api/v1/moderation/`,
  MODERATION_TYPE_AUTO: `${SERVER}api/v1/admin/auto-moderation/`,
  MODERATION_TYPE_MANUAL: `${SERVER}api/v1/admin/manual-moderation/`
}

const STATUS = {
  PAID: {
    text: 'Оплачено',
    style: 'paid'
  },
  CANCEL: {
    text: 'Отменено',
    style: 'cancel'
  },
  VERIFY: {
    text: 'На проверке',
    style: 'verify'
  }
}

const MODERATION_TYPE = {
  manual: 'ручная',
  auto: 'авто'
}

export { URLS, STATUS, MODERATION_TYPE };