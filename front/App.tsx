//import {useState} from "react";

import React from "react";
import EmployeePage from "./workers/WorkersPage.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Navbar} from "./Global.tsx";
import WorkerPage from "./workers/WorkerPage.tsx";
import AddWorkerPage from "./workers/AddWorkerPage.tsx";
import DepartmentsPage from "./departments/DepartmentsPage.tsx";

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
    },
    {
        path: "/departments",
        element: (
            <>
                <Navbar/>
                <DepartmentsPage/>
            </>)
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
