import Layout from "hocs/layout";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {
    get_lista_clientes,
    get_lista_clientes_page,
} from "redux/actions/clientes/clientes";
import ListaClientes from "components/clientes/ListaClientes";
import HeaderClientes from "components/clientes/HeaderClientes";


function ListarClientes({
    clientes,
    count,
    next,
    previous,
    get_lista_clientes,
    get_lista_clientes_page,
}) {
    useEffect(() => {
        get_lista_clientes();
    }, []);

    return (
        <Layout>
            <section className="w-full px-4 py-24 mx-auto max-w-7xl md:w-3/4 lg:w-2/4">
                <HeaderClientes/>
                <div className="flex flex-col space-y-12 divide-y divide-gray-200">
                    <ListaClientes
                        clientes={clientes && clientes}
                        get_lista_clientes_page={get_lista_clientes_page}
                        count={count && count}
                    />
                </div>
            </section>
            
        </Layout>
    );
}
const mapStateToProps = (state) => ({
    clientes: state.clientes.lista_clientes,
    count: state.proveedores.count,
    next: state.proveedores.next,
    previous: state.proveedores.previous,
});

export default connect(mapStateToProps, {
    get_lista_clientes,
    get_lista_clientes_page,
})(ListarClientes);
