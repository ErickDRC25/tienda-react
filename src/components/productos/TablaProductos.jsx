import { useState, useEffect } from "react";



function Producto({ recargar, onEditar, onEliminar, onComprar }) {
    const token = localStorage.getItem("token")
    const url = import.meta.env.VITE_API_URL
    const headers = {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
    }
    const [productos, setProductos] = useState([])

    async function listarProductos() {
        const response = await fetch(`${url}/listar/productos/categorias`, {
            headers: { "Content-type": "application/json" }
        })

        if (response.ok) {
            const data = await response.json()
            setProductos(data)
        }

    }

    useEffect(() => {
        listarProductos()
    }, [recargar])


    async function eliminarProducto(id) {
        const response = await fetch(`${url}/eliminar/producto/${id}`, {
            method: "DELETE",
            headers
        })

        if (response.ok) {
            alert("Producto eliminado")
            onEliminar()
            return
        }
    }

    async function añadirAlCarrito(producto) {

        const response = await fetch(`${url}/agregar/carrito`, {
            method: "POST",
            headers,
            body: JSON.stringify({
                productos: [
                    {
                        producto_id: producto.id,
                        cantidad: 1
                    }
                ]
            })
        })

        const data = await response.json()

        console.log("Status:", response.status)
        console.log(data)
    }

    return (
        <>

            <div className="max-w-4xl mx-auto p-4">
                <h1 className="text-center font-bold text-3xl mb-8">Listado de Productos</h1>
                <div className="flex justify-center overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 text-center">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border border-gray-300 px-6 py-3 font-semibold text-gray-700">ID Producto</th>
                                <th className="border border-gray-300 px-6 py-3 font-semibold text-gray-700">Producto</th>
                                <th className="border border-gray-300 px-6 py-3 font-semibold text-gray-700">Descripcion</th>
                                <th className="border border-gray-300 px-6 py-3 font-semibold text-gray-700">Precio</th>
                                <th className="border border-gray-300 px-6 py-3 font-semibold text-gray-700">Stock</th>
                                <th className="border border-gray-300 px-6 py-3 font-semibold text-gray-700">Categoria</th>
                                <th className="border border-gray-300 px-6 py-3 font-semibold text-gray-700">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map(p => (
                                <tr key={p.id} className="hover:bg-gray-400 transition-colors">
                                    <td className="border border-gray-300 px-6 py-4 text-gray-600">{p.id}</td>
                                    <td className="border border-gray-300 px-6 py-4 text-gray-800 font-medium">{p.producto}</td>
                                    <td className="border border-gray-300 px-6 py-4 text-gray-800 font-medium">{p.descripcion}</td>
                                    <td className="border border-gray-300 px-6 py-4 text-gray-800 font-medium">{p.precio}</td>
                                    <td className="border border-gray-300 px-6 py-4 text-gray-800 font-medium">{p.stock}</td>
                                    <td className="border border-gray-300 px-6 py-4 text-gray-800 font-medium">{p.categoria}</td>
                                    <td className="border border-gray-300 px-6 py-4 space-x-3 whitespace-nowrap">
                                        {onEditar && (
                                            <button
                                                onClick={() => onEditar(p)}
                                                className="bg-blue-500 hover:bg-blue-600 text-white font-medium p-2 rounded text-sm"
                                            >
                                                Actualizar
                                            </button>
                                        )}

                                        {onEliminar && (
                                            <button
                                                onClick={() => eliminarProducto(p.id)}
                                                className="bg-red-500 hover:bg-red-600 text-white font-medium p-2 rounded text-sm"
                                            >
                                                Eliminar
                                            </button>
                                        )}

                                        {onComprar && (
                                            <button
                                                onClick={() => añadirAlCarrito(p)}
                                                className="bg-green-500 hover:bg-green-600 text-white font-medium p-2 rounded text-sm"
                                            >
                                                Añadir al carrito
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Producto