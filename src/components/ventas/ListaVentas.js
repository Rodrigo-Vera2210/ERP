import { Link } from "react-router-dom";
import SmallSetPagination from "../pagination/SmallSetPagination";

function ListaVentas({ ventas, get_lista_ventas_page, count, proveedores }) {
    return (
        <div className="overflow-hidden px-8 bg-white">
            <ul
                role="list"
                className="divide-y space-y-8 gap-8  divide-gray-200"
            >
                {ventas &&
                    ventas.map((venta) => (
                        <div className="mb-4" key={venta.id}>
                            {
                                venta.aprobacion === false ?
                                    <h2 className="mb-2 text-xl font-extrabold leading-snug tracking-tight text-gray-800 md:text-3xl">
                                        <a
                                            href="#"
                                            className="text-gray-900 hover:text-amber-500"
                                        >
                                            Proforma # {venta.id}
                                        </a>
                                    </h2>
                                : 
                                <h2 className="mb-2 text-xl font-extrabold leading-snug tracking-tight text-gray-800 md:text-3xl">
                                    <a
                                        href="#"
                                        className="text-gray-900 hover:text-amber-500"
                                    >
                                        Venta # {venta.id}
                                    </a>
                                </h2>
                            }
                            <div className="mb-4">
                                <div className="flex border-t border-gray-300 py-1">
                                    <div className="font-bold text-gray-700 w-32">
                                        Cliente: 
                                    </div>
                                    <div className="text-gray-500">
                                        {venta.cliente.nombres}
                                    </div>
                                </div>
                                <div className="flex border-t border-gray-300 py-1">
                                    <div className="font-bold text-gray-700 w-32">
                                        Fecha: 
                                    </div>
                                    <div className="text-gray-500">
                                        {venta.fecha}
                                    </div>
                                </div>
                                <div className="flex border-t border-gray-300 py-1">
                                    <div className="font-bold text-gray-700 w-32">
                                        Total: 
                                    </div>
                                    <div className="text-gray-500">
                                        $ {venta.total}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Link to={`../ventas/${venta.id}`} className=" bg-amber-500 px-4 py-2 mr-3 rounded-lg font-bold hover:bg-black hover:text-amber-500">
                                    Detalles
                                </Link>
                                <button className="bg-red-600 px-4 h-9 rounded-lg font-bold hover:bg-black hover:text-red-600">
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
            </ul>
            <SmallSetPagination
                list_page={get_lista_ventas_page}
                list={ventas}
                count={count}
            />
        </div>
    );
}
export default ListaVentas;
