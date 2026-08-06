    export const mallaData = {
    ciclos: [
        {
        numero: "01",
        cursos: [
            { id: "QUI1", nombre: "Química", creditos: 5, codigoSira: "815080", prerequisitos: [] },
            { id: "MAT1", nombre: "Matemática", creditos: 3, codigoSira: "815081", prerequisitos: [] },
            { id: "LYO1", nombre: "Lengua y Oratoria", creditos: 5, codigoSira: "815082", prerequisitos: [] },
            { id: "INM1", nombre: "Introducción a la Medicina", creditos: 2, codigoSira: "815079", prerequisitos: [] },
            { id: "DEU1", nombre: "Desempeño Universitario", creditos: 2, codigoSira: "813857", prerequisitos: [] },
            { id: "BCM1", nombre: "Biología Celular y Molecular", creditos: 6, codigoSira: "815078", prerequisitos: [] }
        ]
        },
        {
        numero: "02",
        cursos: [
            { id: "REGE", nombre: "Redacción General", creditos: 3, codigoSira: "003923", prerequisitos: ["LYO1"] },
            { id: "RENA", nombre: "Realidad Nacional", creditos: 2, codigoSira: "810347", prerequisitos: ["DEU1"] },
            { id: "MOR1", nombre: "Morfofisiología I", creditos: 6, codigoSira: "815192", prerequisitos: ["BCM1"] },
            { id: "INTI", nombre: "Intro. a la Investigación", creditos: 3, codigoSira: "813510", prerequisitos: ["INM1"] },
            { id: "BIOQ", nombre: "Bioquímica", creditos: 5, codigoSira: "001013", prerequisitos: ["QUI1"] },
            { id: "ANAT", nombre: "Anatomía General", creditos: 3, codigoSira: "813995", prerequisitos: ["BCM1"] }
        ]
        },
        {
        numero: "03",
        cursos: [
            { id: "MOR2", nombre: "Morfofisiología II", creditos: 7, codigoSira: "814087", prerequisitos: ["ANAT", "MOR1"] },
            { id: "INMU", nombre: "Inmunología", creditos: 3, codigoSira: "815193", prerequisitos: ["MOR1", "BIOQ"] },
            { id: "GENM", nombre: "Genética Médica", creditos: 3, codigoSira: "814089", prerequisitos: ["BCM1"] },
            { id: "FILO", nombre: "Filosofía", creditos: 3, codigoSira: "810325", prerequisitos: [] },
            { id: "ESTG", nombre: "Estadística General", creditos: 4, codigoSira: "001007", prerequisitos: ["MAT1"] },
            { id: "EDUA", nombre: "Educación Ambiental", creditos: 2, codigoSira: "003922", prerequisitos: [] }
        ]
        },
        {
        numero: "04",
        cursos: [
            { id: "MOR3", nombre: "Morfofisiología III", creditos: 7, codigoSira: "814090", prerequisitos: ["MOR2"] },
            { id: "INFB", nombre: "Infectología Básica", creditos: 5, codigoSira: "815194", prerequisitos: ["INMU"] },
            { id: "FCP1", nombre: "Fisiopatología I", creditos: 4, codigoSira: "814091", prerequisitos: ["MOR2", "INMU"] },
            { id: "DESA", nombre: "Desarrollo y Crecimiento", creditos: 3, codigoSira: "815195", prerequisitos: ["GENM", "MOR1"] },
            { id: "BIOE", nombre: "Bioetica", creditos: 2, codigoSira: "814097", prerequisitos: ["INM1", "FILO"] }
        ]
        },
        {
        numero: "05",
        cursos: [
            { id: "SALM", nombre: "Salud Mental", creditos: 4, codigoSira: "815199", prerequisitos: ["BIOE"] },
            { id: "MOR4", nombre: "Morfofisiología IV", creditos: 6, codigoSira: "815196", prerequisitos: ["MOR3"] },
            { id: "FUMI", nombre: "Fundamentos de Medicina Interc", creditos: 2, codigoSira: "815200", prerequisitos: ["FILO", "RENA"] },
            { id: "FCP2", nombre: "Fisiopatología II", creditos: 5, codigoSira: "815197", prerequisitos: ["FCP1", "MOR3", "INFB"] },
            { id: "BIES", nombre: "Bioestadística", creditos: 2, codigoSira: "815198", prerequisitos: ["ESTG", "INTI"] }
        ]
        },
        {
        numero: "06",
        cursos: [
            { id: "SEBS", nombre: "Semiología Basada en la Simulación", creditos: 2, codigoSira: "815360", prerequisitos: ["MOR4", "FCP2", "INA2"] },
            { id: "SEMI", nombre: "Semiología", creditos: 5, codigoSira: "815201", prerequisitos: ["MOR4", "FCP2", "INA2"] },
            { id: "FARM", nombre: "Farmacología", creditos: 6, codigoSira: "815203", prerequisitos: ["INFB", "INA2"] },
            { id: "APAD", nombre: "Apoyo al Diagnóstico", creditos: 3, codigoSira: "815202", prerequisitos: ["MOR4", "INA2"] },
            { id: "ANPA", nombre: "Anatomía Patológica", creditos: 4, codigoSira: "814101", prerequisitos: ["MOR4", "FCP2", "INA2"] }
        ]
        },
        {
        numero: "07",
        cursos: [
            { id: "NYPS", nombre: "Mutrición y Prácticas Saludables", creditos: 4, codigoSira: "815207", prerequisitos: ["FARM", "INA2"] },
            { id: "METD", nombre: "Metodología de la Investigación", creditos: 2, codigoSira: "814106", prerequisitos: ["BIES", "INA2"] },
            { id: "MEI1", nombre: "Medicina Interna I", creditos: 10, codigoSira: "815204", prerequisitos: ["ANPA", "SEMI", "SEBS", "APAD", "INA2"] },
            { id: "EPID", nombre: "Epidemiología", creditos: 4, codigoSira: "815205", prerequisitos: ["BIES", "INA2"] },
            { id: "ATPS", nombre: "Atención Primaria en la Salud", creditos: 4, codigoSira: "815210", prerequisitos: ["SEMI", "FUMI", "INA2"] }
        ]
        },
        {
        numero: "08",
        cursos: [
            { id: "SPYC", nombre: "Seguridad del Paciente y Calidad", creditos: 2, codigoSira: "815206", prerequisitos: ["BIOE", "MEI1", "INB1"] },
            { id: "SAPU", nombre: "Salud Pública", creditos: 4, codigoSira: "815209", prerequisitos: ["EPID", "METD", "ATPS", "INB1"] },
            { id: "MEI2", nombre: "Medicina Interna II", creditos: 10, codigoSira: "815208", prerequisitos: ["MEI1", "INB1"] },
            { id: "MEBE", nombre: "Medicina Basada en la Evidencia", creditos: 2, codigoSira: "815619", prerequisitos: ["EPID", "METD", "INB1"] }
        ]
        },
        {
        numero: "09",
        cursos: [
            { id: "TES1", nombre: "Tesis I", creditos: 2, codigoSira: "815212", prerequisitos: ["MEBE", "INB1"] },
            { id: "TERA", nombre: "Terapeutica", creditos: 2, codigoSira: "001053", prerequisitos: ["MEI2", "FARM", "SPYC", "INB1"] },
            { id: "SICI", nombre: "Simulación Clínica Integrada", creditos: 3, codigoSira: "815361", prerequisitos: ["MEI2", "INB1"] },
            { id: "MELE", nombre: "Medicina Legal", creditos: 2, codigoSira: "001061", prerequisitos: ["BIOE", "MEI2", "SAPU", "INB1"] },
            { id: "MEI3", nombre: "Medicina Interna III", creditos: 10, codigoSira: "815211", prerequisitos: ["MEI2", "INB1"] }
        ]
        },
        {
        numero: "10",
        cursos: [
            { id: "SIQI", nombre: "Simulación Quirúrgica", creditos: 2, codigoSira: "815362", prerequisitos: ["MEI3", "SICI", "INB1"] },
            { id: "ECOG", nombre: "Ecografía", creditos: 2, codigoSira: "814113", prerequisitos: ["APAD", "SEMI", "INB1"] },
            { id: "CPRF", nombre: "Cuidados Peliativos y Rehabilitación Física", creditos: 2, codigoSira: "815214", prerequisitos: ["TERA", "SPYC", "INB1"] },
            { id: "CIRU", nombre: "Cirugía", creditos: 11, codigoSira: "815213", prerequisitos: ["MEI3", "SICI", "INB1"] },
            { id: "ANC1", nombre: "Análisis de Casos I", creditos: 2, codigoSira: "815215", prerequisitos: ["MEI3", "SICI", "TERA", "INB1"] }
        ]
        },
        {
        numero: "11",
        cursos: [
            { id: "TES2", nombre: "Tesis II", creditos: 2, codigoSira: "815218", prerequisitos: ["TES1", "INB1"] },
            { id: "SIPE", nombre: "Simulación Pediátrica", creditos: 2, codigoSira: "815363", prerequisitos: ["ANC1", "INB1"] },
            { id: "SIGO", nombre: "Simulación Gineco-Obstetricia", creditos: 2, codigoSira: "815364", prerequisitos: ["CIRU", "SIQI", "INB1"] },
            { id: "PEDI", nombre: "Pediatría", creditos: 10, codigoSira: "815216", prerequisitos: ["ANC1", "INB1"] },
            { id: "GIOB", nombre: "Ginecología y Obstetricia", creditos: 6, codigoSira: "815217", prerequisitos: ["CIRU", "SIQI", "INB1"] }
        ]
        },
        {
        numero: "12",
        cursos: [
            { id: "PRIN", nombre: "Pre-Internado", creditos: 16, codigoSira: "815219", prerequisitos: ["allXI", "INB1"] },
            { id: "INBI", nombre: "Informática Biomédica", creditos: 2, codigoSira: "812812", prerequisitos: ["SAPU", "INB1"] },
            { id: "GESA", nombre: "Gerencia en Salud", creditos: 2, codigoSira: "815220", prerequisitos: ["SAPU", "INB1"] },
            { id: "ANC2", nombre: "Análisis de Casos II", creditos: 2, codigoSira: "815221", prerequisitos: ["ANC1", "INB1"] }
        ]
        },
        {
        numero: "13",
        cursos: [
            { id: "TRIN", nombre: "Trabajo de Investigación", creditos: 1, codigoSira: "815222", prerequisitos: ["allXII", "8CRD", "EXSM", "INB1"] },
            { id: "INPE", nombre: "Internado en Pediatría", creditos: 10, codigoSira: "001078", prerequisitos: ["allXII", "8CRD", "EXSM", "INB1"] },
            { id: "INME", nombre: "Internado en Medicina", creditos: 10, codigoSira: "001077", prerequisitos: ["allXII", "8CRD", "EXSM", "INB1"] },
            { id: "INCI", nombre: "Internado en Cirugía", creditos: 10, codigoSira: "001075", prerequisitos: ["allXII", "8CRD", "EXSM", "INB1"] },
            { id: "INGO", nombre: "Internado en Ginecología y Obstetricia", creditos: 10, codigoSira: "001076", prerequisitos: ["allXII", "8CRD", "EXSM", "INB1"] }
        ]
        }
    ],

    electivos: [
        { id: "UCAM", nombre: "Uso Correcto de Antibióticos y M. de In.", creditos: 2, prerequisitos: ["FARM", "INFB"] },
        { id: "SIMS", nombre: "Simulación en Salud", creditos: 2, prerequisitos: ["PCTA"] },
        { id: "RADA", nombre: "Radioanatomía", creditos: 2, prerequisitos: ["MOR3"] },
        { id: "PCTA", nombre: "Procesos Cognitivos y Teorías del Aprendizaje", creditos: 2, prerequisitos: ["NUSA"] },
        { id: "PRAX", nombre: "Primeros Auxilios (E)", creditos: 2, prerequisitos: ["ANAT"] },
        { id: "NUMA", nombre: "Neuropsicofarmacia y Medicina de Ac.", creditos: 2, prerequisitos: ["UCAM"] },
        { id: "NUSA", nombre: "Neurociencia en Salud", creditos: 2, prerequisitos: ["MOR4", "REGE"] },
        { id: "MDOC", nombre: "Medicina Ocupacional", creditos: 2, prerequisitos: ["SALM"] },
        { id: "MDII", nombre: "Medicina Interna Interprofesional", creditos: 2, prerequisitos: ["MEI1"] },
        { id: "MTAC", nombre: "Medicina Tradicional Alternativa y Complementaria", creditos: 2, prerequisitos: ["FUMI"] },
        { id: "LISA", nombre: "Liderazgo en Salud", creditos: 2, prerequisitos: ["DEU1", "INM1"] },
        { id: "INIC", nombre: "Introducción a la Investigación Cua.", creditos: 2, prerequisitos: ["IAD1"] },
        { id: "IAD1", nombre: "Introducción al Análisis de Datos I", creditos: 2, prerequisitos: ["ESTG", "INTI"] },
        { id: "IAD2", nombre: "Introducción al Análisis de Datos II", creditos: 2, prerequisitos: ["IAD1"] },
        { id: "IRVS", nombre: "Introducción a las Revisiones Sistemáticas Met-Análisis", creditos: 2, prerequisitos: ["METD"] },
        { id: "HIME", nombre: "Historia de la Medicina", creditos: 2, prerequisitos: ["BIOE", "RENA"] },
        { id: "GERS", nombre: "Gestión de Riesgos en Salud", creditos: 2, prerequisitos: ["ESTG"] },
        { id: "GEPS", nombre: "Gestión de Proyectos en Salud", creditos: 2, prerequisitos: ["LISA"] },
        { id: "FAEP", nombre: "Farmacología y Epigenética", creditos: 2, prerequisitos: ["GENM"] },
        { id: "EQTR", nombre: "Equinoterapia", creditos: 2, prerequisitos: ["INM1"] },
        { id: "DOBS", nombre: "Docencia Basada en Simulación", creditos: 2, prerequisitos: ["BIOE"] },
        { id: "DBAC", nombre: "Docencia Basada en Análisis de Casos", creditos: 2, prerequisitos: ["PCTA"] },
        { id: "DEAR", nombre: "Desarrollo Artístico", creditos: 2, prerequisitos: ["DEU1"] },
        { id: "BUSI", nombre: "Búsqueda Sistemática de Información", creditos: 2, prerequisitos: ["IAD2", "INIC"] },
        { id: "AUME", nombre: "Auditoría Médica", creditos: 2, prerequisitos: ["GERS"] },
        { id: "APIN", nombre: "Aprendizaje Interprofesional", creditos: 2, prerequisitos: ["MEI1"] }
    ],

    requisitos: {
        ingles: [
        { id: "INA1", nombre: "A1", prerequisitos: [] },
        { id: "INA2", nombre: "A2", prerequisitos: ["INA1"] },
        { id: "INB1", nombre: "B1", prerequisitos: ["INA2"] },
        { id: "INB2", nombre: "B2", prerequisitos: ["INB1"] }
        ],
        segundoIdioma: [
        { id: "SIA1", nombre: "A1", prerequisitos: [] },
        { id: "SIA2", nombre: "A2", prerequisitos: ["SIA1"] }
        ],
        egresado: [
        { id: "PRCT", nombre: "Prácticas Pre-Profesionales", prerequisitos: [] },
        { id: "ACEX", nombre: "Actividad Extracurricular", prerequisitos: [] }
        ],
        otros: [
        { id: "TRIN_REQ", nombre: "Trabajo de Investigación", creditos: 1, codigoSira: "815222", prerequisitos: ["allXII", "8CRD", "EXSM"] },
        { id: "EXSM", nombre: "Examen de Suficiencia Médica", prerequisitos: [] }
        ]
    }
    };