// Framework-agnostic helper (no server-only deps) so it's safe to import
// from both Server and Client Components.
export function parseImages(images: string): string[] {
  try {
    const parsed = JSON.parse(images);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
