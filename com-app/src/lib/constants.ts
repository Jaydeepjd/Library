export const SITE_NAME = "PrintCraft";
export const SITE_TAGLINE = "Custom Printing & Display Products, Made Right.";
export const ARTWORK_ACCEPTED_TYPES = ["application/pdf", "image/png", "application/postscript", "application/illustrator"];
export const ARTWORK_ACCEPTED_EXT = [".pdf", ".png", ".ai"];
export const ARTWORK_MAX_FILE_SIZE_BYTES = Number(process.env.ARTWORK_MAX_FILE_SIZE_MB ?? 50) * 1024 * 1024;
export const ARTWORK_LINK_EXPIRY_DAYS = Number(process.env.ARTWORK_LINK_EXPIRY_DAYS ?? 7);
