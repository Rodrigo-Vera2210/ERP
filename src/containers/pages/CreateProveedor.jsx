import Layout from "hocs/layout";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";

function CreateProveedor({}) {
    useEffect(() => {}, []);

    const [formData, setFormData]=useState({
        nombre: '',
        ruc: '',
        telefono: '',
        email: '',
        direccion: '',
    })

    const {
        nombre,
        ruc,
        telefono,
        email,
        direccion,
    } = formData

    const onChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    
    const onSubmit = e =>{
        e.preventDefault()

        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
            }
        };

        const formData = new FormData()
        formData.append('nombre',nombre)
        formData.append('direccion',direccion)
        formData.append('telefono',telefono)
        formData.append('email',email)
        formData.append('ruc',ruc)

        const sendData = async() =>{
            try {
                const res = await axios.put(`${process.env.REACT_APP_API_URL}/proveedores/crear/`, formData, config)
            } catch (error) {
                alert('Error al enviar')
            }
        }
        sendData()
    }

    return (
        <Layout>
            <section class="bg-white">
                <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    <h2 class="mb-4 text-xl font-bold text-gray-900 ">
                        Añadir nuevo proveedor
                    </h2>
                    <form onSubmit={e=>onSubmit(e)}>
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
                                    onChange={e=>onChange(e)}
                                    type="text"
                                    name="nombre"
                                    id="nombre"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 "
                                    placeholder="Escriba el nombre del proveedor"
                                    required=""
                                />
                            </div>
                            <div class="w-full">
                                <label
                                    for="ruc"
                                    class="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    Ruc
                                </label>
                                <input
                                    value={ruc}
                                    onChange={e=>onChange(e)}
                                    type="text"
                                    name="ruc"
                                    id="ruc"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 "
                                    placeholder="Escriba el ruc"
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
                                    onChange={e=>onChange(e)}
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
                                    onChange={e=>onChange(e)}
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
                                    onChange={e=>onChange(e)}
                                    type="text"
                                    name="email"
                                    id="email"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 "
                                    placeholder="Ingrese el email del proveedor"
                                    required=""
                                />
                            </div>
                        </div>
                        <button
                            onClick={e=>onSubmit(e)}
                            class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-amber-500 rounded-lg focus:ring-4 focus:ring-amber-500 hover:bg-black hover:text-amber-500"
                        >
                            Añadir proveedor
                        </button>
                    </form>
                </div>
            </section>
        </Layout>
    );
}
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(CreateProveedor);
