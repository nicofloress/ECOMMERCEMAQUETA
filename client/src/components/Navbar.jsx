import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

function Navbar() {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

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
                <Link to="/" className="navbar-brand">Shoppy</Link>
                <div className="navbar-links">
                    <Link to="/" className="nav-link">Inicio</Link>
                    {currentUser ? (
                        <>
                            <Link to="/cart" className="nav-link cart-link">
                                Carrito <span className="badge">0</span>
                            </Link>
                            <div className="user-menu">
                                <span className="user-email">{currentUser.email}</span>
                                <button onClick={handleLogout} className="btn-logout">
                                    Cerrar Sesión
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
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
