import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import FeedLayout from "./components/Feed/FeedLayout";
import Profile from "./pages/Profile";
import Onboarding from "./pages/Onboarding";
import Draft from "./pages/New";
import ArticleDetails from "./pages/ArticlePage";
import NoMatch from "./pages/NoMatch";
import Personalize from "./components/Feed/Personalize";
import Featured from "./components/Feed/Featured";
import Recent from "./components/Feed/Recent";
import { PrivateRoute } from "./utils/PrivateRoute";
import AdminPage from "./pages/AdminPage";
import CreateAccount from "./pages/CreateAccount";
import TagCategory from "./pages/TagCategory";
import GeneralLayout from "./components/GeneralLayout";
import Hot from "./components/Tags/Hot";
import New from "./components/Tags/New";
import Bookmarks from "./pages/Bookmarks";
import Search from "./pages/Search";
import Home from "./pages/Home";
import Settings from "./pages/Settings";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/onboard" element={<Onboarding />} />
      <Route path="*" element={<NoMatch />} />
       
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<FeedLayout />}>
          <Route path="/" element={<Home />}>
            <Route index element={<Personalize />} />
            <Route path="personalize" element={<Personalize />} />
            <Route path="featured" element={<Featured />} />
            <Route path="recent" element={<Recent />} />
          </Route>
        </Route>
      </Route>

      <Route >
        <Route path="/admin" element={<AdminPage />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/" element={<GeneralLayout />}>
        <Route path="/u/:username" element={<Profile />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/search" element={<Search/>} >
        </Route>
          <Route path="/t/:hash" element={<TagCategory />}>
            <Route index element={<Hot/>}  />
            <Route path='hot' element={<Hot/>} />
            <Route path='new' element={<New/>} />
            <Route/>
          </Route>
        </Route>
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/:username/:slug" element={<ArticleDetails />} />
        <Route path="/draft/:draftId" element={<Draft />} />
        <Route path="/onboard/create-account" element={<CreateAccount />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
