"use client";

import React, { useState, useEffect } from "react";
import Popup from "./Popup";
import { useRouter } from "next/navigation";
import { addResource } from "@/app/actions/forms";
import { getCategories } from "@/app/actions/forms";
import { formSchema, type FormValues } from "@/app/lib/forms/validationSchema";
import BasicInfoSection from "@/app/lib/forms/BasicInfoSection";
import AdditionalDetailsSection from "@/app/lib/forms/AdditionalDetailsSection";
import dayjs from "dayjs";
import toast from "react-hot-toast";

import Accordion from "@mui/material/Accordion";
import { AccordionSummary, Typography } from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface AddResourcePopupProps {
  anchor: HTMLElement | null;
  open: boolean;
  onClose: () => void;
}

export default function AddResourcePopup({
  anchor,
  open,
  onClose,
}: AddResourcePopupProps) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [openTime, setOpenTime] = useState<dayjs.Dayjs | null>(null);
  const [closeTime, setCloseTime] = useState<dayjs.Dayjs | null>(null);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormValues>({
    name: "",
    categoryId: "",
    address: "",
    city: "",
    phone: "",
    email: "",
    url: "",
    facebookLink: "",
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  useEffect(() => {
    async function fetchCategories() {
      const data = await getCategories();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFormAction = async (formData: FormData) => {
    setLoading(true);
    setMessage("");
    setErrors({});

    try {
      const validationResult = formSchema.safeParse({
        name: formData.get("name"),
        categoryId: formData.get("categoryId"),
        city: formData.get("city"),
        address: formData.get("address"),
        phone: formData.get("phone"),
        email: formData.get("email"),
        url: formData.get("url"),
        facebookLink: formData.get("facebookLink"),
        description: formData.get("description"),
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

      if (imageUrl) {
        formData.append("image", imageUrl);
      }

      const result = await addResource(formData);

      if (result.status === 409) {
        toast.error("Resource with this name or address already exist");
        setMessage(result.error);
        setLoading(false);
        return;
      }

      if (result.status === 400) {
        toast.error("Resource must be in New York City.");
        setMessage(result.error);
        setLoading(false);
        return;
      }

      if (result.success) {
       // Reset all form state before closing
       setFormData({
        name: "",
        categoryId: "",
        address: "",
        city: "",
        phone: "",
        email: "",
        url: "",
        facebookLink: "",
        description: "",
      });
      setSelectedDays([]);
      setOpenTime(null);
      setCloseTime(null);
      setImageUrl(null);
      setMessage(result.success);
      setTimeout(() => setMessage(""), 2000); // Clear message after 2 seconds
      
      onClose(); // Close popup on success
      router.push("/profile");
      toast.success("Resource added successfully");
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

  const formContent = (
    <div className="space-y-4">
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

      <form action={handleFormAction} className="space-y-1">
        <BasicInfoSection
          formData={formData}
          errors={errors}
          categories={categories}
          handleChange={handleChange}
        />

        <Accordion
          defaultExpanded
          className="border border-gray-100 rounded-md"
        >
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
            <AdditionalDetailsSection
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              selectedDays={selectedDays}
              city={formData.city}
              phone={formData.phone}
              openTime={openTime}
              closeTime={closeTime}
              onDayChange={(_, newDays) => setSelectedDays(newDays)}
              onOpenTimeChange={setOpenTime}
              onCloseTimeChange={setCloseTime}
              imageUrl={imageUrl}
              onImageUpload={setImageUrl}
            />
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
  );

  return (
    <Popup
      anchor={anchor}
      open={open}
      onClose={onClose}
      title="Add New Resource"
      content={formContent}
    />
  );
}