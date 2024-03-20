import { Suspense } from "react";

import LottieHandler from "../LottieHandler/LottieHandler";

const PageSuspenseFallback = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense
      fallback={
        <LottieHandler type="loading" message="loading please wait.." />
      }
    >
      {children}
    </Suspense>
  );
};

export default PageSuspenseFallback;
