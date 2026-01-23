export function clearUsername(username: string): string {
  return username
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .trim()
}