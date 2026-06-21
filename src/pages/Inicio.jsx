import { useState } from 'react'
import Producto from '../components/productos/TablaProductos'
import { useNavigate } from 'react-router-dom'
import Carrito from '../components/Carrito'
import Ordenes from '../components/Ordenes'

function Inicio() {
    const token = localStorage.getItem("token")
    const [mostrarCarrito, setMostrarCarrito] = useState(false)
    const [mostrarOrdenes, setMostrarOrdenes] = useState(false)

    const navigate = useNavigate()



    function cerrarSesion() {
        localStorage.removeItem("token")
        navigate("/")
    }

    function comprarProducto(id) {
        console.log("Comprando producto: ", id)
    }







    return (
        <>
            <div className='min-w-screen min-h-screen '>
                <h1 className='p-5 text-center font-bold  text-6xl'>Tienda</h1>

                <div className='flex justify-end mr-10 gap-10'>
                    <div className=' '>
                        {!token ?
                            navigate("/login") :

                            <button
                                onClick={() => setMostrarCarrito(true)}
                                className='bg-blue-500 text-white rounded-xl p-3'
                            >Carrito</button>


                        }
                    </div>

                    <div>
                        {
                            !token ?
                                navigate("/login") :

                                <button
                                    onClick={ ()=>setMostrarOrdenes(true)}
                                    className='bg-amber-500 text-white rounded-xl p-3'>
                                    Mis Ordenes
                                </button>
                        }
                    </div>


                    <div className=' '>
                        {!token ?
                            <button
                                className='bg-black text-white rounded-xl p-3'
                                onClick={() => navigate("/login")}>Iniciar sesion</button> :

                            <button
                                className='bg-red-400 text-white rounded-xl p-3'
                                onClick={() => {
                                    cerrarSesion()
                                    navigate("/login")
                                    alert("Session cerrada con exito")
                                }}>Cerrar sesion</button>
                        }
                    </div>
                </div>
                {
                    !token ?
                        <Producto /> :
                        <Producto onComprar={comprarProducto} />

                }
                {
                    mostrarCarrito && (
                        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
                            <Carrito
                                onCerrar={() => setMostrarCarrito(false)}
                            />
                        </div>
                    )
                }
                {
                    mostrarOrdenes&&(
                        <div className='fixed inset-0 bg-black/50 flex justify-center items-center'>
                            <Ordenes
                                onCerrar={()=>setMostrarOrdenes(false)}
                            />
                        </div>
                    )
                }



            </div>
        </>
    )
}

export default Inicio