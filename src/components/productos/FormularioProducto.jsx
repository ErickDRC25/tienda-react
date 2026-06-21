import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function FormProducto({ onAgregar, productoEditar, onCerrar }) {

    const [nombre, setNombre] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [precio, setPrecio] = useState("")
    const [stock, setStock] = useState("")
    const [categoriaId, setCategoriaId] = useState("")
    const [categorias, setCategorias] = useState([])
    const url = import.meta.env.VITE_API_URL

    const navigate = useNavigate()
    useEffect(() => {
        listarCategorias()
    }, [])

    useEffect(() => {
        if (productoEditar) {
            setNombre(productoEditar.producto)
            setDescripcion(productoEditar.descripcion)
            setPrecio(productoEditar.precio)
            setStock(productoEditar.stock)
            setCategoriaId(productoEditar.categoria_id)
        }
    }, [productoEditar])

    async function listarCategorias() {
        const response = await fetch(`${url}/listar/categoria`)

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

    async function agregarProducto(e) {
        e.preventDefault()
        const token = localStorage.getItem("token")
        const response = await fetch(`${url}/crear/producto`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                nombre: nombre,
                descripcion: descripcion,
                precio: Number(precio),
                stock: Number(stock),
                categoria_id: categoriaId

            })
        })
        
        if (response.ok) {
            alert("Producto creado")
            onAgregar()
            onCerrar()
            setNombre("")
            setDescripcion("")
            setPrecio("")
            setStock("")
            setCategoriaId("")
        }




    }

    async function actualizarProducto(e) {
        e.preventDefault()
        const token = localStorage.getItem("token")
        const response = await fetch(`${url}/actualizar/producto/${productoEditar.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                nombre: nombre,
                descripcion: descripcion,
                precio: Number(precio),
                stock: Number(stock),
                categoria_id: Number(categoriaId)
            })
        })

        if (response.ok) {
            alert("Producto actualizado")
            onAgregar()
            onCerrar() 
        }
    }



    return (
        <>
            <div className="relative bg-white p-6 rounded-xl shadow-xl w-96">
                <button
                    onClick={onCerrar}
                    className="absolute top-3 right-3 hover:bg-black hover:text-amber-50 p-3 transition-colors"
                >
                    X
                </button>

                <h2 className="text-2xl font-bold text-center mb-5">
                    {productoEditar ? "Actualizar Producto" : "Nuevo Producto"}
                </h2>

                <input
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Nombre"
                    className="w-full border rounded-lg p-3 mb-5"
                />

                <input
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    placeholder="Descripción"
                    className="w-full border rounded-lg p-3 mb-5"
                />

                <input
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    type="number"
                    min="0"
                    step={0.01}
                    placeholder="Precio"
                    className="w-full border rounded-lg p-3 mb-5"
                />

                <input
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    type="number"
                    placeholder="Stock"
                    className="w-full border rounded-lg p-3 mb-5"
                />

                <select
                    value={categoriaId}
                    onChange={(e) => setCategoriaId(e.target.value)}
                    className="w-full border rounded-lg p-3 mb-5 bg-white"
                >
                    <option value="">Selecciona categoría</option>
                    {categorias.map(c =>
                        <option key={c.id} value={c.id}>{c.nombre}</option>
                    )}
                </select>

                {productoEditar ? (
                    <button
                        onClick={actualizarProducto}
                        className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Actualizar
                    </button>
                ) : (
                    <button
                        onClick={agregarProducto}
                        className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-colors"
                    >
                        Crear Producto
                    </button>
                )}
            </div>
        </>
    )
}

export default FormProducto