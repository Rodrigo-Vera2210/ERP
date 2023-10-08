import Layout from "hocs/layout";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {
    get_lista_categorias,
    get_lista_servicios,
    get_lista_servicios_page,
    search_category_servicios,
    search_category_servicios_page
} from "redux/actions/servicios/servicios";
import { Link, useParams } from "react-router-dom";
import ListaServicios from "components/servicios/ListaServicios";
import CrearServicioModal from "components/servicios/CrearServicioModal";
import ListaCategorias from "components/servicios/ListaCategorias";
import { TERipple } from 'tw-elements-react';
import HeaderServicios from "components/servicios/HeaderServicios";


function CategoryServicios({
    servicios,
    categorias,
    count,
    next,
    previous,
    get_lista_servicios,
    get_lista_servicios_page,
    get_lista_categorias,
    search_category_servicios,
    search_category_servicios_page
}) {
    useEffect(() => {
        search_category_servicios(term)
    }, []);

    
    const params = useParams()
    const term = params.term

    return (
        <Layout>
            <div className="flex">
                <section className="w-full px-4 py-24 mx-auto max-w-7xl md:w-3/4 lg:w-2/4">
                    <HeaderServicios categorias={categorias&&categorias}/>
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
    servicios: state.servicios.servicios_filtrados,
    categorias: state.categorias.lista_categorias,
    count: state.proveedores.count,
    next: state.proveedores.next,
    previous: state.proveedores.previous,
});

export default connect(mapStateToProps, {
    get_lista_servicios,
    get_lista_servicios_page,
    get_lista_categorias,
    search_category_servicios,
    search_category_servicios_page
})(CategoryServicios);
