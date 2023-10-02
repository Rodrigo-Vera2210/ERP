import Layout from "hocs/layout";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { get_lista_proveedores } from "redux/actions/proveedores/proveedores";
import React from "react";
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
import axios from "axios";
import { get_lista_productos_proveedor } from "redux/actions/productos/productos";

const initialRows = [
];

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


function CreateVentas({ 
    get_lista_proveedores, proveedores, get_lista_productos_proveedor,productos 
}) {
    
    useEffect(() => {
        get_lista_proveedores();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    var subtotal, iva, total
    const optionsProveedor = [];
    const optionsProductos = [];
    const [rows, setRows] = useState(initialRows);
    const [rowModesModel, setRowModesModel] = useState({});
    const [idProveedor, setIdProveedor] = useState(0)

    
    useEffect(()=>{
        if(idProveedor!==0){get_lista_productos_proveedor(parseInt(idProveedor))
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[idProveedor])

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
        console.log(newRow);
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
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
    

    const onChangeProveedor = (e) => {
        proveedores.map((proveedor, index) => {
            if (e.value === proveedor.id) {
                document.getElementById("ruc").value = proveedor.ruc;
                document.getElementById("telefono").value = proveedor.telefono;
                document.getElementById("email").value = proveedor.email;
                document.getElementById("direccion").value = proveedor.direccion;
                setIdProveedor(proveedor.id)
            }
        });
    };

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
    async function cargarProveedores(){
        proveedores?
        await proveedores.map(async (proveedor, index) =>{
            return await optionsProveedor.push({ value: proveedor.id, label: proveedor.nombre })
        })
        : optionsProveedor.push({value: 'cargando'})
    }
    cargarProveedores()

    async function cargarProductos(){
        productos?
        await productos.map(async (producto, index) =>{
            return await optionsProductos.push({ value: producto.id, label: producto.nombre })
        })
        : optionsProductos.push({value: 'cargando'})
    }
    cargarProductos()

    function calculoSubTotal() {
        subtotal=0.0 
        rows.length >= 1 ? rows.map((fila)=>(
            subtotal += fila.subtotal))
        :subtotal = 0.0
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
        formData.append('proveedor',idProveedor)
        formData.append('productos',JSON.stringify(rows))
        formData.append('subtotal',subtotal)
        formData.append('iva',iva)
        formData.append('total',total)
        
        const enviarDatos = async() => {
            try {
                const res = await axios.put(`${process.env.REACT_APP_API_URL}/compras/crear/`, formData, config)
            } catch (error) {
                alert('Error al enviar')
            }
        }
        enviarDatos()
    };

    return (
        <Layout>
            <section className="bg-white w-full">
                <h1 className="py-4 text-4xl font-bold border-b border-gray-300">
                    Crear Compra
                </h1>
                <div className="py-4 px-4 mx-auto max-w-6xl lg:py-10 ">
                    <h2 className="mb-4 text-xl font-bold text-gray-900 ">
                        Proveedor
                    </h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="sm:col-span-2">
                                <label
                                    for="nombre"
                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    Nombre
                                </label>
                                <Select
                                    options={optionsProveedor}
                                    onChange={(e) => onChangeProveedor(e)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5"
                                />
                            </div>
                            <div className="w-full">
                                <label
                                    for="ruc"
                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    Ruc
                                </label>
                                <input
                                    type="text"
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
                                    for="telefono"
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
                                    for="direccion"
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
                                    for="email"
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
                    </div>
                </div>
            </section>
            <button onClick={e=>onSubmit(e)}>Imprimir</button>
        </Layout>
    );
}
const mapStateToProps = (state) => ({
    proveedores: state.proveedores.lista_proveedores,
    productos: state.productos.lista_productos_proveedor
});

export default connect(mapStateToProps, {
    get_lista_proveedores,
    get_lista_productos_proveedor
})(CreateVentas);
