import { useState, useEffect } from 'react'
import { useNavigate, Link  } from 'react-router-dom'

function Login() {

    const navigate = useNavigate()

    const [correo, setCorreo] = useState("")
    const [password, setPassword] = useState("")
    const url = import.meta.env.VITE_API_URL

    async function login(e) {
        e.preventDefault()

        const response = await fetch(`${url}/auth/login`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                email: correo,
                password: password
            })
        })

        if (!response.ok) {
            alert("Credenciales incorrectas")
            return
        }

        const data = await response.json()
        const token = data.access_token
        localStorage.setItem("token", data.access_token)

        const payload = JSON.parse(atob(token.split('.')[1]))
        if (payload.rol !== "admin") {
            navigate('/')
            return
        }

        navigate('/admin')
    }

    return (
        <div className='min-h-screen flex justify-center items-center'>
            <div className='border border-black p-6 rounded-lg flex flex-col gap-3'>
                <h2 className="text-center font-bold">
                    LOGIN
                </h2>

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

                <button
                    onClick={login}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded cursor-pointer"
                >
                    Acceder
                </button>

                <p className="text-center text-sm">
                    ¿No tienes cuenta? <Link to="/registro" className="text-blue-500 hover:underline">Regístrate</Link>
                </p>
            </div>
        </div>
    )
}

export default Login