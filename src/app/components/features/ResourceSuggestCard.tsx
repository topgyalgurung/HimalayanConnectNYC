"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { addEditResource } from "../../actions/forms";
import dayjs from "dayjs";
import { type Resource } from "@/app/types/resource";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

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
  const cleanOpenDays = Array.from(
    new Set(selectedDays.map((d) => d.trim().slice(0, 3))) // standardize to "Mon", "Tue", etc.
  ).join(",");

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

  const handleDayChange = (
    event: React.MouseEvent<HTMLElement>,
    newDays: string[]
  ) => {
    setSelectedDays(newDays);
  };
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
      setLoading(true);
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
        onClick={onEditCloseAction}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>

      <h1>Suggest an Edit</h1>

      <form action={handleFormAction}>
        {/* <form onSubmit={handleSubmit}> */}
        <Box
          sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
          noValidate
          autoComplete="off"
        >
          {/* backend needs to know which resourceId suggestion belongs to so it can link suggestion to original resource  */}
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
          {/* <TextField
            name="openDays"
            value={formData?.openDays}
            onChange={handleChange}
            variant="standard"
          /> */}

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="space-y-4">
              <p className="font-semibold mb-1">Open Days </p>
              <ToggleButtonGroup
                value={selectedDays}
                onChange={handleDayChange}
                aria-label="Weekdays"
                size="small"
              >
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <ToggleButton key={day} value={day}>
                      {day}
                    </ToggleButton>
                  )
                )}
              </ToggleButtonGroup>
              <input
                type="hidden"
                name="openDays"
                value={Array.from(
                  new Set(selectedDays.map((d) => d.trim().slice(0, 3)))
                ).join(",")}
              />
            </div>
            <div>
              <TimePicker
                label="Open Time"
                value={openTime}
                onChange={(newTime) => setOpenTime(newTime)}
              />
              <TimePicker
                label="Close Time"
                value={closeTime}
                onChange={(newTime) => setCloseTime(newTime)}
              />
              <input
                type="hidden"
                name="openTime"
                value={openTime ? openTime.format("hh:mm A") : ""}
              />
              <input
                type="hidden"
                name="closeTime"
                value={closeTime ? closeTime.format("hh:mm A") : ""}
              />
            </div>
          </LocalizationProvider>

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
