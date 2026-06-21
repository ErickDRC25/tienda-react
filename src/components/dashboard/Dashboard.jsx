
import { useState, useEffect, use } from "react";
import Navegacion from "../../navAdmin";
import { useNavigate } from 'react-router-dom'



function Dashboard() {

    const token = localStorage.getItem("token")
    const headers = {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
    }

    const url = import.meta.env.VITE_API_URL

    const navigate = useNavigate()
    const [ventasTotal, setVentasTotal] = useState(0)
    const [totalOrdenes, setTotalOrdenes] = useState(0)
    const [totalUsuarios, setTotalUsuarios] = useState(0)
    const [productoMasVendido, setProductoMasVendido] = useState({})
    const [topClientes, setTopClientes] = useState([])
    const [ventasEstado, setVentasEstado] = useState([])
    const [estado, setEstado] = useState("pendiente")
    const [ventasFecha, setVentasFecha] = useState([])
    const [fecha, setFecha] = useState("2026-05-22")

    useEffect(() => {
        getventasTotal()
        getTotalOrdenes()
        getTotalUsuarios()
        getProductoMasVendido()
        getTopClientes()
    }, [])

    useEffect(() => {
        getVentasEstado(estado)
    }, [estado])

    useEffect(() => {
        getVentasFecha(fecha)
    }, [fecha])

    async function getventasTotal() {
        const response = await fetch(`${url}/dashboard/ventas-total`, {
            headers: headers
        })



        if (response.ok) {
            const data = await response.json()
            setVentasTotal(data.Ventas_Totales)

        }

    }

    async function getTotalOrdenes() {
        const response = await fetch(`${url}/dashboard/total-ordenes`, {
            headers
        })



        if (response.ok) {
            const data = await response.json()
            setTotalOrdenes(data.Total_Ordenes)
        }


    }

    async function getTotalUsuarios() {
        const response = await fetch(`${url}/dashboard/total-usuario`, {
            headers
        })



        if (response.ok) {
            const data = await response.json()
            setTotalUsuarios(data.Total_Usuarios)
        }

    }

    async function getProductoMasVendido() {
        const response = await fetch(`${url}/dashboard/producto-mas-vendido`, {
            headers
        })


        if (response.ok) {
            const data = await response.json()
            setProductoMasVendido({
                "producto_id": data.producto_id,
                "producto": data.producto,
                "cantidad": data.cantidad
            })
        }


    }

    async function getTopClientes() {
        const response = await fetch(`${url}/dashboard/top-clientes`, {
            headers
        })



        if (response.ok) {
            const data = await response.json()
            setTopClientes(data.Contenido)
        }


    }

    async function getVentasEstado(estado) {
        const response = await fetch(`${url}/dashboard/ventas-estados/${estado}`, {
            headers
        })



        if (response.ok) {
            const data = await response.json()
            setVentasEstado(data.Contenido)

        }




    }

    async function getVentasFecha(fecha) {
        const response = await fetch(`${url}/dashboard/ventas-fecha/${fecha}`, {
            headers
        })

        if (response.ok) {
            const data = await response.json()
            setVentasFecha(data)
        }


    }

    function cerrarSesion() {
        localStorage.removeItem("token")
        navigate("/")
    }



    return (
        <>

            <div className="relative">
                <h1 className="text-center font-bold p-4 text-4xl">DASHBOARD DE ADMINISTRACION</h1>
                <button className="absolute top-3 right-5 rounded-4xl bg-red-400 p-3"
                    onClick={() => {
                        cerrarSesion()
                        navigate("/login")
                    }}
                >Cerrar Sesion</button>
            </div>

            <div className="grid grid-cols-3 gap-4 m-10">
                <div className="border rounded-4xl p-4 text-center">
                    <h3 className="font-bold text-xl">Ventas Totales:</h3>
                    <span className="text-xl">{ventasTotal}</span>
                </div>
                <div className="border rounded-4xl p-4 text-center">
                    <h3 className="text-xl font-bold">Total Órdenes:</h3>
                    <span className="text-xl">{totalOrdenes}</span>
                </div>

                <div className="border rounded-4xl p-4 text-center">
                    <h3 className="font-bold text-xl">Total Usuarios:</h3>
                    <span className="text-xl">{totalUsuarios}</span>
                </div>

                <div className="border rounded-4xl p-4 text-center">
                    <h3 className="text-2xl font-bold ">Producto Más Vendido:</h3>
                    <div className="flex flex-col mt-7 gap-6">
                        <p className="">IdProducto: {productoMasVendido?.producto_id}</p>
                        <p>Producto: {productoMasVendido?.producto}</p>
                        <p>Cantidad: {productoMasVendido?.cantidad}</p>
                    </div>
                </div>

                <div className="border rounded-4xl p-4 text-center">
                    <h3 className="text-2xl font-bold ">TOP 3 CLIENTES</h3>

                    <div className="flex gap-7 justify-around">
                        {topClientes.map((tc) => (

                            <div key={tc.codigo_cliente}>
                                <p>TOP: {tc.top}</p>
                                <p>CODIGO CLIENTE: {tc.codigo_cliente}</p>
                                <p>CLIENTE: {tc.cliente}</p>
                                <p>TOTAL COMPRAS: {tc.total_compras}</p>
                                <br />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border rounded-4xl p-4 row-span-2 text-center">
                    <h3 className="font-bold text-2xl mb-3">Ventas por Estados</h3>
                    <div className="mb-5">
                        <select
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)}
                        >
                            <option value="pendiente"> Pendiente</option>
                            <option value="pagado"> Pagado</option>
                            <option value="enviado"> Enviado</option>
                            <option value="entregado"> Entregado</option>
                            <option value="cancelado"> Cancelado</option>
                        </select>
                    </div>
                    <div className="flex gap-5">
                        {ventasEstado.map((ve) => (
                            <div className=" p-4" key={ve.Codigo_orden}>
                                <p>Codigo de orden : {ve.Codigo_orden} </p>
                                <p>Usuario : {ve.Usuario} </p>
                                <p>Total :  {ve.Total}</p>
                                <p>Fecha : {ve.Fecha}</p>
                                <p>Estado : {ve.Estado}</p>
                            </div>
                        ))}
                    </div>

                </div>

                <div className="border rounded-4xl p-4 col-span-2 text-center ">
                    <h3 className="text-center font-bold text-2xl">Ventas por fecha</h3>
                    <div className=" flex p-5">
                        <label className="text-center mr-7" htmlFor="">Fecha</label>
                        <input className="border rounded-md " value={fecha} onChange={(e) => setFecha(e.target.value)} type="date" />
                    </div>
                    <div className="flex m-4 p-4 justify-around">



                        {ventasFecha.map((vf) => (
                            <div key={vf.id}>
                                <p>Codigo de orden : {vf.id}</p>
                                <p>Usuario : {vf.nombre}</p>
                                <p>Total : {vf.total}</p>
                                <p>Fecha : {vf.fecha}</p>
                                <p>Estado : {vf.estado}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>



        </>
    )

}


export default Dashboard