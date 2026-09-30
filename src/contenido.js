// construye la ruta de cada archivo dentro de public
const archivo = (ruta) => `${import.meta.env.BASE_URL}${ruta}`;

// Aquí puedes agregar tantas canciones como quieras.
// Cada canción debe tener un id diferente.

export const canciones = [
    {
        id: 'cancion-1',
        titulo: 'Love Language',
        artista: 'Kim Min Seok',
        src: archivo('music/cancion-1.mp3'),
    },
    {
        id: 'cancion-2',
        titulo: 'Cantares de Varka/Stoico',
        artista: 'DreamWorks',
        src: archivo('music/cancion-2.mp3'),
    },
    {
        id: 'cancion-3',
        titulo: 'Cancion 3',
        artista: 'Artista desconocido',
        src: archivo('music/cancion-3.mp3'),
    },
    {
        id: 'cancion-4',
        titulo: 'Cancion 4',
        artista: 'Artista Desconocido',
        src: archivo('music/cancion-4.mp3'),
    },
    {
        id: 'cancion-5',
        titulo: 'Cancion 5',
        artista: 'Artista desconocido',
        src: archivo('music/cancion-5.mp3'),
    },
    {
        id: 'cancion-6',
        titulo: 'Cancion 6',
        artista: 'Artista desconcido',
        src: archivo('music/cancion-6.mp3'),
    },
];

// Aquí agregas tus imágenes y lo que significan para ti.
export const imagenes = [
    {
        image: archivo('img/chica-2.jpg'),
        label: 'Todavía hay cielo',
        alt: 'Un cielo que me da calma',
    },
    {
        image: archivo('img/cielo2.jpg'),
        label: '¿Qué hice?',
        alt: 'Un buen cielo',
    },
    {
        image: archivo('img/mar.jpg'),
        label: 'El mar de la calma',
        alt: 'Un mar que me debe de dar calma',
    },
];

