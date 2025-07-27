import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

const NYC_BOROUGHS = [
  { id: 1, name: "Manhattan" },
  { id: 2, name: "Brooklyn" },
  { id: 3, name: "Queens" },
  { id: 4, name: "Bronx" },
  { id: 5, name: "Staten Island" },
];

interface CitySelectProps {
  city: string;
}

export default function CitySelect({
}: CitySelectProps) {
  const [city, setCity] = useState<string>("");
  return (
    <TextField
    name="city"
    value={city}
    onChange={(e) => setCity(e.target.value)}  
    id="filled-select-city"
    select
    label="Select City"
    defaultValue=""
    // required
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
      aria-label="Select borough"
    >
      <MenuItem value="">Select Borough</MenuItem>
      {NYC_BOROUGHS.map((borough) => (
        <MenuItem key={borough.id} value={borough.name}>
          {borough.name}
        </MenuItem>
      ))}
    </TextField>
  );
}
