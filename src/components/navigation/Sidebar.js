import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <ul className="mt-6 space-y-1">

            <li>
                <details className="group [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-black hover:bg-gray-500 hover:text-amber-500 focus:bg-gray-500 focus:text-amber-500">
                        <span className="text-sm font-medium"> Ventas </span>

                        <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                    </summary>

                    <ul className="mt-2 space-y-1 px-4">
                        <li>
                            <Link
                                to="/"
                                className="block rounded-lg px-4 py-2 text-sm font-medium text-black hover:bg-gray-500 hover:text-amber-500 focus:bg-gray-500 focus:text-amber-500"
                            >
                                Crear
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="../ventas/"
                                className="block rounded-lg px-4 py-2 text-sm font-medium text-black hover:bg-gray-500 hover:text-amber-500 focus:bg-gray-500 focus:text-amber-500"
                            >
                                Lista
                            </Link>
                        </li>
                    </ul>
                </details>
            </li>

            <li>
                <details className="group [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-black hover:bg-gray-500 hover:text-amber-500 focus:bg-gray-500 focus:text-amber-500">
                        <span className="text-sm font-medium">
                            {" "}
                            Servicios{" "}
                        </span>

                        <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                    </summary>

                    <ul className="mt-2 space-y-1 px-4">
                        <li>
                            <Link
                                to="../servicios/"
                                className="block rounded-lg px-4 py-2 text-sm font-medium text-black hover:bg-gray-500 hover:text-amber-500 focus:bg-gray-500 focus:text-amber-500"
                            >
                                Lista
                            </Link>
                        </li>
                    </ul>
                </details>
            </li>

            <li>
                <details className="group [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-black hover:bg-gray-500 hover:text-amber-500 focus:bg-gray-500 focus:text-amber-500">
                        <span className="text-sm font-medium">
                            {" "}
                            Clientes{" "}
                        </span>

                        <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                    </summary>

                    <ul className="mt-2 space-y-1 px-4">
                        <li>
                            <Link
                                to="/clientes"
                                className="block rounded-lg px-4 py-2 text-sm font-medium text-black hover:bg-gray-500 hover:text-amber-500 focus:bg-gray-500 focus:text-amber-500"
                            >
                                Lista
                            </Link>
                        </li>

                    </ul>
                </details>
            </li>

            <li>
                <details className="group [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-black hover:bg-gray-500 hover:text-amber-500 focus:bg-gray-500 focus:text-amber-500">
                        <span className="text-sm font-medium">
                            {" "}
                            Inventario{" "}
                        </span>

                        <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                    </summary>

                    <ul className="mt-2 space-y-1 px-4">
                        <li>
                            <Link
                                to="/productos"
                                className="block rounded-lg px-4 py-2 text-sm font-medium text-black hover:bg-gray-500 hover:text-amber-500 focus:bg-gray-500 focus:text-amber-500"
                            >
                                Productos
                            </Link>
                        </li>
                        
                        <li>
                            <Link
                                to="/proveedores"
                                className="block rounded-lg px-4 py-2 text-sm font-medium text-black hover:bg-gray-500 hover:text-amber-500 focus:bg-gray-500 focus:text-amber-500"
                            >
                                Proveedores
                            </Link>
                        </li>

                    </ul>
                </details>
            </li>

            <li>
                <details className="group [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-black hover:bg-gray-500 hover:text-amber-500 focus:bg-gray-500 focus:text-amber-500">
                        <span className="text-sm font-medium">
                            {" "}
                            Compras{" "}
                        </span>

                        <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                    </summary>

                    <ul className="mt-2 space-y-1 px-4">
                        <li>
                            <Link
                                to="/compras/crear"
                                className="block rounded-lg px-4 py-2 text-sm font-medium text-black hover:bg-gray-500 hover:text-amber-500 focus:bg-gray-500 focus:text-amber-500"
                            >
                                Crear
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/compras"
                                className="block rounded-lg px-4 py-2 text-sm font-medium text-black hover:bg-gray-500 hover:text-amber-500 focus:bg-gray-500 focus:text-amber-500"
                            >
                                Lista
                            </Link>
                        </li>
                    </ul>
                </details>
            </li>

            <li>
                <details className="group [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-black hover:bg-gray-500 hover:text-amber-500 focus:bg-gray-500 focus:text-amber-500">
                        <span className="text-sm font-medium">
                            {" "}
                            Empleados{" "}
                        </span>

                        <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                    </summary>

                    <ul className="mt-2 space-y-1 px-4">
                        <li>
                            <a
                                href=""
                                className="block rounded-lg px-4 py-2 text-sm font-medium text-black hover:bg-gray-500 hover:text-amber-500 focus:bg-gray-500 focus:text-amber-500"
                            >
                                Details
                            </a>
                        </li>

                        <li>
                            <a
                                href=""
                                className="block rounded-lg px-4 py-2 text-sm font-medium text-black hover:bg-gray-500 hover:text-amber-500 focus:bg-gray-500 focus:text-amber-500"
                            >
                                Security
                            </a>
                        </li>

                        <li>
                            <form action="/logout">
                                <button
                                    type="submit"
                                    className="w-full rounded-lg px-4 py-2 text-sm font-medium text-black [text-align:_inherit] hover:bg-gray-500 hover:text-amber-500 focus:bg-gray-500 focus:text-amber-500"
                                >
                                    Logout
                                </button>
                            </form>
                        </li>
                    </ul>
                </details>
            </li>
        </ul>
    );
}

export default Sidebar
