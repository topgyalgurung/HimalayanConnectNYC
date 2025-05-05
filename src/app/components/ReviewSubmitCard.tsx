"use client";
import { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import { type Resource } from "@/app/types/resource";

interface ReviewResourceCardProps {
  resource: Resource | null;
  onReviewCloseAction: (resource: Resource | null) => void;
}

export default function ReviewSubmitCard({
  resource,
  onReviewCloseAction,
}: ReviewResourceCardProps) {
  const [user, setUser] = useState<{
    firstName: string;
    lastName: string;
    image?: string;
  } | null>(null);
  const [rating, setRating] = useState<number | null>(5);
  const [content, setContent] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUser(data);
    };
    fetchUser();
  }, []);

  const handleSubmit = async () => {
    if (!rating || !resource?.id) return;

    try {
      const res = await fetch("/api/resources/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ensure session cookie is sent
        body: JSON.stringify({
          resourceId: resource.id,
          rating,
          content,
        }),
      });
      if (res.ok) setIsSubmitted(true);
    } catch (error) {
      console.error("Review submit failed: ", error);
    }
  };

  return (
    <div className="absolute top-4 right-4 z-50 w-96 bg-white rounded-lg shadow-xl p-6">
      <button
        onClick={onReviewCloseAction}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>

      {isSubmitted ? (
        <Box className="text-center">
          <CheckCircleOutlineIcon className="text-green-500 text-4xl mb-2" />
          <Typography variant="h6">
            Thank you for your review! <>{user?.firstName}</>
          </Typography>
          <Typography variant="body2" className="mt-1 text-gray-500">
            We appreciate your feedback.
          </Typography>
        </Box>
      ) : (
        <>
          <h2>
            {user?.firstName} {user?.lastName}
          </h2>
          <Typography variant="h6" gutterBottom>
            <>{resource?.name}</>
          </Typography>

          <Box className="mb-4">
            <Rating
              name="user-rating"
              value={rating}
              precision={0.5}
              onChange={(event, newValue) => setRating(newValue)}
            />
          </Box>

          <TextField
            label="Write a review"
            multiline
            rows={4}
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value)}
            variant="outlined"
            className="mb-4"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
          >
            Submit Review
          </Button>
        </>
      )}
    </div>
  );
}
