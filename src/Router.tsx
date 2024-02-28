import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Dashboard } from './pages/Admin/admin';
import { Header } from './pages/header/header';
import { Nav } from './pages/nav/nav';
import { Home } from './pages/home/home';
import { Addstudent } from './pages/addstudent/addstu';

import { Addstaff } from './pages/addteacher/addstaff';
import { Addbranch } from './pages/addbranch/addbranch';
import { Addsubject } from './pages/addsubject.tsx/addsubject';
import { Student } from './pages/student/student';
import { Staff } from './pages/staff/staff';
import { Record } from './pages/record/record';
import { Batch } from './pages/batch/batch';



const router = createBrowserRouter([
  {
    path: '/admin',
    element: <Dashboard />,
  },
  {
    path: '/header',
    element: <Header />,
  },
  {
    path: '/nav',
    element: <Nav />,
  },
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/addstudent',
    element: <Addstudent />,
  },
  {
    path: '/addstaff',
    element: <Addstaff />,
  },
  {
    path: '/addbranch',
    element: <Addbranch />,
  },
  {
    path: '/addsubject',
    element: <Addsubject />,
  },
  {
    path: '/student',
    element: <Student />,
  },
  {
    path: '/staff',
    element: <Staff />,
  },
  {
    path: '/record',
    element: <Record />,
  },
  {
    path: '/batch',
    element: <Batch />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
