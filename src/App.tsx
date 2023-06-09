import {  Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Layout from "./pages/Layout";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Onboarding from "./pages/Onboarding";
import NewArticle from "./pages/new/index";
import DraftEdit from "./pages/DraftEdit";
import LandingPage from "./pages/LandingPage";
// import ProtectedRoute from "./components/ProtectedRoute";
import ArticlesDetails from "./pages/ArticlesDetails";
import NoMatch from "./pages/NoMatch";
import Personalize from "./components/Personalize";
import Featured from "./components/Featured";
import Recent from "./components/Recent";



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<LandingPage/>} />
     <Route path="/" element={<Layout/>} >
       <Route path="/feed" element={<Feed/>} >
         <Route index  element={<Personalize/>} />
         <Route path='personalize' element={<Personalize/>} />
         <Route  path="featured" element={<Featured/>} />
         < Route path="recent" element={<Recent/>} />
       </Route>
       <Route  path='/profile' element={<Profile/>} />
     </Route>
     <Route path='/onboard' element={<Onboarding/>} />
     <Route path='/:articleId' element={<ArticlesDetails/>} />
     <Route path='/new' element={<NewArticle/>} />
     <Route path='/edit/:draftId' element={<DraftEdit/>} />
     <Route path='*' element={<NoMatch/>} />
    </Route>
  )
)




function App() {
  return (
    <RouterProvider router={router}/>
  );
    
}

export default App;
