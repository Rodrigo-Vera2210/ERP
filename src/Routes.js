import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import Error404 from 'containers/errors/Error404';

import { AnimatePresence } from 'framer-motion'
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
import ListarServicios from 'containers/pages/ListarServicios';
import ListarVentas from 'containers/pages/ListarVentas';
import ListarClientes from 'containers/pages/ListarClientes';
import CreateVenta from 'containers/pages/CreateVentas';
import Home from 'containers/pages/Home';
import VentasView from 'containers/pages/VentasView';
import SearchProveedores from 'containers/pages/SearchProveedores';
import SearchClientes from 'containers/pages/SearchClientes';
import SearchCompras from 'containers/pages/SearchCompras';
import SearchProductos from 'containers/pages/SearchProductos';
import SearchServicios from 'containers/pages/SearchServicios';
import SearchVentas from 'containers/pages/SearchVentas';
import CategoryServicios from 'containers/pages/CategoryServicios';

function AnimatedRoutes(){

    const location = useLocation()

    return(
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                {/* Error Display */}
                <Route path="*" element={<Error404 />} />
                <Route path="/forgot_password" element={<ResetPassword/>} />
                <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm/>} />

                {/* Home Display */}
                <Route path="/" element={<Home />} />
                <Route path="/user/view" element={<UserView />} />
                {/* Proveedores Display */}
                <Route path="/proveedores" element={<ListarProveedores />} />
                <Route path="/proveedores/buscar/:term" element={<SearchProveedores />} />
                <Route path="/proveedores/:id" element={<ProveedoresView />} />
                <Route path="/proveedores/crear" element={<CreateProveedor />} />
                {/* Compras Display */}
                <Route path="/compras" element={<ListarCompras />} />
                <Route path="/compras/buscar/:term" element={<SearchCompras />} />
                <Route path="/compras/:id" element={<ComprasView />} />
                <Route path="/compras/crear" element={<CreateCompra />} />
                {/* Productos Display */}
                <Route path="/productos" element={<ListarProductos />} />
                <Route path="/productos/buscar/:term" element={<SearchProductos />} />
                <Route path="/productos/:id" element={<ProductoView />} />
                {/* Servicios Display */}
                <Route path="/servicios" element={<ListarServicios />} />
                <Route path="/servicios/buscar/:term" element={<SearchServicios />} />
                <Route path="/servicios/category/:term" element={<CategoryServicios />} />
                {/* Ventas Display */}
                <Route path="/ventas" element={<ListarVentas />} />
                <Route path="/ventas/buscar/:term" element={<SearchVentas />} />
                <Route path="/ventas/:id" element={<VentasView />} />
                <Route path="/ventas/crear" element={<CreateVenta />} />
                {/* Clientes Display */}
                <Route path="/clientes" element={<ListarClientes />} />
                <Route path="/clientes/buscar/:term" element={<SearchClientes />} />
                
            </Routes>
        </AnimatePresence>
    )
}
export default AnimatedRoutes