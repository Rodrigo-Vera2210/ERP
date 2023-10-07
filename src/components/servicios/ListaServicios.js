import { Link } from "react-router-dom";
import SmallSetPagination from "../pagination/SmallSetPagination";
import { Dialog, Transition } from '@headlessui/react'
import { useEffect, useState, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ViewServicioModal from "./ViewServicioModal";
import categorias from "redux/reducers/categorias";

function ListaServicios({ servicios, get_lista_servicios_page, count, categorias }) {
    const [open, setOpen] = useState(false)
    const [idServicio, setIdServicio] = useState(0)
    const [openDelete, setOpenDelete] = useState(false)

    function ModalDelete(idServ) {
        const navigate = useNavigate()
        const onSubmitDelete = (e) =>{
            e.preventDefault()
            
            const config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            };
    
            const formData = new FormData()
    
            const fetchData = async()=>{
                try{
                    const res = await axios.delete(`${process.env.REACT_APP_API_URL}/servicios/delete/${idServ.idServicio}`,
                    formData,
                    config)
    
                    if(res.status === 200){
                        navigate(0)
                    }else{
                    }
                }catch(err){
                    alert('Error al enviar')
                }
            }
            fetchData()
        }
    
        return(
            <>
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
                                <span>Eliminar Servicio</span>
                                </Dialog.Title>
                                <div className="mt-2">
                                
                                    <p className="text-sm text-gray-500">
                                        Esta seguro de eliminar el Servicio?
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
        )
    }

    return (
        <>
        <div className="overflow-hidden px-8 bg-white">
            <ul
                role="list"
                className="space-y-8 gap-8 mb-10"
            >
                {servicios &&
                    servicios.map((servicio, index) => (
                        <div key={index} className="border p-4 border-gray-300">
                            <div className="flex justify-between items-center">
                                <h2 className="mb-2 text-xl font-extrabold leading-snug tracking-tight text-gray-800 md:text-3xl">
                                    <a
                                        href={`servicios/${servicio.id}`}
                                        className="text-gray-900 hover:text-amber-500"
                                    >
                                        {servicio.nombre}
                                    </a>
                                </h2>
                            </div>
                            <div className="">
                                <div className="flex border-t border-gray-300 py-1">
                                    <div className="font-bold text-gray-700 w-20">
                                        Categoria: 
                                    </div>
                                    <div className="text-gray-500">
                                        {servicio.categoria.nombre}
                                    </div>
                                </div>
                                <div className="flex border-t border-gray-300 py-1">
                                    <div className="font-bold text-gray-700 w-20">
                                        Precio: 
                                    </div>
                                    <div className="text-gray-500">
                                        $ {servicio.precio}
                                    </div>
                                </div>
                            </div>
                            <div className="text-end">
                                <ViewServicioModal 
                                    id={servicio && servicio.id} 
                                    servicio = {servicio && servicio} 
                                    categorias = {categorias && categorias}
                                />
                                <button
                                    onClick={(e)=>{
                                        setOpenDelete(true);
                                        setIdServicio(servicio.id);
                                    }}
                                    className="bg-red-600 px-4 h-9 rounded-lg font-bold hover:bg-black hover:text-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
            </ul>
            <SmallSetPagination
                list_page={get_lista_servicios_page}
                list={servicios}
                count={count}
            />
        </div>
        <ModalDelete 
            idServicio={idServicio && idServicio} 
        />
        </>
    );
}
export default ListaServicios;

