import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom' 



function Categorias({ recargar, onEditar, onEliminar }) {
    const navigete = useNavigate()
    const [categorias, setCategorias] = useState([])
    const url = import.meta.env.VITE_API_URL

    async function listarCategorias() {
        const response = await fetch(`${url}/listar/categoria`, {
            "Content-type": "application/json"
        })

        if (response.status === 401) {
            alert("Sesión expirada")
            localStorage.removeItem("token")
            navigate("/login")
            return
        }

        if (response.ok) {
            const data = await response.json()
            setCategorias(data)
        }

    }

    async function eliminarCategoria(id) {

        const token = localStorage.getItem("token")

        const response = await fetch(`${url}/eliminar/categoria/${id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })

        if (response.status === 401) {
            alert("Sesión expirada")
            localStorage.removeItem("token")
            navigate("/login")
            return
        }

        if (response.ok) {
            alert("Producto eliminado")
            onEliminar()
            return
        }

    }

    useEffect(() => {
        listarCategorias()
    }, [recargar])




    return (
        <>
            <div className="max-w-4xl mx-auto p-4">

                <h1 className="text-center font-bold text-3xl mb-8">Listado de Categorías</h1>


                <div className="flex justify-center overflow-x-auto">
                    <table className="w-full max-w-2xl border-collapse border border-gray-300 text-center">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border border-gray-300 px-6 py-3 font-semibold text-gray-700">ID</th>
                                <th className="border border-gray-300 px-6 py-3 font-semibold text-gray-700">CATEGORÍA</th>
                                <th className="border border-gray-300 px-6 py-3 font-semibold text-gray-700">ACCIONES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categorias.map(c => (
                                <tr key={c.id} className="hover:bg-gray-400 transition-colors">
                                    <td className="border border-gray-300 px-6 py-4 text-gray-600">{c.id}</td>
                                    <td className="border border-gray-300 px-6 py-4 text-gray-800 font-medium">{c.nombre}</td>
                                    <td className="border border-gray-300 px-6 py-4 space-x-3">
                                        <button
                                            onClick={() => onEditar(c)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white  p-2 rounded  text-sm"
                                        >
                                            Actualizar
                                        </button>
                                        <button
                                            onClick={() => eliminarCategoria(c.id)}
                                            className="bg-red-500 hover:bg-red-600 text-white font-medium p-2 rounded  text-sm"
                                        >
                                            Eliminar
                                        </button>
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

export default Categorias