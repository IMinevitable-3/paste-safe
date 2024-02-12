export function getDataBasedOnENV(str, key) {
  return import.meta.env.PROD ? mp[key] : str;
}
