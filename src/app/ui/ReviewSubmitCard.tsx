// src/app/components/features/ReviewSubmitCard.tsx
/**
 * ReviewSubmitCard Component
 *
 * This component is the form for submitting a review for a resource.
 *
 */
// todo: change to action instead of handleSubmit and calling api that post to db

"use client";

import { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CircularProgress from "@mui/material/CircularProgress";

import Popup from "@/app/components/dashboard/ResourcePopup/Popup";

import { type Resource } from "@/app/lib/types";
interface ReviewResourceCardProps {
  anchor: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  resource: Resource | null;
  // onReviewCloseAction: (resource: Resource | null) => void;
}

export default function ReviewSubmitCard({
  anchor,
  open,
  onClose,
  resource,
  // onReviewCloseAction,
}: ReviewResourceCardProps) {
  // not sure why i use useEffect to get user, might be able to call useUser later
  const [user, setUser] = useState<{
    firstName: string;
    lastName: string;
    image?: string;
  } | null>(null);
  const [rating, setRating] = useState<number | null>(5.0);
  const [content, setContent] = useState<string | "">("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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

    console.log("Rating before submit:", rating);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/resources/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          resourceId: resource.id,
          rating,
          content,
        }),
      });

      if (res.ok) {
        setIsSubmitted(true);
        // Dispatch event to notify that a review was submitted
        window.dispatchEvent(new Event("reviewSubmitted"));
        // Close the review card after a short delay
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error("Review submit failed: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formContent = (
    <div className="space-y-4">

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
          <> {resource?.name}</>
        </Typography>
        <Box className="mb-4">
          <Typography variant="body2" color="text.secondary" className="mb-2">
            Hover over stars to rate
          </Typography>
          <Rating
            name="user-rating"
            value={rating}
            precision={0.5}
            size="large"
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
          <Typography variant="body2" color="text.secondary" className="mt-1">
            {rating ? `${rating} stars` : "No rating selected"}
          </Typography>
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
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Submit Review"
          )}
        </Button>
      </>
    )}
    </div>
  );

  return (
    <Popup
      anchor={anchor}
      open={open}
      onClose={onClose}
      title="Write a Review"
      content={formContent}
    />
  );
}
