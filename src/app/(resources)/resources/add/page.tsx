"use client";

// add new resource

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddResource() {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  const [openTime, setOpenTime] = useState("09:00");
  const [closeTime, setCloseTime] = useState("17:00");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      openTime: openTime, // time is saved in HH:mm format
      closeTime: closeTime, // time is saved in HH:mm format
    };
    console.log("Submitted Data:", data);
    // Here you would send the data to your backend, e.g., via an API request
  };

  const handleImageUpload = async () => {
    if (!image) return;

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = async () => {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: reader.result }),
      });

      const data = await res.json();
      if (data.imageUrl) {
        setImageUrl(data.imageUrl);
      }
    };
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
      />
      <button onClick={handleImageUpload}>Upload</button>
      {imageUrl && <img src={imageUrl} alt="Uploaded preview" width="200" />}
      <TimePicker label="Open Time" value={openTime} onChange={setOpenTime} />
      <TimePicker
        label="Close Time"
        value={closeTime}
        onChange={setCloseTime}
      />
      <button type="submit">Save Resource</button>
    </form>
  );
}

function TimePicker({ label, value, onChange }) {
  return (
    <div>
      <label>{label}</label>
      <input
        type="time"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-2 border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none"
      />
    </div>
  );
}

const saveResource = async () => {
  const response = await fetch("/api/resources", {
    method: "POST",
    body: JSON.stringify({
      name: "Resource Name",
      openTime: "09:00", // Open time as string
      closeTime: "17:00", // Close time as string
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();
  console.log(result);
};
