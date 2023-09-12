import {JSX, useState} from "react";
import {Employee, WorkerControlPanel} from "./WorkerPage.tsx";
import Consts from "./Consts.tsx";


export default function AddWorkerPage() : JSX.Element {
    const [isLoading, setLoading] = useState(true);
    const [isAliasLoading, setAliasLoading] = useState(true);
    const [employee, setEmployee] =
        useState(new Employee(Consts.newEmployeeId, "", "", 18, "MALE", "", "", ""));

    return (
        <div>
            <h1 className="text-3xl text-center p-6 font-semibold">Add worker</h1>
            <div className={isLoading ? "pt-8" : ""}>
                { isLoading &&
                    <div className="flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                                  className="animate-spin origin-center"/>
                        </svg>
                    </div>
                }
                <WorkerControlPanel employee={employee}
                                    setLoading={setLoading}
                                    setAliasLoading={setAliasLoading}
                                    isAliasLoading={isAliasLoading}
                                    setEmployee={setEmployee}/>
            </div>
        </div>
    )
}