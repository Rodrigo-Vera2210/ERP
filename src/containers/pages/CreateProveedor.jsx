import Layout from "hocs/layout";
import { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {
    Bars3Icon,
    XMarkIcon,
    CheckIcon
} from '@heroicons/react/24/outline'
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from '@headlessui/react'

function CreateProveedor({}) {
    useEffect(() => {}, []);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: "",
        ruc: "",
        telefono: "",
        email: "",
        direccion: "",
    });
    const [open, setOpen] = useState(false);

    const { nombre, ruc, telefono, email, direccion } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const config = {
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
                Authorization: `JWT ${localStorage.getItem("access")}`,
            },
        };

        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("direccion", direccion);
        formData.append("telefono", telefono);
        formData.append("email", email);
        formData.append("ruc", ruc);

        const sendData = async () => {
            try {
                const res = await axios.post(
                    `${process.env.REACT_APP_API_URL}/proveedores/crear/`,
                    formData,
                    config
                );
            } catch (error) {
                alert("Error al enviar");
            }
        };
        sendData();
        setOpen(true)
    };

    return (
        <Layout>
            <section className="bg-white">
                <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    <h2 className="mb-4 text-xl font-bold text-gray-900 ">
                        Añadir nuevo proveedor
                    </h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="nombre"
                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    Nombre
                                </label>
                                <input
                                    value={nombre}
                                    onChange={(e) => onChange(e)}
                                    type="text"
                                    name="nombre"
                                    id="nombre"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 "
                                    placeholder="Escriba el nombre del proveedor"
                                    required=""
                                />
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="ruc"
                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    Ruc
                                </label>
                                <input
                                    value={ruc}
                                    onChange={(e) => onChange(e)}
                                    type="text"
                                    name="ruc"
                                    id="ruc"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 "
                                    placeholder="Escriba el ruc"
                                    required=""
                                />
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="telefono"
                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    Telefono
                                </label>
                                <input
                                    value={telefono}
                                    onChange={(e) => onChange(e)}
                                    type="text"
                                    name="telefono"
                                    id="telefono"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 "
                                    placeholder="09999999999"
                                    required=""
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="direccion"
                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    Dirección
                                </label>
                                <input
                                    value={direccion}
                                    onChange={(e) => onChange(e)}
                                    type="text"
                                    name="direccion"
                                    id="direccion"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 "
                                    placeholder="Ingrese la dirección del proveedor"
                                    required=""
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    Email
                                </label>
                                <input
                                    value={email}
                                    onChange={(e) => onChange(e)}
                                    type="text"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 "
                                    placeholder="Ingrese el email del proveedor"
                                    required=""
                                />
                            </div>
                        </div>
                        <button
                            onClick={(e) => onSubmit(e)}
                            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-amber-500 rounded-lg focus:ring-4 focus:ring-amber-500 hover:bg-black hover:text-amber-500"
                        >
                            Añadir proveedor
                        </button>
                    </form>
                </div>
            </section>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                    <div>
                                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                            <CheckIcon
                                                className="h-6 w-6 text-green-600"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <div className="mt-3 text-center sm:mt-5">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg font-medium leading-6 text-gray-900"
                                            >
                                                Felicidades
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    El proveedor ha sido creado con exito!
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center py-2 px-4 rounded-md border border-transparent font-medium  bg-amber-500 text-black hover:bg-black hover:text-amber-500 sm:text-sm"
                                            onClick={() => navigate(-1)}
                                        >
                                            Aceptar
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </Layout>
    );
}
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(CreateProveedor);
