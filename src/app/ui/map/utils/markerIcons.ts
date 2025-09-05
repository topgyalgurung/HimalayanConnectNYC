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
    other: "https://cdn-icons-png.flaticon.com/512/3195/3195457.png"
  };

  return iconMap[category.toLowerCase()] || defaultIcon;
};
