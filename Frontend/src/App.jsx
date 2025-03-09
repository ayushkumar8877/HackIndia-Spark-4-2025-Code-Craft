import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css'
import './index.css'
import Landing from './components/Landing';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Landing />
      </div>
    ),
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
