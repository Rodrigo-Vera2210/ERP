import Layout from "hocs/layout";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {
    search_productos,
    search_productos_page
} from "redux/actions/productos/productos";
import ListaProductos from "components/productos/ListaProductos";
import { Link, useParams } from "react-router-dom";
import HeaderProductos from "components/productos/HeaderProductos";


function SearchProductos({
    productos,
    count,
    next,
    previous,
    search_productos,
    search_productos_page
}) {
    useEffect(() => {
        search_productos(term);
    }, []);

    const params = useParams()
    const term = params.term

    return (
        <Layout>
            <section className="w-full px-4 py-24 mx-auto max-w-7xl md:w-3/4 lg:w-2/4">
                <HeaderProductos/>
                <div className="flex flex-col space-y-12 divide-y divide-gray-200">
                    <ListaProductos
                        productos={productos && productos}
                        get_lista_productos_page={search_productos_page}
                        count={count && count}
                    />
                </div>
            </section>
        </Layout>
    );
}
const mapStateToProps = (state) => ({
    productos: state.productos.productos_filtrados,
    count: state.productos.count,
    next: state.productos.next,
    previous: state.productos.previous,
});

export default connect(mapStateToProps, {
    search_productos,
    search_productos_page
})(SearchProductos);
