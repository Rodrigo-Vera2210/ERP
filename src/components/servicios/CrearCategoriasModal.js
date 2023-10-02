import React, { useState } from "react";
import { Button, Modal } from "flowbite-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

function CrearCategoriasModal({categorias}) {
    const optionsCategorias = [];
    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState({
        nombre: "",
        padre: "",
    });
    const { nombre, padre } = formData;
    const props = { openModal, setOpenModal};
    const navigate = useNavigate()
    async function cargarCategorias(){
        categorias?
        await categorias.map(async (categoria, index) =>{
            return await optionsCategorias.push({ value: categoria.id, label: categoria.nombre })
        })
        : optionsCategorias.push({value: 'cargando'})
    }
    cargarCategorias()

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
        formData.append("padre", padre);

        const sendData = async () => {
            try {
                const res = await axios.put(
                    `${process.env.REACT_APP_API_URL}/servicios/categorias/crear/`,
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
                Crear Categoría
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
                            Crear Categoría
                        </h2>
                        <form onSubmit={(e) => onSubmit(e)}>
                            <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                <div class="sm:col-span-2">
                                    <label
                                        for="nombre"
                                        class="block mb-2 text-sm font-medium text-gray-900 "
                                    >
                                        Nombre
                                    </label>
                                    <input
                                        value={nombre}
                                        onChange={(e) => onChange(e)}
                                        type="text"
                                        name="nombre"
                                        id="nombre"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 "
                                        placeholder="Escriba el nombre de la categoría"
                                        required=""
                                    />
                                </div>
                                <div class="sm:col-span-2">
                                    <label
                                        for="padre"
                                        class="block mb-2 text-sm font-medium text-gray-900 "
                                    >
                                        Categoria Padre
                                    </label>
                                    <Select 
                                        options={optionsCategorias}
                                        
                                        onChange={(e) =>{
                                            setFormData({ ...formData, ['padre']: e.value });
                                        }}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5">

                                    </Select>
                                </div>
                            </div>
                        </form>
                        <div className="w-full mx-auto">
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

export default CrearCategoriasModal;
