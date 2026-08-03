// Activity.tsx
"use client";

import Button from "@/shared/ui/Button";

import {
  useGetCheckOrderLinked,
  useMutationCheckOrderLinked,
} from "@/lib/reactQueries/getCheckOrderLinked";

const Activity = () => {
  const { data, isError, isLoading } = useGetCheckOrderLinked();
  const { mutate, isPending } = useMutationCheckOrderLinked();

  if (isLoading) return <p>Loading activity…</p>;
  if (isError) return <p>Could not load activity</p>;

  const isLinked = data; // boolean

  if (isLinked) return null;

  return (
    <div className="p-4 bg-(--color-bg) rounded-lg">
      <p className="mb-2">
        {`We\'ve detected guest orders that match your account. Do you want to link
        them to your profile?`}
      </p>
      <div className="flex gap-2">
        <Button
          variant="primary"
          onClick={() => mutate("later")}
          disabled={isPending}
        >
          {isPending ? "Pending..." : "Later"}
        </Button>
        <Button
          variant="primary"
          onClick={() => mutate("yes")}
          disabled={isPending}
        >
          {isPending ? "Pending..." : "Yes"}
        </Button>
      </div>
    </div>
  );
};

export default Activity;
