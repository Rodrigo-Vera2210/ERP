import Layout from "hocs/layout";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {
    get_lista_compras,
    get_lista_compras_page,
} from "redux/actions/compras/compras";
import {
    get_lista_proveedores,
} from "redux/actions/proveedores/proveedores";
import ListaCompras from "components/compras/ListaCompras";
import { Link } from "react-router-dom";


function ListarCompras({
    proveedores,
    compras,
    count,
    next,
    previous,
    get_lista_compras,
    get_lista_compras_page,
    get_lista_proveedores,
}) {
    useEffect(() => {
        get_lista_proveedores();
        get_lista_compras();
        get_lista_compras_page();
    }, []);

    return (
        <Layout>
            <section class="w-full px-4 py-24 mx-auto max-w-7xl md:w-3/4 lg:w-2/4">
                <div class="mb-12 text-left md:text-center">
                    <h1 class="mb-3 text-5xl font-extrabold leading-tight text-amber-500">
                        Lista de Compras
                    </h1>
                </div>
                <div class="flex flex-col space-y-12 divide-y divide-gray-200">
                    <ListaCompras
                        compras={compras && compras}
                        get_lista_compras_page={get_lista_compras_page}
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
    compras: state.compras.lista_compras,
    count: state.proveedores.count,
    next: state.proveedores.next,
    previous: state.proveedores.previous,
});

export default connect(mapStateToProps, {
    get_lista_proveedores,
    get_lista_compras,
    get_lista_compras_page,
})(ListarCompras);
