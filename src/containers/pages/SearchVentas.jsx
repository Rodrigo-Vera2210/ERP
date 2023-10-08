import Layout from "hocs/layout";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {
    get_lista_ventas,
    get_lista_ventas_page,
} from "redux/actions/ventas/ventas";
import {
    get_lista_proveedores,
} from "redux/actions/proveedores/proveedores";
import { Link } from "react-router-dom";
import ListaVentas from "components/ventas/ListaVentas";
import { TERipple } from 'tw-elements-react';

function SearchVentas({
    proveedores,
    ventas,
    count,
    next,
    previous,
    get_lista_ventas,
    get_lista_ventas_page,
    get_lista_proveedores,
}) {
    useEffect(() => {
        get_lista_proveedores();
        get_lista_ventas();
    }, []);

    return (
        <Layout>
            <section className="w-full px-4 py-24 mx-auto max-w-7xl md:w-3/4 lg:w-2/4">
                <div className="mb-12 text-left md:text-center">
                    <h1 className="mb-3 text-5xl font-extrabold leading-tight text-amber-500">
                        Lista de Ventas
                    </h1>
                </div>
                <div className="mb-3 md:w-11/12">
                    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                        <input
                            type="search"
                            className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                            placeholder="Search"
                            aria-label="Search"
                            aria-describedby="button-addon1" />

                        {/* <!--Search button--> */}
                        <TERipple color='light'>
                            <button
                                className="relative z-[2] flex items-center rounded-r bg-amber-500 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-black hover:shadow-lg focus:bg-amber-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-black active:shadow-lg"
                                type="button"
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
                    </div>
                </div>
                <div className="flex flex-col space-y-12 divide-y divide-gray-200">
                    <ListaVentas
                        ventas={ventas && ventas}
                        get_lista_ventas_page={get_lista_ventas_page}
                        count={count && count}
                        proveedores={proveedores && proveedores}
                    />
                </div>
            </section>
        </Layout>
    );
}
const mapStateToProps = (state) => ({
    proveedores: state.proveedores.lista_proveedores,
    ventas: state.ventas.lista_ventas,
    count: state.proveedores.count,
    next: state.proveedores.next,
    previous: state.proveedores.previous,
});

export default connect(mapStateToProps, {
    get_lista_proveedores,
    get_lista_ventas,
    get_lista_ventas_page,
})(SearchVentas);
