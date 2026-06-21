import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



export default function Orden({ recargar, onEditar }) {

    const token = localStorage.getItem("token");
    const url = import.meta.env.VITE_API_URL
    const headers = {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
    };
    const navigate = useNavigate()

    const [ordenes, setOrdenes] = useState([]);


    async function listarOrdenes() {
        try {
            const response = await fetch(`${url}/ordenes/admin`, { headers });

            if (response.status === 401) {
                alert("Sesión expirada")
                localStorage.removeItem("token")
                navigate("/login")
                return
            }

            if (response.ok) {
                const data = await response.json();
                setOrdenes(data);


            } else {
                console.error("Error al obtener las órdenes:", response.statusText);
            }
        } catch (error) {
            console.error("Error de red:", error);
        }
    }


    useEffect(() => {
        listarOrdenes();
    }, [recargar]);


    return (
        <>
            <div className="max-w-4xl mx-auto p-4">
                <h1 className="text-center font-bold text-3xl mb-8">Listado de Ordenes</h1>
                <div className="flex justify-center overflow-x-auto">
                    <table className="w-full max-w-2xl border-collapse border border-gray-300 text-center">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border border-gray-300 px-6 py-3 font-semibold text-gray-700">Codigo de orden</th>
                                <th className="border border-gray-300 px-6 py-3 font-semibold text-gray-700">Usuario</th>
                                <th className="border border-gray-300 px-6 py-3 font-semibold text-gray-700">Total</th>
                                <th className="border border-gray-300 px-6 py-3 font-semibold text-gray-700">Fecha</th>
                                <th className="border border-gray-300 px-6 py-3 font-semibold text-gray-700">Estado</th>
                                <th className="border border-gray-300 px-6 py-3 font-semibold text-gray-700">Accion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ordenes.map((o) => (
                                <tr key={o.codigo_orden} className="hover:bg-gray-400 transition-colors">

                                    <td className="border border-gray-300 px-6 py-4 text-gray-600">{o.codigo_orden}</td>
                                    <td className="border border-gray-300 px-6 py-4 text-gray-800 font-medium">{o.usuario}</td>
                                    <td className="border border-gray-300 px-6 py-4 text-gray-800 font-medium">{o.total}</td>
                                    <td className="border border-gray-300 px-6 py-4 text-gray-800 font-medium">{o.fecha}</td>
                                    <td className="border border-gray-300 px-6 py-4 text-gray-800 font-medium">{o.estado}</td>
                                    <td className="border border-gray-300 px-6 py-4 space-x-3">

                                        <button
                                            onClick={() => onEditar(o)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white  p-2 rounded  text-sm">
                                            Actualizar estado</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}