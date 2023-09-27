import {JSX, useEffect, useState} from "react";
import {Employee} from "./WorkerPage.tsx";
import {generateRequestParams} from "../GlobalUtils.ts";
import Department from "../departments/Departments.tsx";
import {FilterBar, LoadingIcon, SearchBar} from "../Global";


function AddEmployeeCard(): JSX.Element {
    return (
        <a className="hover:cursor-pointer block h-full" href="/employees/add">
            <div
                className="rounded-2xl shadow-xl p-2 bg-gray-200
                overflow-clip hover:scale-110 hover:shadow-2xl w-44 h-full">
                <div className="flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         strokeWidth={1.5} stroke="currentColor" className="w-40 h-52">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                    </svg>
                </div>
                <div className="pt-1 flex justify-center">
                    <h2>Add employee</h2>
                </div>
            </div>
        </a>
    );
}


function EmployeeCard(props: {
    employee: Employee,
    departmentName: string
}): JSX.Element {
    return (
        <a className="hover:cursor-pointer" href={"/employees/" + props.employee.id}>
            <div
                className="rounded-2xl shadow-xl p-2 bg-gray-200 overflow-clip hover:scale-110 hover:shadow-2xl w-44 h-full">
                <div className="flex justify-center">
                    <img src={props.employee.photo ? props.employee.photo : "/assets/EmptyPfp.svg"}
                         alt={props.employee.name}
                         className="w-36 h-36 rounded-t-2xl mb-2"/>
                </div>
                <div className="border-t-violet-600 border-2 pt-1">
                    <h2>{props.employee.name} {props.employee.surname}</h2>
                    <p>Age: {props.employee.age}</p>
                    <p>Department: {props.departmentName}</p>
                    <p>Language: {props.employee.programmingLanguageName}</p>
                </div>
            </div>
        </a>
    );

}


function EmployeeList(props: {
    setLoading: (state: boolean) => void,
    constraints: Map<string, Set<string>>,
    search: string,
    isLoading: boolean,
    setFirstEmployeesRendered: (state: boolean) => void
}): JSX.Element {

    const [employees, setEmployees] = useState([] as Employee[]);
    const [departments, setDepartments] = useState([] as Department[]);

    useEffect(() => {
        fetch('http://localhost:8080/employees' + generateRequestParams(props.constraints),
            {
                method: 'GET',
            })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setEmployees(data);
            })
            .then(() => {
                fetch('http://localhost:8080/departments',
                    {
                        method: 'GET'
                    })
                    .then((response) => {
                        return response.json()
                    })
                    .then((data) => {
                        setDepartments(data);
                        props.setLoading(false);
                        props.setFirstEmployeesRendered(true);
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [props.constraints]);

    return (
        <>
            <div className="flex ml-6 mr-6">
                <ul id="employees-list" className="flex justify-around gap-6 flex-wrap w-full pb-8">
                    {!props.isLoading &&
                        <>
                        <li><AddEmployeeCard/></li>
                        { employees
                            .filter((employee: Employee) => {
                                return (employee.name + " " + employee.surname).toLowerCase().includes(props.search.toLowerCase());
                            })
                            .map((employee: Employee) => (
                                <li key={employee.id}>
                                    <EmployeeCard
                                        employee={employee}
                                        departmentName={departments.find((department) => {
                                            return department.id == employee.departmentId;
                                        })?.name as string}/>
                                </li>
                            ))}
                        </>
                    }
                </ul>
            </div>
        </>
    );
}

function EmployeePage(): JSX.Element {
    const [isLoading, setLoading] = useState(true);
    const [isFirstEmployeesRendered, setFirstEmployeesRendered] = useState(false);
    const [constraints, setConstraints] = useState(new Map<string, Set<string>>());
    const [search, setSearch] = useState("");

    return (
        <>
            <div className="grid grid-cols-12">
                <div className="col-span-5"></div>
                <div className="col-span-2 flex justify-center">
                    <h1 className="text-xl md:text-3xl text-center p-6 font-semibold">Employees</h1>
                </div>
                <div className="col-span-1"></div>
                <SearchBar setSearch={setSearch}/>
            </div>
            <div className="flex relative">
                <FilterBar setConstraints={setConstraints}
                           constraints={constraints}
                           setLoading={setLoading}
                           isFirstEntityRendered={isFirstEmployeesRendered}
                           endpointsToFetch={["departments", "programming-languages"]}/>
                <EmployeeList setLoading={setLoading}
                              constraints={constraints}
                              search={search}
                              isLoading={isLoading}
                              setFirstEmployeesRendered={setFirstEmployeesRendered}/>
                {isLoading && <LoadingIcon/>}
            </div>
        </>
    );
}

export default EmployeePage;