import {ChangeEvent, JSX, MouseEvent, useEffect, useState} from "react";
import Consts from "../Consts.tsx";
import {useParams} from "react-router-dom";
import Department from "../departments/Departments.tsx";
import Departments from "../departments/Departments.tsx";
import {getEmployeeFromForm, resetForm} from "./WorkerUtil.tsx";
import {ProgrammingLanguage} from "../ProgrammingLanguage.ts";
import {LoadingIcon} from "../Global";
import {Entity} from "../Entity.ts";

export class Employee extends Entity {
    constructor(id: number, name: string, surname: string, age: number, gender: string, department: number, photo: string | null, languageName: string) {
        super(id, name);
        this._surname = surname;
        this._age = age;
        this._gender = gender;
        this._departmentId = department;
        this._photo = photo;
        this._programmingLanguageName = languageName;
    }

    private _photo: string | null;

    private _surname: string;

    private _age: number;

    private _gender: string;

    private _departmentId: number;

    private _programmingLanguageName: string;


    get photo(): string | null {
        return this._photo;
    }

    get surname(): string {
        return this._surname;
    }

    get age(): number {
        return this._age;
    }

    get gender(): string {
        return this._gender;
    }

    get departmentId(): number {
        return this._departmentId;
    }

    get programmingLanguageName(): string {
        return this._programmingLanguageName;
    }


    set photo(value: string | null) {
        this._photo = value;
    }

    set surname(value: string) {
        this._surname = value;
    }

    set age(value: number) {
        this._age = value;
    }

    set gender(value: string) {
        this._gender = value;
    }

    set departmentId(value: number) {
        this._departmentId = value;
    }

    set programmingLanguageName(value: string) {
        this._programmingLanguageName = value;
    }

    equals(employee: Employee): boolean {
        return this._photo === employee.photo &&
            this.id === employee.id &&
            this.name === employee.name &&
            this._surname === employee.surname &&
            this._age === employee.age &&
            this._gender === employee.gender &&
            this._programmingLanguageName === employee.programmingLanguageName &&
            this._departmentId === employee.departmentId;
    }
}

function ImageInput(props: { photo: string | null, onChangeEvent: () => void }) {
    function handlePhotoChange(event: ChangeEvent) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const file: File = (event.target as HTMLInputElement).files[0];
        const reader = new FileReader();
        reader.onloadend = function () {
            const photoInput = document.getElementById("photo");
            if (photoInput !== null) {
                photoInput.style.backgroundImage = "url(" + reader.result + ")";
                props.onChangeEvent();
            }
        }
        reader.readAsDataURL(file);
    }

    function moveCursorCaption(event: MouseEvent) {
        const cursorCaption = document.getElementById("cursor-caption");
        if (cursorCaption !== null) {
            const div = event.currentTarget.parentNode?.parentNode as HTMLDivElement;
            const cursorCaptionX = event.clientX - div.offsetLeft + 8;
            const cursorCaptionY = event.clientY - div.offsetTop + 10;
            cursorCaption.style.left = cursorCaptionX.toString() + "px";
            cursorCaption.style.top = cursorCaptionY.toString() + "px";
        }
    }

    function showCursorCaption() {
        const cursorCaption = document.getElementById("cursor-caption");
        if (cursorCaption !== null) {
            cursorCaption.classList.remove("hidden");
        }
    }

    function hideCursorCaption() {
        const cursorCaption = document.getElementById("cursor-caption");
        if (cursorCaption !== null) {
            cursorCaption.classList.add("hidden");
        }
    }

    useEffect(() => {
        const photo = document.getElementById("photo");
        if (photo !== null) {
            photo.style.backgroundImage = `url(${props.photo ? props.photo : "/assets/EmptyPfp.svg"})`;
        }
    }, [props.photo]);

    return (
        <div id="photo"
             className="hover:cursor-pointer row-span-4 md:row-span-5 rounded-2xl border-2 border-violet-600 w-48 h-48 overflow-visible bg-cover relative">
            <div className="hover:cursor-pointer">
                <div id="cursor-caption"
                     className="absolute bg-white rounded-2xl border-2 border-violet-600 w-24 hidden">
                    <p className="text-center text-xs">Select image</p>
                </div>
            </div>
            <div className="overflow-clip w-full h-full rounded-2xl">
                <input id="photoInput" name="photo" className="w-full h-full absolute opacity-0 hover:cursor-pointer"
                       title="" type="file" alt="Profile picture" accept="image/*"
                       onChange={handlePhotoChange}
                       onMouseMove={moveCursorCaption}
                       onMouseEnter={showCursorCaption}
                       onMouseLeave={hideCursorCaption}>
                </input>
                <div
                    className="flex justify-center align-bottom font-bold text-xs bg-white bg-opacity-50 text-violet-600">
                    <p>Drop your image here</p>
                </div>
            </div>
        </div>);
}

function DepartmentsList(props: {
    employee: Employee,
    departments: Departments[],
    onChangeEvent: () => void
}): JSX.Element {

    useEffect(() => {
        if (props.employee.departmentId === -1 && props.departments[0] !== undefined) {
            props.employee.departmentId = props.departments[0].id as number;
        }
    }, []);

    return <div className="w-5/6 md:w-full">
        <p className="mb-2">Department</p>
        <select id="department" className="w-full rounded-2xl pl-1.5" onChange={props.onChangeEvent}>
            {props.departments.map((department: Department) =>
                <option key={department.id} value={department.id}
                        selected={department.id === props.employee.departmentId}>
                    {department.name}
                </option>)}
        </select>
    </div>;
}

function WorkerInfoPanelControlsButton(props: {
    changed: boolean,
    text: string,
    onClickEvent: () => void,
    hoverColor?: string,
}) {
    return (
        <div className="relative overflow-clip">
            <div className="w-0 h-0 hover:bg-violet-600 hover:bg-red-600 text-red-600"></div>
            <button
                className={`w-24 h-12 rounded-3xl border-2 bg-white text-${props.hoverColor ?? "violet"}-600 hover:text-white border-${props.hoverColor ?? "violet"}-600 hover:bg-${props.hoverColor ?? "violet"}-600`}
                //
                onClick={props.onClickEvent}>
                <p className="font-semibold">{props.text}</p>
            </button>
            {!props.changed &&
                <div className="absolute w-24 h-12 rounded-3xl opacity-70 bg-white -translate-y-full"></div>}
        </div>
    );
}

function WorkerInfoPanelControls(props: {
    employee: Employee,
    isChanged: boolean,
    setChanged: (changed: boolean) => void,
    setEmployee: (employee: Employee) => void
}): JSX.Element {
    return <div className="flex justify-center mt-4">
        <div className="flex justify-around w-100 md:w-144">
            {
                props.employee.id !== Consts.newEmployeeId &&
                <WorkerInfoPanelControlsButton
                    changed={true}
                    text="Remove"
                    onClickEvent={() => {
                        fetch('http://localhost:8080/employees/' + props.employee.id.toString(),
                            {
                                method: 'DELETE',
                            }).then((response) => {
                                if (response.ok) {
                                    window.location.href = "/employees";
                                }
                            })
                            .catch((err) => {
                                console.log(err.message);
                            });
                    }}
                    hoverColor="red"/>
            }
            <WorkerInfoPanelControlsButton
                changed={props.isChanged}
                text="Reset"
                onClickEvent={() => {
                    try {
                        resetForm(props.employee);
                    } catch (e) {
                        console.log(e);
                    }
                    props.setChanged(false);
                }}/>
            <WorkerInfoPanelControlsButton
                changed={props.isChanged}
                text={(props.employee.id !== Consts.newEmployeeId ? 'Update' : 'Add')}
                onClickEvent={() => {
                    const newEmployee = getEmployeeFromForm();
                    if (newEmployee.name === "" || newEmployee.surname === "") {
                        if (newEmployee.name === "") {
                            const nameInput = document.getElementById("name");
                            if (nameInput !== null) {
                                nameInput.classList.add("border-2");
                            }
                        }
                        if (newEmployee.surname === "") {
                            const surnameInput = document.getElementById("surname");
                            if (surnameInput !== null) {
                                surnameInput.classList.add("border-2");
                            }
                        }
                        return;
                    }
                    console.log(newEmployee);
                    fetch('http://localhost:8080/employees/' +
                        (props.employee.id !== Consts.newEmployeeId ? props.employee.id.toString() : "add"),
                        {
                            method: (props.employee.id === Consts.newEmployeeId ? 'POST' : 'PUT'),
                            mode: "cors",
                            headers: {
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': '*'
                            },
                            body: JSON.stringify(newEmployee).replaceAll("_", "")
                        })
                        .then((response) => {
                            console.log(newEmployee);
                            return response.text();
                        })
                        .then(() => {
                            if (props.employee.id === Consts.newEmployeeId) {
                                window.location.href = "/employees";
                            } else {
                                props.setEmployee(newEmployee);
                                props.setChanged(false);
                            }
                        })
                        .catch((err) => {
                            console.log(err.message);
                            props.setChanged(true);
                            props.setEmployee(props.employee);
                        });
                }}/>
        </div>
    </div>;
}

function LanguageList(props: {
    employee: Employee,
    languages: ProgrammingLanguage[],
    onChangeEvent: () => void
}): JSX.Element {
    const [isWide, setWide] = useState(window.innerWidth > 768);
    window.onresize = () => {
        setWide(window.innerWidth > 768);
    };
    useEffect(() => {
        if (props.employee.programmingLanguageName === "" && props.languages[0] !== undefined) {
            props.employee.programmingLanguageName = props.languages[0].name;
        }
    }, []);
    return (
        <div className="w-5/6 md:w-2/3">
            <p className="mb-2 md:text-base">{isWide ? "Programming language" : "Coding language"}</p>
            <select id="language" className="w-full rounded-2xl pl-1.5"
                    onChange={props.onChangeEvent}>
                {props.languages.map((lang: ProgrammingLanguage, id: number) =>
                    <option key={id} value={lang.name}
                            selected={lang.name === props.employee.programmingLanguageName}>
                        {lang.name}
                    </option>)}
            </select>
        </div>
    );
}

export function WorkerControlPanel(props: {
    employee: Employee,
    setLoading: (loading: boolean) => void,
    setAliasLoading: (loading: boolean) => void,
    isAliasLoading: boolean,
    setEmployee: (employee: Employee) => void
}): JSX.Element {

    const [departments, setDepartments] = useState([]);
    const [langs, setLangs] = useState([]);
    const [isChanged, setChanged] = useState(false);

    function inputOnChangeEvent() {
        setChanged(!getEmployeeFromForm().equals(props.employee));
    }

    function textOnChangeEvent(event: ChangeEvent) {
        inputOnChangeEvent();
        event.target.classList.remove("border-2");
    }

    useEffect(() => {
        fetch('http://localhost:8080/departments',
            {
                method: 'GET',
            })
            .then((response) => response.json())
            .then((data) => {
                setDepartments(data);
            })
            .then(() => {
                fetch('http://localhost:8080/programming-languages',
                    {
                        method: 'GET',
                    })
                    .then((response) => response.json())
                    .then((data) => {
                        setLangs(data);
                        props.setAliasLoading(false);
                        props.setLoading(false);
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
            })
            .catch((err) => {
                console.log(err.message);
            });

    }, []);

    return (
        <>
            {!props.isAliasLoading && <>
                <div className="flex justify-center">
                    <div className="mt-6 bg-gray-200 rounded-2xl shadow-2xl w-108 md:w-144 h-81">
                        <form id="employee-form" className="grid grid-cols-2 pt-2 px-4 gap-3 worker-card-grid">
                            <label htmlFor="photo">Photo</label>
                            <label htmlFor="name">Name</label>
                            <ImageInput photo={props.employee.photo} onChangeEvent={inputOnChangeEvent}/>
                            <input id="name" name="name" min={1} type="text" className="outline-violet-600 pl-2.5 py-0.5 rounded-2xl border-red-600"
                                   defaultValue={props.employee.name} onChange={textOnChangeEvent}>
                            </input>
                            <input name="id" id="id" type="number" className="hidden" value={props.employee.id}></input>
                            <label htmlFor="surname">Surname</label>
                            <input id="surname" name="surname" min={1} type="text" className="outline-violet-600 pl-2.5 py-0.5 rounded-2xl border-red-600"
                                   defaultValue={props.employee.surname} onChange={textOnChangeEvent}>
                            </input>
                            <div className="row-span-1 md:row-span-2 grid gap-3">
                                <label htmlFor="age" className="col-span-2 md:col-span-1">Age</label>
                                <input id="age" name="age" min={18}
                                       className="outline-violet-600 col-span-2 md:col-span-1 pl-2.5 py-0.5 rounded-2xl border-red-600 invalid:border-2"
                                       type="number" defaultValue={props.employee.age} onChange={inputOnChangeEvent}>

                                </input>
                            </div>
                            <div className="flex col-span-2 gap-x-6">
                                <div>
                                    <p className="mb-2">Gender</p>
                                    <select id="gender" className="rounded-2xl pl-1.5" onChange={inputOnChangeEvent}>
                                        <option value="MALE" selected={props.employee.gender === "MALE"}>Male</option>
                                        <option value="FEMALE" selected={props.employee.gender === "FEMALE"}>Female
                                        </option>
                                    </select>
                                </div>
                                <LanguageList employee={props.employee} languages={langs}
                                              onChangeEvent={inputOnChangeEvent}/>
                                <DepartmentsList employee={props.employee} departments={departments}
                                                 onChangeEvent={inputOnChangeEvent}/>
                            </div>
                        </form>
                    </div>
                </div>
                <WorkerInfoPanelControls employee={props.employee}
                                         isChanged={isChanged}
                                         setChanged={setChanged}
                                         setEmployee={props.setEmployee}/>
            </>}
        </>);
}

function WorkerInfoPanel(props: { setLoading: (state: boolean) => void }): JSX.Element {

    const [employee, setEmployee] = useState(new Employee(Consts.newEmployeeId, "", "", 18, "", -1, "", ""));
    const [isEmployeeLoading, setEmployeeLoading] = useState(true);
    const {id} = useParams();
    const [isAliasLoading, setAliasLoading] = useState(true);

    useEffect(() => {
        if (id !== undefined) {
            fetch('http://localhost:8080/employees/' + id.toString(),
                {
                    method: 'GET',
                })
                .then((response) => response.json())
                .then((data) => {
                    setEmployee(data);
                    setEmployeeLoading(false);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
    }, []);

    return (
        <>
            {!isEmployeeLoading && <div>
                {!isAliasLoading && <div className="flex justify-center pt-2">
                    <h1 className="text-3xl text-center pt-4 font-semibold">{employee.name + " " + employee.surname + `'s profile`}</h1>
                </div>}
                <WorkerControlPanel employee={employee}
                                    setLoading={props.setLoading}
                                    setAliasLoading={setAliasLoading}
                                    isAliasLoading={isAliasLoading}
                                    setEmployee={setEmployee}/>
            </div>}
        </>
    );
}

function WorkerPage(): JSX.Element {
    const [isLoading, setLoading] = useState(true);

    return (
        <div className={isLoading ? "pt-8" : ""}>
            {isLoading &&
                <LoadingIcon/>
            }
            <div>
                <WorkerInfoPanel setLoading={setLoading}/>
            </div>
        </div>
    )
}

export default WorkerPage;