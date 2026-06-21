import { useState, useEffect } from "react"


function Carrito({ onCerrar }) {

    const token = localStorage.getItem("token")
    const headers = {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
    }
    const url = import.meta.env.VITE_API_URL

    const [carrito, setCarrito] = useState([])
    const [totalCarrito, setTotalCarrito] = useState(0)

    useEffect(() => {
        mostrarMiCarrito()
    }, [])

    async function mostrarMiCarrito() {
        const response = await fetch(`${url}/ver/mi-carrito`, {
            headers
        })

        const data = await response.json()

        if (!response.ok) {
            console.log(data.detail)

            setCarrito([])
            setTotalCarrito(0)

            return
        }
        setCarrito(data.Contenido.Productos)
        setTotalCarrito(data.Total)
    }


    async function actualizarCantidad(idDetalle, cantidad) {

        const response = await fetch(
            `${url}/actualizar/carrito/${idDetalle}`,
            {
                method: "PUT",
                headers,
                body: JSON.stringify({
                    cantidad: Number(cantidad)
                })
            }
        )

        const data = await response.json()

        console.log(data)

        if (!response.ok) {
            alert(data.detail)
            return
        }

        mostrarMiCarrito()
    }

    async function eliminarProductoCarrito(idDetalle) {
        const response = await fetch(`${url}/eliminar/producto/carrito/${idDetalle}`, {
            method: "DELETE",
            headers
        })

        console.log(await response.json())

        mostrarMiCarrito()
    }

    async function limpiarCarrito() {
        const response = await fetch(`${url}/vaciar/carrito`, {
            method: "DELETE",
            headers
        })
        console.log("Limpiando carrito")
        onCerrar()
    }

    async function comprar() {
        const response = await fetch(`${url}/crear/orden`, {
            method: "POST",
            headers
        })

        const data = await response.json()
        alert(`${data.message} - ordenId : ${data.orden_id} - totalPagado: ${data.total}`)
        onCerrar()
    }


    return (
        <>
            <div className="relative bg-white p-6 rounded-xl shadow-xl w-96">
                <button
                    onClick={onCerrar}
                    className="absolute top-3 right-3 hover:bg-black hover:text-amber-50 p-3 transition-colors ">X</button>
                <h2 className="text-center text-2xl font-bold m-2 p-2">Mi carrito de Compras</h2>
                <div className="flex flex-col">
                    {
                        carrito.map(c => (
                            <div className="relative flex flex-col border m-2 p-3 rounded-3xl " key={c.producto}>
                                <span>Producto: {c.producto}</span>
                                <div className="flex gap-2">
                                    <label>Cantidad</label>
                                    <div className="border w-20 flex flex-row justify-around">
                                        <button
                                            className="hover:bg-red-300 hover:rounded-4xl w-3"
                                            disabled={c.cantidad <= 1}
                                            onClick={() =>
                                                actualizarCantidad(
                                                    c.detalle_id,
                                                    c.cantidad - 1
                                                )
                                            }
                                        >
                                            -
                                        </button>

                                        <span>{c.cantidad}</span>

                                        <button
                                            className="hover:bg-green-300 hover:rounded-4xl w-3"
                                            onClick={() =>
                                                actualizarCantidad(
                                                    c.detalle_id,
                                                    c.cantidad + 1
                                                )
                                            }
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <span className="text-end">Subtotal: {c.subtotal}</span>
                                <span className=" absolute right-4 hover:bg-black hover:text-white p-0.5 w-5 text-center"
                                    onClick={() => eliminarProductoCarrito(c.detalle_id)}>X</span>
                            </div>
                        ))
                    }
                </div>

                <div>
                    <span className="m-2">Total: {totalCarrito}</span>
                    <div className="flex justify-end gap-5">
                        <button className="bg-gray-200 hover:bg-gray-400 p-2 rounded-4xl"
                            onClick={() => limpiarCarrito()}>Limpiar</button>
                        <button className="bg-green-200 hover:bg-green-400 p-2 rounded-4xl"
                            onClick={() => comprar()}>Pagar</button>
                    </div>
                </div>
            </div>

        </>
    )

}

export default Carrito