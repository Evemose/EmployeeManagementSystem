import {JSX, useEffect, useState} from "react";
import Department from "./Departments.tsx";

function DepartmentPreview(props: { department: Department }): JSX.Element {
    return (
        <a className="w-5/6" href={"/departments/" + props.department.id.toString()}>
            <div className="bg-gray-100 m-2 p-2 rounded-md shadow-md flex justify-center flex-col items-center">
                <h1 className="text-xl font-semibold">{props.department.name}</h1>
                <p className="text-lg">{props.department.floor}</p>
            </div>
        </a>
    );
}

function DepartmentsList(props: { departments: Department[] }): JSX.Element {
    return (
        <div className="flex flex-wrap justify-center">
            {props.departments.map((department) => (
                <DepartmentPreview key={department.name}
                                   department={department}/>
            ))}
        </div>
    );
}

export default function DepartmentsPage(): JSX.Element {

    const [isLoading, setLoading] = useState(true);
    const [departments, setDepartments] = useState([] as Department[]);

    useEffect(() => {
        fetch("http://localhost:8080/departments",
            {
                method: "GET"
            })
            .then(response =>
                response.json()
            )
            .then(data => {
                setDepartments(data);
                setLoading(false);
            });
    }, []);
    return (
        <>
            {
                !isLoading &&
                <>
                    <DepartmentsList departments={departments}/>
                </>
            }
        </>
    );

}