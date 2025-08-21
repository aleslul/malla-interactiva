import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";



// DATABASE
const firebaseConfig = {
    apiKey: "AIzaSyDTHGzByR6Vi90xSPLuXklzVi8mLMcsP0g",
    authDomain: "mallainteractiva-bd28f.firebaseapp.com",
    projectId: "mallainteractiva-bd28f",
    storageBucket: "mallainteractiva-bd28f.firebasestorage.app",
    messagingSenderId: "321124874020",
    appId: "1:321124874020:web:0b00fd1f53fa1bd4f725b1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
const jsConfetti = new JSConfetti();
let userUID = null;
let cursosCompletados = JSON.parse(localStorage.getItem('cursosCompletados')) || [];

const nivelesIngles = {
    INA1: "A1",
    INA2: "A2",
    INB1: "B1",
    INB2: "B2"
};

const mensajesNav = [
    "Bienvenida, Fabiana",
    "¿Lista para estudiar?",
    "Malla Interactiva",
    "Holas bolas :D",
    "RECOÑOOOOOO",
    "No te duermas",
    "🎶 La vida es una lenteja 🎶",
    "¿Qué tal tu día?",
    "So pechicchibol 🥀",
];

const nav = document.querySelector('.textoNav');
let mensajeActual = 0;

nav.innerHTML = `<span>${mensajesNav[mensajeActual]}</span>`;

setInterval(() => {
    const siguienteMensaje = (mensajeActual + 1) % mensajesNav.length;

    const spanActual = nav.querySelector('span');
    const spanNuevo = document.createElement('span');
    spanNuevo.textContent = mensajesNav[siguienteMensaje];

    // Inicia debajo (fuera de vista)
    spanNuevo.style.transform = 'translateY(100%)';
    spanNuevo.style.opacity = '0';

    nav.appendChild(spanNuevo);

    // Forzar reflow
    void spanNuevo.offsetWidth;

    // Activar transiciones
    spanActual.style.transform = 'translateY(-100%)';
    spanActual.style.opacity = '0';

    spanNuevo.style.transform = 'translateY(0%)';
    spanNuevo.style.opacity = '1';

    // Limpiar
    setTimeout(() => {
        if (spanActual && spanActual.parentElement) {
            nav.removeChild(spanActual);
        }
    }, 500);

    mensajeActual = siguienteMensaje;
}, 5000);


// MOSTRAR NOMBRES DE LOS CURSOS
document.querySelectorAll('.curso').forEach(curso => {
    const nombre = curso.dataset.nombre;
    const p = document.createElement('p');
    p.textContent = nombre;
    curso.appendChild(p);
});

// LOCAL STORAGE LOL
document.querySelectorAll('.curso').forEach(curso => {
    const codigo = curso.dataset.curso;
    if (cursosCompletados.includes(codigo)) {
        curso.classList.add('completado');
    }
});
actualizarCursosBloqueados(); 

// ESTO ES PARA QUE AL HACER CLICK EN UN CURSO SE MARQUE COMO COMPLETADO O NO
document.querySelectorAll('.curso').forEach(curso => {
    const codigo = curso.dataset.curso;

    curso.addEventListener('click', async () => {
        if (curso.classList.contains('bloqueado')) return;

        curso.classList.toggle('completado');
        const estaCompletado = curso.classList.contains('completado');

        if (estaCompletado) {
            if (!cursosCompletados.includes(codigo)) {
                cursosCompletados.push(codigo);
                jsConfetti.addConfetti({
                    emojis: ['🌈', '❤️', '✨', "🐬"],
                    emojiSize: 20,
                    confettiNumber: 150
                });
            }
        } else {
            cursosCompletados = cursosCompletados.filter(c => c !== codigo);
        }

        localStorage.setItem('cursosCompletados', JSON.stringify(cursosCompletados));

        if (userUID) {
            await setDoc(doc(db, "usuarios", userUID), {
                cursosCompletados
            });
        }
        actualizarCursosBloqueados();
    });

    curso.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        mostrarTooltip(curso, e.pageX, e.pageY);
    });
});

// EL LOGIN CON GOOGLE
document.getElementById('login-btn').addEventListener('click', () => {
    signInWithPopup(auth, provider)
        .then(async (result) => {
            const user = result.user;
            userUID = user.uid;
            console.log("Sesión iniciada como:", user.displayName);

            // Ocultar botón de login
            const loginBtn = document.getElementById('login-btn');
            loginBtn.style.display = 'none';

            // Crear botón de sesión iniciada
            const sesionBtn = document.createElement('button');
            let contadorEspecial = 0;
            sesionBtn.className = 'login-button';
            sesionBtn.id = 'sesion-btn';
            sesionBtn.textContent = `Sorpéndeme 👀`;

            sesionBtn.addEventListener('click', () => {
                contadorEspecial++;

                if (contadorEspecial === 10) {
                    contadorEspecial = 0;
                    jsConfetti.addConfetti({
                        emojis: ['💩', '🤣', '🤡', 'KBRAZO'],
                        emojiSize: 50,
                        confettiNumber: 5000
                    });
                    const easterEgg = document.createElement('div');
                    easterEgg.className = 'easter-egg';
                    easterEgg.innerHTML = `
                        <img src="https://media.giphy.com/media/KcW0iKgbONHUxzWrIF/giphy.gif" width="480" height="480" alt="Easter Egg" />
                    `;
                    document.querySelectorAll('.easter-egg').forEach(e => e.remove());
                    document.body.appendChild(easterEgg);

                    const audio01 = document.getElementById('easter02');
                    audio01.currentTime = 0;
                    audio01.play().catch(e => {
                        console.warn("Ups! me he olvidao el audio:", e);
                    });

                    setTimeout(() => {
                        easterEgg.remove();
                    }, 28000);    
                } else {
                    const audio02 = document.getElementById('easter01');
                    audio02.currentTime = 0;
                    audio02.play().catch(e => {
                        console.warn("ME HE DEJADO EL AUDIO EN CASA COÑOOOOOO", e);
                    });
                }
            });

            loginBtn.parentNode.appendChild(sesionBtn);
            const data = await cargarCursosFirestore();
            if (data) {
                cursosCompletados = data;
                localStorage.setItem('cursosCompletados', JSON.stringify(data));

                document.querySelectorAll('.curso').forEach(curso => {
                    const codigo = curso.dataset.curso;
                    if (cursosCompletados.includes(codigo)) {
                        curso.classList.add('completado');
                    } else {
                        curso.classList.remove('completado');
                    }
                });

                actualizarCursosBloqueados();
            }
        })
        .catch((error) => {
            console.error("Error en el login:", error);
        });
});

// Cargar cursos completados desde Firestore
async function cargarCursosFirestore() {
    const docRef = doc(db, "usuarios", userUID);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data().cursosCompletados || [] : [];
}

// Actualizar el estado de los cursos bloqueados
// Esta función revisa los cursos y actualiza su estado de bloqueado/completado
function actualizarCursosBloqueados() {
    const completados = new Set(
        Array.from(document.querySelectorAll('.curso.completado'))
            .map(c => c.dataset.curso)
    );

    // Suma de créditos electivos completados
    const creditosElectivos = Array.from(document.querySelectorAll('.curso.completado'))
        .filter(c => c.closest('.electivos'))
        .reduce((sum, c) => sum + Number(c.dataset.creditos || 0), 0);

    // Agrupa cursos por ciclo (incluye electivos aunque no tengan .ciclo)
    const cursosPorCiclo = {};
    document.querySelectorAll('.curso').forEach(c => {
        // Si no tiene ciclo, ponlo en un ciclo especial (por ejemplo, 0)
        const ciclo = parseInt(c.closest('.ciclo')?.dataset.ciclo || c.closest('.electivos')?.dataset.ciclo || '0');
        if (!cursosPorCiclo[ciclo]) cursosPorCiclo[ciclo] = [];
        cursosPorCiclo[ciclo].push(c);
    });

    // Expande los tags especiales de prerequisito
    const expandirPrerrequisitos = (tag) => {
        if (tag === 'allX') {
            // Todos los cursos hasta el 10mo ciclo (excluye electivos)
            return Object.entries(cursosPorCiclo)
                .filter(([c]) => parseInt(c) > 0 && parseInt(c) <= 10)
                .flatMap(([, cursos]) => cursos.map(c => c.dataset.curso));
        }
        if (tag === 'allXII') {
            // Todos los cursos hasta el 12vo ciclo (excluye electivos)
            return Object.entries(cursosPorCiclo)
                .filter(([c]) => parseInt(c) > 0 && parseInt(c) <= 12)
                .flatMap(([, cursos]) => cursos.map(c => c.dataset.curso));
        }
        if (tag === '8CRD') {
            // Si ya tienes 8 créditos electivos, no bloquea, si no, bloquea por este tag especial
            return creditosElectivos >= 8 ? [] : ['__bloqueado_por_creditos__'];
        }
        return [tag];
    };

    document.querySelectorAll('.curso').forEach(curso => {
        const codigo = curso.dataset.curso;
        const prereqs = (curso.dataset.prerequisito || '').split(',').filter(Boolean);
        // Expande todos los prerequisitos (incluyendo los especiales)
        const todosRequisitos = prereqs.flatMap(expandirPrerrequisitos);
        // Faltantes reales (los que no están completados)
        const faltantes = todosRequisitos.filter(req => !completados.has(req));
        curso.setAttribute('data-prerequisitos-crudos', prereqs.join(','));

        if (faltantes.length === 0 || curso.classList.contains('completado')) {
            curso.classList.remove('bloqueado');
            curso.style.pointerEvents = 'auto';
            curso.style.opacity = '1';
            curso.removeAttribute('data-faltantes');
        } else {
            curso.classList.add('bloqueado');
            curso.style.opacity = '0.5';
            curso.setAttribute('data-faltantes', JSON.stringify(faltantes));
        }
    });
}


// MOSTRAR TOOLTIP EN HOVER Y EN ANTICLICK
function mostrarTooltipCurso(curso, x, y, tipo = 'info') {
    const tooltip = document.getElementById('tooltip');
    let html = '';

    if (tipo === 'bloqueado') {
        const crudos = (curso.dataset.prerequisitosCrudos || '').split(',').filter(Boolean);
        const nombresFaltantes = crudos.map(cod => {
            switch (cod) {
                case 'allX': return "Todos los cursos hasta el 10mo ciclo";
                case 'allXII': return "Todos los cursos hasta el 12vo ciclo";
                case '8CRD': return "Mínimo 8 créditos electivos";
                case 'EXSM': return "Examen de Suficiencia Médica";
                case 'INA1':
                case 'INA2':
                case 'INB1':
                case 'INB2':
                    return `Nivel de inglés ${nivelesIngles[cod]}`;
                default:
                    const el = document.querySelector(`.curso[data-curso="${cod}"]`);
                    return el ? el.dataset.nombre : cod;
            }
        });
        html = `
            <strong>Curso bloqueado</strong><br>
            Requiere: ${nombresFaltantes.length ? nombresFaltantes.join(', ') : 'Ninguno'}
        `;
    } else {
        const nombre = curso.dataset.nombre;
        const codigo = curso.dataset.curso;
        const creditos = curso.dataset.creditos || "N/A";
        const prerequisitos = (curso.dataset.prerequisito || '')
            .split(',')
            .map(p => p.trim())
            .filter(Boolean);

        let nombresPrerequisitos = [];
        nombresPrerequisitos = prerequisitos.map(cod => {
            switch (cod) {
                case 'allX':
                    return 'Todos los cursos hasta el 10mo ciclo';
                case 'allXII':
                    return 'Todos los cursos hasta el 12vo ciclo';
                case '8CRD':
                    return '8 créditos electivos aprobados';
                case 'EXSM':
                    return "Examen de Suficiencia Médica";
                case 'INA1':
                case 'INA2':
                case 'INB1':
                case 'INB2':
                    return `Nivel de inglés ${nivelesIngles[cod]}`;
                default:
                    const cursoElem = document.querySelector(`.curso[data-curso="${cod}"]`);
                    return cursoElem ? cursoElem.dataset.nombre : cod;
            }
        });


        html = `
            <strong>${nombre}</strong><br>
            Código: ${codigo}<br>
            Créditos: ${creditos}<br>
            Pre-requisitos: ${nombresPrerequisitos.length > 0 ? nombresPrerequisitos.join(', ') : 'Ninguno'}
        `;
    }

    tooltip.innerHTML = html;
    tooltip.style.display = 'block';
    tooltip.style.visibility = 'hidden';
    tooltip.style.left = '0px';
    tooltip.style.top = '0px';

    requestAnimationFrame(() => {
        const offset = 10;
        const tooltipWidth = tooltip.offsetWidth;
        const tooltipHeight = tooltip.offsetHeight;
        const pageWidth = window.innerWidth;
        const pageHeight = window.innerHeight;

        let left = x + offset;
        let top = y + offset;

        if (left + tooltipWidth > pageWidth) {
            left = x - tooltipWidth - offset;
        }
        if (top + tooltipHeight > pageHeight) {
            top = y - tooltipHeight - offset;
        }

        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
        tooltip.style.visibility = 'visible';
    });
}

// Listeners unificados para tooltip
document.querySelectorAll('.curso').forEach(curso => {
    curso.addEventListener('mouseenter', (e) => {
        if (curso.classList.contains('bloqueado')) {
            mostrarTooltipCurso(curso, e.pageX, e.pageY, 'bloqueado');
        }
    });
    curso.addEventListener('mouseleave', () => {
        document.getElementById('tooltip').style.display = 'none';
    });
    curso.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        mostrarTooltipCurso(curso, e.pageX, e.pageY, 'info');
    });
});


//TODO: RENDERIZAR CALENDARIO
document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth'
    });
    calendar.render();
});