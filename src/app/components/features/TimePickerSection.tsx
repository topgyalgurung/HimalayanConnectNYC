/**

 *  Component for handling time selection and open days for resources

 * - Time picker for open and close times
 * - Day selection for business hours
 * - Form integration with hidden inputs
 
 */

"use client";

import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import dayjs from "dayjs";

interface TimePickerSectionProps {
  selectedDays: string[];
  openTime: dayjs.Dayjs | null;
  closeTime: dayjs.Dayjs | null;
  onDayChange: (event: React.MouseEvent<HTMLElement>, newDays: string[]) => void;
  onOpenTimeChange: (newTime: dayjs.Dayjs | null) => void;
  onCloseTimeChange: (newTime: dayjs.Dayjs | null) => void;
}

export default function TimePickerSection({
  selectedDays,
  openTime,
  closeTime,
  onDayChange,
  onOpenTimeChange,
  onCloseTimeChange,
}: TimePickerSectionProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="space-y-4">
        <div>
          <p className="font-semibold mb-1">Open Days</p>
          <ToggleButtonGroup
            value={selectedDays}
            onChange={onDayChange}
            aria-label="Weekdays"
            size="small"
          >
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <ToggleButton key={day} value={day}>
                {day}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <input
            type="hidden"
            name="openDays"
            value={Array.from(
              new Set(selectedDays.map((d) => d.trim().slice(0, 3)))
            ).join(",")}
          />
        </div>

        <div className="flex gap-4 mt-4">
          <TimePicker
            label="Open Time"
            value={openTime}
            onChange={onOpenTimeChange}
          />
          <TimePicker
            label="Close Time"
            value={closeTime}
            onChange={onCloseTimeChange}
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
      </div>
    </LocalizationProvider>
  );
}
