import Layout from "hocs/layout";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {
    get_lista_productos,
    get_lista_productos_page,
} from "redux/actions/productos/productos";
import ListaProductos from "components/productos/ListaProductos";
import { Link } from "react-router-dom";


function ListarProductos({
    productos,
    count,
    next,
    previous,
    get_lista_productos,
    get_lista_productos_page,
}) {
    useEffect(() => {
        get_lista_productos();
        get_lista_productos_page();
    }, []);

    return (
        <Layout>
            <section class="w-full px-4 py-24 mx-auto max-w-7xl md:w-3/4 lg:w-2/4">
                <div class="mb-12 text-left md:text-center">
                    <h1 class="mb-3 text-5xl font-extrabold leading-tight text-amber-500">
                        Inventario
                    </h1>
                </div>
                <div class="flex flex-col space-y-12 divide-y divide-gray-200">
                    <ListaProductos
                        productos={productos && productos}
                        get_lista_productos_page={get_lista_productos_page}
                        count={count && count}
                    />
                </div>
            </section>
        </Layout>
    );
}
const mapStateToProps = (state) => ({
    productos: state.productos.lista_productos,
    count: state.proveedores.count,
    next: state.proveedores.next,
    previous: state.proveedores.previous,
});

export default connect(mapStateToProps, {
    get_lista_productos,
    get_lista_productos_page,
})(ListarProductos);
