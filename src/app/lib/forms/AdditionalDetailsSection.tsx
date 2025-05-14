import React from 'react';
import { FormValues } from './validationSchema';
import { CldUploadWidget, CloudinaryUploadWidgetResults } from "next-cloudinary";
import CitySelect from "@/app/components/features/CitySelect";
import TimePickerSection from "@/app/components/features/TimePickerSection";
import dayjs from "dayjs";

interface AdditionalDetailsSectionProps {
  formData: FormValues;
  errors: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  selectedDays: string[];
  openTime: dayjs.Dayjs | null;
  closeTime: dayjs.Dayjs | null;
  onDayChange: (event: React.MouseEvent<HTMLElement>, newDays: string[]) => void;
  onOpenTimeChange: (time: dayjs.Dayjs | null) => void;
  onCloseTimeChange: (time: dayjs.Dayjs | null) => void;
  onImageUpload: (url: string) => void;
}

export default function AdditionalDetailsSection({
  formData,
  errors,
  handleChange,
  selectedDays,
  openTime,
  closeTime,
  onDayChange,
  onOpenTimeChange,
  onCloseTimeChange,
  onImageUpload,
}: AdditionalDetailsSectionProps) {
  function handleUploadSuccess(result: CloudinaryUploadWidgetResults) {
    if (typeof result.info === 'object' && result.info?.secure_url) {
      onImageUpload(result.info.secure_url);
    }
  }

  return (
    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
      <CitySelect />

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

      <input
        type="tel"
        name="phone"
        placeholder="Phone Number (XXX-XXX-XXXX) (optional)"
        value={formData.phone}
        onChange={handleChange}
        className={`w-full px-3 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
      />
      {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

      <input
        type="url"
        name="url"
        placeholder=" URL (optional) e.g. must start with https:// or http://"
        value={formData.url}
        onChange={handleChange}
        className={`w-full px-3 py-2 border ${errors.url ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
      />
      {errors.url && <p className="text-red-500 text-sm">{errors.url}</p>}

      <input
        type="url"
        name="facebookLink"
        placeholder="Facebook Link (optional)"
        value={formData.facebookLink}
        onChange={handleChange}
        className={`w-full px-3 py-2 border ${errors.facebookLink ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
      />
      {errors.facebookLink && <p className="text-red-500 text-sm">{errors.facebookLink}</p>}

      <textarea
        name="description"
        placeholder="Description (optional)"
        value={formData.description}
        onChange={handleChange}
        className={`w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[80px]`}
      />
      {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}

      <div className="pt-4 mt-4 border-t border-gray-200">
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
      </div>
    </div>
  );
} 