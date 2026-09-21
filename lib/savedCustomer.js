// Remembers the customer's own contact/delivery details in the browser so a
// returning visitor doesn't have to retype them. Never sent anywhere on its
// own — it only pre-fills the order form on this device.
const STORAGE_KEY = "pakitini_customer_details";
const FIELDS = ["name", "phone", "email", "address", "city"];

export function getSavedCustomer() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const result = {};
    for (const field of FIELDS) {
      if (typeof parsed[field] === "string") result[field] = parsed[field];
    }
    return result;
  } catch {
    return null;
  }
}

export function saveCustomer(data) {
  try {
    const toSave = {};
    for (const field of FIELDS) {
      toSave[field] = data[field] || "";
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch {
    // storage unavailable (private browsing, quota, etc.) — non-fatal
  }
}
