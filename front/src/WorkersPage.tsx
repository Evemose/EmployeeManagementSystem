import {ChangeEvent, JSX, useEffect, useState} from "react";
import {Employee} from "./WorkerPage.tsx";


function EmployeeCard(props: { employee: Employee }): JSX.Element {
    return (
        <a className="hover:cursor-pointer" href={"/employees/" + props.employee.id}>
            <div className="rounded-2xl shadow-xl p-2 bg-gray-200 overflow-clip hover:scale-110 hover:shadow-2xl">
                <div className="flex justify-center">
                    <img src={props.employee.photo ? props.employee.photo : "/assets/EmptyPfp.svg"}
                         alt={props.employee.name}
                         className="w-36 h-36 rounded-t-2xl mb-2"/>
                </div>
                <div className="border-t-violet-600 border-2 pt-1">
                    <h2>{props.employee.name} {props.employee.surname}</h2>
                    <p>Age: {props.employee.age}</p>
                    <p>Department: {props.employee.departmentName}</p>
                </div>
            </div>
        </a>
    );

}


function EmployeeList(props: { setLoading: (state: boolean) => void, search: string }): JSX.Element {

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/employees',
            {
                method: 'GET',
            })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setEmployees(data);
                props.setLoading(false);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <>
            <div className="flex ml-6 mr-6">
                <ul className="flex justify-center gap-6 flex-wrap w-full">
                    {
                        employees
                            .filter((employee: Employee) =>
                                (employee.name + " " + employee.surname).toLowerCase().includes(props.search.toLowerCase()))
                            .map((employee: Employee) => (
                                <li key={employee.id}>
                                    <EmployeeCard employee={employee}/>
                                </li>
                            ))}
                </ul>
            </div>
        </>
    );
}

function EmployeePage(): JSX.Element {
    const [isLoading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    return (
        <div className="z-0 mb-6">
            <div className="grid grid-cols-12 w-full h-full">
                <div className="col-span-5"></div>
                <div className="col-span-2 flex justify-center">
                    <h1 className="text-xl md:text-3xl text-center p-6 font-semibold">Employees</h1>
                </div>
                <div className="col-span-1"></div>
                <div className="h-full col-span-4 flex">
                    <div className="border-black w-full h-8 rounded-3xl border-2 self-center mr-28">
                        <input type="text" className="pl-3 w-full h-full rounded-3xl outline-violet-600"
                                placeholder="Search..."
                               onChange={(event: ChangeEvent) => setSearch((event.target as HTMLInputElement).value)}>
                        </input>
                    </div>
                </div>
            </div>
            {isLoading && <div className="flex justify-center w-full h-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                     stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                          className="animate-spin origin-center"/>
                </svg>
            </div>}
            <EmployeeList setLoading={setLoading} search={search}/>
        </div>
    );
}

export default EmployeePage;