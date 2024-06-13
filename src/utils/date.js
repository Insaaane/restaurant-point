const now = new Date();

const yekaterinburgTime = new Date(now.getTime() + (5 * 60 - now.getTimezoneOffset()) * 60000);

export const minDate = yekaterinburgTime.toISOString().split('T')[0];