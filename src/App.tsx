import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./pages/Layout";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Onboarding from "./pages/Onboarding";
import Draft from "./pages/Draft/index";
import LandingPage from "./pages/LandingPage";
import ArticlesDetails from "./pages/ArticlesDetails";
import NoMatch from "./pages/NoMatch";
import Personalize from "./components/Personalize";
import Featured from "./components/Featured";
import Recent from "./components/Recent";
import { PrivateRoute } from "./utils/PrivateRoute";
import AdminRoute from "./utils/AdminRoute";
import AdminPage from "./pages/AdminPage";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      
      <Route path="/" element={<LandingPage />} />

      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Layout />}>
          <Route path="/feed" element={<Feed />}>
            <Route index element={<Personalize />} />
            <Route path="personalize" element={<Personalize />} />
            <Route path="featured" element={<Featured />} />
            <Route path="recent" element={<Recent />} />
          </Route>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      <Route path="/onboard" element={<Onboarding />} />
      <Route element={<AdminRoute/>} >
        <Route path="/admin" element={<AdminPage />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="/:articleId" element={<ArticlesDetails />} />
        <Route path="/draft/:draftId" element={<Draft />} />
      </Route>

      <Route path="*" element={<NoMatch />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
