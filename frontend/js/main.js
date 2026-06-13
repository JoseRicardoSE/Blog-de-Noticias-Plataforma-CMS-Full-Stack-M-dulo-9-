// Lógica principal para el Frontend
document.addEventListener('DOMContentLoaded', () => {
    checkAuthState();
    initPageLogic();
});

// Función de seguridad (Prevención de XSS)
function escapeHTML(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
    }[tag]));
}

// Inicializar la lógica dependiendo de la página en la que estemos
function initPageLogic() {
    const path = window.location.pathname;

    if (path.includes('index.html') || path === '/' || path.endsWith('/frontend/')) {
        cargarNoticias();
    } else if (path.includes('detalle.html')) {
        cargarDetalleNoticia();
    } else if (path.includes('login.html')) {
        initLoginForm();
    } else if (path.includes('registro.html')) {
        initRegistroForm();
    } else if (path.includes('crear-noticia.html')) {
        initCrearNoticiaForm();
    } else if (path.includes('editar-noticia.html')) {
        initEditarNoticiaForm();
    }
}

// Verifica el estado de autenticación y ajusta la Navbar
function checkAuthState() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const authButtons = document.getElementById('authButtons');
    
    if (authButtons) {
        if (token && user) {
            authButtons.innerHTML = `
                <span class="navbar-text me-3 text-white">Hola, ${user.nombre}</span>
                ${user.rol === 'admin' ? '<button class="btn btn-outline-light me-2" onclick="window.location.href=\'crear-noticia.html\'">Crear Noticia</button>' : ''}
                <button class="btn btn-danger" onclick="logout()">Cerrar Sesión</button>
            `;
        } else {
            authButtons.innerHTML = `
                <a href="login.html" class="btn btn-outline-light me-2">Iniciar Sesión</a>
                <a href="registro.html" class="btn btn-primary">Registrarse</a>
            `;
        }
    }
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

// -------------------------------------------------------------------
// Funciones Auxiliares de Paginación
// -------------------------------------------------------------------
function renderPagination(containerId, currentPage, totalPages, fetchFunction) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (totalPages <= 1) {
        container.innerHTML = '';
        return;
    }

    let html = '';
    
    // Botón Anterior
    html += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="javascript:void(0)" onclick="${currentPage === 1 ? 'return false;' : `${fetchFunction}(${currentPage - 1})`}">&laquo; Anterior</a>
        </li>
    `;

    // Lógica de Ventana Deslizante (máx 5 botones de números juntos)
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Botón de Primera Página y Elipsis inicial
    if (startPage > 1) {
        html += `<li class="page-item"><a class="page-link" href="javascript:void(0)" onclick="${fetchFunction}(1)">1</a></li>`;
        if (startPage > 2) {
            html += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
        }
    }

    // Botones de números centrales
    for (let i = startPage; i <= endPage; i++) {
        html += `
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="javascript:void(0)" onclick="${fetchFunction}(${i})">${i}</a>
            </li>
        `;
    }

    // Botón de Última Página y Elipsis final
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            html += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
        }
        html += `<li class="page-item"><a class="page-link" href="javascript:void(0)" onclick="${fetchFunction}(${totalPages})">${totalPages}</a></li>`;
    }

    // Botón Siguiente
    html += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="javascript:void(0)" onclick="${currentPage === totalPages ? 'return false;' : `${fetchFunction}(${currentPage + 1})`}">Siguiente &raquo;</a>
        </li>
    `;

    container.innerHTML = html;
}

// -------------------------------------------------------------------
// Lógica para Inicio (Listado de Noticias)
// -------------------------------------------------------------------
async function cargarNoticias(page = 1) {
    const container = document.getElementById('noticiasContainer');
    if (!container) return;

    try {
        let queryParams = `?page=${page}&limit=9`;
        
        const searchInput = document.getElementById('searchInput');
        const categorySelect = document.getElementById('categorySelect');
        
        if (searchInput && searchInput.value.trim()) {
            queryParams += `&search=${encodeURIComponent(searchInput.value.trim())}`;
        }
        if (categorySelect && categorySelect.value) {
            queryParams += `&categoria=${encodeURIComponent(categorySelect.value)}`;
        }

        const response = await fetch(`${API_URL}/noticias${queryParams}`);
        const resData = await response.json();
        const noticias = resData.data || [];

        container.innerHTML = '';
        if (noticias.length === 0) {
            container.innerHTML = '<p class="text-center w-100">No hay noticias disponibles en este momento.</p>';
            return;
        }

        const userStr = localStorage.getItem('user');
        const user = userStr ? JSON.parse(userStr) : null;

        noticias.forEach(noticia => {
            const fecha = new Date(noticia.createdAt).toLocaleDateString('es-ES');
            const imgHtml = noticia.imagen 
                ? `<img src="${noticia.imagen}" class="card-img-top noticia-imagen" alt="${escapeHTML(noticia.titulo)}">` 
                : '<div class="bg-secondary text-white d-flex align-items-center justify-content-center noticia-imagen">Sin Imagen</div>';

            const adminButtons = (user && user.rol === 'admin') ? `
                <div class="mt-2 pt-2 border-top">
                    <a href="editar-noticia.html?id=${noticia.id}" class="btn btn-warning btn-sm">Editar</a>
                    <button class="btn btn-danger btn-sm" onclick="eliminarNoticia(${noticia.id})">Eliminar</button>
                </div>
            ` : '';

            container.innerHTML += `
                <div class="col-md-6 col-lg-4 mb-4">
                    <div class="card h-100">
                        ${imgHtml}
                        <div class="card-body d-flex flex-column">
                            <span class="badge bg-primary mb-2 align-self-start">${escapeHTML(noticia.categoria)}</span>
                            <h5 class="card-title">
                                <a href="detalle.html?id=${noticia.id}" class="text-decoration-none text-dark">${escapeHTML(noticia.titulo)}</a>
                            </h5>
                            <p class="card-text text-muted small mb-2">Por ${escapeHTML(noticia.author?.nombre || 'Anónimo')} - ${fecha}</p>
                            <p class="card-text">${escapeHTML(noticia.copete)}</p>
                            <div class="mt-auto">
                                <a href="detalle.html?id=${noticia.id}" class="btn btn-outline-primary btn-sm">Leer más</a>
                                ${adminButtons}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        // Renderizar Paginación
        renderPagination('paginacionNoticias', resData.currentPage, resData.totalPages, 'cargarNoticias');

    } catch (error) {
        console.error('Error al cargar noticias:', error);
        container.innerHTML = '<p class="text-center text-danger w-100">Hubo un error al cargar las noticias.</p>';
    }
}

// -------------------------------------------------------------------
// Lógica para Detalle de Noticia
// -------------------------------------------------------------------
async function cargarDetalleNoticia() {
    const urlParams = new URLSearchParams(window.location.search);
    const noticiaId = urlParams.get('id');
    const container = document.getElementById('detalleContainer');
    const comentariosContainer = document.getElementById('comentariosContainer');
    const formContainer = document.getElementById('formComentarioContainer');

    if (!noticiaId) {
        container.innerHTML = '<h3 class="text-danger text-center">Noticia no encontrada</h3>';
        return;
    }

    try {
        const response = await fetch(`${API_URL}/noticias/${noticiaId}`);
        if (!response.ok) throw new Error('Error al cargar detalle');
        
        const noticia = await response.json();
        const fecha = new Date(noticia.createdAt).toLocaleDateString('es-ES');

        const imgHtml = noticia.imagen 
                ? `<img src="${noticia.imagen}" alt="${noticia.titulo}">` 
                : '';

        container.innerHTML = `
            <span class="badge bg-primary mb-2">${escapeHTML(noticia.categoria)}</span>
            <h1 class="mb-3">${escapeHTML(noticia.titulo)}</h1>
            <p class="text-muted">Por ${escapeHTML(noticia.author?.nombre || 'Anónimo')} el ${fecha}</p>
            ${imgHtml}
            <p class="lead fw-bold">${escapeHTML(noticia.copete)}</p>
            <div class="mt-4" style="white-space: pre-line;">${escapeHTML(noticia.contenido)}</div>
        `;

        const token = localStorage.getItem('token');

        // Cargar comentarios paginados
        cargarComentarios(noticiaId, 1);

        // Mostrar formulario de comentario si está logueado
        if (token) {
            formContainer.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5>Deja tu comentario</h5>
                        <form id="comentarioForm">
                            <div class="mb-3">
                                <textarea class="form-control" id="contenidoComentario" rows="3" maxlength="250" required placeholder="Escribe algo..."></textarea>
                                <div class="form-text text-muted small text-end">Máximo 250 caracteres.</div>
                            </div>
                            <button type="submit" class="btn btn-primary">Comentar</button>
                        </form>
                    </div>
                </div>
            `;
            
            document.getElementById('comentarioForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                const contenido = document.getElementById('contenidoComentario').value;
                
                try {
                    const res = await fetch(`${API_URL}/noticias/${noticiaId}/comentarios`, {
                        method: 'POST',
                        headers: getAuthHeaders(),
                        body: JSON.stringify({ contenido })
                    });
                    
                    if (res.ok) {
                        window.location.reload(); // Recargar para ver el nuevo comentario
                    } else {
                        const data = await res.json();
                        const validationErrors = data.details ? '\n' + data.details.map(d => d.msg).join('\n') : '';
                        alert((data.error || 'Error al enviar comentario.') + validationErrors);
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            });
        } else {
            formContainer.innerHTML = '<div class="alert alert-info">Debes <a href="login.html">iniciar sesión</a> para comentar.</div>';
        }

    } catch (error) {
        console.error(error);
        container.innerHTML = '<h3 class="text-danger text-center">Hubo un problema al cargar la noticia</h3>';
    }
}

window.cambiarPaginaComentarios = function(page) {
    const urlParams = new URLSearchParams(window.location.search);
    const noticiaId = urlParams.get('id');
    cargarComentarios(noticiaId, page);
}

async function cargarComentarios(noticiaId, page = 1) {
    const container = document.getElementById('comentariosContainer');
    if (!container) return;

    try {
        const response = await fetch(`${API_URL}/noticias/${noticiaId}/comentarios?page=${page}&limit=5`);
        if (!response.ok) throw new Error('Error cargando comentarios');
        const resData = await response.json();
        const comentarios = resData.data || [];

        const userStr = localStorage.getItem('user');
        const user = userStr ? JSON.parse(userStr) : null;

        if (comentarios.length > 0) {
            container.innerHTML = comentarios.map(c => {
                const canModify = user && (user.rol === 'admin' || user.id === c.user_id);
                const btnEdit = canModify
                    ? `<button class="btn btn-sm btn-outline-warning float-end ms-2" onclick="editarComentario(${noticiaId}, ${c.id}, '${c.contenido.replace(/'/g, "\\'")}')">Editar</button>`
                    : '';
                const btnDelete = canModify 
                    ? `<button class="btn btn-sm btn-outline-danger float-end" onclick="eliminarComentario(${noticiaId}, ${c.id})">Borrar</button>`
                    : '';
                return `
                <div class="card mb-3">
                    <div class="card-body">
                        ${btnDelete}
                        ${btnEdit}
                        <h6 class="card-subtitle mb-2 text-muted">${escapeHTML(c.user?.nombre || 'Anónimo')} - ${new Date(c.createdAt).toLocaleDateString('es-ES')}</h6>
                        <p class="card-text" id="comentario-texto-${c.id}">${escapeHTML(c.contenido)}</p>
                    </div>
                </div>
                `;
            }).join('');
        } else {
            container.innerHTML = '<p>No hay comentarios aún. ¡Sé el primero en comentar!</p>';
        }

        renderPagination('paginacionComentarios', resData.currentPage, resData.totalPages, 'cambiarPaginaComentarios');

    } catch (error) {
        console.error(error);
        container.innerHTML = '<p class="text-danger">Error al cargar los comentarios.</p>';
    }
}

// -------------------------------------------------------------------
// Lógica para Login
// -------------------------------------------------------------------
function initLoginForm() {
    const form = document.getElementById('loginForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();
            
            if (res.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                alert('¡Inicio de sesión exitoso! Redirigiendo...');
                window.location.assign('index.html');
            } else {
                const validationErrors = data.details ? '\n' + data.details.map(d => d.msg).join('\n') : '';
                alert((data.error || 'Error de autenticación') + validationErrors);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error de conexión con el servidor.');
        }
    });
}

// -------------------------------------------------------------------
// Lógica para Registro
// -------------------------------------------------------------------
function initRegistroForm() {
    const form = document.getElementById('registroForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const res = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, email, password })
            });

            const data = await res.json();
            
            if (res.ok) {
                alert('Registro exitoso. Ahora puedes iniciar sesión.');
                window.location.href = 'login.html';
            } else {
                const validationErrors = data.details ? '\n' + data.details.map(d => d.msg).join('\n') : '';
                alert((data.error || 'Error al registrar.') + validationErrors);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error de conexión con el servidor.');
        }
    });
}

// -------------------------------------------------------------------
// Lógica para Crear Noticia
// -------------------------------------------------------------------
function initCrearNoticiaForm() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Debes estar logueado para crear una noticia.');
        window.location.href = 'login.html';
        return;
    }

    const form = document.getElementById('crearNoticiaForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const body = {
            titulo: document.getElementById('titulo').value,
            copete: document.getElementById('copete').value,
            contenido: document.getElementById('contenido').value,
            categoria: document.getElementById('categoria').value,
            imagen: document.getElementById('imagen').value || null
        };

        try {
            const res = await fetch(`${API_URL}/noticias`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(body)
            });

            if (res.ok) {
                alert('Noticia publicada exitosamente');
                window.location.href = 'index.html';
            } else {
                const data = await res.json();
                const validationErrors = data.details ? '\n' + data.details.map(d => d.msg).join('\n') : '';
                alert((data.error || 'Error al publicar noticia.') + validationErrors);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error de conexión con el servidor.');
        }
    });
}

// -------------------------------------------------------------------
// Lógica para Funciones de Admin
// -------------------------------------------------------------------
async function eliminarNoticia(id) {
    if (!confirm('¿Estás seguro de que deseas eliminar esta noticia?')) return;
    try {
        const res = await fetch(`${API_URL}/noticias/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        if (res.ok) {
            alert('Noticia eliminada');
            window.location.reload();
        } else {
            const data = await res.json();
            alert(data.error || 'Error al eliminar la noticia');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function eliminarComentario(noticiaId, comentarioId) {
    if (!confirm('¿Estás seguro de que deseas eliminar este comentario?')) return;
    try {
        const res = await fetch(`${API_URL}/noticias/${noticiaId}/comentarios/${comentarioId}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        if (res.ok) {
            alert('Comentario eliminado');
            window.location.reload();
        } else {
            const data = await res.json();
            alert(data.error || 'Error al eliminar el comentario');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function editarComentario(noticiaId, comentarioId, contenidoActual) {
    const nuevoContenido = prompt('Edita tu comentario:', contenidoActual);
    if (nuevoContenido === null || nuevoContenido.trim() === '') return;

    try {
        const res = await fetch(`${API_URL}/noticias/${noticiaId}/comentarios/${comentarioId}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify({ contenido: nuevoContenido })
        });
        if (res.ok) {
            window.location.reload();
        } else {
            const data = await res.json();
            alert(data.error || 'Error al editar el comentario');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}


async function initEditarNoticiaForm() {
    const urlParams = new URLSearchParams(window.location.search);
    const noticiaId = urlParams.get('id');
    if (!noticiaId) return window.location.href = 'index.html';

    // Pre-cargar datos
    try {
        const response = await fetch(`${API_URL}/noticias/${noticiaId}`);
        if (response.ok) {
            const noticia = await response.json();
            document.getElementById('titulo').value = noticia.titulo;
            document.getElementById('copete').value = noticia.copete;
            document.getElementById('contenido').value = noticia.contenido;
            document.getElementById('categoria').value = noticia.categoria;
            document.getElementById('imagen').value = noticia.imagen || '';
        }
    } catch (error) {
        console.error('Error al cargar noticia para editar', error);
    }

    const form = document.getElementById('editarNoticiaForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const body = {
            titulo: document.getElementById('titulo').value,
            copete: document.getElementById('copete').value,
            contenido: document.getElementById('contenido').value,
            categoria: document.getElementById('categoria').value,
            imagen: document.getElementById('imagen').value || null
        };

        try {
            const res = await fetch(`${API_URL}/noticias/${noticiaId}`, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify(body)
            });
            if (res.ok) {
                alert('Noticia actualizada exitosamente');
                window.location.href = 'detalle.html?id=' + noticiaId;
            } else {
                const data = await res.json();
                const validationErrors = data.details ? '\n' + data.details.map(d => d.msg).join('\n') : '';
                alert((data.error || 'Error al actualizar noticia.') + validationErrors);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error de conexión con el servidor.');
        }
    });
}

// -------------------------------------------------------------------
// Event Listeners Globales
// -------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            cargarNoticias(1);
        });
    }

    const categorySelect = document.getElementById('categorySelect');
    if (categorySelect) {
        categorySelect.addEventListener('change', () => {
            cargarNoticias(1);
        });
    }
});
