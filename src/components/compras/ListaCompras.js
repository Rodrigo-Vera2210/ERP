import { Link } from "react-router-dom";
import SmallSetPagination from "../pagination/SmallSetPagination";

function ListaCompras({ compras, get_lista_compras_page, count, proveedores }) {
    return (
        <div className="overflow-hidden px-8 bg-white">
            <ul
                role="list"
                className="divide-y space-y-8 gap-8  divide-gray-200"
            >
                {compras &&
                    compras.map((compra, index) => (
                        <div className="mb-4">
                            <h2 class="mb-2 text-xl font-extrabold leading-snug tracking-tight text-gray-800 md:text-3xl">
                                <a
                                    href="#"
                                    class="text-gray-900 hover:text-purple-700"
                                >
                                    Compra # {compra.id}
                                </a>
                            </h2>
                            <div className="mb-4">
                                <div className="flex border-t border-gray-300 py-1">
                                    <div className="font-bold text-gray-700 w-32">
                                        Proveedor: 
                                    </div>
                                    <div className="text-gray-500">
                                        {
                                            proveedores.map((proveedor,index)=>{
                                                if(proveedor.id === compra.proveedor){
                                                    return<>
                                                        {proveedor.nombre}
                                                    </>
                                                }
                                            })
                                            
                                        }
                                    </div>
                                </div>
                                <div className="flex border-t border-gray-300 py-1">
                                    <div className="font-bold text-gray-700 w-32">
                                        Fecha: 
                                    </div>
                                    <div className="text-gray-500">
                                        {compra.fecha}
                                    </div>
                                </div>
                                <div className="flex border-t border-gray-300 py-1">
                                    <div className="font-bold text-gray-700 w-32">
                                        Total: 
                                    </div>
                                    <div className="text-gray-500">
                                        $ {compra.total}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Link href="#" class=" bg-amber-500 px-4 py-2 mr-3 rounded-lg font-bold hover:bg-black hover:text-amber-500">
                                    Editar
                                </Link>
                                <button className="bg-red-600 px-4 h-9 rounded-lg font-bold hover:bg-black hover:text-red-600">
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
            </ul>
            <SmallSetPagination
                list_page={get_lista_compras_page}
                list={compras}
                count={count}
            />
        </div>
    );
}
export default ListaCompras;
