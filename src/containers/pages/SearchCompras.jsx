import Layout from "hocs/layout";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {
    get_lista_compras,
    get_lista_compras_page,
    search_compras,
} from "redux/actions/compras/compras";
import {
    get_lista_proveedores,
} from "redux/actions/proveedores/proveedores";
import ListaCompras from "components/compras/ListaCompras";
import { Link, useParams } from "react-router-dom";
import { TERipple } from 'tw-elements-react';
import HeaderCompras from "components/compras/HeaderCompras";


function SearchCompras({
    proveedores,
    compras,
    count,
    next,
    previous,
    search_compras,
    get_lista_compras_page,
    get_lista_proveedores,
}) {
    useEffect(() => {
        search_compras(term);
        get_lista_proveedores();
    }, []);

    const params = useParams()
    const term = params.term

    return (
        <Layout>
            <section className="w-full px-4 py-24 mx-auto max-w-7xl md:w-3/4 lg:w-2/4">
                <HeaderCompras/>
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
    compras: state.compras.compras_filtradas,
    count: state.compras.count,
    next: state.compras.next,
    previous: state.compras.previous,
});

export default connect(mapStateToProps, {
    get_lista_proveedores,
    search_compras,
    get_lista_compras_page,
})(SearchCompras);
