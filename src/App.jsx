import { createBrowserRouter, RouterProvider, Routes } from "react-router-dom";
import { Home, About } from "./pages";

// layouts
import { MainLayout } from "./layouts";
function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/about/:id",
          element: <About />,
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
