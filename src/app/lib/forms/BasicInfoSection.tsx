import React from "react";
import { FormValues } from "./validationSchema";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

interface Category {
  id: number;
  name: string;
}

interface BasicInfoSectionProps {
  formData: FormValues;
  errors: Record<string, string>;
  categories: Category[];
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

export default function BasicInfoSection({
  formData,
  errors,
  categories,
  handleChange,
}: BasicInfoSectionProps) {
  return (
    <div className="space-y-2">
      {/* name  */}
      <TextField
        id="outlined-basic"
        label="Enter Resource Name"
        variant="outlined"
        name="name"
        value={formData.name}
        onChange={(e) =>
          handleChange(
            e as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
          )
        }
        required
        className={`w-full px-3 py-2 border ${
          errors.name ? "border-red-500" : "border-gray-300"
        } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      {/* category */}
      <TextField
        id="filled-select-category"
        select
        name="categoryId"
        label="Select Category"
        defaultValue=""
        value={formData.categoryId || ""}
        onChange={(e) =>
          handleChange(
            e as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
          )
        }
        required
        helperText="Please select category"
        className={`w-full px-3 py-2 border ${
          errors.category ? "border-red-500" : "border-gray-300"
        } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
        variant="filled"
      >
        <MenuItem value="">
          <em>Select a category</em>
        </MenuItem>
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id.toString()}>
            {category.name}
          </MenuItem>
        ))}
      </TextField>
      {errors.category && (
        <p className="text-red-500 text-sm">{errors.category}</p>
      )}

      <TextField
        id="outlined-basic"
        label="Enter Address : Street, City, State ZIP"
        variant="outlined"
        name="address"
        value={formData.address}
        onChange={(e) =>
          handleChange(
            e as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
          )
        }
        required
        className={`w-full px-3 py-2 border ${
          errors.address ? "border-red-500" : "border-gray-300"
        } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
      />
      {errors.address && (
        <p className="text-red-500 text-sm">{errors.address}</p>
      )}
    </div>
  );
}
