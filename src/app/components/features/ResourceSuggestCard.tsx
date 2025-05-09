"use client";

import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { addEditResource } from "../../actions/forms";
import dayjs from "dayjs";
import { type Resource } from "@/app/types/resource";
import toast from "react-hot-toast";

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
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [openTime, setOpenTime] = useState<dayjs.Dayjs | null>(null);
  const [closeTime, setCloseTime] = useState<dayjs.Dayjs | null>(null);
  // const router = useRouter();

  // Track original values
  const [originalValues] = useState({
    name: resource?.name || "",
    address: resource?.address || "",
    phone: resource?.phone || "",
    url: resource?.url || "",
    openDays: resource?.openDays || "",
    openTime: resource?.openTime || null,
    closeTime: resource?.closeTime || null,
  });

  // Track current values
  const [formData, setFormData] = useState({
    name: originalValues.name,
    address: originalValues.address,
    phone: originalValues.phone,
    url: originalValues.url,
  });

  // Track which fields have been changed
  const [changedFields, setChangedFields] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (resource) {
      if (resource.openTime) {
        setOpenTime(dayjs(resource.openTime));
      }
      if (resource.closeTime) {
        setCloseTime(dayjs(resource.closeTime));
      }
      if (resource.openDays) {
        setSelectedDays(resource.openDays.split(',').map(day => day.trim()));
      }
    }
  }, [resource]);

  const handleDayChange = (
    event: React.MouseEvent<HTMLElement>,
    newDays: string[]
  ) => {
    setSelectedDays(newDays);
    const newOpenDays = Array.from(
      new Set(newDays.map((d) => d.trim().slice(0, 3)))
    ).join(",");
    
    console.log('Days changed:', {
      newDays,
      newOpenDays,
      originalDays: originalValues.openDays
    });

    if (newOpenDays !== originalValues.openDays) {
      setChangedFields(prev => new Set([...prev, 'openDays']));
    } else {
      setChangedFields(prev => {
        const newSet = new Set(prev);
        newSet.delete('openDays');
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

    console.log(`Field ${name} changed:`, {
      newValue: value,
      originalValue: originalValues[name as keyof typeof originalValues],
      isChanged: value !== originalValues[name as keyof typeof originalValues]
    });


    if (value !== originalValues[name as keyof typeof originalValues]) {
      setChangedFields(prev => new Set([...prev, name]));
    } else {
      setChangedFields(prev => {
        const newSet = new Set(prev);
        newSet.delete(name);
        return newSet;
      });
    }
    console.log('Changed fields:', Array.from(changedFields));
    console.log('new value:', value);
  };

  const handleTimeChange = (field: 'openTime' | 'closeTime', newTime: dayjs.Dayjs | null) => {
    if (field === 'openTime') {
      setOpenTime(newTime);
    } else {
      setCloseTime(newTime);
    }

    const originalTime = originalValues[field];
    const newTimeStr = newTime?.format('HH:mm:ss');
    
    console.log(`Time field ${field} changed:`, {
      newTime: newTimeStr,
      originalTime,
      isChanged: newTimeStr !== originalTime
    });

    if (newTimeStr !== originalTime) {
      setChangedFields(prev => new Set([...prev, field]));
    } else {
      setChangedFields(prev => {
        const newSet = new Set(prev);
        newSet.delete(field);
        return newSet;
      });
    }
  };

  const handleFormAction = async (formData: FormData) => {
    setLoading(true);

    try {
      const changedData = new FormData();
      changedData.append('resourceId', resource?.id?.toString() || '');

      console.log('Changed fields:', Array.from(changedFields));
      console.log('Current form state:', {
        formData,
        selectedDays,
        openTime: openTime?.format('HH:mm:ss'),
        closeTime: closeTime?.format('HH:mm:ss')
      });

      // Add all fields, but set unchanged ones to null
      const allFields = ['name', 'address', 'phone', 'url', 'openDays', 'openTime', 'closeTime'];
      allFields.forEach(field => {
        if (changedFields.has(field)) {
          switch (field) {
            case 'name': 
              changedData.append('name', String(formData.get('name')));
              break;
            case 'address':
              console.log('Adding changed address:', formData.get('address'));
              changedData.append('address', String(formData.get('address')));
              break;
            case 'phone':
              changedData.append('phone', String(formData.get('phone')));
              break;
            case 'url':
              changedData.append('url', String(formData.get('url')));
              break;
            case 'openDays':
              const openDays = Array.from(
                new Set(selectedDays.map((d) => d.trim().slice(0, 3)))
              ).join(",");
              console.log('Adding changed openDays:', openDays);
              changedData.append('openDays', openDays);
              break;
            case 'openTime':
              const openTimeStr = openTime?.format('HH:mm:ss') || '';
              console.log('Adding changed openTime:', openTimeStr);
              changedData.append('openTime', openTimeStr);
              break;
            case 'closeTime':
              const closeTimeStr = closeTime?.format('HH:mm:ss') || '';
              console.log('Adding changed closeTime:', closeTimeStr);
              changedData.append('closeTime', closeTimeStr);
              break;
          }
        } else {
          console.log(`Field ${field} unchanged, setting to null`);
          changedData.append(field, 'null');
        }
      });

      // Log the final form data being sent
      console.log('Final form data being sent:');
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
    <div className="absolute top-4 right-4 z-50 w-96 bg-white rounded-lg shadow-xl p-6">
      <button
        onClick={() => onEditCloseAction(null)}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>

      <h1>Suggest an Edit</h1>
      <p className="text-sm text-gray-600 mb-4">Only changed fields will be submitted for review</p>

      <form action={handleFormAction}>
        <Box
          component="div"
          sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
        >
          <input name="resourceId" value={resource?.id ?? ""} type="hidden" />
          <TextField
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            variant="standard"
            helperText={changedFields.has('name') ? "Changed" : "Original value"}
          />
          <TextField
            name="address"
            label="Address"
            value={formData.address}
            onChange={handleChange}
            variant="standard"
            helperText={changedFields.has('address') ? "Changed" : "Original value"}
          />
          <TextField
            name="phone"
            label="Phone"
            value={formData.phone}
            onChange={handleChange}
            variant="standard"
            helperText={changedFields.has('phone') ? "Changed" : "Original value"}
          />
          <TextField
            name="url"
            label="Website"
            value={formData.url}
            onChange={handleChange}
            variant="standard"
            helperText={changedFields.has('url') ? "Changed" : "Original value"}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="space-y-4">
              <p className="font-semibold mb-1">Open Days</p>
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
              {changedFields.has('openDays') && (
                <p className="text-sm text-blue-600">Days changed</p>
              )}
            </div>
            <div className="space-y-4 mt-4">
              <TimePicker
                label="Open Time"
                value={openTime}
                onChange={(newTime) => handleTimeChange('openTime', newTime)}
              />
              {changedFields.has('openTime') && (
                <p className="text-sm text-blue-600">Open time changed</p>
              )}
              <TimePicker
                label="Close Time"
                value={closeTime}
                onChange={(newTime) => handleTimeChange('closeTime', newTime)}
              />
              {changedFields.has('closeTime') && (
                <p className="text-sm text-blue-600">Close time changed</p>
              )}
            </div>
          </LocalizationProvider>

          <button
            type="submit"
            className="bg-blue-600 mt-4 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
            disabled={loading || changedFields.size === 0}
          >
            {loading ? "Submitting..." : "Submit Changes"}
          </button>
        </Box>
      </form>
    </div>
  );
}
