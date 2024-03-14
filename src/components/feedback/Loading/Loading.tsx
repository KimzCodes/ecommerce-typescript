import { TLoading } from "@types";
import CategorySkeleton from "../CategorySkeleton/CategorySkeleton";
import ProductSkeleton from "../ProductSkeleton/ProductSkeleton";
import CartSkeleton from "../CartSkeleton/CartSkeleton";

const loadingTypes = {
  category: CategorySkeleton,
  product: ProductSkeleton,
  cart: CartSkeleton,
};

type LoadingProps = {
  status: TLoading;
  error: null | string;
  children: React.ReactNode;
  type?: keyof typeof loadingTypes;
};

const Loading = ({
  status,
  error,
  children,
  type = "category",
}: LoadingProps) => {
  const Component = loadingTypes[type];

  if (status === "pending") {
    return <Component />;
  }
  if (status === "failed") {
    return <div>{error}</div>;
  }
  return <div>{children}</div>;
};

export default Loading;
