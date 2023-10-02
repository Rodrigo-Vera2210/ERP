import React, { useState } from "react";
import { Button, Modal } from "flowbite-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CrearClienteModal() {
    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState({
        nombres: "",
        cedula: "",
        telefono: "",
        email: "",
        direccion: "",
    });
    const { nombres, cedula, telefono, email, direccion } = formData;
    const props = { openModal, setOpenModal};
    const navigate = useNavigate()

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
                    `${process.env.REACT_APP_API_URL}/clientes/crear/`,
                    formData,
                    config
                );
            } catch (error) {
                alert("Error al enviar");
            }
        };
        sendData();
        navigate(0)
    };

    return (
        <>
            <button
                className="bg-amber-500 px-4 py-2 rounded-xl text-white hover:bg-black hover:ring-amber-500 focus:bg-black focus:ring-amber-500"
                onClick={() => props.setOpenModal("form-elements")}
            >
                Crear Cliente
            </button>
            <Modal
                show={props.openModal === "form-elements"}
                size="md"
                popup
                onClose={() => props.setOpenModal(undefined)}
            >
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h2 className="text-2xl font-medium text-amber-500 dark:text-white">
                            Crear Cliente
                        </h2>
                        <form onSubmit={(e) => onSubmit(e)}>
                            <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                <div class="sm:col-span-2">
                                    <label
                                        for="nombres"
                                        class="block mb-2 text-sm font-medium text-gray-900 "
                                    >
                                        Nombre
                                    </label>
                                    <input
                                        value={nombres}
                                        onChange={(e) => onChange(e)}
                                        type="text"
                                        name="nombres"
                                        id="nombres"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 "
                                        placeholder="Escriba el nombre del cliente"
                                        required=""
                                    />
                                </div>
                                <div class="w-full">
                                    <label
                                        for="cedula"
                                        class="block mb-2 text-sm font-medium text-gray-900 "
                                    >
                                        Ruc
                                    </label>
                                    <input
                                        value={cedula}
                                        onChange={(e) => onChange(e)}
                                        type="text"
                                        name="cedula"
                                        id="cedula"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 "
                                        placeholder="Ingrese la cedula"
                                        required=""
                                    />
                                </div>
                                <div class="w-full">
                                    <label
                                        for="telefono"
                                        class="block mb-2 text-sm font-medium text-gray-900 "
                                    >
                                        Telefono
                                    </label>
                                    <input
                                        value={telefono}
                                        onChange={(e) => onChange(e)}
                                        type="text"
                                        name="telefono"
                                        id="telefono"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 "
                                        placeholder="09999999999"
                                        required=""
                                    />
                                </div>
                                <div class="sm:col-span-2">
                                    <label
                                        for="direccion"
                                        class="block mb-2 text-sm font-medium text-gray-900 "
                                    >
                                        Dirección
                                    </label>
                                    <input
                                        value={direccion}
                                        onChange={(e) => onChange(e)}
                                        type="text"
                                        name="direccion"
                                        id="direccion"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 "
                                        placeholder="Ingrese la dirección del proveedor"
                                        required=""
                                    />
                                </div>
                                <div class="sm:col-span-2">
                                    <label
                                        for="email"
                                        class="block mb-2 text-sm font-medium text-gray-900 "
                                    >
                                        Email
                                    </label>
                                    <input
                                        value={email}
                                        onChange={(e) => onChange(e)}
                                        type="text"
                                        name="email"
                                        id="email"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 "
                                        placeholder="Ingrese el email del proveedor"
                                        required=""
                                    />
                                </div>
                            </div>
                        </form>
                        <div className="w-full">
                            <Button 
                                onClick={(e) => onSubmit(e)}
                                className="bg-amber-500 hover:bg-black">
                                Crear
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default CrearClienteModal;
