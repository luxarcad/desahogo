import { useEffect, useRef, useState } from 'react';
import WakeSlider from './components/WakeSlider';
import AccordionGallery from './components/AccordionGallery';
import { canciones, imagenes } from './contenido';
import './App.css';

const CLAVE = 'desahogo:borrador:v1';

// Recupera lo que escribiste la última vez.
function leerBorrador() {
  try {
    return localStorage.getItem(CLAVE) ?? '';
  } catch {
    return '';
  }
}

export default function App() {
  const [texto, setTexto] = useState(leerBorrador);

  const [guardado, setGuardado] = useState(
    'Tu borrador se guarda en este navegador.'
  );

  const [indice, setIndice] = useState(0);
  const [volumen, setVolumen] = useState(40);
  const [errorAudio, setErrorAudio] = useState('');

  const audioRef = useRef(null);
  const cancion = canciones[indice];

  const palabras = texto.trim()
    ? texto.trim().split(/\s+/).length
    : 0;

  // Conecta el valor de WakeSlider con el volumen real del audio.
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volumen / 100;
    }
  }, [volumen, cancion?.id]);

  function escribir(evento) {
    const nuevoTexto = evento.target.value;
    setTexto(nuevoTexto);

    try {
      localStorage.setItem(CLAVE, nuevoTexto);
      setGuardado('Borrador guardado en este navegador.');
    } catch {
      setGuardado(
        'No pude guardar. Descarga tu texto para conservarlo.'
      );
    }
  }

  function descargarTexto() {
    const archivo = new Blob([texto], {
      type: 'text/plain;charset=utf-8',
    });

    const url = URL.createObjectURL(archivo);
    const enlace = document.createElement('a');

    enlace.href = url;
    enlace.download = 'lo-que-necesitaba-decir.txt';

    document.body.appendChild(enlace);
    enlace.click();
    enlace.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function elegirCancion(nuevoIndice) {
    setErrorAudio('');
    setIndice(nuevoIndice);
  }

  function cambiarVolumen(valor) {
    setVolumen(valor);

    if (audioRef.current) {
      audioRef.current.volume = valor / 100;
      audioRef.current.muted = false;
    }
  }

  return (
    <main className="refugio">
      <header className="portada">
        <span className="etiqueta">UN ESPACIO PARA MÍ</span>

        <h1>
          Lo que no supe <em>decir.</em>
        </h1>

        <p>
          Hoy puedo escribirlo como salga. Sin hacerlo bonito.
          Sin terminarlo todo.
        </p>

        <a className="boton" href="#libreta">
          Empezar por una línea ↘
        </a>
      </header>

      <div className="columnas">
        <section
          className="panel libreta"
          id="libreta"
          aria-labelledby="titulo-libreta"
        >
          <div className="cabecera">
            <div>
              <span className="etiqueta">01 / LAS PALABRAS</span>
              <h2 id="titulo-libreta">Lo que llevo dentro</h2>
            </div>

            <span className="contador">
              {palabras} palabras
            </span>
          </div>

          <label className="solo-lector" htmlFor="texto">
            Escribe lo que sientes
          </label>

          <textarea
            id="texto"
            value={texto}
            onChange={escribir}
            placeholder={
              'Me duele…\n\nLo que nunca dije fue…\n\nHoy necesito…'
            }
            spellCheck
          />

          <div className="pie-libreta">
            <small role="status">{guardado}</small>

            <button
              className="boton"
              onClick={descargarTexto}
              disabled={!texto.trim()}
            >
              Descargar mi texto ↓
            </button>
          </div>
        </section>

        <section
          className="panel musica"
          aria-labelledby="titulo-musica"
        >
          <span className="etiqueta">02 / LA MÚSICA</span>
          <h2 id="titulo-musica">Un poco de compañía</h2>

          <div className="disco" aria-hidden="true">
            <span>✦</span>
          </div>

          {cancion ? (
            <>
              <h3>{cancion.titulo}</h3>
              <p className="artista">{cancion.artista}</p>

              <audio
                key={cancion.id}
                ref={audioRef}
                src={cancion.src}
                controls
                preload="metadata"
                aria-label={`Reproducir ${cancion.titulo}`}
                onVolumeChange={(evento) => {
                  setVolumen(
                    Math.round(evento.currentTarget.volume * 100)
                  );
                }}
                onError={() => {
                  setErrorAudio(
                    'No pude abrir el audio. Revisa su nombre y la carpeta public/music.'
                  );
                }}
              />

              {errorAudio && (
                <p className="error" role="alert">
                  {errorAudio}
                </p>
              )}

              <div className="control-volumen">
                <span className="etiqueta">VOLUMEN</span>

                <WakeSlider
                  value={volumen}
                  onChange={cambiarVolumen}
                  min={0}
                  max={100}
                  bars={28}
                  height={48}
                  fillColor="#e9b9cf"
                  trackColor="#393242"
                  crestColor="#fff0f7"
                  showValue
                  formatValue={(valor) => `${valor}%`}
                  ariaLabel="Volumen de la música"
                />
              </div>
            </>
          ) : (
            <p>Agrega tu primera canción en contenido.js.</p>
          )}

          <p className="ayuda">
            Elige una canción y pulsa reproducir.
          </p>

          <ol className="playlist">
            {canciones.map((item, posicion) => (
              <li key={item.id}>
                <button
                  className={
                    posicion === indice ? 'pista activa' : 'pista'
                  }
                  onClick={() => elegirCancion(posicion)}
                  aria-pressed={posicion === indice}
                >
                  <span className="numero">
                    {String(posicion + 1).padStart(2, '0')}
                  </span>

                  <span>
                    <strong>{item.titulo}</strong>
                    <small>{item.artista}</small>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <section
        className="panel recuerdos"
        aria-labelledby="titulo-imagenes"
      >
        <span className="etiqueta">
          03 / OTRAS FORMAS DE MIRAR
        </span>

        <h2 id="titulo-imagenes">
          Imágenes que me acompañan
        </h2>

        <p className="ayuda">
          Pueden ser recuerdos, paisajes o lugares a los que
          todavía quiero ir.
        </p>

        <div className="galeria">
          {imagenes.length ? (
            <AccordionGallery
              items={imagenes}
              defaultIndex={0}
              height={340}
              expandRatio={0.6}
              accentColor="#e9b9cf"
              overlayColor="#17131e"
              tilt={0}
              parallax={0}
              trigger="click"
            />
          ) : (
            <p>Agrega tu primera imagen en contenido.js.</p>
          )}
        </div>
      </section>

      <footer>
        No tengo que resolverlo todo esta noche.
      </footer>
    </main>
  );
}