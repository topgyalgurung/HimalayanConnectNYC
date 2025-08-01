/**
 * ResourceSuggestCard Component
 *
 * This component is the form for suggesting edits to a resource.
 *
 */

"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { addEditResource } from "@/app/lib/forms";

import { type Resource } from "@/app/lib/types";
import toast from "react-hot-toast";
import { SuggestFormSchema } from "@/app/lib/forms/definitions";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ToggleButton, ToggleButtonGroup, Alert } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

interface ResourceSuggestCardProps {
  resource: Resource | null;
  onEditCloseAction: (resource: Resource | null) => void;
}

export default function ResourceSuggestCard({
  resource,
  onEditCloseAction,
}: ResourceSuggestCardProps) {
  const [loading, setLoading] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [openTime, setOpenTime] = useState<dayjs.Dayjs | null>(null);
  const [closeTime, setCloseTime] = useState<dayjs.Dayjs | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [timeError, setTimeError] = useState<string>("");
  const [error, setError] = useState(false);

  // Track original values
  const [originalValues] = useState({
    name: resource?.name || "",
    address: resource?.address || "",
    phone: resource?.phone || "",
    url: resource?.url || "",
    openDays: resource?.openDays || "",
    openTime: dayjs.utc(resource.openTime).format("hh:mm A") || null,
    closeTime: dayjs.utc(resource.closeTime).format("hh:mm A") || null,
    // openTime: resource?.openTime || null,
    // closeTime: resource?.closeTime || null,
  });

  // Track current values
  const [formData, setFormData] = useState({
    name: originalValues.name,
    address: originalValues.address,
    phone: originalValues.phone,
    url: originalValues.url,
  });

  useEffect(() => {
    if (resource) {
      if (resource.openTime) {
        setOpenTime(dayjs.utc(resource.openTime));
      }
      if (resource.closeTime) {
        setCloseTime(dayjs.utc(resource.closeTime));
      }
    }
  }, [resource]);

  const validateAndSetOpenTime = (newTime: dayjs.Dayjs | null) => {
    if (newTime && closeTime) {
      // Convert both times to the same day for comparison
      const newTimeSameDay = newTime
        .hour(newTime.hour())
        .minute(newTime.minute());
      const closeTimeSameDay = closeTime
        .hour(closeTime.hour())
        .minute(closeTime.minute());
      // changed to sameorAfter not just after
      if (newTimeSameDay.isSameOrAfter(closeTimeSameDay)) {
        setTimeError("Open time must be before close time");
        setError(true);
        return;
      }
    }
    setTimeError("");
    setOpenTime(newTime);
    handleTimeChange("openTime", newTime);
  };

  const validateAndSetCloseTime = (newTime: dayjs.Dayjs | null) => {
    if (newTime && openTime) {
      // Convert both times to the same day for comparison
      const newTimeSameDay = newTime
        .hour(newTime.hour())
        .minute(newTime.minute());
      const openTimeSameDay = openTime
        .hour(openTime.hour())
        .minute(openTime.minute());

      if (newTimeSameDay.isSameOrBefore(openTimeSameDay)) {
        setTimeError("Close time must be after open time");
        setError(true);
        return;
      }
    }
    setTimeError("");
    setCloseTime(newTime);
    handleTimeChange("closeTime", newTime);
  };

  // Track which fields have been changed
  const [changedFields, setChangedFields] = useState<Set<string>>(new Set());

  const handleDayChange = (
    event: React.MouseEvent<HTMLElement>,
    newDays: string[]
  ) => {
    setSelectedDays(newDays);
    const newOpenDays = Array.from(
      new Set(newDays.map((d) => d.trim().slice(0, 3)))
    ).join(",");

    console.log("Days changed:", {
      newDays,
      newOpenDays,
      originalDays: originalValues.openDays,
    });

    if (newOpenDays !== originalValues.openDays) {
      setChangedFields((prev) => new Set([...prev, "openDays"]));
    } else {
      setChangedFields((prev) => {
        const newSet = new Set(prev);
        newSet.delete("openDays");
        return newSet;
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    setErrors((prev) => ({ ...prev, [name]: "" }));

    if (value !== originalValues[name as keyof typeof originalValues]) {
      setChangedFields((prev) => new Set([...prev, name]));
    } else {
      setChangedFields((prev) => {
        const newSet = new Set(prev);
        newSet.delete(name);
        return newSet;
      });
    }
  };

  const handleTimeChange = (
    field: "openTime" | "closeTime",
    newTime: dayjs.Dayjs | null
  ) => {
    // Update the time state based on which field changed
    if (field === "openTime") {
      setOpenTime(newTime);
    } else {
      setCloseTime(newTime);
    }

    // Get the formatted time strings for comparison using 12-hour format with AM/PM
    const newTimeStr = newTime?.format("hh:mm A");
    const originalTime = originalValues[field];
    const originalTimeStr = originalTime
      ? dayjs(originalTime).format("hh:mm A")
      : null;

    console.log(`Time comparison for ${field}:`, {
      newTime: newTimeStr,
      originalTime: originalTimeStr,
      isChanged: newTimeStr !== originalTimeStr,
    });

    // Track if the time has changed
    if (newTimeStr !== originalTimeStr) {
      setChangedFields((prev) => new Set([...prev, field]));
    } else {
      setChangedFields((prev) => {
        const newSet = new Set(prev);
        newSet.delete(field);
        return newSet;
      });
    }
  };

  const handleFormAction = async (formData: FormData) => {
    setLoading(true);
    try {
      // Validate form data
      const validationResult = SuggestFormSchema.safeParse({
        name: formData.get("name"),
        address: formData.get("address"),
        phone: formData.get("phone"),
        url: formData.get("url"),
      });

      if (!validationResult.success) {
        const newErrors: Record<string, string> = {};
        validationResult.error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
        setLoading(false);
        return;
      }

      const changedData = new FormData();
      changedData.append("resourceId", resource?.id?.toString() || "");

      console.log("Changed fields:", Array.from(changedFields));
      console.log("Current form state:", {
        formData,
        selectedDays,
        openTime: openTime?.format("HH:mm"),
        closeTime: closeTime?.format("HH:mm"),
      });

      // Add all fields, but set unchanged ones to null
      const allFields = [
        "name",
        "address",
        "phone",
        "url",
        "openDays",
        "openTime",
        "closeTime",
      ];
      allFields.forEach((field) => {
        if (field === "name") {
          // Always include name field
          changedData.append("name", String(formData.get("name")));
        } else if (changedFields.has(field)) {
          switch (field) {
            case "address":
              console.log("Adding changed address:", formData.get("address"));
              changedData.append("address", String(formData.get("address")));
              break;
            case "phone":
              changedData.append("phone", String(formData.get("phone")));
              break;
            case "url":
              changedData.append("url", String(formData.get("url")));
              break;
            case "openDays":
              const openDays = Array.from(
                new Set(selectedDays.map((d) => d.trim().slice(0, 3)))
              ).join(",");
              console.log("Adding changed openDays:", openDays);
              changedData.append("openDays", openDays);
              break;
            case "openTime":
              const openTimeStr = openTime?.format("hh:mm A") || "";
              console.log("Adding changed openTime:", openTimeStr);
              changedData.append("openTime", openTimeStr);
              break;
            case "closeTime":
              const closeTimeStr = closeTime?.format("hh:mm A") || "";
              console.log("Adding changed closeTime:", closeTimeStr);
              changedData.append("closeTime", closeTimeStr);
              break;
          }
        } else {
          console.log(`Field ${field} unchanged, setting to null`);
          changedData.append(field, "null");
        }
      });

      // Log the final form data being sent
      console.log("Final form data being sent:");
      for (const [key, value] of changedData.entries()) {
        console.log(`${key}: ${value}`);
      }

      const result = await addEditResource(changedData);

      if (result.success) {
        toast(
          (t: { id: string }) => (
            <span>
              Thank you for your suggestion. Admin will review and make changes
              soon.
              <Link
                href="/profile"
                className="text-blue-600"
                onClick={() => toast.dismiss(t.id)}
              >
                Go to Profile
              </Link>
            </span>
          ),
          { duration: 8000 }
        );

        onEditCloseAction(null);
      } else {
        toast.error(result.error || "Failed to submit edit suggestion");
      }
    } catch (error) {
      console.error("error submitting edit form: ", error);
      toast.error("An error occurred while submitting edit form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[350px] bg-white rounded-md shadow-xl p-4 h-full overflow-y-auto">
      <button
        onClick={() => onEditCloseAction(null)}
        className="absolute top-2 right-14 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>
      <h1 className="text-lg font-bold text-center mb-2">Suggest an Edit</h1>
      <p className="text-sm text-gray-600 mb-4">
        Only changed fields will be submitted for review
      </p>

      <form action={handleFormAction} className="flex flex-col">
        <Box
          component="div"
          sx={{
            "& .MuiTextField-root": {
              m: 0.5,
              width: "100%",
              maxWidth: "320px",
            },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            mb: 2,
          }}
        >
          <input name="resourceId" value={resource?.id ?? ""} type="hidden" />
          <TextField
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            variant="standard"
            error={!!errors.name}
            size="small"
            helperText={
              errors.name ||
              (changedFields.has("name") ? "Changed" : "Original value")
            }
          />
          <TextField
            name="address"
            label="Address"
            value={formData.address}
            onChange={handleChange}
            variant="standard"
            error={!!errors.address}
            size="small"
            helperText={
              errors.address ||
              (changedFields.has("address") ? "Changed" : "Original value")
            }
          />
          <TextField
            name="phone"
            label="Phone"
            value={formData.phone}
            onChange={handleChange}
            variant="standard"
            error={!!errors.phone}
            size="small"
            helperText={
              errors.phone ||
              (changedFields.has("phone") ? "Changed" : "Original value")
            }
          />
          <TextField
            name="url"
            label="Website"
            value={formData.url}
            onChange={handleChange}
            variant="standard"
            error={!!errors.url}
            size="small"
            helperText={
              errors.url ||
              (changedFields.has("url") ? "Changed" : "Original value")
            }
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="space-y-4">
              <p className="font-semibold mb-1">Business Hours</p>
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
              {changedFields.has("openDays") && (
                <p className="text-sm text-blue-600">Days changed</p>
              )}
            </div>

            {/* Open and Close Times */}
            <div className="space-y-4 mt-2">
              <TimePicker
                label="Open Time"
                value={openTime}
                onChange={validateAndSetOpenTime}
                slotProps={{
                  textField: {
                    error: !!timeError,
                  },
                }}
              />
              {changedFields.has("openTime") && (
                <p className="text-sm text-blue-600">Open time changed</p>
              )}
              {/* close time */}
              <TimePicker
                label="Close Time"
                value={closeTime}
                onChange={validateAndSetCloseTime}
                slotProps={{
                  textField: {
                    error: !!timeError,
                  },
                }}
              />
              {changedFields.has("closeTime") && (
                <p className="text-sm text-blue-600">Close time changed</p>
              )}
            </div>
            {timeError && (
              <Alert severity="error" className="mt-2">
                {timeError}
              </Alert>
            )}
          </LocalizationProvider>

          <button
            type="submit"
            className="w-full max-w-[320px] bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 mt-4 sticky bottom-0"
            disabled={loading || changedFields.size === 0 || error}
          >
            {loading ? "Submitting..." : "Submit Changes"}
          </button>
        </Box>
      </form>
    </div>
  );
}
