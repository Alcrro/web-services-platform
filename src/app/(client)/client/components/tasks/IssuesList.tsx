"use client";

import { API_URL } from "@/shared/config/env";
import { useQuery } from "@tanstack/react-query";

async function fetchIssues() {
  const response = await fetch(`${API_URL}/api/github/tasks`, {
    method: "GET",
  });
  const data = await response.json();
  return data;
}
const IssuesList = () => {
  const { data, isPending, isLoading } = useQuery({
    queryKey: ["githubTasks"],
    queryFn: () => fetchIssues(),
  });

  const isShowing = isPending || isLoading;
  if (isShowing) return <div>Loading...</div>;

  console.log(data);

  return <div>IssuesList</div>;
};

export default IssuesList;
