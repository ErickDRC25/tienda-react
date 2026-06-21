import { useState, useEffect } from "react";


function Ordenes({ onCerrar }) {

    const token = localStorage.getItem("token")
    const headers = {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
    }
    const url = import.meta.env.VITE_API_URL
    const [ordenes, setOrdenes] = useState([])
    const [detalleOrden, setDetalleOrden] = useState([])
    const [modalDetalle, setModalDetalle] = useState(false)
    const [ordenid, setOrdenId] = useState(0)
    
    useEffect(() => {
        getOrdenes()
    }, [])

    useEffect(() => {
        if (ordenid !== 0) {
            getdetalleOrden(ordenid)
        }
    }, [ordenid])

    async function getOrdenes() {
        const response = await fetch(`${url}/mis-ordenes`, {
            headers
        })

        const data = await response.json()
        setOrdenes(data.Contenido)

    }

    async function getdetalleOrden(idOrden) {
        const response = await fetch(`${url}/mi-orden/${idOrden}`, {
            headers
        })

        const data = await response.json()
        setDetalleOrden(data.Contenido)
    }

    return (
        <>
            <div className="relative bg-white p-6 rounded-xl shadow-xl w-96">
                <button
                    onClick={onCerrar}
                    className="absolute top-3 right-3 hover:bg-black hover:text-amber-50 p-3 transition-colors ">X</button>
                <h2 className="text-center font-bold text-3xl m-4">Mis Ordenes</h2>
                <div className="flex flex-col p-3 gap-2">
                    {
                        ordenes.map(o => (
                            <div className="relative flex flex-col p-2 border rounded-4xl " key={o.Codigo_orden}>
                                <span>Codigo de orden: {o.Codigo_orden}</span>
                                <span>Total: S/{(o.Total).toFixed(2)}</span>
                                <span>Fecha de Compra: {o.Fecha}</span>
                                <button
                                    onClick={() => {
                                        setModalDetalle(true)
                                        setOrdenId(o.Codigo_orden)
                                    }}
                                    className="absolute right-3 hover:bg-gray-400 p-1">Detalles</button>
                            </div>
                        ))
                    }
                </div>
            </div>

            {
                modalDetalle && (
                    <div className='fixed inset-0 bg-black/50 flex justify-center items-center'>
                        <div className="relative bg-white p-6 rounded-xl shadow-xl w-96">
                            <button
                                onClick={()=>setModalDetalle(false)}
                                className="absolute top-3 right-3 hover:bg-black hover:text-amber-50 transition-colors"
                            >X
                            </button>
                            <h2 className="text-center font-bold text-2xl">Detalle de la Orden {ordenid} </h2>
                            {
                                detalleOrden.map((d, index) => (
                                    <div className="m-4 border rounded-2xl p-3 flex flex-col " key={index}>
                                        <span>{index + 1}- Producto: {d.Producto}</span>
                                        <span>Cantidad: {d.Cantidad}</span>
                                        <span>Precio unitario: {d.Precio_unitario}</span>
                                        <span>Subtotal: {d.Subtotal}</span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )
            }


        </>
    )

}

export default Ordenes