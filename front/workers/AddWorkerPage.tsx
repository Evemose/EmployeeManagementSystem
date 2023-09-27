import {JSX, useState} from "react";
import {Employee, WorkerControlPanel} from "./WorkerPage.tsx";
import Consts from "../Consts.tsx";
import {LoadingIcon} from "../Global";


export default function AddWorkerPage() : JSX.Element {
    const [isLoading, setLoading] = useState(true);
    const [isAliasLoading, setAliasLoading] = useState(true);
    const [employee, setEmployee] =
        useState(new Employee(Consts.newEmployeeId, "", "", 18, "MALE", -1, "", ""));

    return (
        <div>
            <h1 className="text-3xl text-center p-6 font-semibold">Add worker</h1>
            <div className={isLoading ? "pt-8" : ""}>
                { isLoading && <LoadingIcon/> }
                <WorkerControlPanel employee={employee}
                                    setLoading={setLoading}
                                    setAliasLoading={setAliasLoading}
                                    isAliasLoading={isAliasLoading}
                                    setEmployee={setEmployee}/>
            </div>
        </div>
    )
}