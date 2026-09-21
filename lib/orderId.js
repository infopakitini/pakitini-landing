// Generates a human-readable, unique-enough order ID: COD-YYYYMMDD-XXXX
export function generateOrderId(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const rand = String(Math.floor(1000 + Math.random() * 9000));
  return `COD-${y}${m}${d}-${rand}`;
}
