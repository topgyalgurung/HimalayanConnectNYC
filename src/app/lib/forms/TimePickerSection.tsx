/**

 *  Component for handling time selection and open days for resources

 * - Time picker for open and close times
 * - Day selection for business hours
 * - Form integration with hidden inputs
 * - Validates that open time is before close time
 
 */
// TODO: change dayjs to string since dayjs is not serializable

"use client";

import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { ToggleButton, ToggleButtonGroup, Alert } from "@mui/material";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

interface TimePickerSectionProps {
  selectedDays: string[];
  openTime: dayjs.Dayjs | null;
  closeTime: dayjs.Dayjs | null;
  onDayChange: (
    event: React.MouseEvent<HTMLElement>,
    newDays: string[]
  ) => void;
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
  const [timeError, setTimeError] = useState<string>("");

  const validateAndSetOpenTime = (newTime: dayjs.Dayjs | null) => {
    if (newTime && closeTime && newTime.isSameOrAfter(closeTime)) {
      setTimeError("Open time must be before close time");
      return;
    }
    setTimeError("");
    onOpenTimeChange(newTime);
  };

  const validateAndSetCloseTime = (newTime: dayjs.Dayjs | null) => {
    if (newTime && openTime && newTime.isSameOrBefore(openTime)) {
      setTimeError("Close time must be after open time");
      return;
    }
    setTimeError("");
    onCloseTimeChange(newTime);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="space-y-4">
        <div>
          <p className="font-semibold mb-1">Business Hours</p>
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

        <div className="flex flex-col gap-4 mt-4">
          <div className="flex gap-4">
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
          </div>
          {timeError && (
            <Alert severity="error" className="mt-2">
              {timeError}
            </Alert>
          )}
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
