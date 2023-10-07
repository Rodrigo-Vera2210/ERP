import React, { useEffect, useState } from "react";
import { Modal } from "flowbite-react";
import axios from "axios";
import { get_servicio } from "redux/actions/servicios/servicios";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

function ViewServicioModal({ id, get_servicio, servicio, categorias }) {
    const [openModal, setOpenModal] = useState(false);
    const props = { openModal, setOpenModal };
    const [idServicio, setIdServicio] = useState(0);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: "",
        precio: "",
        categoria: "",
    });
    const { nombre, precio, categoria } = formData;
    const [updateNombre, setUpdateNombre] = useState(false);
    const [updatePrecio, setUpdatePrecio] = useState(false);
    const [updateCategoria, setUpdateCategoria] = useState(false);
    const optionsCategorias = [];
    async function cargarCategorias() {
        categorias
            ? await categorias.map(async (categoria, index) => {
                return await optionsCategorias.push({
                    value: categoria.id,
                    label: categoria.nombre,
                });
            })
            : optionsCategorias.push({ value: "cargando" });
        categorias
            ? await categorias.map(async (categoria, index) => {
                categoria.sub_categories.length > 0 &&
                    categoria.sub_categories.map(
                        async (subcategoria, index) => {
                            return await optionsCategorias.push({
                                value: subcategoria.id,
                                label: subcategoria.nombre,
                            });
                        }
                    );
            })
            : optionsCategorias.push({ value: "cargando" });
    }
    cargarCategorias();
    useEffect(() => {
        idServicio!==0&&get_servicio(idServicio);
    }, [get_servicio, idServicio]);

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
        formData.append("categoria", categoria);
        formData.append("precio", precio);
        const sendData = async () => {
            try {
                const res = await axios.put(
                    `${process.env.REACT_APP_API_URL}/servicios/editar/${idServicio}`,
                    formData,
                    config
                );
            } catch (error) {
                alert("Error al enviar");
            }
        };
        sendData();
        navigate(0);
    };

    return (
        <>
            <button
                className="bg-amber-500 px-4 h-9 mr-2 rounded-lg text-white hover:bg-black hover:ring-amber-500 focus:bg-black focus:ring-amber-500"
                onClick={(e) => {
                    setIdServicio(id);
                    props.setOpenModal("form-elements");
                }}
            >
                Detalles
            </button>
            <Modal
                show={props.openModal === "form-elements"}
                size="2xl"
                popup
                onClose={() => {
                    navigate(0);
                }}
            >
                <Modal.Header />
                <Modal.Body>
                    <div className=" px-4 py-5 sm:px-6">
                        <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                            <div className="ml-4 mt-4">
                                <h3 className="text-3xl font-medium leading-6 text-gray-900">
                                    CLiente # {servicio && servicio.id}
                                </h3>
                            </div>
                            <div className="ml-4 mt-4 flex-shrink-0">
                                <button
                                    onClick={(e) => onSubmit(e)}
                                    className="relative mx-1 inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                >
                                    Editar
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full sm:flex-col border-t border-gray-200">
                        <div className="mt-5 w-3/5 sm: w-full pr-12">
                            <dl className="divide-y divide-gray-200">
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                    <dt className="text-lg font-medium text-gray-500">
                                        Nombre
                                    </dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        {updateNombre ? (
                                            <>
                                                <form
                                                    onSubmit={(e) =>
                                                        onSubmit(e)
                                                    }
                                                    className="flex w-full"
                                                >
                                                    <span className="flex-grow">
                                                        <input
                                                            value={nombre}
                                                            onChange={(e) =>
                                                                onChange(e)
                                                            }
                                                            name="nombre"
                                                            type="text"
                                                            className="border border-gray-400 rounded-lg w-full"
                                                            required
                                                        />
                                                    </span>
                                                    <span className="ml-4 flex-shrink-0">
                                                        <div
                                                            onClick={() =>
                                                                setUpdateNombre(
                                                                    false
                                                                )
                                                            }
                                                            className="cursor-pointer inline-flex rounded-md bg-white font-medium text-amber-600 hover:text-amber-500"
                                                        >
                                                            Cancel
                                                        </div>
                                                    </span>
                                                </form>
                                            </>
                                        ) : (
                                            <>
                                                <span className="flex-grow text-lg">
                                                    {servicio &&
                                                        servicio.nombre}
                                                </span>
                                                <span className="ml-4 flex-shrink-0">
                                                    <div
                                                        onClick={() =>
                                                            setUpdateNombre(
                                                                true
                                                            )
                                                        }
                                                        className="cursor-pointer inline-flex rounded-md bg-white font-medium text-amber-600 hover:text-amber-500"
                                                    >
                                                        Editar
                                                    </div>
                                                </span>
                                            </>
                                        )}
                                    </dd>
                                </div>

                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                    <dt className="text-lg font-medium text-gray-500">
                                        Precio
                                    </dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        {updatePrecio ? (
                                            <>
                                                <form
                                                    onSubmit={(e) =>
                                                        onSubmit(e)
                                                    }
                                                    className="flex w-full"
                                                >
                                                    <span className="flex-grow">
                                                        <input
                                                            value={precio}
                                                            onChange={(e) =>
                                                                onChange(e)
                                                            }
                                                            name="precio"
                                                            type="input"
                                                            className="border border-gray-400 rounded-lg w-full"
                                                            required
                                                        />
                                                    </span>
                                                    <span className="ml-4 flex-shrink-0">
                                                        <div
                                                            onClick={() =>
                                                                setUpdatePrecio(
                                                                    false
                                                                )
                                                            }
                                                            className="cursor-pointer inline-flex rounded-md bg-white font-medium text-amber-600 hover:text-amber-500"
                                                        >
                                                            Cancel
                                                        </div>
                                                    </span>
                                                </form>
                                            </>
                                        ) : (
                                            <>
                                                <span className="flex-grow text-lg">
                                                    ${" "}
                                                    {servicio &&
                                                        servicio.precio}
                                                </span>
                                                <span className="ml-4 flex-shrink-0">
                                                    <div
                                                        onClick={() =>
                                                            setUpdatePrecio(
                                                                true
                                                            )
                                                        }
                                                        className="cursor-pointer inline-flex rounded-md bg-white font-medium text-amber-600 hover:text-amber-500"
                                                    >
                                                        Editar
                                                    </div>
                                                </span>
                                            </>
                                        )}
                                    </dd>
                                </div>

                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                    <dt className="text-lg font-medium text-gray-500">
                                        Categoria
                                    </dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        {updateCategoria ? (
                                            <>
                                                <form
                                                    onSubmit={(e) =>
                                                        onSubmit(e)
                                                    }
                                                    className="flex w-full"
                                                >
                                                    <span className="flex-grow">
                                                        <Select
                                                            options={
                                                                optionsCategorias
                                                            }
                                                            onChange={(e) => {
                                                                setFormData({
                                                                    ...formData,
                                                                    ["categoria"]:
                                                                        e.value,
                                                                });
                                                            }}
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5"
                                                        ></Select>
                                                    </span>
                                                    <span className="ml-4 flex-shrink-0">
                                                        <div
                                                            onClick={() =>
                                                                setUpdateCategoria(
                                                                    false
                                                                )
                                                            }
                                                            className="cursor-pointer inline-flex rounded-md bg-white font-medium text-amber-600 hover:text-amber-500"
                                                        >
                                                            Cancel
                                                        </div>
                                                    </span>
                                                </form>
                                            </>
                                        ) : (
                                            <>
                                                <span className="flex-grow text-lg">
                                                    {servicio &&
                                                        servicio.categoria
                                                            .nombre}
                                                </span>
                                                <span className="ml-4 flex-shrink-0">
                                                    <div
                                                        onClick={() =>
                                                            setUpdateCategoria(
                                                                true
                                                            )
                                                        }
                                                        className="cursor-pointer inline-flex rounded-md bg-white font-medium text-amber-600 hover:text-amber-500"
                                                    >
                                                        Editar
                                                    </div>
                                                </span>
                                            </>
                                        )}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
const mapStateToProps = (state) => ({
    servicio: state.servicios.servicio,
});

export default connect(mapStateToProps, {
    get_servicio,
})(ViewServicioModal);
