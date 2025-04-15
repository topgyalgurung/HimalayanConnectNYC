"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { addResource, getCategories } from "@/app/actions/forms";
import { CldUploadWidget } from "next-cloudinary";
import Accordion from "@mui/material/Accordion";
import { AccordionSummary, Typography } from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function AddResourceForm({ user }: any) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  // const [state, formAction, pending] = useActionState(addResource, initialState)
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const [imageUrl, setImageUrl] = useState<string | null>(null); // State to hold the image URL
  const router = useRouter();

  // Fetch categories from the server action
  useEffect(() => {
    async function fetchCategories() {
      const data = await getCategories();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  function handleUploadSuccess(result: any) {
    const url = result?.info?.secure_url;
    if (url) {
      setImageUrl(url);
      console.log("image url: ", url); // Use 'image' to match addResource
    }
  }

  const handleFormAction = async (formData: FormData) => {
    setLoading(true);
    setMessage("");
    // Append the image URL to the FormData with the key 'image' (matching server action)
    if (imageUrl) {
      formData.append("image", imageUrl);
    }
    try {
      const result = await addResource(formData);
      setLoading(false);
      if (result.success) {
        setMessage(result.success);
        setImageUrl(null); // reset image url after successful submission
        router.push("/profile"); // '/profile/$user.id}
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
    <div className="max-w-2xl mt-5 mx-auto p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-bold mb-4">Add a New Resource</h2>
      <h4>Provide some information about this place</h4>
      {message && (
        <p
          className={`text-sm text-center ${
            message.includes("success") ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}

      <form action={handleFormAction} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Resource Name"
          required
          className="w-full p-2 border rounded"
        />

        <select
          name="categoryId"
          required
          className="w-full p-2 border rounded"
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
          className="w-full p-2 border rounded"
        />
        {/* optional  */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="optional-content"
            id="optional-content"
          >
            <Typography component="span"> Add more details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Add phone, hours, website, photos to verify this place{" "}
            </Typography>
            <input
              type="text"
              name="city"
              placeholder="City"
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="openDays"
              placeholder="Open Days (e.g., Mon-Fri)"
              className="w-full p-2 border rounded"
            />
            <input
              type="time"
              name="openTime"
              placeholder="opening time"
              className="w-full p-2 border rounded"
            />
            <input
              type="time"
              name="closeTime"
              placeholder="closing time"
              className="w-full p-2 border rounded"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              className="w-full p-2 border rounded"
            />

            <input
              type="url"
              name="url"
              placeholder="Website"
              className="w-full p-2 border rounded"
            />
            <input
              type="url"
              name="facebookLink"
              placeholder="Facebook Link"
              className="w-full p-2 border rounded"
            />

            <textarea
              name="description"
              placeholder="Description"
              className="w-full p-2 border rounded"
            />

            {/* Cloudinary image upload widget */}
            {imageUrl && <input type="hidden" name="image" value={imageUrl} />}
            <CldUploadWidget
              signatureEndpoint="/api/sign-image"
              options={{ sources: ["local", "url"] }}
              onSuccess={handleUploadSuccess}
            >
              {({ open }) => (
                <button
                  type="button"
                  className="bg-indigo-500 rounded py-2 px-4 mb-4 text-white"
                  onClick={() => open()}
                >
                  Upload an Image
                </button>
              )}
            </CldUploadWidget>
          </AccordionDetails>
        </Accordion>

        {/* Display the uploaded image URL (optional) */}
        {/* {imageUrl && (
          <div className="mt-2">
            <p className="text-sm">Uploaded Image: {imageUrl}</p>
          </div>
        )} */}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={loading}
          // disabled = {pending}
        >
          {loading ? "Submitting..." : "Submit Resource"}
        </button>
      </form>
    </div>
  );
}
