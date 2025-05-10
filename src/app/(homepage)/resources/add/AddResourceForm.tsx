"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { addResource, getCategories } from "@/app/actions/forms";
import { CldUploadWidget } from "next-cloudinary";
import Accordion from "@mui/material/Accordion";
import { AccordionSummary, Typography } from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import dayjs from "dayjs";
import TimePickerSection from "@/app/components/features/TimePickerSection";
import CitySelect from "@/app/components/features/CitySelect";

export default function AddResourceForm({ user }: any) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [openTime, setOpenTime] = useState<dayjs.Dayjs | null>(null);
  const [closeTime, setCloseTime] = useState<dayjs.Dayjs | null>(null);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchCategories() {
      const data = await getCategories();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function handleUploadSuccess(result: any) {
    const url = result?.info?.secure_url;
    if (url) {
      setImageUrl(url);
      console.log("image url: ", url);
    }
  }

  const handleFormAction = async (formData: FormData) => {
    setLoading(true);
    setMessage("");
    if (imageUrl) {
      formData.append("image", imageUrl);
    }
    try {
      const result = await addResource(formData);
      setLoading(false);
      if (result.success) {
        setMessage(result.success);
        setImageUrl(null);
        router.push("/profile");
      } else {
        setMessage(result.error || "Failed to add resource.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("An error occurred while submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-4 px-4 sm:px-6 lg:px-8 pb-8">
      <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">Add a New Resource</h2>
          <h4 className="text-gray-600">Provide some information about this place</h4>
        </div>

        {message && (
          <p
            className={`text-sm text-center py-2 px-4 rounded-md ${
              message.includes("success") 
                ? "bg-green-50 text-green-700" 
                : "bg-red-50 text-red-700"
            }`}
          >
            {message}
          </p>
        )}

        <form action={handleFormAction} className="space-y-4">
          <div className="space-y-3">
            <input
              type="text"
              name="name"
              placeholder="Resource Name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />

            <select
              name="categoryId"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              aria-label="Select a category"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="address"
              placeholder="Address"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <Accordion defaultExpanded className="border border-gray-200 rounded-md">
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="optional-content"
              id="optional-content"
              className="hover:bg-gray-50"
            >
              <Typography component="span" className="font-medium">
                Add more details
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="pt-2">
              <Typography className="text-gray-600 mb-2">
                Add phone, hours, website, photos to verify this place
              </Typography>

              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">

                <CitySelect />

                <div className="flex justify-center">
                  <TimePickerSection
                    selectedDays={selectedDays}
                    openTime={openTime}
                    closeTime={closeTime}
                    onDayChange={(_, newDays) => setSelectedDays(newDays)}
                    onOpenTimeChange={setOpenTime}
                    onCloseTimeChange={setCloseTime}
                  />
                </div>

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

                <input
                  type="url"
                  name="url"
                  placeholder="Website"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

                <input
                  type="url"
                  name="facebookLink"
                  placeholder="Facebook Link"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

                <textarea
                  name="description"
                  placeholder="Description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[80px]"
                />
              </div>

              {imageUrl && <input type="hidden" name="image" value={imageUrl} />}
              
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
            </AccordionDetails>
          </Accordion>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Resource"}
          </button>
        </form>
      </div>
    </div>
  );
}
