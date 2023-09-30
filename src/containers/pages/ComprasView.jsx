import axios from "axios";
import Layout from "hocs/layout";
import { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux"
import { useNavigate, useParams } from "react-router-dom";
import { load_producto } from "redux/actions/productos/productos";
import { Dialog, Transition } from '@headlessui/react'
import { get_compra } from "redux/actions/compras/compras";

function ComprasView({
    load_producto,
    get_compra,
    producto,
    proveedores,
    detalles
}) {
    const [open, setOpen] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [loading, setLoading] = useState(false)
    const params = useParams()
    const idProducto = params.id
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0,0)
        load_producto(idProducto);
        get_compra(idProducto)
    }, []);

    const [updateNombre, setUpdateNombre]=useState(false)
    const [updateMarca, setUpdateMarca]=useState(false)
    const [updatePrecio, setUpdatePrecio]=useState(false)

    const [formData, setFormData]=useState({
        nombre: '',
        marca: '',
        precio: '',
    })

    const {
        nombre,
        marca,
        precio,
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
        formData.append('marca',marca)
        formData.append('precio',precio)

        const sendData = async() =>{
            try {
                const res = await axios.put(`${process.env.REACT_APP_API_URL}/productos/edit/${idProducto}`, formData, config)
            } catch (error) {
                alert('Error al enviar')
            }
        }
        sendData()
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
                const res = await axios.delete(`${process.env.REACT_APP_API_URL}/productos/delete/${idProducto}`,
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
    }

    return (
        <Layout>
            <>
            <div className=" px-4 py-5 sm:px-6">
                <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                    <div className="ml-4 mt-4">
                        <h3 className="text-3xl font-medium leading-6 text-gray-900">Producto # {producto && producto.id}</h3>
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
                                        <span className="flex-grow text-lg">{producto && producto.nombre}</span>
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
                            <dt className="text-lg font-medium text-gray-500">Marca</dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {
                                    updateMarca ?
                                    <>
                                    <form onSubmit={e=>onSubmit(e)} className="flex w-full">
                
                                        <span className="flex-grow">
                                            <input
                                            value={marca}
                                            onChange={e=>onChange(e)}
                                            name='marca'
                                            type='text'
                                            className="border border-gray-400 rounded-lg w-full"
                                            required
                                            />
                                        </span>
                                        <span className="ml-4 flex-shrink-0">
                                            <div
                                            onClick={()=>setUpdateMarca(false)}
                                            className="cursor-pointer inline-flex rounded-md bg-white font-medium text-amber-600 hover:text-amber-500"
                                            >
                                            Cancel
                                            </div>
                                        </span>
                                    </form>
                                    </>
                                    :
                                    <>
                                        <span className="flex-grow text-lg">{producto && producto.marca}</span>
                                        <span className="ml-4 flex-shrink-0">
                                            <div
                                            onClick={()=>setUpdateMarca(true)}
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
                            <dt className="text-lg font-medium text-gray-500">Cantidad</dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                <span className="flex-grow text-lg">{producto && producto.cantidad_total}</span>
                            </dd>
                        </div>
                
                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                            <dt className="text-lg font-medium text-gray-500">Precio</dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {
                                    updatePrecio ?
                                    <>
                                    <form onSubmit={e=>onSubmit(e)} className="w-full">
                                        <span className="flex-grow">
                                            <input
                                                value={precio}
                                                onChange={e=>onChange(e)}
                                                name='precio'
                                                type='number'
                                                className="border border-gray-400 rounded-lg w-full"
                                                required
                                            />
                                        </span>
                                        <span className="ml-4 flex-shrink-0">
                                            <div
                                            onClick={()=>setUpdatePrecio(false)}
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
                                            $ {producto && producto.precio_venta}
                                        </span>
                                        <span className="ml-4 flex-shrink-0">
                                            <div
                                            onClick={()=>setUpdatePrecio(true)}
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
                            <dt className="text-lg font-medium text-gray-500">Proveedores</dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {
                                    <ul className="flex-grow text-lg">
                                        {
                                            proveedores && proveedores.map(proveedor=>{
                                                return detalles.map((detalle)=>(detalle.proveedor === proveedor.id && (
                                                <li>
                                                    <b>{proveedor.nombre}</b> || Costo: $ {detalle.precio_compra}
                                                </li>)))
                                            })
                                        }
                                    </ul>
                                }
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>

            

            {/* <Transition.Root show={open} as={Fragment}>
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
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6">
                        <div>
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                            {
                                post.title && post.description && post.slug&& post.content ?
                                <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                :
                                <XMarkIcon className="h-6 w-6 text-rose-600" aria-hidden="true" />

                            }
                        </div>
                        <div className="mt-3 text-center sm:mt-5">
                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                            {
                                post.get_status === 'published' ?
                                <span>Draft this post?</span>
                                :
                                <span>Publish this post?</span>

                            }
                            </Dialog.Title>
                            <div className="mt-2">
                            {
                                post.title && post.description && post.slug&& post.content ?
                                <></>
                                :
                                <p className="text-sm text-gray-500">
                                    To publish this post you must add: Title, Description, Slug and Content
                                </p>
                                

                            }
                            </div>
                        </div>
                        </div>
                        {
                            (post.title && post.description && post.slug&& post.content) &&
                            <>
                            
                                {
                                    post.get_status === 'published' ?
                                    <form onSubmit={e=>onSubmitDraft(e)} className="mt-5 sm:mt-6">
                                            <button
                                                type="submit"
                                                className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                                                
                                            >
                                                    <span>Draft</span>
                                            </button>
                                            :
                                            <></>
                                    </form>
                                    :
                                    <form onSubmit={e=>onSubmitPublish(e)} className="mt-5 sm:mt-6">
                                            <button
                                                type="submit"
                                                className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                                                
                                            >
                                                    <span>Publish</span>
                                            </button>
                                            :
                                            <></>
                                    </form>
                                }
                            </>
                        }
                    </Dialog.Panel>
                    </Transition.Child>
                </div>
                </div>
            </Dialog>
            </Transition.Root> */}

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
                            <span>Delete Post</span>
                            </Dialog.Title>
                            <div className="mt-2">
                            
                                <p className="text-sm text-gray-500">
                                    Are you sure you wish to delete this post?
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
    detalles: state.productos.detalles,
})

export default connect(mapStateToProps,{
    load_producto,
    get_compra,
}) (ComprasView);
