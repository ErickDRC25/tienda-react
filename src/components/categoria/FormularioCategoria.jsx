import { useState, useEffect, use } from "react";
import { useNavigate } from 'react-router-dom'

function FormCategoria({ onAgregar, categoriaEditar, onCerrar }) {
    const [nombre, setNombre] = useState("")
    const navigate = useNavigate()
    const url = import.meta.env.VITE_API_URL
    useEffect(() => {
        if (categoriaEditar) {
            setNombre(categoriaEditar.nombre)
        }
    }, [categoriaEditar])

    async function agregarCategoria(e) {
        e.preventDefault()
        const token = localStorage.getItem("token")
        const response = await fetch(`${url}/crear/categoria`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                nombre: nombre
            })
        })

        
        if (response.ok) {
            alert("Categoria creada")
            onAgregar()
            setNombre("")
            onCerrar()
        }

    }

    async function actualizarCategoria(e) {

        e.preventDefault()

        const token = localStorage.getItem("token")
        const response = await fetch(`${url}/actualizar/categoria/${categoriaEditar.id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                nombre: nombre
            })
        })

        if (response.ok) {
            alert("Producto actualizado")
            onAgregar()
            onCerrar()
            return
        }


    }






    return (
        <>
            <div className="relative bg-white p-6 rounded-xl shadow-xl w-96">
                <button
                    onClick={onCerrar}
                    className="absolute top-3 right-3 hover:bg-black hover:text-amber-50 p-3 transition-colors "
                >
                    X
                </button>
                <h2 className="text-2xl font-bold text-center mb-5">
                    {categoriaEditar
                        ? "Actualizar Categoría"
                        : "Nueva Categoría"}
                </h2>
                

                <input
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ingrese nombre de la categoría"
                    className="w-full border rounded-lg p-3 mb-5"
                />

                {
                    categoriaEditar ?
                        <button
                            onClick={actualizarCategoria}
                            className="w-full bg-blue-500 text-white p-3 rounded-lg"
                        >
                            Actualizar
                        </button>
                        :
                        <button
                            onClick={agregarCategoria}
                            className="w-full bg-green-500 text-white p-3 rounded-lg"
                        >
                            Crear Categoría
                        </button>
                }

            </div>
        </>
    )


}

export default FormCategoria