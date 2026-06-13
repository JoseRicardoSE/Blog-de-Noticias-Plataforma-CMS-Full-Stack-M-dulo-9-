/* Configuración Base para Fetch */
const API_URL = 'https://blog-de-noticias-plataforma-cms-full.onrender.com/api';

// Función para obtener headers con token
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
};
