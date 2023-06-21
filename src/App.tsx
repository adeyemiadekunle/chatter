import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import FeedLayout from "./components/Feed/FeedLayout";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Onboarding from "./pages/Onboarding";
import Draft from "./pages/Draft/index";
import LandingPage from "./pages/LandingPage";
import ArticleDetails from "./pages/ArticleDetails";
import NoMatch from "./pages/NoMatch";
import Personalize from "./components/Feed/Personalize";
import Featured from "./components/Feed/Featured";
import Recent from "./components/Feed/Recent";
import { PrivateRoute } from "./utils/PrivateRoute";
// import AdminRoute from "./utils/AdminRoute";
// import AdminPage from "./pages/AdminPage";
import CreateAccount from "./pages/CreateAccount";
import TagCategory from "./pages/TagCategory";
import GeneralLayout from "./components/GeneralLayout";
import Hot from "./components/Tags/Hot";
import New from "./components/Tags/New";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<LandingPage />} />
      <Route path="/onboard" element={<Onboarding />} />
      <Route path="*" element={<NoMatch />} />

      <Route element={<PrivateRoute />}>
        <Route path="/" element={<FeedLayout />}>
          <Route path="/feed" element={<Feed />}>
            <Route index element={<Personalize />} />
            <Route path="personalize" element={<Personalize />} />
            <Route path="featured" element={<Featured />} />
            <Route path="recent" element={<Recent />} />
          </Route>
        </Route>
      </Route>

      {/* <Route >
        <Route path="/admin" element={<AdminPage />} />
      </Route> */}

      <Route element={<PrivateRoute />}>
        <Route path="/" element={<GeneralLayout />}>
        <Route path="/:username" element={<Profile />} />
        <Route path="/:username/:slug" element={<ArticleDetails />} />
          <Route path="/t/:hash" element={<TagCategory />}>
            <Route index element={<Hot/>}  />
            <Route path='hot' element={<Hot/>} />
            <Route path='new' element={<New/>} />
            <Route/>
          </Route>
        </Route>
      </Route>

      <Route element={<PrivateRoute />}>
       
       
        <Route path="/draft/:draftId" element={<Draft />} />
        <Route path="/onboard/create-account" element={<CreateAccount />} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
