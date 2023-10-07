import axios from "axios";
import Layout from "hocs/layout";
import { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux"
import { useNavigate, useParams } from "react-router-dom";
import { load_producto } from "redux/actions/productos/productos";
import { Dialog, Transition } from '@headlessui/react'
import { get_compra } from "redux/actions/compras/compras";
import Select from "react-select";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from "@mui/x-data-grid";
import {
    randomId,
} from "@mui/x-data-grid-generator";
import { get_lista_productos_proveedor } from "redux/actions/productos/productos";
import { refresh } from "redux/actions/auth/auth";
import {
    CheckIcon
} from '@heroicons/react/24/outline'

function ComprasView({
    refresh,
    load_producto,
    get_compra,
    compra,
    productos,
    proveedores,
    detalles,
    get_lista_productos_proveedor
}) {
    
    useEffect(() => {
        window.scrollTo(0,0)
        get_compra(idCompra)
    }, []);

    var iva=0.0, total=0.0
    const [subtotal,setSubtotal] = useState(compra?parseFloat(compra.subtotal):0.0)
    const [open, setOpen] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [loading, setLoading] = useState(false)
    const params = useParams()
    const idCompra = params.id
    const navigate = useNavigate()
    const [idProveedor, setIdProveedor] = useState(compra?compra.proveedor.id:0)
    
    const initialRows = [
    ];
    const datos = []
    const optionsProductos = [];
    const [rows, setRows] = useState(detalles?datos:initialRows);
    const [rowModesModel, setRowModesModel] = useState({});
    useEffect(()=>{
        if(idProveedor!==0){
            get_lista_productos_proveedor(parseInt(idProveedor))
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[idProveedor])
    
    useEffect(()=>{
        setRows(datos)
        calculoIva()
        calculoTotal()
        compra && setIdProveedor(compra.proveedor.id)
    },[detalles])
    
    const CargarDatos = () => {
        detalles&&detalles.map((detalle)=>{
            datos.push({id:detalle.producto.id,nombre:detalle.producto.nombre,marca:detalle.producto.marca,cantidad:detalle.cantidad,precio:detalle.subtotal/detalle.cantidad});
        })
    }
    detalles && CargarDatos()
    

    function EditToolbar(props) {
        const { setRows, setRowModesModel } = props;
    
        const handleClick = () => {
            const id = randomId();
            setRows((oldRows) => [...oldRows, { id, isNew: true }]);
            setRowModesModel((oldModel) => ({
                ...oldModel,
                [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
            }));
        };
    
        return (
            <GridToolbarContainer>
                <Button
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleClick}
                >
                    Añadir producto
                </Button>
            </GridToolbarContainer>
        );
    }

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

    
    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.Edit },
        });
    };

    const handleSaveClick = (id) => () => {
        
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View },
        });
        calculoIva()
        calculoTotal()
    };

    const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        calculoIva()
        calculoTotal()
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    function getFullName(params) {
        params.row.subtotal = params.row.cantidad * params.row.precio
        return params.row.subtotal.toFixed(2);
    }

    const columns = [
        { field: "nombre", headerName: "Nombre", width: 250, editable: true },
        { field: "marca", headerName: "Marca", width: 250, editable: true },
        {
            field: "cantidad",
            headerName: "Cantidad",
            type: "number",
            width: 150,
            align: "left",
            headerAlign: "left",
            editable: true,
        },
        {
            field: "precio",
            headerName: "Precio",
            type: "number",
            width: 125,
            editable: true,
        },
        {
            field: "subtotal",
            headerName: "Subtotal",
            type: "number",
            width: 150,
            valueGetter: getFullName,
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Acciones",
            width: 100,
            cellClassName: "actions",
            getActions: ({ id }) => {
                const isInEditMode =
                    rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: "primary.main",
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    async function cargarProductos(){
        productos?
        await productos.map(async (producto, index) =>{
            return await optionsProductos.push({ value: producto.id, label: producto.nombre })
        })
        : optionsProductos.push({value: 'cargando'})
    }
    cargarProductos()

    const onChangeProducto = (e) => {
        productos.map((producto, index) => {
            if (e.value === producto.id) {
                const id= producto.id
                setRows((oldRows) => [...oldRows, {
                    id,
                    nombre: producto.nombre,
                    marca: producto.marca,
                    isNew: true }]);
                setRowModesModel((oldModel) => ({
                    ...oldModel,
                    [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
                }));
            }
        });

    }

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
        formData.append('proveedor',idProveedor)
        formData.append('productos',JSON.stringify(rows))
        formData.append('subtotal',subtotal)
        formData.append('iva',iva)
        formData.append('total',total)

        const sendData = async() =>{
            try {
                const res = await axios.put(`${process.env.REACT_APP_API_URL}/compras/edit/${idCompra}`, formData, config)
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
                const res = await axios.delete(`${process.env.REACT_APP_API_URL}/compras/eliminar/${idCompra}`,
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

    useEffect(()=>{
        let aux = 0.0
        rows.length >= 1 ? rows.map((fila)=>(
            aux += parseFloat(fila.subtotal)))
        :aux = 0.0
        setSubtotal(aux.toFixed(2))
    },[rows])

    function calculoIva() {
        iva= subtotal !== 0 ?
        subtotal*0.12
        :0.00
        return <>{iva.toFixed(2)}</>
    }

    function calculoTotal() {
        total = subtotal !== 0 ?
        parseFloat(subtotal)+iva
        :0.00
        return <>{total.toFixed(2)}</>
    }

    return (
        <Layout>
            <>
            <div className=" px-4 py-5 sm:px-6 border-b border-gray-300">
                <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                    <div className="ml-4 mt-4">
                        <h3 className="text-3xl font-medium leading-6 text-gray-900">Compra # {compra && compra.id}</h3>
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
            <section className="bg-white w-full">
                <div className="py-4 px-4 mx-auto max-w-6xl lg:py-10 ">
                    <h2 className="mb-4 text-xl font-bold text-gray-900 ">
                        Proveedor
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
                                    type="text"
                                    value={compra?compra.proveedor.nombre:''}
                                    name="proveedor"
                                    id="proveedor"
                                    disabled
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 "
                                    placeholder="Escriba el proveedor"
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
                                    type="text"
                                    value={compra?compra.proveedor.ruc:''}
                                    name="ruc"
                                    id="ruc"
                                    disabled
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
                                    type="text"
                                    value={compra?compra.proveedor.telefono:''}
                                    name="telefono"
                                    id="telefono"
                                    disabled
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
                                    type="text"
                                    value={compra?compra.proveedor.direccion:''}
                                    name="direccion"
                                    id="direccion"
                                    disabled
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
                                    type="text"
                                    value={compra?compra.proveedor.email:''}
                                    name="email"
                                    id="email"
                                    disabled
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 "
                                    placeholder="Ingrese el email del proveedor"
                                    required=""
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </section>

            <section className="border-t border-gray-300">
                <div className="max-w-6xl mx-auto">
                    <h2 className="py-3 font-bold text-xl">Detalle Compra</h2>
                    <Select
                        options={optionsProductos}
                        onChange={(e) => onChangeProducto(e)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5"
                    />
                    <Box
                        sx={{
                            height: 500,
                            width: "100%",
                            "& .actions": {
                                color: "text.secondary",
                            },
                            "& .textPrimary": {
                                color: "text.primary",
                            },
                        }}
                    >
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            editMode="row"
                            rowModesModel={rowModesModel}
                            onRowModesModelChange={handleRowModesModelChange}
                            onRowEditStop={handleRowEditStop}
                            processRowUpdate={processRowUpdate}
                            slots={{
                                toolbar: EditToolbar,
                            }}
                            slotProps={{
                                toolbar: { setRows, setRowModesModel },
                            }}
                        />
                    </Box>
                    <div className="flex flex-col max-w-full text-end items-end justify-end justify-items-end justify-self-end">
                        <div className="flex px-3 py-2 border-b border-gray-300 max-w-md justify-end">
                            <label className="max-w-sm px-2 font-semibold">SubTotal: </label>
                            <p className="max-w-30 px-2">{
                                <>{compra&&subtotal}</>
                            }</p>
                        </div>
                        <div className="flex px-3 py-2 border-b border-gray-300 max-w-md justify-end ">
                            <label className="max-w-sm px-2 font-semibold">Iva: </label>
                            <p className="max-w-30 px-2">{
                                <>{detalles&&calculoIva()}</>
                            }</p>
                        </div>
                        <div className="flex px-3 py-2 border-b border-gray-300 max-w-md justify-end ">
                            <label className="max-w-sm px-2 font-semibold">Total: </label>
                            <p className="max-w-30 px-2">{
                                <>{detalles&&calculoTotal()}</>
                            }</p>
                        </div>
                        <button 
                            className="h-9 px-4 rounded-lg bg-amber-500 mx-4 my-3 font-bold text-white hover:bg-black "
                            onClick={e=>onSubmit(e)}
                        >
                            Guardar
                        </button>
                    </div>
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
    compra: state.compras.compra,
    productos: state.productos.lista_productos_proveedor,
    proveedores: state.productos.proveedores,
    detalles: state.compras.detalles,
})

export default connect(mapStateToProps,{
    refresh,
    load_producto,
    get_compra,
    get_lista_productos_proveedor,
}) (ComprasView);
