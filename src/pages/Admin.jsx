import { useEffect, useState } from 'react'
import Producto from '../components/productos/TablaProductos'
import FormProducto from '../components/productos/FormularioProducto'
import Categorias from '../components/categoria/TablaCategoria'
import FormCategoria from '../components/categoria/FormularioCategoria'
import Login from '../components/Login'
import Dashboard from '../components/dashboard/Dashboard'
import Navegacion from '../navAdmin'

import { useNavigate } from 'react-router-dom'
import Orden from '../components/orden/TablaOrden'
import FormOrden from '../components/orden/FormOrden'
function Admin() {
  const navigate = useNavigate()
  const [recargar, setRecargar] = useState(0)
  const [productoEditar, setProductoEditar] = useState(null)
  const [categoriaEditar, setCategoriaEditar] = useState(null)
  const [ordenEditar, setOrdenEditar] = useState(null)
  const [vista, setVista] = useState("dashboard")
  const [modalCategoria, setModalCategoria] = useState(false)
  const [modalProducto, setModalProducto] = useState(false)
  const [modalOrden, setModalOrden] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate('/login')
    }
  }, [])


  function cuandoSeAgrega() {
    setRecargar(recargar + 1)
  }

  function cerrarSesion() {
    localStorage.removeItem("token")
    navigate('/login')
  }


  return (
    <>

      <Navegacion setVista={setVista} />
      {
        vista === "dashboard" &&
        <Dashboard />
      }

      {
        vista === "categorias" &&
        <>
          <div className='flex justify-end mr-10 mt-2'>
            <button className=' rounded-3xl p-2 bg-green-300 hover:bg-green-500'
              onClick={() => setModalCategoria(true)}
            >
              Agregar Categoría
            </button>
          </div>

          <Categorias
            recargar={recargar}
            onEditar={(categoria) => {
              setCategoriaEditar(categoria)
              setModalCategoria(true)
            }}
            onEliminar={cuandoSeAgrega}
          />

          {
            modalCategoria && (
              <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

                <FormCategoria
                  onAgregar={cuandoSeAgrega}
                  categoriaEditar={categoriaEditar}
                  onCerrar={() => {
                    setModalCategoria(false)
                    setCategoriaEditar(null)
                  }}
                />

              </div>
            )
          }
        </>
      }

      {
        vista === "productos" &&
        <>
          <div className='flex justify-end mr-10 mt-2'>
            <button
              className='rounded-3xl p-2 bg-green-300 hover:bg-green-500'
              onClick={() => {
                setProductoEditar(null)
                setModalProducto(true)
              }}
            >
              Agregar Producto
            </button>
          </div>

          <Producto
            recargar={recargar}
            onEditar={(producto) => {
              setProductoEditar(producto)
              setModalProducto(true)
            }}
            onEliminar={cuandoSeAgrega}
          />

          {
            modalProducto && (
              <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
                <FormProducto
                  onAgregar={cuandoSeAgrega}
                  productoEditar={productoEditar}
                  onCerrar={() => {
                    setModalProducto(false)
                    setProductoEditar(null)
                  }}
                />
              </div>

            )
          }
        </>
      }

      {
        vista === "orden" &&
        <>
          <Orden
            recargar={recargar}
            onEditar={(orden) => {
              setOrdenEditar(orden)
              setModalOrden(true)
            }} />

          {
            modalOrden && (
              <div className='fixed inset-0 bg-black/50 flex justify-center items-center'>
                <FormOrden
                  ordenEditar={ordenEditar}
                  onActualizar={cuandoSeAgrega}
                  onCerrar={() => {
                    setModalOrden(false)
                    setOrdenEditar(null)
                  }}
                />
              </div>
            )
          }
        </>


      }

    </>
  )
}

export default Admin