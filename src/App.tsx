import { Route, RouteProps, Routes } from 'react-router-dom';
import './App.css';
import { Account, AddProperty, AllProperties, Home, Inbox, Login, MapPage, Properties, Register, Rooms } from './pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthLayout from './pages/AuthLayout';
import { useRestore } from './hooks';

function App() {
  useRestore()
  const publicRoutes: RouteProps[] = [
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: "/map", element: <MapPage /> },
    { path: "/rooms", element: <Rooms /> },
    { path: '/', element: <Home /> },
    { path: "/all", element: <AllProperties /> }
  ];

  const protectedRoutes: RouteProps[] = [
    { path: '/account', element: <Account /> },
    { path: '/account/add-property', element: <AddProperty /> },
    { path: "/account/properties", element: <Properties /> },
    { path: "/account/inbox", element: <Inbox /> }
  ];

  return (
    <>
      <Routes>

        {publicRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}

        <Route element={<AuthLayout />} >
          {protectedRoutes.map(({ element, path }) => {
            return <Route element={element} path={path} key={path} />
          })}
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
