import { QueryClientProvider, QueryClient } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import EstimatesReview from "./pages/Estimates";
import Nav from "./components/Nav";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  { path: "/estimates/review", element: <EstimatesReview /> },
]);

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Nav />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
