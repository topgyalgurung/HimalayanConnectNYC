export const CATEGORY_FILTERS = [
  {
    id: 1,
    name: "Community",
    icon: "https://cdn-icons-png.flaticon.com/512/7829/7829198.png",
  },
  {
    id: 2,
    name: "Legal",
    icon: "https://cdn-icons-png.flaticon.com/512/4052/4052204.png",
  },
  {
    id: 3,
    name: "Health",
    icon: "https://cdn-icons-png.flaticon.com/512/2382/2382533.png",
  },
  {
    id: 4,
    name: "Education",
    icon: "https://cdn-icons-png.flaticon.com/512/4406/4406319.png",
  },
  {
    id: 5,
    name: "Finance",
    icon: "https://cdn-icons-png.flaticon.com/512/4256/4256900.png",
  },
  {
    id: 6,
    name: "Real Estate",
    icon: "https://cdn-icons-png.flaticon.com/512/2238/2238337.png",
  },
  {
    id: 7,
    name: "Other",
    icon: "https://cdn-icons-png.flaticon.com/512/3195/3195457.png",
  },
] as const;

export const BOROUGH_FILTERS = [
  { id: 1, name: "Manhattan" },
  { id: 2, name: "Brooklyn" },
  { id: 3, name: "Queens" },
  { id: 4, name: "Bronx" },
  { id: 5, name: "Staten Island" },
] as const;

export function parseListParam(
  value?: string | string[]
): string[] {
  const rawValues = Array.isArray(value) ? value : value ? [value] : [];

  return rawValues
    .flatMap((entry) => entry.split(","))
    .map((entry) => entry.trim())
    .filter(Boolean);
}
