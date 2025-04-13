"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { SingleInputTimeRangeField } from "@mui/x-date-pickers-pro/SingleInputTimeRangeField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { type Resource } from "@/app/types/resource";

// import { useForm } from "react-hook-form";

interface ResourceSuggestCardProps {
  resource: Resource | null;
  onEditCloseAction: (resource: Resource | null) => void;
}

export default function ResourceSuggestCard({
  resource,
  onEditCloseAction,
}: ResourceSuggestCardProps) {
  const [value, setValue] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null]>([
    dayjs(resource?.openTime),
    dayjs(resource?.closeTime),
  ]);

  const [formData, setFormData] = useState({
    name: resource?.name || "",
    address: resource?.address || "",
    phone: resource?.phone || "",
    website: resource?.url || "",
    openTime: resource?.openTime || "",
    closeTime: resource?.closeTime || "",
  });

  // for open and close time
  useEffect(() => {
    if (value[0] && value[1]) {
      setFormData((prev): typeof prev => ({
        ...prev,
        openTime: value[0]?.toISOString() || "",
        closeTime: value[1]?.toISOString() || "",
      }));
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/suggestions/${resource.id}", {
        method: "POST",
        headers: { "Content-Type": "applications/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (result.success) {
        alert("Suggestion submitted!");
        onEditCloseAction();
      } else {
        alert("Something went wrong.");
      }
    } catch (err) {
      console.error("Submit error", err);
      alert("Submission failed.");
    }
  };

  return (
    <div className="absolute top-4 right-4 z-50 w-96 bg-white rounded-lg shadow-xl p-6">
      <button
        onClick={onEditCloseAction}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>

      <h1>Suggest an Edit</h1>

      {/* <form action={updateResource}> */}
      <form onSubmit={handleSubmit}>
        <Box
          sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
          noValidate
          autoComplete="off"
        >
          <TextField
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            variant="standard"
          />
          <TextField
            name="address"
            label="Address"
            value={formData.address}
            onChange={handleChange}
            variant="standard"
          />
          <TextField
            name="phone"
            label="Phone"
            value={formData.phone}
            onChange={handleChange}
            variant="standard"
          />
          <TextField
            name="website"
            label="Website"
            value={formData.website}
            onChange={handleChange}
            variant="standard"
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <SingleInputTimeRangeField
              label="Hours"
              value={value}
              onChange={setValue}
            />
          </LocalizationProvider>

          <button
            type="submit"
            className="bg-blue-600 mt-4 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save and continue
          </button>
        </Box>
      </form>
    </div>
  );
}
