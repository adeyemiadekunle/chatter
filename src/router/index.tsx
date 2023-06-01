import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { Layout } from '../components';
import Feed from '../pages/Feed';
import Profile from '../pages/Profile';
import Onboarding from '../pages/Onboarding';
import NewArticle from '../pages/new/index';
import LandingPage from '../pages/LandingPage';


export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<LandingPage />} />
            <Route  element={<Layout />}>
                <Route path='/feed' element={<Feed />} />
                <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/onboard" element={<Onboarding />} />
            <Route path="/new/:newId" element={<NewArticle />} />
        </Route>

    )
)



