import axios from "axios";
import Layout from "hocs/layout";
import { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux"
import { useNavigate, useParams } from "react-router-dom";
import { load_producto } from "redux/actions/productos/productos";
import { Dialog, Transition } from '@headlessui/react'
import { get_proveedor } from "redux/actions/proveedores/proveedores";
import {
    CheckIcon
} from '@heroicons/react/24/outline'

function ProveedoresView({
    load_producto,
    producto,
    proveedores,
    get_proveedor,
    proveedor,
    detalles
}) {
    const [open, setOpen] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [loading, setLoading] = useState(false)
    const params = useParams()
    const idProveedor = params.id
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0,0)
        get_proveedor(idProveedor)
    }, []);

    const [updateNombre, setUpdateNombre]=useState(false)
    const [updateRuc, setUpdateRuc]=useState(false)
    const [updateDireccion, setUpdateDireccion]=useState(false)
    const [updateTelefono, setUpdateTelefono]=useState(false)
    const [updateEmail, setUpdateEmail]=useState(false)

    const [formData, setFormData]=useState({
        nombre: '',
        ruc: '',
        direccion: '',
        email: '',
        telefono: '',
    })

    const {
        nombre,
        ruc,
        direccion,
        email,
        telefono,
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
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        const formData = new FormData()
        formData.append('nombre',nombre)
        formData.append('ruc',ruc)
        formData.append('direccion',direccion)
        formData.append('email',email)
        formData.append('telefono',telefono)

        const sendData = async() =>{
            try {
                const res = await axios.put(`${process.env.REACT_APP_API_URL}/proveedores/editar/${idProveedor}`, formData, config)
            } catch (error) {
                alert('Error al enviar')
            }
        }
        sendData()
        setOpen(true)
    }
    
    const onSubmitDelete = e =>{
        e.preventDefault()
        
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        const formData = new FormData()

        const fetchData = async()=>{
            setLoading(true)
            try{
                const res = await axios.delete(`${process.env.REACT_APP_API_URL}/proveedores/eliminar/${idProveedor}`,
                formData,
                config)

                if(res.status === 200){
                    navigate(-1)
                }else{
                    setOpen(false)
                    setLoading(false)
                }
            }catch(err){
                setOpen(false)
                setLoading(false)
                alert('Error al enviar')
            }
        }
        fetchData()
        setOpen(true)
    }

    return (
        <Layout>
            <>
            <div className=" px-4 py-5 sm:px-6">
                <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                    <div className="ml-4 mt-4">
                        <h3 className="text-3xl font-medium leading-6 text-gray-900">Proveedor # {proveedor && proveedor.id}</h3>
                    </div>
                    <div className="ml-4 mt-4 flex-shrink-0">
                        <button
                            onClick={e=>setOpenDelete(true)}
                            className="relative mx-1 inline-flex items-center rounded-md border border-transparent bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                        >
                            Delete
                        </button>
                        <button
                            onClick={e=>onSubmit(e)}
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
                            <dt className="text-lg font-medium text-gray-500">Nombre</dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {
                                    updateNombre ?
                                    <>
                                        <form onSubmit={e=>onSubmit(e)} className="flex w-full">
                    
                                            <span className="flex-grow">
                                                <input
                                                value={nombre}
                                                onChange={e=>onChange(e)}
                                                name='nombre'
                                                type='text'
                                                className="border border-gray-400 rounded-lg w-full"
                                                required
                                                />
                                            </span>
                                            <span className="ml-4 flex-shrink-0">
                                                <div
                                                onClick={()=>setUpdateNombre(false)}
                                                className="cursor-pointer inline-flex rounded-md bg-white font-medium text-amber-600 hover:text-amber-500"
                                                >
                                                Cancel
                                                </div>
                                            </span>
                                        </form>
                                    </>
                                    :
                                    <>
                                        <span className="flex-grow text-lg">{proveedor && proveedor.nombre}</span>
                                        <span className="ml-4 flex-shrink-0">
                                            <div
                                            onClick={()=>setUpdateNombre(true)}
                                            className="cursor-pointer inline-flex rounded-md bg-white font-medium text-amber-600 hover:text-amber-500"
                                            >
                                            Editar
                                            </div>
                                        </span>
                                    </>
                                }
                            </dd>
                        </div>
                        
                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                            <dt className="text-lg font-medium text-gray-500">Ruc</dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {
                                    updateRuc ?
                                    <>
                                    <form onSubmit={e=>onSubmit(e)} className="flex w-full">
                                        <span className="flex-grow">
                                            <input
                                            value={ruc}
                                            onChange={e=>onChange(e)}
                                            name='ruc'
                                            type='text'
                                            className="border border-gray-400 rounded-lg w-full"
                                            required
                                            />
                                        </span>
                                        <span className="ml-4 flex-shrink-0">
                                            <div
                                            onClick={()=>setUpdateRuc(false)}
                                            className="cursor-pointer inline-flex rounded-md bg-white font-medium text-amber-600 hover:text-amber-500"
                                            >
                                            Cancel
                                            </div>
                                        </span>
                                    </form>
                                    </>
                                    :
                                    <>
                                        <span className="flex-grow text-lg">{proveedor && proveedor.ruc}</span>
                                        <span className="ml-4 flex-shrink-0">
                                            <div
                                            onClick={()=>setUpdateRuc(true)}
                                            className="cursor-pointer inline-flex rounded-md bg-white font-medium text-amber-600 hover:text-amber-500"
                                            >
                                            Editar
                                            </div>
                                        </span>
                                    </>
                                }
                            </dd>
                        </div>
                
                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                            <dt className="text-lg font-medium text-gray-500">Direccion</dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            {
                                    updateDireccion ?
                                    <>
                                    <form onSubmit={e=>onSubmit(e)} className="flex w-full">
                                        <span className="flex-grow">
                                            <input
                                            value={direccion}
                                            onChange={e=>onChange(e)}
                                            name='direccion'
                                            type='text'
                                            className="border border-gray-400 rounded-lg w-full"
                                            required
                                            />
                                        </span>
                                        <span className="ml-4 flex-shrink-0">
                                            <div
                                            onClick={()=>setUpdateDireccion(false)}
                                            className="cursor-pointer inline-flex rounded-md bg-white font-medium text-amber-600 hover:text-amber-500"
                                            >
                                            Cancel
                                            </div>
                                        </span>
                                    </form>
                                    </>
                                    :
                                    <>
                                        <span className="flex-grow text-lg">{proveedor && proveedor.direccion}</span>
                                        <span className="ml-4 flex-shrink-0">
                                            <div
                                            onClick={()=>setUpdateDireccion(true)}
                                            className="cursor-pointer inline-flex rounded-md bg-white font-medium text-amber-600 hover:text-amber-500"
                                            >
                                            Editar
                                            </div>
                                        </span>
                                    </>
                                }
                            </dd>
                        </div>
                
                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                            <dt className="text-lg font-medium text-gray-500">Email</dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {
                                    updateEmail ?
                                    <>
                                    <form onSubmit={e=>onSubmit(e)} className="flex w-full">
                                        <span className="flex-grow">
                                            <input
                                                value={email}
                                                onChange={e=>onChange(e)}
                                                name='email'
                                                type='email'
                                                className="border border-gray-400 rounded-lg w-full"
                                                required
                                            />
                                        </span>
                                        <span className="ml-4 flex-shrink-0">
                                            <div
                                            onClick={()=>setUpdateEmail(false)}
                                            className="cursor-pointer inline-flex rounded-md bg-white font-medium text-amber-600 hover:text-amber-500"
                                            >
                                            Cancel
                                            </div>
                                        </span>
                                    </form>
                                    </>
                                    :
                                    <>
                                        <span className="flex-grow text-lg">
                                            {proveedor && proveedor.email}
                                        </span>
                                        <span className="ml-4 flex-shrink-0">
                                            <div
                                            onClick={()=>setUpdateEmail(true)}
                                            className="cursor-pointer inline-flex rounded-md bg-white font-medium text-amber-600 hover:text-amber-500"
                                            >
                                                Editar
                                            </div>
                                        </span>
                                    </>
                                }
                            </dd>
                        </div>

                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                            <dt className="text-lg font-medium text-gray-500">Telefono</dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {
                                    updateTelefono ?
                                    <>
                                    <form onSubmit={e=>onSubmit(e)} className="flex w-full">
                                        <span className="flex-grow">
                                            <input
                                                value={telefono}
                                                onChange={e=>onChange(e)}
                                                name='telefono'
                                                type='text'
                                                className="border border-gray-400 rounded-lg w-full"
                                                required
                                            />
                                        </span>
                                        <span className="ml-4 flex-shrink-0">
                                            <div
                                            onClick={()=>setUpdateTelefono(false)}
                                            className="cursor-pointer inline-flex rounded-md bg-white font-medium text-amber-600 hover:text-amber-500"
                                            >
                                            Cancel
                                            </div>
                                        </span>
                                    </form>
                                    </>
                                    :
                                    <>
                                        <span className="flex-grow text-lg">
                                            {proveedor && proveedor.telefono}
                                        </span>
                                        <span className="ml-4 flex-shrink-0">
                                            <div
                                            onClick={()=>setUpdateTelefono(true)}
                                            className="cursor-pointer inline-flex rounded-md bg-white font-medium text-amber-600 hover:text-amber-500"
                                            >
                                                Editar
                                            </div>
                                        </span>
                                    </>
                                }
                            </dd>
                        </div>
                        
                    </dl>
                </div>
            </div>
            
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

            <Transition.Root show={openDelete} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpenDelete}>
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
                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6">
                            <div>
                            <div className="mt-3 text-center sm:mt-5">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                <span>Eliminar Proveedor</span>
                                </Dialog.Title>
                                <div className="mt-2">
                                
                                    <p className="text-sm text-gray-500">
                                        ¿Estas seguro de eliminar el proveedor?
                                    </p>
                                </div>
                            </div>
                            </div>
                            <form onSubmit={e=>onSubmitDelete(e)} className="mt-5 sm:mt-6">
                                    <button
                                        type="submit"
                                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-rose-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 sm:text-sm"
                                        
                                    >
                                            <span>Delete</span>
                                    </button>
                            </form>
                        </Dialog.Panel>
                        </Transition.Child>
                    </div>
                    </div>
                </Dialog>
            </Transition.Root>
            </>
        </Layout>
    );
}
const mapStateToProps=state=>({
    producto: state.productos.producto,
    proveedores: state.productos.proveedores,
    proveedor: state.proveedores.proveedor,
    detalles: state.productos.detalles,
})

export default connect(mapStateToProps,{
    load_producto,
    get_proveedor
}) (ProveedoresView);
