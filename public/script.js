import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";
import { mallaData } from "./mallaData.js";

// DATABASE FIREBASE CONFIG
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
let cursosCompletados = new Set(JSON.parse(localStorage.getItem('cursosCompletados')) || []);
const mapaCursos = new Map(); // Instancias de clase Curso

const nivelesIngles = {
    INA1: "A1", INA2: "A2", INB1: "B1", INB2: "B2"
};

// ==========================================
// CLASE CURSO (ORIENTADA A OBJETOS)
// ==========================================
class Curso {
    constructor(data, ciclo = 0) {
        this.id = data.id;
        this.nombre = data.nombre;
        this.creditos = Number(data.creditos || 0);
        this.codigoSira = data.codigoSira || null;
        this.prerequisitos = data.prerequisitos || [];
        this.ciclo = ciclo;
        this.element = null;
    }

    get completado() {
        return cursosCompletados.has(this.id);
    }

    obtenerFaltantes(creditosElectivos) {
        const faltantes = [];

        for (const req of this.prerequisitos) {
            if (req === 'allX') {
                for (const [id, c] of mapaCursos.entries()) {
                    if (c.ciclo >= 1 && c.ciclo <= 10 && !c.completado) {
                        faltantes.push("Todos los cursos hasta el 10mo ciclo");
                        break;
                    }
                }
            } else if (req === 'allXI') {
                for (const [id, c] of mapaCursos.entries()) {
                    if (c.ciclo >= 1 && c.ciclo <= 11 && !c.completado) {
                        faltantes.push("Todos los cursos hasta el 11er ciclo");
                        break;
                    }
                }
            } else if (req === 'allXII') {
                for (const [id, c] of mapaCursos.entries()) {
                    if (c.ciclo >= 1 && c.ciclo <= 12 && !c.completado) {
                        faltantes.push("Todos los cursos hasta el 12vo ciclo");
                        break;
                    }
                }
            } else if (req === '8CRD') {
                if (creditosElectivos < 8) {
                    faltantes.push("Mínimo 8 créditos electivos");
                }
            } else if (req === 'EXSM') {
                if (!cursosCompletados.has('EXSM')) {
                    faltantes.push("Examen de Suficiencia Médica");
                }
            } else if (!cursosCompletados.has(req)) {
                // Si el requisito es un nivel de inglés (INA1, INA2, INB1, INB2):
                if (nivelesIngles[req]) {
                    faltantes.push(`Nivel de inglés ${nivelesIngles[req]}`);
                } else {
                    const reqObj = mapaCursos.get(req);
                    faltantes.push(reqObj ? reqObj.nombre : req);
                }
            }
        }
        return faltantes;
    }

    render(onClick, onMouseEnter, onMouseLeave, onContextMenu) {
        const div = document.createElement('div');
        div.className = `curso ${this.completado ? 'completado' : ''}`;
        div.id = `curso-${this.id}`;

        const p = document.createElement('p');
        p.textContent = this.nombre;
        div.appendChild(p);

        div.addEventListener('click', () => onClick(this));
        div.addEventListener('mouseenter', (e) => onMouseEnter(this, e));
        div.addEventListener('mouseleave', () => onMouseLeave());
        div.addEventListener('contextmenu', (e) => onContextMenu(this, e));

        this.element = div;
        return div;
    }

    actualizarEstadoDOM(creditosElectivos) {
        if (!this.element) return;

        const faltantes = this.obtenerFaltantes(creditosElectivos);
        const estaBloqueado = faltantes.length > 0 && !this.completado;

        if (this.completado) {
            this.element.classList.add('completado');
            this.element.classList.remove('bloqueado');
            this.element.style.pointerEvents = 'auto';
            this.element.style.opacity = '1';
        } else if (estaBloqueado) {
            this.element.classList.remove('completado');
            this.element.classList.add('bloqueado');
            this.element.style.opacity = '0.5';
        } else {
            this.element.classList.remove('completado', 'bloqueado');
            this.element.style.pointerEvents = 'auto';
            this.element.style.opacity = '1';
        }
    }
}

// ==========================================
// RENDERIZADO DINÁMICO DE LA MALLA
// ==========================================
function construirMalla() {
    const mainContainer = document.getElementById('malla-container');
    const electivosContainer = document.getElementById('electivos-container');
    const inglesContainer = document.getElementById('ingles-container');
    const segundoIdiomaContainer = document.getElementById('segundo-idioma-container');
    const egresadoContainer = document.getElementById('egresado-container');
    const otrosContainer = document.getElementById('otros-container');

    if (!mainContainer) return;

    mainContainer.innerHTML = '';
    electivosContainer.innerHTML = '';

    // 1. Renderizar Ciclos
    mallaData.ciclos.forEach(cicloData => {
        const divCiclo = document.createElement('div');
        divCiclo.className = 'ciclo';
        divCiclo.setAttribute('data-ciclo', cicloData.numero);
        divCiclo.innerHTML = `<p>CICLO ${cicloData.numero}</p>`;

        cicloData.cursos.forEach(c => {
            const cursoObj = new Curso(c, parseInt(cicloData.numero));
            mapaCursos.set(cursoObj.id, cursoObj);
            divCiclo.appendChild(cursoObj.render(handleCursoClick, handleMouseEnter, handleMouseLeave, handleContextMenu));
        });

        mainContainer.appendChild(divCiclo);
    });

    // 2. Renderizar Electivos
    mallaData.electivos.forEach(c => {
        const cursoObj = new Curso(c, 14);
        mapaCursos.set(cursoObj.id, cursoObj);
        electivosContainer.appendChild(cursoObj.render(handleCursoClick, handleMouseEnter, handleMouseLeave, handleContextMenu));
    });

    // 3. Renderizar Requisitos y Condiciones
    const renderGrupoReq = (lista, contenedor) => {
        if (!contenedor) return;
        contenedor.innerHTML = '';
        lista.forEach(c => {
            const cursoObj = new Curso(c, 0);
            mapaCursos.set(cursoObj.id, cursoObj);
            contenedor.appendChild(cursoObj.render(handleCursoClick, handleMouseEnter, handleMouseLeave, handleContextMenu));
        });
    };

    renderGrupoReq(mallaData.requisitos.ingles, inglesContainer);
    renderGrupoReq(mallaData.requisitos.segundoIdioma, segundoIdiomaContainer);
    renderGrupoReq(mallaData.requisitos.egresado, egresadoContainer);
    renderGrupoReq(mallaData.requisitos.otros, otrosContainer);

    actualizarTodosLosEstados();
}

function calcularCreditosElectivos() {
    let creditos = 0;
    mallaData.electivos.forEach(e => {
        if (cursosCompletados.has(e.id)) {
            creditos += Number(e.creditos || 0);
        }
    });
    return creditos;
}

function actualizarTodosLosEstados() {
    const creditosElectivos = calcularCreditosElectivos();
    mapaCursos.forEach(cursoObj => {
        cursoObj.actualizarEstadoDOM(creditosElectivos);
    });
}

// ==========================================
// EVENTOS DE INTERACCIÓN Y TOOLTIPS
// ==========================================
async function handleCursoClick(cursoObj) {
    const creditosElectivos = calcularCreditosElectivos();
    if (cursoObj.obtenerFaltantes(creditosElectivos).length > 0 && !cursoObj.completado) return;

    if (cursoObj.completado) {
        // 1. Desmarcamos el curso actual
        cursosCompletados.delete(cursoObj.id);

        // 2. PROPACIONAL EN CASCADA: Desmarca automáticamente todos los cursos
        // dependientes que ya no cumplan sus requisitos
        desmarcarDependientesInvalidos();
    } else {
        cursosCompletados.add(cursoObj.id);
        jsConfetti.addConfetti({
            emojis: ['🌈', '❤️', '✨', "🐬"],
            emojiSize: 20,
            confettiNumber: 150
        });
    }

    const arrayCompletados = [...cursosCompletados];
    localStorage.setItem('cursosCompletados', JSON.stringify(arrayCompletados));

    if (userUID) {
        await setDoc(doc(db, "usuarios", userUID), {
            cursosCompletados: arrayCompletados
        });
    }

    actualizarTodosLosEstados();
}

//TODO: Arreglar niveles de ingles
function handleMouseEnter(cursoObj, e) {
    const creditosElectivos = calcularCreditosElectivos();
    const faltantes = cursoObj.obtenerFaltantes(creditosElectivos);

    if (faltantes.length > 0 && !cursoObj.completado) {
        mostrarTooltip(e.pageX, e.pageY, `
            <strong>Curso bloqueado</strong><br>
            Te falta: ${faltantes.join(', ')}
        `);
    }
}

function handleMouseLeave() {
    const tooltip = document.getElementById('tooltip');
    if (tooltip) tooltip.style.display = 'none';
}

function handleContextMenu(cursoObj, e) {
    e.preventDefault();
    const creditosElectivos = calcularCreditosElectivos();
    const faltantes = cursoObj.obtenerFaltantes(creditosElectivos);

    const prereqNombres = cursoObj.prerequisitos.map(cod => {
        if (cod === 'allX') return 'Todos los cursos hasta el 10mo ciclo';
        if (cod === 'allXI') return 'Todos los cursos hasta el 11er ciclo';
        if (cod === 'allXII') return 'Todos los cursos hasta el 12vo ciclo';
        if (cod === '8CRD') return '8 créditos electivos aprobados';
        if (cod === 'EXSM') return 'Examen de Suficiencia Médica';
        if (nivelesIngles[cod]) return `Nivel de inglés ${nivelesIngles[cod]}`;
        const c = mapaCursos.get(cod);
        return c ? c.nombre : cod;
    });

    mostrarTooltip(e.pageX, e.pageY, `
        <strong>${cursoObj.nombre}</strong><br>
        Código: ${cursoObj.id}<br>
        Créditos: ${cursoObj.creditos || 'N/A'}<br>
        Pre-requisitos: ${prereqNombres.length > 0 ? prereqNombres.join(', ') : 'Ninguno'}
    `);
}

function mostrarTooltip(x, y, htmlContent) {
    const tooltip = document.getElementById('tooltip');
    if (!tooltip) return;

    tooltip.innerHTML = htmlContent;
    tooltip.style.display = 'block';
    tooltip.style.visibility = 'hidden';

    requestAnimationFrame(() => {
        const offset = 10;
        const tooltipWidth = tooltip.offsetWidth;
        const tooltipHeight = tooltip.offsetHeight;
        const pageWidth = window.innerWidth;
        const pageHeight = window.innerHeight;

        let left = x + offset;
        let top = y + offset;

        if (left + tooltipWidth > pageWidth) left = x - tooltipWidth - offset;
        if (top + tooltipHeight > pageHeight) top = y - tooltipHeight - offset;

        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
        tooltip.style.visibility = 'visible';
    });
}

// ==========================================
// ANIMACIÓN HEADER NAVBAR
// ==========================================
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
    "Ayuda keiko me tiene encerrao"
];

const nav = document.querySelector('.textoNav');
let mensajeActual = 0;

if (nav) {
    nav.innerHTML = `<span>${mensajesNav[mensajeActual]}</span>`;
    setInterval(() => {
        const siguienteMensaje = (mensajeActual + 1) % mensajesNav.length;
        const spanActual = nav.querySelector('span');
        const spanNuevo = document.createElement('span');
        spanNuevo.textContent = mensajesNav[siguienteMensaje];

        spanNuevo.style.transform = 'translateY(100%)';
        spanNuevo.style.opacity = '0';
        nav.appendChild(spanNuevo);

        void spanNuevo.offsetWidth;

        spanActual.style.transform = 'translateY(-100%)';
        spanActual.style.opacity = '0';
        spanNuevo.style.transform = 'translateY(0%)';
        spanNuevo.style.opacity = '1';

        setTimeout(() => {
            if (spanActual && spanActual.parentElement) nav.removeChild(spanActual);
        }, 500);

        mensajeActual = siguienteMensaje;
    }, 5000);
}

// ==========================================
// AUTHENTICATION & EASTER EGGS
// ==========================================
provider.addScope("https://www.googleapis.com/auth/calendar.readonly");

document.getElementById('login-btn')?.addEventListener('click', () => {
    signInWithPopup(auth, provider)
        .then(async (result) => {
            const user = result.user;
            userUID = user.uid;

            const loginBtn = document.getElementById('login-btn');
            if (loginBtn) loginBtn.style.display = 'none';

            const sesionBtn = document.createElement('button');
            let contadorEspecial = 0;
            sesionBtn.className = 'login-button';
            sesionBtn.id = 'sesion-btn';
            sesionBtn.textContent = `Sorprendeme 👀`;

            sesionBtn.addEventListener('click', () => {
                contadorEspecial++;

                if (contadorEspecial === 10) {
                    contadorEspecial = 0;
                    jsConfetti.addConfetti({
                        emojis: ['💩', '🤣', '🤡'],
                        emojiSize: 50,
                        confettiNumber: 500
                    });
                    const easterEgg = document.createElement('div');
                    easterEgg.className = 'easter-egg';
                    easterEgg.innerHTML = `
                        <img src="https://media.giphy.com/media/KcW0iKgbONHUxzWrIF/giphy.gif" width="480" height="480" alt="Easter Egg" />
                    `;
                    document.querySelectorAll('.easter-egg').forEach(e => e.remove());
                    document.body.appendChild(easterEgg);

                    const audio02 = document.getElementById('easter02');
                    if (audio02) {
                        audio02.currentTime = 0;
                        audio02.play().catch(console.warn);
                    }

                    setTimeout(() => easterEgg.remove(), 28000);
                } else {
                    const audio01 = document.getElementById('easter01');
                    if (audio01) {
                        audio01.currentTime = 0;
                        audio01.play().catch(console.warn);
                    }
                }
            });

            loginBtn.parentNode.appendChild(sesionBtn);

            const docRef = doc(db, "usuarios", userUID);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data().cursosCompletados || [];
                cursosCompletados = new Set(data);
                localStorage.setItem('cursosCompletados', JSON.stringify(data));
                actualizarTodosLosEstados();
            }
        })
        .catch(console.error);
});

// FullCalendar Init
document.addEventListener('DOMContentLoaded', () => {
    construirMalla();

    const calendarEl = document.getElementById('calendar');
    if (calendarEl && typeof FullCalendar !== 'undefined') {
        const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth'
        });
        calendar.render();
    }
});

// Desmarca automáticamente en cascada cualquier curso aprobado que se quede sin prerrequisitos
function desmarcarDependientesInvalidos() {
    let huboCambios = true;

    // Repetimos mientras haya cursos por desmarcar (para cubrir la cadena completa)
    while (huboCambios) {
        huboCambios = false;
        const creditosElectivos = calcularCreditosElectivos();

        for (const [id, cursoObj] of mapaCursos.entries()) {
            if (cursoObj.completado) {
                const faltantes = cursoObj.obtenerFaltantes(creditosElectivos);
                // Si al curso aprobado ahora le falta algún requisito, se desmarca solo
                if (faltantes.length > 0) {
                    cursosCompletados.delete(id);
                    huboCambios = true;
                }
            }
        }
    }
}