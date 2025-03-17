"use client";

import React, { useState } from "react";

export default function AddResourceForm({ user }: any) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const updateResource = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    setLoading(true);
    setMessage("");

    const body = {
      name: formData.get("name"),
      address: formData.get("address"),
    };

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/resources/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // ensure request is sent as json
        },
        body: JSON.stringify(body), // send request body as JSON
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Resource submitted successfully!");
      } else {
        setMessage("Submission failed: " + data.message);
      }
    } catch (error: any) {
      setMessage("Submission error: " + error.message);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-bold mb-4">Add a New Resource</h2>

      {message && (
        <p className="text-sm text-center text-green-500">{message}</p>
      )}

      <form onSubmit={updateResource} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Resource Name"
          required
          className="w-full p-2 border rounded"
        />

        {/* <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select Category</option>
          <option value="Health">Health</option>
          <option value="Legal">Legal</option>
          <option value="Community">Community</option>
        </select> */}

        <input
          type="text"
          name="address"
          placeholder="Address"
          required
          className="w-full p-2 border rounded"
        />
        {/* 
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="url"
          name="website"
          placeholder="Website"
          value={formData.website}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="time"
          name="openingTime"
          value={formData.openingTime}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="time"
          name="closingTime"
          value={formData.closingTime}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          className="w-full p-2 border rounded"
        /> */}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Resource"}
        </button>
      </form>
    </div>
  );
}
