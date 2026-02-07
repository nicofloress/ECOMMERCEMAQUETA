import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (password !== confirmPassword) {
            return setError('Las contraseñas no coinciden');
        }

        try {
            setError('');
            setLoading(true);
            await signup(email, password);
            navigate('/');
        } catch (err) {
            setError('Error al crear la cuenta: ' + err.message);
        }
        setLoading(false);
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Crear Cuenta</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirmar Contraseña</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary">
                        {loading ? 'Cargando...' : 'Registrarse'}
                    </button>
                </form>
                <p className="auth-link">
                    ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
