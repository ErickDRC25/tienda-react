import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Registro() {

    const navigate = useNavigate()
    const url = import.meta.env.VITE_API_URL

    const [nombre, setNombre] = useState("")
    const [correo, setCorreo] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    async function registrar(e) {
        e.preventDefault()
        setError("")
        

        if (!nombre.trim() || !correo.trim() || !password.trim()) {
            setError("Todos los campos son obligatorios")
            return
        }

        const response = await fetch(`${url}/crear/usuario`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                nombre: nombre,
                email: correo,
                password: password
            })
        })

        const data = await response.json()

        if (!response.ok) {
            setError(data.detail || "No se pudo crear el usuario")
            return
        }

        alert("Cuenta creada con éxito, ahora puedes iniciar sesión")
        navigate('/login')
    }


    
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <div className='border border-black p-6 rounded-lg flex flex-col gap-3'>
                <h2 className="text-center font-bold">
                    CREAR CUENTA
                </h2>

                <label>Nombre</label>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none"
                />

                <label>Correo</label>
                <input
                    type="text"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none"
                />

                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none"
                />

                {error && (
                    <p className="text-red-500 text-sm text-center">{error}</p>
                )}

                <button
                    onClick={registrar}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded cursor-pointer"
                >
                    Registrarme
                </button>

                <p className="text-center text-sm">
                    ¿Ya tienes cuenta? <Link to="/login" className="text-blue-500 hover:underline">Inicia sesión</Link>
                </p>
            </div>
        </div>
    )
}

export default Registro