import Lottie from "lottie-react";
import empty from "@assets/lotties/empty.json";
import loading from "@assets/lotties/loading.json";
import error from "@assets/lotties/error.json";
import notFound from "@assets/lotties/notFound.json";

const lottiesMap = {
  empty: empty,
  loading: loading,
  error: error,
  notFound: notFound,
};

type LottieHandlerProps = {
  type: keyof typeof lottiesMap;
  message?: string;
};

const LottieHandler = ({ type, message }: LottieHandlerProps) => {
  const lottie = lottiesMap[type];
  return (
    <div className="d-flex flex-column align-items-center">
      <Lottie
        animationData={lottie}
        style={{ width: "300px", marginBottom: "30px" }}
      />
      {message && <h3 style={{ fontSize: "19px" }}>{message}</h3>}
    </div>
  );
};

export default LottieHandler;
