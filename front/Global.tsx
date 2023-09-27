import React, {ChangeEvent, JSX, useEffect, useState} from "react";
import {Entity} from "./Entity.ts";

function NavButton(props: { link: string, name: string }): JSX.Element {
    const [isActive, setActive] = useState(false);

    return (
        <div className="flex relative">
            <div className="inline-block w-full h-full hover:text-violet-600"
                 onMouseEnter={() => setActive(true)}
                 onMouseLeave={() => setActive(false)}>
                <ul id={"navbutton-" + props.name}
                    className="flex justify-center hover:border-2 border-violet-600 rounded-2xl h-full w-full">
                    <a href={props.link}
                       className="w-full h-full py-3 font-sans text-center flex justify-center">
                        <p>{props.name}</p>
                    </a>
                </ul>
            </div>
            {isActive && window.innerWidth > 768 &&
                <div className="relative">
                    <div
                        className="bg-white inline-block absolute w-48 p-2 rounded-r-2xl hover:border-2 border-violet-600 hover:border-l-0"
                        onMouseEnter={() => {
                            const associatedButton = document.getElementById("navbutton-" + props.name);
                            if (associatedButton !== null) {
                                associatedButton.classList.add("border-2");
                                associatedButton.classList.add("rounded-tr-none")
                            }
                            setActive(true);
                        }}
                        onMouseLeave={() => {
                            const associatedButton = document.getElementById("navbutton-" + props.name);
                            if (associatedButton !== null) {
                                associatedButton.classList.remove("border-2");
                                associatedButton.classList.remove("rounded-tr-none")
                            }
                            setActive(false);
                        }}>
                        <a href="/employees/add" className="hover:border-b-2 border-violet-600 block">
                            <p className="hover:text-violet-600">Add employee</p>
                        </a>
                    </div>
                </div>
            }
        </div>
    );
}

function LinksList(): JSX.Element {
    return (
        <div id="navbar-div" className="flex flex-col w-48 md:w-96 bg-white h-screen rounded-br-2xl">
            <li className="list-none">
                <NavButton link="/" name="Home"/>
                <NavButton link="/employees" name="Employees"/>
                <NavButton link="/departments" name="Departments"/>
            </li>
        </div>
    );
}

export function Navbar(): JSX.Element {
    const [isActive, setActive] = useState(false);

    function toggleActive() {
        setActive(!isActive);
        const navbar = document.getElementById("navbar");
        const navbarWidth = document.getElementById("navbar-div")?.clientWidth;
        if (navbar !== null && navbarWidth !== null) {
            if (isActive) {
                navbar.style.transform = "";
            } else {
                navbar.style.transform = "translate(0, 0)";
            }
        }
    }

    return (
        <>
            {isActive &&
                <button onClick={toggleActive} className="fixed w-full h-screen z-50">
                    <div id="curtain" className="w-full h-full bg-gray-600 opacity-50"></div>
                </button>}
            <div id="navbar"
                 className={"z-50 fixed flex transition-transform duration-300 transform ease-in-out overflow-visible -translate-x-48 md:-translate-x-96"}>
                <LinksList/>
                <button className="border-2 border-black self-start rounded-r bg-white border-l-0"
                        onClick={toggleActive}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d={isActive ?
                            "M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" :
                            "M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"}/>
                    </svg>
                </button>
            </div>
        </>
    )
}

export function LoadingIcon() {
    return <div className="flex justify-center absolute w-full">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
             stroke="currentColor" className="w-6 h-6 animate-spin origin-center">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
        </svg>
    </div>;
}

export function SearchBar(props: {
    setSearch: (search: string) => void
}): JSX.Element {
    return (
        <div className="h-full col-span-4 flex">
            <div className="border-black w-full h-8 rounded-3xl border-2 self-center mr-28">
                <input type="text" className="pl-3 w-full h-full rounded-3xl outline-violet-600"
                       placeholder="Search..."
                       onChange={(event: ChangeEvent) => {
                           props.setSearch((event.target as HTMLInputElement).value);
                       }}>
                </input>
            </div>
        </div>);
}

function FilterButton(props: {
    value: string,
    name: string,
    setConstraints: (constraints: Map<string, Set<string>>) => void,
    constraints: Map<string, Set<string>>,
    constraintName: string,
    setLoading: (state: boolean) => void
}): JSX.Element {

    const [isActive, setActive] = useState(false);
    const value = props.value;

    function addFilter(event: React.MouseEvent<HTMLButtonElement>): void {
        event.preventDefault();
        const constraints = new Map(props.constraints);
        const newSet = new Set<string>(constraints.get(props.constraintName));
        if (!isActive) {
            newSet.add(value);
        } else {
            newSet.delete(value);
            if (newSet.size === 0) {
                constraints.delete(props.constraintName);
            }
        }
        constraints.set(props.constraintName, newSet);
        props.setConstraints(constraints);
        props.setLoading(true);
        setActive(!isActive);
    }

    return <button
        value={props.value}
        className={
            `flex justify-center w-full h-8 border-l-0 underline-offset-2 hover:underline 
        ${!isActive ? " hover:text-violet-600 " : " hover:text-black "}
        ${isActive ? "text-violet-600 " : "text-black "}`
        }
        onClick={addFilter}>
        <div
            className="w-0 h-0 hover:text-violet-600 border-violet-600 text-violet-600 font-bold"></div>
        <p>{props.name}</p>
    </button>;
}

function FilterSection(props: {
    setConstraints: (constraints: Map<string, Set<string>>) => void,
    values: string[],
    names: string[],
    constraints: Map<string, Set<string>>,
    constraintName: string,
    header: string,
    setLoading: (state: boolean) => void
}): JSX.Element {

    //const [isExpanded, setExpanded] = useState(false);

    return (
        <div className="border-violet-600 border-b-2 first:border-t-2 pt-1">
            <div className="flex justify-center">
                <h2 className="font-bold">{props.header}</h2>
            </div>
            {props.values.map((value: string, id: number) => (
                <FilterButton key={id}
                              name={props.names[id]}
                              value={value}
                              constraintName={props.constraintName}
                              constraints={props.constraints}
                              setConstraints={props.setConstraints}
                              setLoading={props.setLoading}/>
            ))}
        </div>
    );
}

export function FilterBar(props: {
    setConstraints: (constraints: Map<string, Set<string>>) => void,
    constraints: Map<string, Set<string>>,
    setLoading: (state: boolean) => void,
    isFirstEntityRendered: boolean,
    endpointsToFetch: string[]
}): JSX.Element {
    const [filters, setFilters] = useState(new Map<string, Entity[]>);

    useEffect(() => {
        for (const endpoint of props.endpointsToFetch) {
            fetch('http://localhost:8080/' + endpoint,
                {
                    method: 'GET',
                })
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    setFilters(new Map(filters.set(endpoint, data)));
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
    }, []);

    return (
        <div className="w-48 md:shrink-0">
            {(filters.size === props.endpointsToFetch.length) && props.isFirstEntityRendered &&
                <>
                    {
                        props.endpointsToFetch.map((endpoint: string, id: number) =>
                            <FilterSection key={id} setConstraints={props.setConstraints}
                                           names={filters.get(endpoint)?.map((entity) => entity.name) as string[]}
                                           values={filters.get(endpoint)?.map((entity) => entity.id) as string[]}
                                           constraints={props.constraints}
                                           constraintName={endpoint.indexOf("-") !== -1 ? endpoint.split("-").slice(1).reduce((previousValue, currentValue) =>
                                                   previousValue + currentValue[0].toUpperCase() + currentValue.slice(1),
                                               endpoint.slice(0, endpoint.indexOf("-"))) : endpoint}
                                           header={endpoint.replace(endpoint[0], endpoint[0].toUpperCase()).replaceAll("-", " ")}
                                           setLoading={props.setLoading}/>)
                    }
                </>
            }
        </div>
    );
}