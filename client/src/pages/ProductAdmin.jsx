import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './ProductAdmin.css';

/**
 * Componente de Administración de Productos
 * Permite crear, editar y eliminar productos del catálogo
 * Solo accesible para usuarios autenticados
 */
function ProductAdmin() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    // Estado para la lista de productos
    const [productos, setProductos] = useState([]);

    // Estado para el formulario de producto
    const [formularioProducto, setFormularioProducto] = useState({
        id: '',
        name: '',
        description: '',
        price: '',
        stock: '',
        imageUrl: '',
        categoryId: ''
    });

    // Estado para controlar si estamos editando o creando
    const [modoEdicion, setModoEdicion] = useState(false);

    // Estados de UI
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState('');
    const [mensaje, setMensaje] = useState('');

    // URL base de la API
    const API_URL = 'http://localhost:5073/api/product';

    /**
     * Cargar productos al montar el componente
     */
    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
            return;
        }
        cargarProductos();
    }, [currentUser, navigate]);

    /**
     * Obtener todos los productos de la API
     */
    const cargarProductos = async () => {
        try {
            setCargando(true);
            const respuesta = await fetch(API_URL);
            if (!respuesta.ok) throw new Error('Error al cargar productos');
            const datos = await respuesta.json();
            setProductos(datos);
        } catch (err) {
            setError('No se pudieron cargar los productos: ' + err.message);
        } finally {
            setCargando(false);
        }
    };

    /**
     * Manejar cambios en los inputs del formulario
     */
    const manejarCambioInput = (e) => {
        const { name, value } = e.target;
        setFormularioProducto(prev => ({
            ...prev,
            [name]: value
        }));
    };

    /**
     * Enviar formulario para crear o actualizar producto
     */
    const manejarEnvioFormulario = async (e) => {
        e.preventDefault();
        setError('');
        setMensaje('');

        try {
            setCargando(true);

            // Preparar datos del producto
            const datosProducto = {
                ...formularioProducto,
                price: parseFloat(formularioProducto.price),
                stock: parseInt(formularioProducto.stock)
            };

            let respuesta;
            if (modoEdicion) {
                // Actualizar producto existente (PUT)
                respuesta = await fetch(`${API_URL}/${formularioProducto.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(datosProducto)
                });
            } else {
                // Crear nuevo producto (POST)
                respuesta = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(datosProducto)
                });
            }

            if (!respuesta.ok) throw new Error('Error al guardar el producto');

            setMensaje(modoEdicion ? 'Producto actualizado exitosamente' : 'Producto creado exitosamente');
            limpiarFormulario();
            cargarProductos();
        } catch (err) {
            setError('Error al guardar: ' + err.message);
        } finally {
            setCargando(false);
        }
    };

    /**
     * Preparar formulario para editar un producto existente
     */
    const editarProducto = (producto) => {
        setFormularioProducto({
            id: producto.id,
            name: producto.name,
            description: producto.description,
            price: producto.price.toString(),
            stock: producto.stock.toString(),
            imageUrl: producto.imageUrl || '',
            categoryId: producto.categoryId || ''
        });
        setModoEdicion(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    /**
     * Eliminar un producto
     */
    const eliminarProducto = async (id) => {
        if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;

        try {
            setCargando(true);
            const respuesta = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            if (!respuesta.ok) throw new Error('Error al eliminar');

            setMensaje('Producto eliminado exitosamente');
            cargarProductos();
        } catch (err) {
            setError('Error al eliminar: ' + err.message);
        } finally {
            setCargando(false);
        }
    };

    /**
     * Limpiar formulario y volver al modo creación
     */
    const limpiarFormulario = () => {
        setFormularioProducto({
            id: '',
            name: '',
            description: '',
            price: '',
            stock: '',
            imageUrl: '',
            categoryId: ''
        });
        setModoEdicion(false);
    };

    return (
        <div className="admin-container">
            <h1>Administración de Productos</h1>

            {/* Mensajes de error y éxito */}
            {error && <div className="mensaje-error">{error}</div>}
            {mensaje && <div className="mensaje-exito">{mensaje}</div>}

            {/* Formulario de producto */}
            <div className="formulario-producto-card">
                <h2>{modoEdicion ? 'Editar Producto' : 'Nuevo Producto'}</h2>
                <form onSubmit={manejarEnvioFormulario}>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Nombre del Producto *</label>
                            <input
                                type="text"
                                name="name"
                                value={formularioProducto.name}
                                onChange={manejarCambioInput}
                                required
                                placeholder="Ej: Smartphone Pro"
                            />
                        </div>

                        <div className="form-group">
                            <label>Precio *</label>
                            <input
                                type="number"
                                name="price"
                                step="0.01"
                                value={formularioProducto.price}
                                onChange={manejarCambioInput}
                                required
                                placeholder="99.99"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Descripción *</label>
                        <textarea
                            name="description"
                            value={formularioProducto.description}
                            onChange={manejarCambioInput}
                            required
                            rows="3"
                            placeholder="Descripción del producto"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Stock *</label>
                            <input
                                type="number"
                                name="stock"
                                value={formularioProducto.stock}
                                onChange={manejarCambioInput}
                                required
                                placeholder="100"
                            />
                        </div>

                        <div className="form-group">
                            <label>ID de Categoría</label>
                            <input
                                type="text"
                                name="categoryId"
                                value={formularioProducto.categoryId}
                                onChange={manejarCambioInput}
                                placeholder="categoria-1"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>URL de Imagen</label>
                        <input
                            type="url"
                            name="imageUrl"
                            value={formularioProducto.imageUrl}
                            onChange={manejarCambioInput}
                            placeholder="https://ejemplo.com/imagen.jpg"
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn-primary" disabled={cargando}>
                            {cargando ? 'Guardando...' : (modoEdicion ? 'Actualizar' : 'Crear Producto')}
                        </button>
                        {modoEdicion && (
                            <button type="button" className="btn-secondary" onClick={limpiarFormulario}>
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Lista de productos */}
            <div className="lista-productos-admin">
                <h2>Productos Existentes ({productos.length})</h2>
                {cargando && <p>Cargando...</p>}

                <div className="tabla-productos">
                    <table>
                        <thead>
                            <tr>
                                <th>Imagen</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map(producto => (
                                <tr key={producto.id}>
                                    <td>
                                        <img
                                            src={producto.imageUrl || 'https://placehold.co/100x100'}
                                            alt={producto.name}
                                            className="producto-miniatura"
                                        />
                                    </td>
                                    <td>
                                        <strong>{producto.name}</strong>
                                        <br />
                                        <small>{producto.description}</small>
                                    </td>
                                    <td>${producto.price.toLocaleString()}</td>
                                    <td>{producto.stock} unidades</td>
                                    <td className="acciones-celda">
                                        <button
                                            className="btn-editar"
                                            onClick={() => editarProducto(producto)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="btn-eliminar"
                                            onClick={() => eliminarProducto(producto.id)}
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
        </div>
    );
}

export default ProductAdmin;
