import { createBrowserRouter, RouterProvider } from "react-router-dom";

// layouts
import { MainTemplate } from "@templates/index";

// pages
import Home from "@pages/Home";
import Categories from "@pages/Categories";
import Products from "@pages/Products";
import AboutUs from "@pages/AboutUs";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainTemplate />,
    children: [
      { index: true, element: <Home /> },
      { path: "/categories", element: <Categories /> },
      { path: "/about-us", element: <AboutUs /> },
      {
        path: "/products/:prefix",
        element: <Products />,
        loader: ({ params }) => {
          if (
            //if its undefined or not good for regex role then denied
            typeof params?.prefix !== "string" ||
            /^[a-z]+$/i.test(params?.prefix)
          ) {
            throw new Response("Bad Request", {
              statusText: "Category not found",
              status: 400,
            });
          }
          return "";
        },
      },
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={routes} />;
};

export default AppRoutes;
