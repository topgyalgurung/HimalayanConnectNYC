import Rating from "@mui/material/Rating";
import { type ResourceReview, Resource, User } from "@/app/lib/types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface ReviewTabProps {
  resource: Resource;
  user: User | null;
  onReviewResource: (resource: Resource) => void;
  router: ReturnType<typeof useRouter>;
  reviews: ResourceReview[];
}

export const ReviewTab: React.FC<ReviewTabProps> = ({
  resource,
  user,
  onReviewResource,
  router,
  reviews,
}) => (
  <div>
    <div className="self-start text-center">
      <button
        onClick={() => {
          if (!user) {
            toast.error("Please log in to submit a review.");
            router.push("/login");
            return;
          }
          onReviewResource(resource);
        }}
        className="text-center bg-blue-500 text-white py-2 px-3 rounded hover:bg-blue-600"
      >
        Write a Review
      </button>
    </div>
    <hr className="my-4 border-gray-300" />

    {reviews.length === 0 && <p>No reviews yet.</p>}

    {reviews.map((r) => (
      <div key={r.id}>
        <p>{r.User?.firstName || "anonymous"}</p>
        <p>{r.User?.createdAt}</p>
        <Rating value={Number(r.rating)} readOnly precision={0.5} />
        <p className="text-sm text-gray-600">
          Rating: {Number(r.rating).toFixed(1)}
        </p>
        <p>{r.content}</p>
        <hr className="my-4 border-gray-300" />
      </div>
    ))}
  </div>
);
