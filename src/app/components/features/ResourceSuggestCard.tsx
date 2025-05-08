"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { addEditResource } from "@/app/actions/forms";
import dayjs from "dayjs";
import { type Resource } from "@/app/types/resource";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import TimePickerSection from "./TimePickerSection";

interface ResourceSuggestCardProps {
  resource: Resource | null;
  onEditCloseAction: (resource: Resource | null) => void;
}

export default function ResourceSuggestCard({
  resource,
  onEditCloseAction,
}: ResourceSuggestCardProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [openTime, setOpenTime] = useState<dayjs.Dayjs | null>(null);
  const [closeTime, setCloseTime] = useState<dayjs.Dayjs | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (resource) {
      if (resource.openTime) {
        setOpenTime(dayjs(resource.openTime));
      }
      if (resource.closeTime) {
        setCloseTime(dayjs(resource.closeTime));
      }
    }
  }, [resource]);

  const [formData, setFormData] = useState({
    name: resource?.name || "",
    address: resource?.address || "",
    phone: resource?.phone || "",
    url: resource?.url || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormAction = async (formData: FormData) => {
    setLoading(true);
    setMessage("");

    try {
      const result = await addEditResource(formData);
      if (result.success) {
        setMessage(result.success);
        router.push("/profile");
      } else {
        setMessage(result.error || "Failed to edit resource");
      }
    } catch (error) {
      console.error("error submitting edit form: ", error);
      setMessage("An error occurred while submitting edit form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute top-4 right-4 z-50 w-96 bg-white rounded-lg shadow-xl p-6">
      <button
        onClick={() => onEditCloseAction(null)}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>

      <h1>Suggest an Edit</h1>

      <form action={handleFormAction}>
        <Box
          sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
          noValidate
          autoComplete="off"
        >
          <input name="resourceId" value={resource?.id ?? ""} type="hidden" />
          
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
            name="url"
            label="website"
            value={formData?.url}
            onChange={handleChange}
            variant="standard"
          />

          <TimePickerSection
            selectedDays={selectedDays}
            openTime={openTime}
            closeTime={closeTime}
            onDayChange={(_, newDays) => setSelectedDays(newDays)}
            onOpenTimeChange={setOpenTime}
            onCloseTimeChange={setCloseTime}
          />

          <button
            type="submit"
            className="bg-blue-600 mt-4 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit your Edit"}
          </button>
        </Box>
      </form>
    </div>
  );
}
