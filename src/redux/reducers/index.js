import { combineReducers } from 'redux';
import auth from './auth';
import empleado from './empleado';
import proveedores from './proveedores';
import productos from './productos';
import compras from './compras';
import servicios from './servicios';
import clientes from './clientes';
import ventas from './ventas';
import categorias from './categorias';

export default combineReducers({
    auth,
    empleado,
    proveedores,
    productos,
    compras,
    servicios,
    clientes,
    ventas,
    categorias,
})