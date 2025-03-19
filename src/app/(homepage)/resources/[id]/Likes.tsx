import { like, dislike } from "./actions";
import { useTransition } from "react";
// useTransition: update state without blocking the UI

export default function Likes({ id }: any) {
  let [isPending, startTransition] = useTransition();

  return (
      <div>
          {/* wrap server action inside startTransition */}
      <button onClick={() => startTransition(() => like(id))}> 👍</button>
      <button onClick={() => startTransition(() => dislike(id))}> 👎</button>
    </div>
  );
}
