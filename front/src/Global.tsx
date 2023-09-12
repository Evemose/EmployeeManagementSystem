import {JSX, useState} from "react";

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
                    <div className="bg-white inline-block absolute w-48 p-2 rounded-r-2xl hover:border-2 border-violet-600 hover:border-l-0"
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