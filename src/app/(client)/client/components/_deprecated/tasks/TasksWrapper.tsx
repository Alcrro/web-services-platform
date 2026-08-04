"use client";

import { API_URL } from "@/shared/config/env";
import { ReactNode, useEffect } from "react";

const TasksWrapper = ({
  children,
  needsRefresh,
}: {
  children: ReactNode;
  needsRefresh: boolean;
}) => {
  useEffect(() => {
    if (!needsRefresh) return;
    async function getRefreshToken() {
      await fetch(`${API_URL}/api/auth/refresh`, {
        method: "POST",
        credentials: "include",
      }).then((res) => res.json());
    }
    getRefreshToken();
  }, [needsRefresh]);
  return <>{children}</>;
};

export default TasksWrapper;
