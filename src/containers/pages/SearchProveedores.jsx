import Layout from "hocs/layout";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
    get_lista_proveedores,
    search_proveedores_page,
    search_proveedores,
} from "redux/actions/proveedores/proveedores";
import ListaProveedores from "components/proveedores/ListaProveedores";
import {useParams } from "react-router-dom";
import HeaderProveedores from "components/proveedores/HeaderProveedores";


function SearchProveedores({
    proveedores,
    search_proveedores,
    count,
    next,
    previous,
    search_proveedores_page,
}) {
    useEffect(() => {
        search_proveedores(term);
    }, []);
    
    const params = useParams()
    const term = params.term

    return (
        <Layout>
            <section className="w-full px-4 py-24 mx-auto max-w-7xl md:w-3/4 lg:w-2/4">
                <HeaderProveedores/>
                <div className="flex flex-col space-y-12 divide-y divide-gray-200">
                    <ListaProveedores
                        posts={proveedores && proveedores}
                        get_lista_proveedores_page={search_proveedores_page}
                        count={count && count}
                    />
                </div>
            </section>
        </Layout>
    );
}
const mapStateToProps = (state) => ({
    proveedores: state.proveedores.proveedores_filtrados,
    count: state.proveedores.count,
    next: state.proveedores.next,
    previous: state.proveedores.previous,
});

export default connect(mapStateToProps, {
    get_lista_proveedores,
    search_proveedores,
    search_proveedores_page,
})(SearchProveedores);
