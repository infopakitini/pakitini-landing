// Single source of truth for all product data. Change values here only —
// nothing about the product should be hard-coded anywhere else in the app.

export const PRODUCT = {
  NAME: "Pakitini",
  TAGLINE: "Magnetic Bag Sealer",
  CURRENCY: "AED",
  CURRENCY_AR: "د.إ",
  // Header logo (cropped from the supplied logo file).
  LOGO: "/images/logo.png",
  IMAGE: "/images/prod-1.webp",
  THUMBNAILS: [
    "/images/prod-1.webp",
    "/images/prod-2.webp",
    "/images/prod-3.webp",
    "/images/prod-4.webp",
  ],
  // "In real kitchens" section — real customer clips.
  KITCHEN_VIDEOS: [
    "/images/1.mp4",
    "/images/2.mp4",
    "/images/3.mp4",
    "/images/4.mp4",
  ],
  // "How it works" 3-step photos (Place / Press / Seal).
  STEP_IMAGES: ["/images/place.jpg", "/images/press.jpg", "/images/step3-seal.jpg"],
  // Real customer unboxing/delivery photos shown in the Reviews section.
  REVIEW_PHOTOS: [
    "/images/reviews/review-1.jpg",
    "/images/reviews/review-2.jpg",
    "/images/reviews/review-3.jpg",
    "/images/reviews/review-4.jpg",
    "/images/reviews/review-5.jpg",
    "/images/reviews/review-6.jpg",
    "/images/reviews/review-7.jpg",
    "/images/reviews/review-8.jpg",
    "/images/reviews/review-9.jpg",
  ],
  DESCRIPTION:
    "Reseal any open bag in seconds, right on your fridge. Pakitini melts a clean, airtight seam across chips, coffee, cereal and snack bags so food stays fresh instead of going stale in the pantry.",
  RETURN_POLICY_DAYS: 7,
  // Star rating breakdown shown in the Reviews section. Edit these numbers
  // as your real review count grows — `RATING_AVERAGE` is shown as-is, and
  // each bar's fill is that row's `count` as a share of `RATING_TOTAL`.
  RATING_AVERAGE: 4.9,
  RATING_TOTAL: 355,
  RATING_BREAKDOWN: [
    { stars: 5, count: 315 },
    { stars: 4, count: 39 },
    { stars: 3, count: 1 },
    { stars: 2, count: 0 },
    { stars: 1, count: 0 },
  ],
  WHATSAPP_NUMBER: "971566469149",
  SUPPORT_EMAIL: "infopakitini@gmail.com",
  BRAND_COPYRIGHT_YEAR: 2026,
  // Pieces physically left in stock right now. Edit this by hand as you
  // sell units — a pack whose `pieces` exceeds this becomes unselectable
  // (see isPackInStock below) so the site can't oversell what you have.
  STOCK_REMAINING: 20,
};

// The three fixed pricing tiers shown in the "Pick your pack" selector.
// `labelEn` is used only for the (always-English) order invoice email —
// on-page display text is bilingual and comes from translations.js via the
// `pick_<id>_name` / `pick_<id>_sub` / `pick_<id>_tag` keys.
export const PACKS = [
  { id: "standard", pieces: 1, price: 89, badge: null, labelEn: "Standard (1 Piece)" },
  { id: "pro", pieces: 2, price: 149, badge: "gold", labelEn: "Pro (2 Pieces)" },
  { id: "family", pieces: 3, price: 199, badge: "plain", labelEn: "Family Pack (3 Pieces)" },
];

export const DEFAULT_PACK_ID = "standard";

export function getPackById(id) {
  return PACKS.find((p) => p.id === id) ?? PACKS.find((p) => p.id === DEFAULT_PACK_ID);
}

export function isPackInStock(pack) {
  return pack.pieces <= PRODUCT.STOCK_REMAINING;
}

// The first pack (in listed order) that current stock can actually fulfill,
// or null if every pack — including the 1-piece one — is out of stock.
export function getDefaultInStockPackId() {
  const inStock = PACKS.find(isPackInStock);
  return inStock ? inStock.id : null;
}
