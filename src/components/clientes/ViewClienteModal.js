import React, { useEffect, useState} from "react";
import { Modal } from "flowbite-react";
import axios from "axios";
import { get_cliente } from "redux/actions/clientes/clientes";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

function ViewClienteModal({ id, get_cliente, cliente }) {
    const [openModal, setOpenModal] = useState(false);
    const props = { openModal, setOpenModal };
    const [idCliente, setIdCliente] = useState(0);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombres: "",
        cedula: "",
        telefono: "",
        email: "",
        direccion: "",
    });
    const { nombres, cedula, telefono, email, direccion } = formData;
    const [updateNombres, setUpdateNombres] = useState(false);
    const [updateCedula, setUpdateCedula] = useState(false);
    const [updateDireccion, setUpdateDireccion] = useState(false);
    const [updateTelefono, setUpdateTelefono] = useState(false);
    const [updateEmail, setUpdateEmail] = useState(false);

    useEffect(() => {
        get_cliente(idCliente);
    }, [get_cliente, idCliente]);

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
        formData.append("nombres", nombres);
        formData.append("direccion", direccion);
        formData.append("telefono", telefono);
        formData.append("email", email);
        formData.append("cedula", cedula);

        const sendData = async () => {
            try {
                const res = await axios.put(
                    `${process.env.REACT_APP_API_URL}/clientes/editar/${idCliente}`,
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
                    setIdCliente(id);
                    props.setOpenModal("form-elements");
                }}
            >
                Detalles
            </button>
            <Modal
                show={props.openModal === "form-elements"}
                size="2xl"
                popup
                onClose={() => {navigate(0)}}
            >
                <Modal.Header />
                <Modal.Body>
                    <div className=" px-4 py-5 sm:px-6">
                        <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                            <div className="ml-4 mt-4">
                                <h3 className="text-3xl font-medium leading-6 text-gray-900">
                                    CLiente # {cliente && cliente.id}
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
                                        {updateNombres ? (
                                            <>
                                                <form
                                                    onSubmit={(e) =>
                                                        onSubmit(e)
                                                    }
                                                    className="flex w-full"
                                                >
                                                    <span className="flex-grow">
                                                        <input
                                                            value={nombres}
                                                            onChange={(e) =>
                                                                onChange(e)
                                                            }
                                                            name="nombres"
                                                            type="text"
                                                            className="border border-gray-400 rounded-lg w-full"
                                                            required
                                                        />
                                                    </span>
                                                    <span className="ml-4 flex-shrink-0">
                                                        <div
                                                            onClick={() =>
                                                                setUpdateNombres(
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
                                                    {cliente && cliente.nombres}
                                                </span>
                                                <span className="ml-4 flex-shrink-0">
                                                    <div
                                                        onClick={() =>
                                                            setUpdateNombres(
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
                                        Ruc
                                    </dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        {updateCedula ? (
                                            <>
                                                <form
                                                    onSubmit={(e) =>
                                                        onSubmit(e)
                                                    }
                                                    className="flex w-full"
                                                >
                                                    <span className="flex-grow">
                                                        <input
                                                            value={cedula}
                                                            onChange={(e) =>
                                                                onChange(e)
                                                            }
                                                            name="cedula"
                                                            type="text"
                                                            className="border border-gray-400 rounded-lg w-full"
                                                            required
                                                        />
                                                    </span>
                                                    <span className="ml-4 flex-shrink-0">
                                                        <div
                                                            onClick={() =>
                                                                setUpdateCedula(
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
                                                    {cliente && cliente.c_id}
                                                </span>
                                                <span className="ml-4 flex-shrink-0">
                                                    <div
                                                        onClick={() =>
                                                            setUpdateCedula(
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
                                        Direccion
                                    </dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        {updateDireccion ? (
                                            <>
                                                <form
                                                    onSubmit={(e) =>
                                                        onSubmit(e)
                                                    }
                                                    className="flex w-full"
                                                >
                                                    <span className="flex-grow">
                                                        <input
                                                            value={direccion}
                                                            onChange={(e) =>
                                                                onChange(e)
                                                            }
                                                            name="direccion"
                                                            type="text"
                                                            className="border border-gray-400 rounded-lg w-full"
                                                            required
                                                        />
                                                    </span>
                                                    <span className="ml-4 flex-shrink-0">
                                                        <div
                                                            onClick={() =>
                                                                setUpdateDireccion(
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
                                                    {cliente &&
                                                        cliente.direccion}
                                                </span>
                                                <span className="ml-4 flex-shrink-0">
                                                    <div
                                                        onClick={() =>
                                                            setUpdateDireccion(
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
                                        Email
                                    </dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        {updateEmail ? (
                                            <>
                                                <form
                                                    onSubmit={(e) =>
                                                        onSubmit(e)
                                                    }
                                                    className="flex w-full"
                                                >
                                                    <span className="flex-grow">
                                                        <input
                                                            value={email}
                                                            onChange={(e) =>
                                                                onChange(e)
                                                            }
                                                            name="email"
                                                            type="email"
                                                            className="border border-gray-400 rounded-lg w-full"
                                                            required
                                                        />
                                                    </span>
                                                    <span className="ml-4 flex-shrink-0">
                                                        <div
                                                            onClick={() =>
                                                                setUpdateEmail(
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
                                                    {cliente && cliente.email}
                                                </span>
                                                <span className="ml-4 flex-shrink-0">
                                                    <div
                                                        onClick={() =>
                                                            setUpdateEmail(true)
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
                                        Telefono
                                    </dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        {updateTelefono ? (
                                            <>
                                                <form
                                                    onSubmit={(e) =>
                                                        onSubmit(e)
                                                    }
                                                    className="flex w-full"
                                                >
                                                    <span className="flex-grow">
                                                        <input
                                                            value={telefono}
                                                            onChange={(e) =>
                                                                onChange(e)
                                                            }
                                                            name="telefono"
                                                            type="text"
                                                            className="border border-gray-400 rounded-lg w-full"
                                                            required
                                                        />
                                                    </span>
                                                    <span className="ml-4 flex-shrink-0">
                                                        <div
                                                            onClick={() =>
                                                                setUpdateTelefono(
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
                                                    {cliente &&
                                                        cliente.telefono}
                                                </span>
                                                <span className="ml-4 flex-shrink-0">
                                                    <div
                                                        onClick={() =>
                                                            setUpdateTelefono(
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
    cliente: state.clientes.cliente,
});

export default connect(mapStateToProps, {
    get_cliente,
})(ViewClienteModal);
