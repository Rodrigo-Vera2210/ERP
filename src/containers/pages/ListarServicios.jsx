import Layout from "hocs/layout";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {
    get_lista_categorias,
    get_lista_servicios,
    get_lista_servicios_page,
} from "redux/actions/servicios/servicios";
import { Link } from "react-router-dom";
import ListaServicios from "components/servicios/ListaServicios";
import CrearServicioModal from "components/servicios/CrearServicioModal";
import ListaCategorias from "components/servicios/ListaCategorias";


function ListarServicios({
    servicios,
    categorias,
    count,
    next,
    previous,
    get_lista_servicios,
    get_lista_servicios_page,
    get_lista_categorias,
}) {
    useEffect(() => {
        get_lista_servicios();
        get_lista_categorias();
    }, []);
    return (
        <Layout>
            <div className="flex">
                <section className="w-full px-4 py-24 mx-auto max-w-7xl md:w-3/4 lg:w-2/4">
                    
                        <div className="mb-12 text-left md:text-center">
                            <h1 className="mb-3 text-5xl font-extrabold leading-tight text-amber-500">
                                Lista de servicios
                            </h1>
                            <CrearServicioModal categorias = {categorias && categorias}/>
                        </div>
                        <div className="flex flex-col space-y-12 divide-y divide-gray-200">
                            <ListaServicios
                                servicios={servicios && servicios}
                                get_lista_servicios_page={get_lista_servicios_page}
                                count={count && count}
                                categorias={categorias && categorias}
                            />
                        </div>
                </section>
                <section className="py-60 max-w-sm w-full">
                    <ListaCategorias categorias = {categorias && categorias}/>
                </section>
            </div>
        </Layout>
    );
}
const mapStateToProps = (state) => ({
    servicios: state.servicios.lista_servicios,
    categorias: state.categorias.lista_categorias,
    count: state.proveedores.count,
    next: state.proveedores.next,
    previous: state.proveedores.previous,
});

export default connect(mapStateToProps, {
    get_lista_servicios,
    get_lista_servicios_page,
    get_lista_categorias,
})(ListarServicios);
