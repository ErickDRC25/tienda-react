import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'


function FormOrden({ ordenEditar, onCerrar, onActualizar }) {
    const token = localStorage.getItem("token");
    const [estado, setEstado] = useState("");
    const navigate = useNavigate()
    const url = import.meta.env.VITE_API_URL

    useEffect(() => {
        if (ordenEditar) {
            setEstado(ordenEditar.estado);
        }
    }, [ordenEditar]);

    async function actualizarEstado() {

        const response = await fetch(
            `${url}/actualizar/estado/${ordenEditar.codigo_orden}`,
            {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    estado: estado
                })
            }
        );

        if (response.status === 401) {
            alert("Sesión expirada")
            localStorage.removeItem("token")
            navigate("/login")
            return
        }

        if (response.ok) {
            alert("Estado actualizado")

            onActualizar()

            onCerrar()
        }
    }

    return (
        <div className="relative bg-white p-6 rounded-xl shadow-xl w-96">

            <button
                onClick={onCerrar}
                className="absolute top-3 right-3"
            >
                X
            </button>

            <h2 className="text-xl font-bold mb-4">
                Actualizar Estado
            </h2>

            <select
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                className="w-full border p-2 rounded"
            >
                <option value="pendiente">Pendiente</option>
                <option value="pagado">Pagado</option>
                <option value="enviado">Enviado</option>
                <option value="entregado">Entregado</option>
                <option value="cancelado">Cancelado</option>
            </select>

            <button
                onClick={actualizarEstado}
                className="w-full mt-4 bg-blue-500 text-white p-2 rounded"
            >
                Guardar cambios
            </button>

        </div>
    );
}

export default FormOrden;