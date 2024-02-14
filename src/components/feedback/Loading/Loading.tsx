import { TLoading } from "@customTypes/shared";

type LoadingProps = {
  loading: TLoading;
  error: null | string;
  children: React.JSX.Element;
};

const Loading = ({ loading, error, children }: LoadingProps) => {
  if (loading === "pending") {
    return <div>loading please wait</div>;
  }
  if (loading === "failed") {
    return <div>{error}</div>;
  }
  return <div>{children}</div>;
};

export default Loading;
