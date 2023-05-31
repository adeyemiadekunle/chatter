import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { Layout } from '../components';
import Home from '../pages/Homepage';
import Profile from '../pages/Profile';
import Onboarding from '../pages/Onboarding';
import NewArticle from '../pages/new/index';


export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/onboard" element={<Onboarding />} />
            <Route path="/new/:newId" element={<NewArticle />} />
        </Route>

    )
)



