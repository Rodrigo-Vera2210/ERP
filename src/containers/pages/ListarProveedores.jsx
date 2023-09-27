import Layout from "hocs/layout";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
    get_lista_proveedores,
    get_lista_proveedores_page,
} from "redux/actions/proveedores/proveedores";
import ListaProveedores from "components/proveedores/ListaProveedores";
import { Link } from "react-router-dom";


function ListarProveedores({
    proveedores,
    count,
    next,
    previous,
    get_lista_proveedores,
    get_lista_proveedores_page,
}) {
    useEffect(() => {
        get_lista_proveedores();
        get_lista_proveedores_page();
    }, []);

    return (
        <Layout>
            <section class="w-full px-4 py-24 mx-auto max-w-7xl md:w-3/4 lg:w-2/4">
                <div class="mb-12 text-left md:text-center">
                    <h1 class="mb-3 text-5xl font-extrabold leading-tight text-amber-500">
                        Lista de proveedores
                    </h1>
                    <Link
                        to="crear"
                        className="bg-green-500 py-2 px-4 rounded-lg font-bold hover:bg-black hover:text-green-500"
                    >
                        Añadir proveedor
                    </Link>
                </div>
                <div class="flex flex-col space-y-12 divide-y divide-gray-200">
                    <ListaProveedores
                        posts={proveedores && proveedores}
                        get_lista_proveedores_page={get_lista_proveedores_page}
                        count={count && count}
                    />
                </div>
            </section>
        </Layout>
    );
}
const mapStateToProps = (state) => ({
    proveedores: state.proveedores.lista_proveedores,
    count: state.proveedores.count,
    next: state.proveedores.next,
    previous: state.proveedores.previous,
});

export default connect(mapStateToProps, {
    get_lista_proveedores,
    get_lista_proveedores_page,
})(ListarProveedores);
