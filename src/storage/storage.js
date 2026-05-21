import AsyncStorage from "@react-native-async-storage/async-storage";

export const USERS_KEY = "FAKE_STORE_USERS";
export const CURRENT_USER_KEY = "FAKE_STORE_CURRENT_USER";
export const userDataKey = (email) => `FAKE_STORE_DATA_${email.toLowerCase()}`;

export async function readJson(key, fallback) {
  const raw = await AsyncStorage.getItem(key);
  return raw ? JSON.parse(raw) : fallback;
}

export async function writeJson(key, value) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function removeCurrentUser() {
  await AsyncStorage.removeItem(CURRENT_USER_KEY);
}
