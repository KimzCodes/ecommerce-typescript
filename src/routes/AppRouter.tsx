import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// layouts
const MainLayout = lazy(() => import("@layouts/MainLayout/MainLayout"));
// Suspense
import { LottieHandler } from "@components/feedback";
// pages
import Error from "@pages/Error";
const Home = lazy(() => import("@pages/Home"));
const Wishlist = lazy(() => import("@pages/Wishlist"));
const Categories = lazy(() => import("@pages/Categories"));
const Cart = lazy(() => import("@pages/Cart"));
const Products = lazy(() => import("@pages/Products"));
const AboutUs = lazy(() => import("@pages/AboutUs"));
const Login = lazy(() => import("@pages/Login"));
const Register = lazy(() => import("@pages/Register"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense
        fallback={
          <div className="d-flex flex-column align-items-center">
            <h5 style={{ marginTop: "20%" }}>Loading please wait...</h5>
          </div>
        }
      >
        <MainLayout />
      </Suspense>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <Suspense
            fallback={
              <LottieHandler type="loading" message="Loading please wait..." />
            }
          >
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense
            fallback={
              <LottieHandler type="loading" message="Loading please wait..." />
            }
          >
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <Suspense
            fallback={
              <LottieHandler type="loading" message="Loading please wait..." />
            }
          >
            <Wishlist />
          </Suspense>
        ),
      },
      {
        path: "/categories",
        element: (
          <Suspense
            fallback={
              <LottieHandler type="loading" message="Loading please wait..." />
            }
          >
            <Categories />
          </Suspense>
        ),
      },
      {
        path: "/categories/products/:prefix",
        element: (
          <Suspense
            fallback={
              <LottieHandler type="loading" message="Loading please wait..." />
            }
          >
            <Products />
          </Suspense>
        ),
        loader: ({ params }) => {
          if (
            typeof params.prefix !== "string" ||
            !/^[a-z]+$/i.test(params.prefix)
          ) {
            throw new Response("Bad Request", {
              statusText: "Category not found",
              status: 400,
            });
          }
          return true;
        },
      },
      {
        path: "about-us",
        element: (
          <Suspense
            fallback={
              <LottieHandler type="loading" message="Loading please wait..." />
            }
          >
            <AboutUs />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense
            fallback={
              <LottieHandler type="loading" message="Loading please wait..." />
            }
          >
            <Login />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense
            fallback={
              <LottieHandler type="loading" message="Loading please wait..." />
            }
          >
            <Register />
          </Suspense>
        ),
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
