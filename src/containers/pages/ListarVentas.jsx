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


function ListarVentas({
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
})(ListarVentas);
