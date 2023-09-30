import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import Error404 from 'containers/errors/Error404';
import Home from 'containers/pages/Home';

import { AnimatePresence } from 'framer-motion'
import CreateOrden from 'containers/pages/CreateOrden';
import ResetPassword from 'containers/auth/ResetPassword';
import ResetPasswordConfirm from 'containers/auth/ResetPasswordConfirm';
import UserView from 'containers/pages/UserView';
import CreateProveedor from 'containers/pages/CreateProveedor';
import ListarProveedores from 'containers/pages/ListarProveedores';
import CreateCompra from 'containers/pages/CreateCompra';
import ListarProductos from 'containers/pages/ListarProductos';
import ListarCompras from 'containers/pages/ListarCompras';
import ProductoView from 'containers/pages/ProductoView';
import ProveedoresView from 'containers/pages/ProveedoresView';
import ComprasView from 'containers/pages/ComprasView';

function AnimatedRoutes(){

    const location = useLocation()

    return(
        <Routes location={location} key={location.pathname}>
            {/* Error Display */}
            <Route path="*" element={<Error404 />} />
            <Route path="/forgot_password" element={<ResetPassword/>} />
            <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm/>} />

            {/* Home Display */}
            <Route path="/" element={<Home />} />
            <Route path="/ordenes/crear" element={<CreateOrden />} />
            <Route path="/user/view" element={<UserView />} />
            {/* Proveedores Display */}
            <Route path="/proveedores" element={<ListarProveedores />} />
            <Route path="/proveedores/:id" element={<ProveedoresView />} />
            <Route path="/proveedores/crear" element={<CreateProveedor />} />
            {/* Compras Display */}
            <Route path="/compras" element={<ListarCompras />} />
            <Route path="/compras/:id" element={<ComprasView />} />
            <Route path="/compras/crear" element={<CreateCompra />} />
            {/* Productos Display */}
            <Route path="/productos" element={<ListarProductos />} />
            <Route path="/productos/:id" element={<ProductoView />} />
        </Routes>
    )
}
export default AnimatedRoutes