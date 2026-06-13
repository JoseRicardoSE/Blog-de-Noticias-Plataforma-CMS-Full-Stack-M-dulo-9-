import { User, Article, Comment } from '../src/models/index.js';

const seedDatabase = async () => {
  try {
    // 1. Crear usuarios de prueba
    const user = await User.create({
      nombre: 'Admin Blog',
      email: 'admin@blog.com',
      password: 'Password123!', // Válido según nueva regex
      rol: 'admin'
    });

    const user2 = await User.create({
      nombre: 'Lector Rustacean',
      email: 'lector@blog.com',
      password: 'Password123!' 
    });

    const user3 = await User.create({
      nombre: 'JS Developer',
      email: 'jsdev@blog.com',
      password: 'Password123!' 
    });

    // 2. Crear 12 Noticias de Prueba (Sinergia JS + Rust)
    const noticiasInfo = [
      {
        titulo: 'Por qué Rust es el mejor amigo de JavaScript',
        copete: 'Descubre cómo el lenguaje de programación de sistemas más amado está revolucionando el ecosistema de JavaScript.',
        contenido: 'Rust ha dejado de ser solo un lenguaje para sistemas operativos y ha entrado de lleno en el desarrollo web. Gracias a WebAssembly y a la creación de herramientas para el ecosistema JS (como compiladores y bundlers), Rust aporta seguridad de memoria y rendimiento nativo sin precedentes a las herramientas que los desarrolladores frontend usan todos los días.',
        categoria: 'Tecnología',
        imagen: 'https://images.unsplash.com/photo-1623479322729-28b25c16b011?auto=format&fit=crop&q=80&w=800'
      },
      {
        titulo: 'SWC y Turbopack: La revolución de la compilación',
        copete: 'Olvídate de las esperas de Webpack. SWC y Turbopack, escritos en Rust, son hasta 700x más rápidos.',
        contenido: 'Speedy Web Compiler (SWC) es un compilador extensible basado en Rust para la próxima generación de desarrollo web. Se utiliza en herramientas modernas como Next.js para reemplazar a Babel y Terser. Turbopack, por su parte, es el bundler sucesor de Webpack, capaz de actualizar módulos en caliente a una velocidad que cambia por completo la experiencia de desarrollo.',
        categoria: 'Herramientas',
        imagen: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800'
      },
      {
        titulo: 'Tauri: El futuro de las aplicaciones de escritorio',
        copete: 'Construye aplicaciones más ligeras y seguras utilizando tecnologías web en el frontend y Rust en el backend.',
        contenido: 'Electron ha dominado el mercado de apps de escritorio, pero su consumo de RAM siempre ha sido un problema. Tauri resuelve esto delegando el renderizado al WebView del sistema operativo nativo y usando Rust para la lógica profunda. El resultado son binarios increíblemente pequeños y eficientes, manteniendo la flexibilidad de React, Vue o Vanilla JS.',
        categoria: 'Desarrollo',
        imagen: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800'
      },
      {
        titulo: 'Deno: TypeScript nativo con el motor de Rust',
        copete: 'El creador de Node.js nos trae Deno, un runtime seguro por defecto construido con V8 y Rust.',
        contenido: 'Deno ha madurado enormemente. Al utilizar Rust en su núcleo (core) y V8 para la ejecución de JavaScript, Deno proporciona una API estándar similar a la web, ejecución nativa de TypeScript sin configuración previa, y un modelo de permisos explícito que impide el acceso a disco o red sin autorización del usuario.',
        categoria: 'Backend',
        imagen: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800'
      },
      {
        titulo: 'WebAssembly (Wasm): Rendimiento nativo en la Web',
        copete: 'Cómo Rust se convirtió en el lenguaje de primera clase para compilar módulos WebAssembly.',
        contenido: 'WebAssembly permite ejecutar código de bajo nivel en el navegador a velocidades casi nativas. Rust posee una cadena de herramientas excepcional (wasm-pack) que facilita la compilación de bibliotecas de Rust a Wasm, exponiéndolas a JavaScript para procesar cálculos pesados como decodificación de video, criptografía o renderizado 3D en la web.',
        categoria: 'WebAssembly',
        imagen: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800'
      },
      {
        titulo: 'N-API y Neon: Módulos de Node.js en Rust',
        copete: 'Escribe dependencias críticas de Node.js en Rust para evadir cuellos de botella.',
        contenido: 'Cuando Node.js se queda corto de rendimiento debido a procesos que bloquean el Event Loop, la solución clásica era escribir add-ons en C++. Hoy en día, herramientas como Neon o N-API con Rust-binding permiten escribir módulos nativos seguros (evitando memory leaks y segmentation faults) y consumirlos en Node como si fueran paquetes JS normales.',
        categoria: 'Backend',
        imagen: 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&q=80&w=800'
      },
      {
        titulo: 'Gestión de memoria: Garbage Collector vs Ownership',
        copete: 'Entendiendo cómo JavaScript y Rust manejan la memoria y por qué el modelo de Rust es revolucionario.',
        contenido: 'JavaScript utiliza un Garbage Collector (GC) que pausa la ejecución para limpiar la memoria no utilizada (Stop-the-world). Rust, en cambio, utiliza un sistema estricto de Ownership (Propiedad) y Borrowing en tiempo de compilación. Esto significa cero pausas en tiempo de ejecución, lo que lo hace ideal para sistemas de tiempo real y de alta concurrencia.',
        categoria: 'Arquitectura',
        imagen: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800'
      },
      {
        titulo: 'Cargo vs NPM: La batalla de los Gestores',
        copete: '¿Qué lecciones puede aprender el ecosistema de JavaScript del gestor de paquetes Cargo?',
        contenido: 'NPM ha moldeado el desarrollo web, pero a menudo sufre de problemas como "dependencias fantasma" o árboles gigantescos (node_modules). Cargo, el gestor de dependencias de Rust, es altamente valorado por su determinismo, compilación integrada, sistema de características opcionales (features) y su excelente documentación generada automáticamente.',
        categoria: 'Herramientas',
        imagen: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80&w=800'
      },
      {
        titulo: 'Cómo empezar con Rust si eres Frontend',
        copete: 'Una guía de conceptos puente para asimilar Rust si tu experiencia se basa en JavaScript.',
        contenido: 'Pasar de un lenguaje dinámicamente tipado a uno estricto y compilado puede ser intimidante. Sin embargo, conceptos modernos de JS (promesas, const, map/filter/reduce) se traducen muy bien al ecosistema Rust. Recomendamos empezar familiarizándose con el compilador de Rust (rustc) como si fuera un linter (ESLint) muy estricto pero amable.',
        categoria: 'Desarrollo',
        imagen: 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?auto=format&fit=crop&q=80&w=800'
      },
      {
        titulo: 'El ecosistema Serverless con Rust',
        copete: 'Tiempos de arranque en milisegundos: por qué Rust está dominando Cloudflare Workers y AWS Lambda.',
        contenido: 'En funciones Serverless, el "Cold Start" (tiempo de arranque en frío) es crítico. Mientras los contenedores Node.js o Java tardan en inicializarse, los binarios compilados de Rust inician en microsegundos y consumen una fracción de RAM, reduciendo enormemente los costos operativos en nubes públicas.',
        categoria: 'Backend',
        imagen: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800'
      },
      {
        titulo: 'Sinergia en Producción: Discord y Figma',
        copete: 'Casos de éxito de grandes empresas que reescribieron componentes críticos de JS a Rust.',
        contenido: 'Figma creó su asombroso motor de diseño renderizado en WebAssembly escrito en Rust. Discord migró sus servicios de sincronización de Node.js/Go a Rust para lidiar con enormes picos de concurrencia y estabilizar la latencia introducida por el recolector de basura. Estos casos de estudio demuestran la viabilidad a escala empresarial.',
        categoria: 'Tecnología',
        imagen: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
      },
      {
        titulo: 'Rolldown: El empaquetador del futuro basado en Rust',
        copete: 'Vite anuncia su transición hacia Rolldown, un bundler súper rápido para reemplazar a Rollup.',
        contenido: 'Vite se ha coronado como el bundler de desarrollo estándar en Frontend. Su creador, Evan You, anunció que están desarrollando Rolldown, un port en Rust del ecosistema Rollup. El objetivo final es unificar el rendimiento nativo con la flexibilidad de plugins que amamos, eliminando los cuellos de botella del empaquetado para producción.',
        categoria: 'Herramientas',
        imagen: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=800'
      },
      {
        titulo: 'Closures en JavaScript: La magia detrás del encapsulamiento',
        copete: 'Entiende uno de los conceptos más poderosos y temidos por los desarrolladores junior en JS.',
        contenido: 'Un closure (o clausura) en JavaScript es la combinación de una función agrupada junto con las referencias a su estado adyacente (el entorno léxico). Esto significa que una función interna siempre tiene acceso a las variables de la función externa, incluso después de que la función externa haya retornado. Es la base de patrones de diseño como el módulo y permite emular variables privadas en Vanilla JS.',
        categoria: 'JavaScript',
        imagen: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=800'
      },
      {
        titulo: 'El Event Loop de Node.js desmitificado',
        copete: 'Cómo un lenguaje de un solo hilo (Single-Threaded) puede manejar miles de peticiones concurrentes.',
        contenido: 'El secreto de Node.js reside en el Event Loop y la librería libuv. Aunque JavaScript se ejecuta en un solo hilo, las operaciones de entrada/salida (I/O) como llamadas a bases de datos, peticiones HTTP o lectura de archivos se delegan al sistema operativo. Cuando el OS termina, empuja un callback a la cola de mensajes (Task Queue) que el Event Loop procesará cuando el hilo principal esté libre.',
        categoria: 'Backend',
        imagen: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=800'
      },
      {
        titulo: 'ES Modules vs CommonJS: El cambio de paradigma',
        copete: 'La lenta pero constante migración de require() a import/export en el ecosistema Node.js.',
        contenido: 'Durante años, CommonJS (con su clásico module.exports y require) fue el estándar absoluto en el servidor, mientras que ESM (ES Modules) conquistaba el navegador. Hoy, Node.js soporta ESM de forma nativa. La migración de paquetes populares (como node-fetch o chalk) a "ESM-only" forzó a la comunidad a adoptar esta sintaxis asíncrona y estándar, marcando un antes y un después en el ecosistema.',
        categoria: 'JavaScript',
        imagen: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=800'
      },
      {
        titulo: 'Dominando Async/Await: Más allá de .then()',
        copete: 'Escribe código asíncrono que se lee como código síncrono. Errores comunes y mejores prácticas.',
        contenido: 'La llegada de async/await en ES2017 revolucionó JavaScript. Promesas que antes generaban "Callback Hells" o pirámides de .then() ahora se escriben de forma secuencial. Sin embargo, un error clásico es utilizar await dentro de bucles for...of, bloqueando la ejecución secuencialmente. Aprender a usar Promise.all() junto a async/await es vital para no desperdiciar la naturaleza concurrente de JS.',
        categoria: 'JavaScript',
        imagen: 'https://images.unsplash.com/photo-1496065187959-7f07b8353c55?auto=format&fit=crop&q=80&w=800'
      },
      {
        titulo: 'Programación Funcional en JavaScript Moderno',
        copete: 'Mutabilidad controlada, funciones puras y map/filter/reduce para código más predecible.',
        contenido: 'La programación funcional (FP) ha cobrado enorme relevancia en Frontend gracias a librerías como React y Redux. Evitar efectos secundarios (side-effects), usar inmutabilidad mediante el spread operator (...) y dominar Higher-Order Functions (HOF) permite construir bases de código mucho menos propensas a bugs difíciles de rastrear, facilitando además la escritura de pruebas unitarias (Unit Tests).',
        categoria: 'Desarrollo',
        imagen: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800'
      }
    ];

    const insertedArticles = [];
    for (const data of noticiasInfo) {
      const article = await Article.create({
        ...data,
        author_id: user.id
      });
      insertedArticles.push(article);
    }

    // 3. Crear 18 comentarios dinámicos, enfocados en el primer artículo para probar la paginación a fondo
    const comentariosData = [
      '¡Al fin! SWC salva mucho tiempo.',
      'Me encanta Tauri, acabo de migrar mi app de Electron a Tauri y el consumo bajó un 80%.',
      'El modelo de Ownership es complejo al principio pero te acostumbras.',
      'Excelente lectura, muy clara y concisa.',
      'Espero ver más sobre WebAssembly en el futuro.',
      'Gracias por la información, muy útil.',
      'Todavía creo que Node es más fácil de mantener en equipos grandes.',
      'Deno tiene mucho futuro, pero NPM es un ecosistema gigante.',
      'El performance de Rust es de otro planeta.',
      'Rust + SvelteKit es mi stack soñado.',
      'Amo usar Cargo, es el mejor package manager.',
      'Me asusta la curva de aprendizaje de Rust, pero lo intentaré.',
      'Las macros en Rust son una locura, super poderosas.',
      'La documentación de Rust también es de primera categoría.',
      'Ya era hora de que Vite pasara a Rust.',
      '¿Alguien recomienda un buen curso para pasar de TS a Rust?',
      'Definitivamente el frontend engineering se está volviendo systems engineering.',
      'Gran contenido, directo a favoritos.'
    ];

    // Asignar los primeros 12 comentarios al artículo 1 (para probar su paginación de detalles)
    for (let i = 0; i < 12; i++) {
      await Comment.create({
        contenido: comentariosData[i],
        article_id: insertedArticles[0].id,
        user_id: (i % 2 === 0) ? user2.id : user3.id
      });
    }

    // Distribuir el resto de comentarios en otros artículos al azar
    for (let i = 12; i < comentariosData.length; i++) {
      await Comment.create({
        contenido: comentariosData[i],
        article_id: insertedArticles[i % insertedArticles.length].id,
        user_id: user2.id
      });
    }

    console.log('✅ Base de datos poblada exitosamente con 12 noticias técnicas y comentarios.');
  } catch (error) {
    console.error('❌ Error al poblar la base de datos:', error);
  } finally {
    process.exit();
  }
};

seedDatabase();
