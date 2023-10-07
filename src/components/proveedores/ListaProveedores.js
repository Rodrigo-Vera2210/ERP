import { Link } from "react-router-dom";
import SmallSetPagination from "../pagination/SmallSetPagination";

function ListaProveedores({ posts, get_lista_proveedores_page, count }) {
    return (
        <div className="overflow-hidden px-8 bg-white">
            <ul
                role="list"
                className="divide-y space-y-8 gap-8  divide-gray-200 pb-4"
            >
                {posts &&
                    posts.map((proveedor, index) => (
                        <div className="mb-4" key={index}>
                            <h2 className="mb-2 text-xl font-extrabold leading-snug tracking-tight text-gray-800 md:text-3xl">
                                <a
                                    href="#"
                                    className="text-gray-900 hover:text-amber-500"
                                >
                                    {proveedor.nombre}
                                </a>
                            </h2>
                            <div className="mb-4">
                                <div className="flex border-t border-gray-300 py-1">
                                    <div className="font-bold text-gray-700 w-20">
                                        Ruc: 
                                    </div>
                                    <div className="text-gray-500">
                                        {proveedor.ruc}
                                    </div>
                                </div>
                                <div className="flex border-t border-gray-300 py-1">
                                    <div className="font-bold text-gray-700 w-20">
                                        Dirección: 
                                    </div>
                                    <div className="text-gray-500">
                                        {proveedor.direccion}
                                    </div>
                                </div>
                                <div className="flex border-t border-gray-300 py-1">
                                    <div className="font-bold text-gray-700 w-20">
                                        Telefóno: 
                                    </div>
                                    <div className="text-gray-500">
                                        {proveedor.telefono}
                                    </div>
                                </div>
                                <div className="flex border-t border-gray-300 py-1">
                                    <div className="font-bold text-gray-700 w-20">
                                        Email: 
                                    </div>
                                    <div className="text-gray-500">
                                        {proveedor.email}
                                    </div>
                                </div>
                            </div>
                            <div className="text-end">
                                <Link to={`../proveedores/${proveedor.id}`} className=" bg-amber-500 px-4 py-2 mr-3 rounded-lg font-bold hover:bg-black hover:text-amber-500">
                                    Detalle
                                </Link>
                                <button className="bg-red-600 px-4 h-9 rounded-lg font-bold hover:bg-black hover:text-red-600">
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
            </ul>

            <SmallSetPagination
                list_page={get_lista_proveedores_page}
                list={posts}
                count={count}
            />
        </div>
    );
}
export default ListaProveedores;
