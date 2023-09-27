import Layout from "hocs/layout";
import { useEffect, useState } from "react";
import { connect } from "react-redux"

function CreateOrden({
}) {
    useEffect(() => {

    }, []);

    return (
        <Layout>
            Hola
        </Layout>
    );
}
const mapStateToProps=state=>({
})

export default connect(mapStateToProps,{
}) (CreateOrden);
