// Map of resource categories to their corresponding icon URLs
export const getMarkerIconByCategory = (category?: string): string => {
  const defaultIcon = "https://cdn-icons-png.flaticon.com/512/1946/1946436.png";

  if (!category) return defaultIcon;

  const iconMap: Record<string, string> = {
    community: "https://cdn-icons-png.flaticon.com/512/7829/7829198.png",
    legal: "https://cdn-icons-png.flaticon.com/512/4052/4052204.png",
    health: "https://cdn-icons-png.flaticon.com/512/2382/2382533.png",
    education: "https://cdn-icons-png.flaticon.com/512/4406/4406319.png",
    finance: "https://cdn-icons-png.flaticon.com/512/4256/4256900.png",
    "real estate": "https://cdn-icons-png.flaticon.com/512/2238/2238337.png",
    business: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    other: "https://cdn-icons-png.flaticon.com/512/3195/3195457.png"
  };

  return iconMap[category.toLowerCase()] || defaultIcon;
};

// Per-category pin colors so markers are distinguishable at a glance.
// Each entry has a base color and a darker shade used for hover/highlight.
export const getMarkerColorByCategory = (
  category?: string
): { base: string; highlight: string } => {
  const colorMap: Record<string, { base: string; highlight: string }> = {
    community: { base: "#8b5cf6", highlight: "#7c3aed" }, // violet
    legal: { base: "#0ea5e9", highlight: "#0284c7" }, // sky blue
    health: { base: "#ef4444", highlight: "#dc2626" }, // red
    education: { base: "#f59e0b", highlight: "#d97706" }, // amber
    finance: { base: "#10b981", highlight: "#059669" }, // emerald
    "real estate": { base: "#ec4899", highlight: "#db2777" }, // pink
    business: { base: "#14b8a6", highlight: "#0d9488" }, // teal
    other: { base: "#64748b", highlight: "#475569" }, // slate
  };

  return (
    colorMap[category?.toLowerCase() ?? ""] ?? {
      base: "#3b82f6",
      highlight: "#2563eb",
    }
  );
};
