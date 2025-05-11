// Helper to format openDays string into condensed ranges
// utils/helper 
  
  export const formatOpenDays = (daysStr: string | null) => {
    if (!daysStr) return "Not specified";

    const dayOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const days = Array.from(new Set(daysStr.split(",").map((d) => d.trim().slice(0, 3))));

    const indices = days
      .map((d) => dayOrder.indexOf(d))
      .filter((i) => i !== -1)
      .sort((a, b) => a - b);

    if (indices.length === 0) return "Invalid";

    const ranges = [];
    let start = indices[0];
    let end = start;

    for (let i = 1; i < indices.length; i++) {
      if (indices[i] === end + 1) {
        end = indices[i];
      } else {
        ranges.push([start, end]);
        start = indices[i];
        end = start;
      }
    }
    ranges.push([start, end]);

    // If all days form a single consecutive range
    const isFullyConsecutive = ranges.length === 1 && (ranges[0][1] - ranges[0][0] + 1 === indices.length);

    if (isFullyConsecutive) {
      const [s, e] = ranges[0];
      return s === e ? dayOrder[s] : `${dayOrder[s]} – ${dayOrder[e]}`;
    }

    return indices.map(i => dayOrder[i]).join(", ");
  };
