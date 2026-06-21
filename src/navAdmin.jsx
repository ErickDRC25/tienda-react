function Navegacion({ setVista }) {

    return (

        <div className="mb-4 p-4 bg-blue-500">
            <ul className="flex justify-around text-3xl font-bold">

                <li
                    onClick={() => setVista("dashboard")}
                    className="p-4 hover:bg-blue-600 rounded-full"
                >
                    Dashboard
                </li>

                <li
                    onClick={() => setVista("categorias")}
                    className="p-4 hover:bg-blue-600 rounded-full"
                >
                    Categorias
                </li>

                <li
                    onClick={() => setVista("productos")}
                    className="p-4 hover:bg-blue-600 rounded-full"
                >
                    Productos
                </li>
                <li
                    onClick={() => setVista("orden")}
                    className="p-4 hover:bg-blue-600 rounded-full"
                >
                    Ordenes
                </li>
                

            </ul>
        </div>

    )
}

export default Navegacion