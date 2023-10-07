import axios from "axios";
import Layout from "hocs/layout";
import { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux"
import { check_authenticated, load_user, refresh } from "redux/actions/auth/auth";
import { load_empleado } from "redux/actions/empleado/empleado";
import empleado from "redux/reducers/empleado";
import {
    CheckIcon
} from '@heroicons/react/24/outline'
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from '@headlessui/react'


function UserView({
    load_empleado,
    empleado
}) {
    useEffect(() => {
        window.scrollTo(0,0)
        load_empleado();
    }, []);

    const [updateNombres, setUpdateNombres]=useState(false)
    const [updateApellidos, setUpdateApellidos]=useState(false)
    const [updateCedula, setUpdateCedula]=useState(false)
    const [updateRol, setUpdateRol]=useState(false)
    const [updateEmail, setUpdateEmail]=useState(false)
    const [updateFoto, setUpdateFoto]=useState(false)
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData]=useState({
        nombres: '',
        apellidos: '',
        cedula: '',
        email: '',
    })

    const {
        nombres,
        apellidos,
        cedula,
        email,
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
        formData.append('nombres',nombres)
        formData.append('apellidos',apellidos)
        formData.append('cedula',cedula)
        formData.append('email',email)

        const sendData = async() =>{
            try {
                const res = await axios.put(`${process.env.REACT_APP_API_URL}/user/edit/`, formData, config)
            } catch (error) {
                alert('Error al enviar')
            }
        }
        sendData()
        setOpen(true)
    }
    return (
        <Layout>
            <>
            <div className=" px-4 py-5 sm:px-6">
                <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                    <div className="ml-4 mt-4">
                        <h3 className="text-3xl font-medium leading-6 text-gray-900">Perfil</h3>
                    </div>
                    <div className="ml-4 mt-4 flex-shrink-0">
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
                            <dt className="text-lg font-medium text-gray-500">Nombres</dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {
                                    updateNombres ?
                                    <>
                                    <form onSubmit={e=>onSubmit(e)} className="flex w-full">
                
                                        <span className="flex-grow">
                                            <input
                                            value={nombres}
                                            onChange={e=>onChange(e)}
                                            name='nombres'
                                            type='text'
                                            className="border border-gray-400 rounded-lg w-full"
                                            required
                                            />
                                        </span>
                                        <span className="ml-4 flex-shrink-0">
                                            <div
                                            onClick={()=>setUpdateNombres(false)}
                                            className="cursor-pointer inline-flex rounded-md bg-white font-medium text-amber-600 hover:text-amber-500"
                                            >
                                            Cancel
                                            </div>
                                        </span>
                                    </form>
                                    </>
                                    :
                                    <>
                                        <span className="flex-grow text-lg">{empleado.nombres}</span>
                                        <span className="ml-4 flex-shrink-0">
                                            <div
                                            onClick={()=>setUpdateNombres(true)}
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
                            <dt className="text-lg font-medium text-gray-500">Apellidos</dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {
                                    updateApellidos ?
                                    <>
                                    <form onSubmit={e=>onSubmit(e)} className="flex w-full">
                
                                        <span className="flex-grow">
                                            <input
                                            value={apellidos}
                                            onChange={e=>onChange(e)}
                                            name='apellidos'
                                            type='text'
                                            className="border border-gray-400 rounded-lg w-full"
                                            required
                                            />
                                        </span>
                                        <span className="ml-4 flex-shrink-0">
                                            <div
                                            onClick={()=>setUpdateApellidos(false)}
                                            className="cursor-pointer inline-flex rounded-md bg-white font-medium text-amber-600 hover:text-amber-500"
                                            >
                                            Cancel
                                            </div>
                                        </span>
                                    </form>
                                    </>
                                    :
                                    <>
                                        <span className="flex-grow text-lg">{empleado.apellidos}</span>
                                        <span className="ml-4 flex-shrink-0">
                                            <div
                                            onClick={()=>setUpdateApellidos(true)}
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
                            <dt className="text-lg font-medium text-gray-500">Cedula</dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {
                                    updateCedula ?
                                    <>
                                    <form onSubmit={e=>onSubmit(e)} className="flex w-full">
                
                                        <span className="flex-grow">
                                            <input
                                            rows={3}
                                            value={cedula}
                                            onChange={e=>onChange(e)}
                                            name='cedula'
                                            type='text'
                                            className="border border-gray-400 rounded-lg w-full"
                                            required
                                            />
                                        </span>
                                        <span className="ml-4 flex-shrink-0">
                                            <div
                                            onClick={()=>setUpdateCedula(false)}
                                            className="cursor-pointer inline-flex rounded-md bg-white font-medium text-amber-600 hover:text-amber-500"
                                            >
                                            Cancel
                                            </div>
                                        </span>
                                    </form>
                                    </>
                                    :
                                    <>
                                        <span className="flex-grow text-lg">{empleado.cedula}</span>
                                        <span className="ml-4 flex-shrink-0">
                                            <div
                                            onClick={()=>setUpdateCedula(true)}
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
                                    <form onSubmit={e=>onSubmit(e)} className="w-full">
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
                                            {empleado.email}
                                        </span>
                                        <span className="ml-4 flex-shrink-0">
                                            <div
                                            onClick={()=>setUpdateEmail(true)}
                                            className="cursor-pointer inline-flex rounded-md bg-white font-medium text-amber-600 hover:text-amber-500"
                                            >
    Editar</div>
                                        </span>
                                    </>
                                }
                            </dd>
                        </div>
                        
                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                            <dt className="text-lg font-medium text-gray-500">Rol</dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {
                                    <span className="flex-grow text-lg">
                                        {empleado.rol}
                                    </span>
                                }
                            </dd>
                        </div>
                    </dl>
                </div>
                <div className="">
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-lg font-medium text-gray-500">Thumbnail</dt>
                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        {
                            updateFoto ?
                            <>
                            {/* {
                                previewImage&&
                                <img src={previewImage} className='object-cover w-80 h-72 p-4'/>
                            }

                            <form onSubmit={e=>onSubmit(e)} className="flex w-full">
                                <span className="flex-grow">
                                    <input
                                    type='file'
                                    name='thumbnail'
                                    onChange={e=>fileSelectedHandler(e)}
                                    className="w-full py-3 px-2 border border-gray-900 rounded-lg"
                                    required
                                    />
                                </span>
                                <span className="ml-4 flex-shrink-0">
                                    <button
                                    type="submit"
                                    className="rounded-md mr-2 bg-white font-medium text-amber-600 hover:text-amber-500"
                                    >
                                    Save
                                    </button>
                                    <div
                                    onClick={()=>{
                                        setUpdateThumbnail(false)
                                        setThumbnail(null)
                                        setPreviewImage(null)
                                    }}
                                    className="cursor-pointer inline-flex rounded-md bg-white font-medium text-amber-600 hover:text-amber-500"
                                    >
                                    Cancel
                                    </div>
                                </span>
                            </form> */}
                            </>
                            :
                            <>
                                <span className="flex-grow text-lg">
                                    {/* {
                                        post.thumbnail &&
                                    <img src={post.thumbnail} className='object-cover w-full h-72'/>
                                    } */}
                                    </span>
                                <span className="ml-4 flex-shrink-0">
                                    <div
                                    onClick={()=>setUpdateFoto(true)}
                                    className="cursor-pointer inline-flex rounded-md bg-white font-medium text-amber-600 hover:text-amber-500"
                                    >
                                    Editar
                                    </div>
                                </span>
                            </>
                        }
                    </dd>
                </div>
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

            {/* <Transition.Root show={openDelete} as={Fragment}>
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
            </Transition.Root> */}
            </>
        </Layout>
    );
}
const mapStateToProps=state=>({
    empleado: state.empleado
})

export default connect(mapStateToProps,{
    load_empleado,
}) (UserView);
