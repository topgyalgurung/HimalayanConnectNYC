import React from "react";
import { FormValues } from "./validationSchema";
import { categories } from "./categories";

interface BasicInfoSectionProps {
  formData: FormValues;
  errors: Record<string, string>;
  categories: typeof categories;
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
      <input
        type="text"
        name="name"
        placeholder="Resource Name"
        value={formData.name}
        onChange={handleChange}
        required
        className={`w-full px-3 py-2 border ${
          errors.name ? "border-red-500" : "border-gray-300"
        } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

      <select
        name="categoryId"
        value={formData.categoryId}
        onChange={handleChange}
        required
        className={`w-full px-3 py-2 border ${
          errors.categoryId ? "border-red-500" : "border-gray-300"
        } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
        aria-label="Select a category"
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      {errors.categoryId && (
        <p className="text-red-500 text-sm">{errors.categoryId}</p>
      )}
      {/* address */}
      <input
        type="text"
        name="address"
        placeholder="Address : Street, City, State ZIP"
        value={formData.address}
        onChange={handleChange}
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
