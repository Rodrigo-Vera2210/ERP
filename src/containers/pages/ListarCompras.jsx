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
    }, []);

    return (
        <Layout>
            <section className="w-full px-4 py-24 mx-auto max-w-7xl md:w-3/4 lg:w-2/4">
                <div className="mb-12 text-left md:text-center">
                    <h1 className="mb-3 text-5xl font-extrabold leading-tight text-amber-500">
                        Lista de Compras
                    </h1>
                </div>
                <div className="flex flex-col space-y-12 divide-y divide-gray-200">
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
    count: state.compras.count,
    next: state.compras.next,
    previous: state.compras.previous,
});

export default connect(mapStateToProps, {
    get_lista_proveedores,
    get_lista_compras,
    get_lista_compras_page,
})(ListarCompras);
