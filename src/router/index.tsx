import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { Layout } from '../components';
import Home from '../pages/Homepage';
import Profile from '../pages/Profile';
import Register from '../pages/Register';
import Draft from '../pages/draft/index';


export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="/draft/:draftId" element={<Draft />} />
        </Route>

    )
)



