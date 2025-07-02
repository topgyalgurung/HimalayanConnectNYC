import React from "react";
import { FormValues } from "./validationSchema";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import CitySelect from "@/app/lib/forms/CitySelect";
import TimePickerSection from "@/app/lib/forms/TimePickerSection";
import PhoneInput from 'react-phone-input-2' // phone number input mask
import 'react-phone-input-2/lib/style.css'

import dayjs from "dayjs";
import { TextField } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Image from "next/image";

interface AdditionalDetailsSectionProps {
  formData: FormValues;
  errors: Record<string, string>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  selectedDays: string[];
  city?: string;
  // phone?: string;
  openTime: dayjs.Dayjs | null;
  closeTime: dayjs.Dayjs | null;
  onDayChange: (
    event: React.MouseEvent<HTMLElement>,
    newDays: string[]
  ) => void;
  onOpenTimeChange: (time: dayjs.Dayjs | null) => void;
  onCloseTimeChange: (time: dayjs.Dayjs | null) => void;
  imageUrl: string | null;
  onImageUpload: (url: string) => void;
  onPhoneChange?: (value: string) => void; // handle phone number change
}

export default function AdditionalDetailsSection({
  formData,
  errors,
  handleChange,
  selectedDays,
  city,
  openTime,
  closeTime,
  onDayChange,
  onOpenTimeChange,
  onCloseTimeChange,
  onImageUpload,
  imageUrl,
  onPhoneChange,
}: AdditionalDetailsSectionProps) {
  function handleUploadSuccess(result: CloudinaryUploadWidgetResults) {
    if (typeof result.info === "object" && result.info?.secure_url) {
      onImageUpload(result.info.secure_url);
    }
  }

  // const mask = countryList.find({code}) => code === countryCode)?.mask;

  return (
    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
      {/* select city with dropdown */}
      <CitySelect city={city} />
      {/* day, open and close time selector */}
      <div className="flex justify-center">
        <TimePickerSection
          selectedDays={selectedDays}
          openTime={openTime}
          closeTime={closeTime}
          onDayChange={onDayChange}
          onOpenTimeChange={onOpenTimeChange}
          onCloseTimeChange={onCloseTimeChange}
        />
      </div>

      <PhoneInput
        country={'us'}
        placeholder="Enter phone number"
        value={formData.phone || ''}
        onChange={(value) => {
          if (onPhoneChange) {
            onPhoneChange(value);
          }
        }}
        containerClass="phone-input-container"
        inputClass="phone-input"
        specialLabel=""
        enableSearch={false}
        disableSearchIcon={true}
        inputProps={{
          name: 'phone',
          required: false,
        }}
      
      />
      {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

      <TextField
        id="outlined-basic"
        label="Email (optional)"
        name="email"
        variant="outlined"
        value={formData.email}
        onChange={handleChange}
        className={`w-full px-3 py-2 border ${
          errors.email ? "border-red-500" : "border-gray-300"
        } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

      {/*   website url  */}
      <TextField
        id="outlined-basic"
        label="URL (optional)"
        name="url"
        variant="outlined"
        value={formData.url}
        onChange={handleChange}
        className={`w-full px-3 py-2 border ${
          errors.url ? "border-red-500" : "border-gray-300"
        } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
      />
      {errors.url && <p className="text-red-500 text-sm">{errors.url}</p>}
      {/* facebook link */}
      <TextField
        id="outlined-basic"
        label="Facebook Link (optional)"
        name="facebookLink"
        variant="outlined"
        value={formData.facebookLink}
        onChange={handleChange}
        className={`w-full px-3 py-2 border ${
          errors.facebookLink ? "border-red-500" : "border-gray-300"
        } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
      />
      {errors.facebookLink && (
        <p className="text-red-500 text-sm">{errors.facebookLink}</p>
      )}
      {/* description */}
      <textarea
        name="description"
        placeholder="Description (optional)"
        value={formData.description}
        onChange={handleChange}
        className={`w-full px-3 py-2 border ${
          errors.description ? "border-red-500" : "border-gray-300"
        } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[80px]`}
      />
      {errors.description && (
        <p className="text-red-500 text-sm">{errors.description}</p>
      )}

      <div className="pt-4 mt-4 border-t border-gray-200">
        {!imageUrl ? (
          <CldUploadWidget
            signatureEndpoint="/api/sign-image"
            options={{ sources: ["local", "url"] }}
            onSuccess={handleUploadSuccess}
          >
            {({ open }) => (
              <button
                type="button"
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                onClick={() => open()}
              >
                Upload an Image
              </button>
            )}
          </CldUploadWidget>
        ) : (
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircleIcon className="h-5 w-5 text-green-500" />
              <span>Image attached</span>
            </div>
            <div className="relative rounded-lg overflow-hidden border border-gray-200 max-w-[200px] mx-auto">
              <Image
                src={imageUrl}
                alt="Uploaded resource image"
                className="w-full h-auto text-center"
                width={200}
                height={200}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
