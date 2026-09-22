// Hands the just-placed order's details from the order form to the
// dedicated /order/success page across a real navigation (sessionStorage,
// not React state, since it's a fresh page load). No DB in this project —
// this is purely a one-time handoff, cleared once the success page reads it.

const KEY = "pakitini_last_order";

export function saveOrderSuccess(data) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // sessionStorage unavailable (private mode, etc.) — success page will
    // fall back to redirecting home.
  }
}

export function readOrderSuccess() {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearOrderSuccess() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}
