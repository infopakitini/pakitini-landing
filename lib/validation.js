import { z } from "zod";
import { PACKS } from "./product.config";

// Loose UAE-friendly phone check: allows +971, 00971, or a local 05xxxxxxxx
// style number, 7-15 digits after an optional leading +.
const PHONE_RE = /^\+?\d{7,15}$/;

export const DELIVERY_TIME_VALUES = ["morning", "afternoon", "evening", "custom"];
export const PACK_IDS = PACKS.map((p) => p.id);

export const orderSchema = z
  .object({
    packId: z.enum(PACK_IDS),
    name: z.string().trim().min(2).max(100),
    phone: z
      .string()
      .trim()
      .refine((v) => PHONE_RE.test(v.replace(/[\s-]/g, "")), "invalid_phone"),
    email: z.string().trim().email(),
    address: z.string().trim().min(5).max(300),
    city: z.string().trim().min(2).max(100),
    deliveryTime: z.enum(DELIVERY_TIME_VALUES),
    customDeliveryTime: z.string().trim().max(100).optional().default(""),
    notes: z.string().trim().max(500).optional().default(""),
    honeypot: z.string().optional().default(""),
  })
  .refine(
    (data) => data.deliveryTime !== "custom" || data.customDeliveryTime.length > 0,
    { message: "custom_delivery_time_required", path: ["customDeliveryTime"] }
  );

// Returns { success: true, data } or { success: false, fieldErrors: {a: 'code', ...} }
export function validateOrder(input) {
  const result = orderSchema.safeParse(input);
  if (result.success) {
    return { success: true, data: result.data };
  }
  const fieldErrors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] || "form";
    if (!fieldErrors[key]) {
      fieldErrors[key] = issue.message === "invalid_phone" ? "invalid_phone" : issue.code;
    }
  }
  return { success: false, fieldErrors };
}
