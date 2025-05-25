/**
 * This is the form for adding a new resource.
 * It is a client component that uses the formSchema to validate the form data.
 * It also uses the BasicInfoSection and AdditionalDetailsSection to render the form.
 * It uses the addResource action to add the resource to the database.
 * It uses the getCategories action to get the categories for the resource.
 *
 */

"use client";

import { useState, useEffect } from "react";
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

export default function AddResourceForm() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [openTime, setOpenTime] = useState<dayjs.Dayjs | null>(null);
  const [closeTime, setCloseTime] = useState<dayjs.Dayjs | null>(null);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormValues>({
    name: "",
    categoryId: "",
    address: "",
    city: "",
    phone: "",
    url: "",
    facebookLink: "",
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  useEffect(() => {
    async function fetchCategories() {
      const data = await getCategories();
      console.log("categories", data);
      setCategories(data);
    }
    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFormAction = async (formData: FormData) => {
    setLoading(true);
    setMessage("");
    setErrors({});

    try {
      // Validate form data
      const validationResult = formSchema.safeParse({
        name: formData.get("name"),
        categoryId: formData.get("categoryId"),
        city: formData.get("city"),
        address: formData.get("address"),
        phone: formData.get("phone"),
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
    <div className="h-[calc(100vh-4rem)] mb-2 overflow-y-auto">
      <div className="max-w-2xl mx-auto my-4 px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 space-y-4">
          {/* header */}
          <div className="space-y-2 sticky top-0 bg-white z-10 pb-2">
            <h2 className="text-2xl font-bold text-center text-gray-900">
              Add a New Resource
            </h2>
            <h4 className="text-gray-600 text-center">
              Provide some information about this place
            </h4>
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

          <form action={handleFormAction} className="space-y-1">
            {/* basic info: name, category, address */}
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
                {/* <Typography className="text-gray-600 mb-4">
                  Add other details to verify this place
                </Typography> */}

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
                  onImageUpload={setImageUrl}
                />
              </AccordionDetails>
            </Accordion>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-4 sticky bottom-4"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Resource"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
