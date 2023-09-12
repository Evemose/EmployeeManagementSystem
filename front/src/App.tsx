//import {useState} from "react";

import React from "react";
import EmployeePage from "./WorkersPage.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Navbar} from "./Global.tsx";
import WorkerPage from "./WorkerPage.tsx";
import AddWorkerPage from "./AddWorkerPage.tsx";

const router = createBrowserRouter([
    {
        path: "/employees",
        element: (
            <>
                <Navbar/>
                <EmployeePage/>
            </>
        )
    },
    {
        path: "/",
        element: <Navbar/>
    },
    {
        path: "/employees/:id",
        element: (
            <>
                <Navbar/>
                <WorkerPage/>
            </>
        )
    },
    {
        path: "/employees/remove",
        element: (
            <>
                <Navbar/>
                <h1 className="text-center">Remove</h1>
            </>
        )
    },
    {
        path: "/employees/add",
        element: (
            <>
                <Navbar/>
                <AddWorkerPage/>
            </>
        )
    }

]);

function App() {
    //const [page, setPage] = useState("main")

    return (
        <>
            <div>
                <React.StrictMode>
                    <RouterProvider router={router}/>
                </React.StrictMode>
            </div>
        </>
    );
}

export default App;
