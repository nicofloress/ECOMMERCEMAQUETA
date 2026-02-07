import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

/**
 * Componente Navbar - Barra de Navegación Principal
 * 
 * Muestra el menú de navegación con:
 * - Logo/nombre de la tienda
 * - Enlaces de navegación
 * - Estado de autenticación del usuario
 * - Botón de carrito (placeholder)
 * - Menú de usuario (login/logout)
 */
function Navbar() {
    // Obtener usuario actual y función de logout del contexto de autenticación
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    /**
     * Manejar cierre de sesión
     * Cierra la sesión del usuario y redirige a la página de login
     */
    async function handleLogout() {
        try {
            await logout();
            navigate('/login');
        } catch {
            console.error('Error al cerrar sesión');
        }
    }

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Logo/Nombre de la tienda */}
                <Link to="/" className="navbar-brand">Shoppy</Link>

                {/* Enlaces de navegación */}
                <div className="navbar-links">
                    <Link to="/" className="nav-link">Inicio</Link>

                    {/* Mostrar diferentes opciones según el estado de autenticación */}
                    {currentUser ? (
                        <>
                            {/* Usuario autenticado: mostrar carrito y perfil */}
                            <Link to="/cart" className="nav-link cart-link">
                                Carrito <span className="badge">0</span>
                            </Link>

                            {/* Link a administración de productos */}
                            <Link to="/admin/productos" className="nav-link">
                                Admin Productos
                            </Link>

                            {/* Menú de usuario */}
                            <div className="user-menu">
                                <span className="user-email">{currentUser.email}</span>
                                <button onClick={handleLogout} className="btn-logout">
                                    Cerrar Sesión
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Usuario no autenticado: mostrar login y registro */}
                            <Link to="/login" className="nav-link">Iniciar Sesión</Link>
                            <Link to="/register" className="nav-link btn-register">Registrarse</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
