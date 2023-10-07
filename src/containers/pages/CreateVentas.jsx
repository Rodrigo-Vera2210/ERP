import Layout from "hocs/layout";
import { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import React from "react";
import Select from "react-select";
import Box from "@mui/material/Box";
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
import axios from "axios";
import { get_lista_productos } from "redux/actions/productos/productos";
import { get_lista_clientes, get_lista_clientes_page } from "redux/actions/clientes/clientes";
import { get_lista_servicios } from "redux/actions/servicios/servicios";
import {
    CheckIcon
} from '@heroicons/react/24/outline'
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from '@headlessui/react'

const initialRows = [
];

function CreateVenta({ 
    get_lista_clientes, 
    clientes, 
    get_lista_productos, 
    get_lista_servicios, 
    productos, 
    servicios 
}) {

    useEffect(() => {
        get_lista_clientes();
        get_lista_productos();
        get_lista_servicios();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    var subtotal, iva, total
    const optionsClientes = [];
    const optionsProductos = [];
    const optionsServicios = [];
    const [rowsProductos, setRowsProductos] = useState(initialRows);
    const [rowsServicios, setRowsServicios] = useState(initialRows);
    const [rowModesModelProductos, setRowModesModelProductos] = useState({});
    const [rowModesModelServicios, setRowModesModelServicios] = useState({});
    const [open, setOpen] = useState(false);
    const [idCliente, setIdCliente] = useState(0)
    const navigate = useNavigate()

    {/* Manejadores tabla Productos*/}
    function EditToolbarProductos() {
    
        return (
            <GridToolbarContainer>
                <h3 className="text-xl p-2">Añadir Productos</h3>
                <Select
                    options={optionsProductos}
                    onChange={(e) => onChangeProducto(e)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5"
                />
            </GridToolbarContainer>
        );
    }

    const handleRowEditStopProductos = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClickProductos = (id) => () => {
        setRowModesModelProductos({
            ...rowModesModelProductos,
            [id]: { mode: GridRowModes.Edit },
        });
    };

    const handleSaveClickProductos = (id) => () => {
        
        setRowModesModelProductos({
            ...rowModesModelProductos,
            [id]: { mode: GridRowModes.View },
        });
    };

    const handleDeleteClickProductos = (id) => () => {
        setRowsProductos(rowsProductos.filter((row) => row.id !== id));
    };

    const handleCancelClickProductos = (id) => () => {
        setRowModesModelProductos({
            ...rowModesModelProductos,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rowsProductos.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRowsProductos(rowsProductos.filter((row) => row.id !== id));
        }
    };

    const processRowUpdateProductos = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRowsProductos(rowsProductos.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChangeProductos = (newRowModesModel) => {
        setRowModesModelProductos(newRowModesModel);
    };

    function getFullNameProductos(params) {
        params.row.subtotal = params.row.cantidad * params.row.precio
        return params.row.subtotal.toFixed(2);
    }

    const columnsProductos = [
        { field: "nombre", headerName: "Nombre", width: 250 },
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
        },
        {
            field: "subtotal",
            headerName: "Subtotal",
            type: "number",
            width: 150,
            valueGetter: getFullNameProductos,
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Acciones",
            width: 100,
            cellClassName: "actions",
            getActions: ({ id }) => {
                const isInEditMode =
                    rowModesModelProductos[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: "primary.main",
                            }}
                            onClick={handleSaveClickProductos(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClickProductos(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClickProductos(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClickProductos(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    {/*Manejadores tabla Servicios */}

    
    function EditToolbarServicios() {
        return (
            <GridToolbarContainer>
                <h3 className="text-xl p-2">Añadir Servicios</h3>
                <Select
                    options={optionsServicios}
                    onChange={(e) => onChangeServicio(e)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5"
                />
            </GridToolbarContainer>
        );
    }

    const handleRowEditStopServicios = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClickServicios = (id) => () => {
        setRowModesModelServicios({
            ...rowModesModelServicios,
            [id]: { mode: GridRowModes.Edit },
        });
    };

    const handleSaveClickServicios = (id) => () => {
        
        setRowModesModelServicios({
            ...rowModesModelServicios,
            [id]: { mode: GridRowModes.View },
        });
    };

    const handleDeleteClickServicios = (id) => () => {
        setRowsServicios(rowsServicios.filter((row) => row.id !== id));
    };

    const handleCancelClickServicios = (id) => () => {
        setRowModesModelServicios({
            ...rowModesModelServicios,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rowsServicios.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRowsServicios(rowsServicios.filter((row) => row.id !== id));
        }
    };

    const processRowUpdateServicios = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRowsServicios(rowsServicios.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChangeServicios = (newRowModesModel) => {
        setRowModesModelServicios(newRowModesModel);
    };

    function getFullNameServicios(params) {
        params.row.subtotal = params.row.cantidad * params.row.precio
        return params.row.subtotal.toFixed(2);
    }
    
    const columnsServicios = [
        { field: "nombre", headerName: "Nombre", width: 250 },
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
        },
        {
            field: "subtotal",
            headerName: "Subtotal",
            type: "number",
            width: 150,
            valueGetter: getFullNameServicios,
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Acciones",
            width: 100,
            cellClassName: "actions",
            getActions: ({ id }) => {
                const isInEditMode =
                    rowModesModelServicios[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: "primary.main",
                            }}
                            onClick={handleSaveClickServicios(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClickServicios(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClickServicios(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClickServicios(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];
    
    {/*OnChange */}

    const onChangeCliente = (e) => {
        clientes.map((cliente, index) => {
            if (e.value === cliente.id) {
                document.getElementById("cedula").value = cliente.c_id;
                document.getElementById("telefono").value = cliente.telefono;
                document.getElementById("email").value = cliente.email;
                document.getElementById("direccion").value = cliente.direccion;
                setIdCliente(cliente.id)
            }
        });
    };

    const onChangeProducto = (e) => {
        productos.map((producto, index) => {
            if (e.value === producto.id) {
                const id= producto.id
                setRowsProductos((oldRows) => [...oldRows, {
                    id,
                    nombre: producto.nombre,
                    cantidad: 1,
                    precio: producto.precio_venta,
                    isNew: true }]);
                setRowModesModelProductos((oldModel) => ({
                    ...oldModel,
                    [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
                }));
            }
        });

    }

    const onChangeServicio = (e) => {
        servicios.map((servicio, index) => {
            if (e.value === servicio.id) {
                const id= servicio.id
                setRowsServicios((oldRows) => [...oldRows, {
                    id,
                    nombre: servicio.nombre,
                    cantidad: 1,
                    precio: servicio.precio,
                    isNew: true }]);
                setRowModesModelServicios((oldModel) => ({
                    ...oldModel,
                    [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
                }));
            }
        });

    }

    {/*Carga de datos en los selects */}

    async function cargarclientes(){
        clientes?
        await clientes.map(async (clientes, index) =>{
            return await optionsClientes.push({ value: clientes.id, label: clientes.nombres })
        })
        : optionsClientes.push({value: 'cargando'})
    }
    cargarclientes()

    async function cargarProductos(){
        productos?
        await productos.map(async (producto, index) =>{
            return await optionsProductos.push({ value: producto.id, label: producto.nombre })
        })
        : optionsProductos.push({value: 'cargando'})
    }
    cargarProductos()
    
    async function cargarServicios(){
        servicios?
        await servicios.map(async (servicio, index) =>{
            return await optionsServicios.push({ value: servicio.id, label: servicio.nombre })
        })
        : optionsServicios.push({value: 'cargando'})
    }
    cargarServicios()

    {/* Calculo de valores */}
    
    function calculoSubTotal() {
        subtotal=0.0 
        rowsProductos.length >= 1 ? rowsProductos.map((fila)=>(
            subtotal += fila.subtotal))
        :subtotal += 0.0
        rowsServicios.length >= 1 ? rowsServicios.map((fila)=>(
            subtotal += fila.subtotal))
        :subtotal += 0.0
        return <>{subtotal.toFixed(2)}</>
    }

    function calculoIva() {
        iva= subtotal !== 0 ?
        subtotal*0.12
        :0.00

        return <>{iva.toFixed(2)}</>
    }

    function calculoTotal() {
        total = subtotal !== 0 ?
        subtotal+iva
        :0.00
        return <>{total.toFixed(2)}</>
    }

    const onSubmit = e => {
        e.preventDefault()

        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
            }
        };
        const formData = new FormData()
        formData.append('cliente',idCliente)
        formData.append('productos',JSON.stringify(rowsProductos))
        formData.append('servicios',JSON.stringify(rowsServicios))
        formData.append('subtotal',subtotal)
        formData.append('iva',iva)
        formData.append('total',total)
        
        const enviarDatos = async() => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/ventas/crear/`, formData, config)
            } catch (error) {
                alert('Error al enviar')
            }
        }
        enviarDatos()
        setOpen(true)
    };

    return (
        <Layout>
            <section className="bg-white w-full">
                <h1 className="py-4 text-4xl font-bold border-b border-gray-300">
                    Crear Venta
                </h1>
                <div className="py-4 px-4 mx-auto max-w-6xl lg:py-10 ">
                    <h2 className="mb-4 text-2xl font-bold text-gray-900 ">
                        Cliente
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
                                <Select
                                    options={optionsClientes}
                                    onChange={(e) => onChangeCliente(e)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5"
                                />
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="cedula"
                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    cedula
                                </label>
                                <input
                                    type="text"
                                    name="cedula"
                                    id="cedula"
                                    disabled
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 "
                                    placeholder="Escriba el cedula"
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
                    <h2 className="py-3 font-bold text-2xl">Detalle de Venta</h2>
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
                            rows={rowsProductos}
                            columns={columnsProductos}
                            editMode="row"
                            rowModesModel={rowModesModelProductos}
                            onRowModesModelChange={handleRowModesModelChangeProductos}
                            onRowEditStop={handleRowEditStopProductos}
                            processRowUpdate={processRowUpdateProductos}
                            slots={{
                                toolbar: EditToolbarProductos,
                            }}
                            slotProps={{
                                toolbar: { setRowsProductos, setRowModesModelProductos },
                            }}
                        />
                    </Box>

                    <Box
                        className="py-10"
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
                            rows={rowsServicios}
                            columns={columnsServicios}
                            editMode="row"
                            rowModesModel={rowModesModelServicios}
                            onRowModesModelChange={handleRowModesModelChangeServicios}
                            onRowEditStop={handleRowEditStopServicios}
                            processRowUpdate={processRowUpdateServicios}
                            slots={{
                                toolbar: EditToolbarServicios,
                            }}
                            slotProps={{
                                toolbar: { setRowsServicios, setRowModesModelServicios },
                            }}
                        />
                    </Box>
                    
                    <div className="flex flex-col max-w-full text-end items-end justify-end justify-items-end justify-self-end">
                        <div className="flex px-3 py-2 border-b border-gray-300 max-w-md justify-end">
                            <label className="max-w-sm px-2 font-semibold">SubTotal: </label>
                            <p className="max-w-30 px-2">{
                                <>{calculoSubTotal()}</>
                            }</p>
                        </div>
                        <div className="flex px-3 py-2 border-b border-gray-300 max-w-md justify-end ">
                            <label className="max-w-sm px-2 font-semibold">Iva: </label>
                            <p className="max-w-30 px-2">{
                                <>{calculoIva()}</>
                            }</p>
                        </div>
                        <div className="flex px-3 py-2 border-b border-gray-300 max-w-md justify-end ">
                            <label className="max-w-sm px-2 font-semibold">Total: </label>
                            <p className="max-w-30 px-2">{
                                <>{calculoTotal()}</>
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
                                                    La venta ha sido creado con exito!
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
        </Layout>
    );
}
const mapStateToProps = (state) => ({
    clientes: state.clientes.lista_clientes,
    productos: state.productos.lista_productos,
    servicios: state.servicios.lista_servicios
});

export default connect(mapStateToProps, {
    get_lista_clientes,
    get_lista_productos,
    get_lista_servicios,
})(CreateVenta);
