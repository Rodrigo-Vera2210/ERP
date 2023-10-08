import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TERipple } from 'tw-elements-react';
import CrearServicioModal from "./CrearServicioModal";

const HeaderServicios = ({categorias}) => {
    
    const location = useLocation()
    const navigate = useNavigate()
    const [term, setTerm] = useState("");
    
    const handleChange = (e) => {
        setTerm(e.target.value);
    };
    
    const onSubmit = (e) => {
        e.preventDefault();
        setTimeout(() => navigate(`../servicios/buscar/${term}`), 0.2);
        setTerm("");
    };

    return (
        <>
            <div className="mb-12 text-left md:text-center">
                <h1 className="mb-3 text-5xl font-extrabold leading-tight text-amber-500">
                    Lista de servicios
                </h1>
            </div>
            <div className="mb-3 md:w-full">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <input
                        name='search'
                        value={term}
                        onChange={(e)=>handleChange(e)}
                        type="search"
                        className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="button-addon1" />

                    {/* <!--Search button--> */}
                    <TERipple color='light'>
                        <button
                            className="relative z-[2] flex items-center rounded-r bg-amber-500 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-black hover:shadow-lg focus:bg-amber-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-black active:shadow-lg"
                            type="submit"
                            onClick={e=>onSubmit(e)}
                            id="button-addon1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="h-5 w-5">
                                <path
                                    fillRule="evenodd"
                                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                    clipRule="evenodd" />
                            </svg>
                        </button>
                    </TERipple>
                    <CrearServicioModal categorias = {categorias && categorias}/>
                </div>
            </div>
        </>
        );
};

export default HeaderServicios;
