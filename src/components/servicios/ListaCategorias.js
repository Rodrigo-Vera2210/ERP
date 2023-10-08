import React, { useState } from "react";
import CrearCategoriasModal from "./CrearCategoriasModal";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ListaCategorias = ({categorias}) => {

    return (
        <div>
            <ul className="space-y-1">
                <li>
                    <a
                        href=""
                        className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                    >
                        Todos
                    </a>
                </li>
                {
                    categorias && categorias.map((categoria)=>{
                        return categoria.sub_categories.length === 0?
                        <>
                            <li key={categoria.id}>
                                <Link
                                    to={`../servicios/category/${categoria.id}`}
                                    className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                                >
                                    {categoria.nombre}
                                </Link>
                            </li>
                        </>
                        :<>
                            <li key={categoria.id}>
                                <details className="group [&_summary::-webkit-details-marker]:hidden">
                                    <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                        <Link to={`../servicios/category/${categoria.id}`} className="text-sm font-medium"> {categoria.nombre} </Link>

                                        <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </span>
                                    </summary>

                                    <ul className="mt-2 space-y-1 px-4">
                                        {
                                            categoria.sub_categories && categoria.sub_categories.map((subcategoria)=>{
                                            return<>
                                                <li key={subcategoria.id}>
                                                    <Link
                                                        to={`../servicios/category/${subcategoria.id}`}
                                                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                                    >
                                                        {subcategoria.nombre}
                                                    </Link>
                                                </li>
                                            </>
                                            })
                                        }
                                    </ul>
                                </details>
                            </li>
                        </>
                    })
                }
            </ul>
            <div className="w-full text-center py-1">
                <CrearCategoriasModal categorias = {categorias && categorias}/>
            </div>
        </div>
    );
};

export default ListaCategorias;
