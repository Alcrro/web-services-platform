import { Dispatch, SetStateAction, useEffect } from "react";

export const useSkeletonFallback = ({
  setLoading,
}: {
  setLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1600);
    return () => clearTimeout(timer);
  }, [setLoading]);
};
