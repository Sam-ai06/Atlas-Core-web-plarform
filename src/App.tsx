
import { useState } from 'react'
import type { ReactNode } from 'react'
import Login from './Login'
import Inicio from './Inicio'
import './App.css'

const problems = [
  [
    '▤',
    'Información dispersa entre sistemas',
    'Los datos tributarios se encuentran distribuidos en distintos softwares y archivos, dificultando su consolidación y aumentando la duplicación de tareas.',
  ],
  [
    '✓',
    'Verificaciones tributarias repetitivas',
    'Revisar las retenciones de IVA, ICE e Impuesto a la Renta exige comprobar valores, porcentajes y condiciones, incrementando el tiempo de revisión y el riesgo de errores.',
  ],
  [
    '⇩',
    'Descargas manuales y fragmentadas',
    'La obtención de comprobantes implica múltiples descargas y la organización manual de archivos, generando retrasos y riesgo de omisiones.',
  ],
]

const steps = [
  [
    'Importa tus comprobantes',
    'Carga archivos tributarios desde un solo lugar. Importa comprobantes y reportes en formatos como XML, TXT, Excel o CSV para reunir la información de tus clientes sin depender de procesos manuales.',
    '⇧',
    'XML · CSV · EXCEL',
  ],
  [
    'Organiza tu información automáticamente',
    'Atlas procesa los archivos importados, extrae los datos relevantes y los clasifica para facilitar su consulta, revisión y uso en tareas contables y tributarias.',
    '▦',
    'DOCUMENTOS ORGANIZADOS',
  ],
  [
    'Revisa con mayor claridad',
    'Consulta la información ya estructurada, identifica posibles inconsistencias y valida los datos antes de continuar con la preparación de anexos y declaraciones.',
    '⌕',
    'TODO EN ORDEN',
  ],
]

const plans = [
  {
    tag: 'LO ESENCIAL',
    name: 'Inicio',
    description: 'Para contadores independientes que dan el siguiente paso.',
    price: '$12,99',
    capacity: 'hasta 5 clientes · 500 comprobantes al mes',
    features: [
      'Importación de XML, Excel y CSV',
      'Organización de comprobantes',
      'Clasificación automática',
      'Asistente de IA (limitado)',
      'Detección de inconsistencias (básico)',
      'Calendario tributario',
      'Alertas de vencimientos',
      'Reportes y gráficos (básicos)',
    ],
  },
  {
    tag: 'RECOMENDADO',
    name: 'Profesional',
    description: 'Para gestionar más clientes con menos trabajo manual.',
    price: '$29,99',
    capacity: 'hasta 30 clientes · 5.000 comprobantes al mes',
    features: [
      'Todo lo incluido en Inicio',
      'Reportes y gráficos avanzados',
      'Asistente de IA con límites de uso dos veces mayores',
      'Detección de inconsistencias avanzada',
      'Mensajería automática (limitada)',
      'Soporte técnico prioritario',
    ],
  },
  {
    tag: 'TRABAJO EN EQUIPO',
    name: 'Despacho',
    description: 'Para firmas contables que necesitan escalar su operación.',
    price: '$79,99',
    capacity: 'Hasta 50 clientes · 7.000 comprobantes al mes',
    features: [
      'Todo lo incluido en Profesional',
      'Roles y permisos por usuario',
      'Seguimiento por cliente',
      'Reportes consolidados',
      'Gráficos estadísticos a medida',
      'Asistente de IA con límites de uso hasta 4 veces mayor',
      'Integraciones externas',
    ],
  },
]

function Mascot({ className = '' }: { className?: string }) {
  return (
    <span className={`mascot ${className}`} aria-hidden="true">
      <i />
      <i />
    </span>
  )
}

function Logo() {
  return (
    <a className="logo" href="#inicio" aria-label="Atlas Core, inicio">
      <span className="logo-mark" />
      <small>ATLAS CORE</small>
    </a>
  )
}

function Dashboard({ clients = false }: { clients?: boolean }) {
  return (
    <div className="dashboard">
      <aside className="dash-sidebar">
        <b>◉ &nbsp; Atlas | Studio</b>

        {[
          '▧  Dashboard',
          '♙  Clientes',
          '▤  Comprobantes',
          '⚖  Anexos',
          '▣  Gestión tributaria',
          '▦  Calendario',
        ].map((item) => (
          <span key={item}>{item}</span>
        ))}

        <span className="settings">⚙ Ajustes</span>
      </aside>

      <div className="dash-content">
        <div className="dash-heading">
          <b>{clients ? 'Vista general' : 'Buen día, Sam.'}</b>
          <small>
            {clients
              ? 'Listado de clientes actuales'
              : 'Esto ha cambiado desde la última vez que entraste'}
          </small>
        </div>

        {!clients && (
          <>
            <div className="stats">
              {[
                ['♧', 'Carpetas nuevas este mes', '4'],
                ['☷', 'Obligaciones próximas a vencer', '2'],
                ['⌁', 'Actividades pendientes', '6'],
              ].map((s) => (
                <div key={s[1]}>
                  <strong>{s[0]}</strong>
                  <small>{s[1]}</small>
                  <b>{s[2]}</b>
                  <em>↑ +2 esta semana</em>
                </div>
              ))}
            </div>

            <div className="chart">
              <b>Cashflow</b>
              <span>
                ● Inflow <i>● Outflow</i>
              </span>

              <svg
                viewBox="0 0 600 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <polyline points="0,20 65,67 110,75 160,52 210,78 260,82 310,45 360,61 410,8 460,48 510,49 560,67 600,95" />
                <polyline
                  className="green-line"
                  points="0,72 65,94 110,98 160,82 210,47 260,58 310,81 360,90 410,64 460,84 510,84 560,93 600,79"
                />
              </svg>
            </div>
          </>
        )}

        <div className="client-cards">
          {[
            ['Ana Torres - Sega Corp', '52%', 'orange'],
            ['Luis Carreño - NVIDIA', '87%', 'green'],
            ...(clients
              ? [['María Priscila', '73%', 'purple']]
              : []),
          ].map((c) => (
            <div className="client-card" key={c[0]}>
              <b>{c[0]}</b>

              <div className={`ring ${c[2]}`}>
                <strong>{c[1]}</strong>
                <small>Completado</small>
              </div>

              <small>
                Estado: <em>A tiempo</em>
              </small>

              {clients && (
                <>
                  <div className="progress" />
                  <p>Checklist　　　　　　　967 Sign-offs</p>
                  <div className="progress" />
                  <p>Conciliaciones　　　　　580 Sign-offs</p>
                  <a href="#contacto">Ver cliente completo</a>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SectionTitle({
  eyebrow,
  children,
  description,
}: {
  eyebrow?: string
  children: ReactNode
  description?: string
}) {
  return (
    <div className="section-title">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{children}</h2>
      {description && <p>{description}</p>}
    </div>
  )
}

function App() {
  const [slide, setSlide] = useState(0)
  const [sent, setSent] = useState(false)

  // Control de navegación entre las tres pantallas
  const [pantalla, setPantalla] = useState<
    'web' | 'login' | 'inicio'
  >('web')

  const captions = [
    'Mantén separados los documentos de cada contribuyente con nuestro sistema de tarjetas, en donde se puede ver la información resumida por cliente.',
    'Organiza tus comprobantes y consulta la información de tus clientes en un solo lugar.',
    'Revisa tus tareas y obligaciones con mayor claridad.',
  ]

  // Pantalla de inicio de sesión
  if (pantalla === 'login') {
    return (
      <Login
        onBack={() => setPantalla('web')}
        onLogin={() => setPantalla('inicio')}
      />
    )
  }

  // Panel administrativo de Atlas Core
  if (pantalla === 'inicio') {
    return (
      <Inicio
        onLogout={() => setPantalla('web')}
      />
    )
  }

  // Página comercial original
  return (
    <>
      <header className="header" id="inicio">
        <div className="nav-wrap">
          <Logo />

          <a className="main-page" href="#inicio">
            Main Page
          </a>

          <nav aria-label="Navegación principal">
            <a href="#planes">Planes y precios</a>
            <a href="#problema">Por qué Atlas Core</a>
            <a href="#soluciones">Soluciones</a>
            <a href="#contacto">Contacto</a>
          </nav>

          <button
            type="button"
            className="login"
            onClick={() => setPantalla('login')}
          >
            Iniciar sesión
          </button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <h1>
              Deja que <em>Atlas</em> lleve la carga.
              <br />
              Tú toma las decisiones.
            </h1>

            <p>
              Automatización y Transformación de Liquidaciones
              Avanzadas con Sistemas inteligentes.
              <br />
              automatiza tu estudio contable.
            </p>
          </div>

          <div className="hero-dashboard">
            <Dashboard />
            <Mascot className="hero-mascot" />
          </div>
        </section>

        <section className="problems section" id="problema">
          <SectionTitle
            eyebrow="El problema"
            description="La información dispersa, los procesos manuales y las verificaciones constantes consumen tiempo que podrías dedicar a tareas de mayor valor."
          >
            ¿Todavía <em>pierdes horas</em>
            <br />
            organizando comprobantes?
          </SectionTitle>

          <div className="problem-grid">
            {problems.map((p, i) => (
              <article className="problem-card" key={p[1]}>
                <div className={`problem-art art-${i}`}>
                  <span>{p[0]}</span>
                  <i>DATA</i>
                  <i>IVA</i>
                  <i>XML</i>
                </div>
                <h3>{p[1]}</h3>
                <p>{p[2]}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="solution section" id="soluciones">
          <SectionTitle eyebrow="La solución">
            Todo lo que necesitas para
            <br />
            <em>organizar tu trabajo tributario.</em>
          </SectionTitle>

          <div className="carousel">
            <Mascot className="solution-mascot" />

            <button
              className="carousel-arrow prev"
              onClick={() => setSlide((slide + 2) % 3)}
              aria-label="Anterior"
            >
              ‹
            </button>

            <Dashboard clients />

            <button
              className="carousel-arrow next"
              onClick={() => setSlide((slide + 1) % 3)}
              aria-label="Siguiente"
            >
              ›
            </button>
          </div>

          <div className="dots">
            {captions.map((caption, i) => (
              <button
                key={caption}
                className={slide === i ? 'active' : ''}
                onClick={() => setSlide(i)}
                aria-label={`Ver descripción ${i + 1}`}
              />
            ))}
          </div>

          <p className="carousel-caption">
            {captions[slide]}
          </p>

          <div className="workflow">
            <SectionTitle description="De importar comprobantes a preparar información tributaria. Con Atlas, simplifica tu flujo de trabajo en tres pasos.">
              Deja el <em>trabajo repetitivo</em> en
              <br />
              nuestras manos.
            </SectionTitle>

            <div className="steps">
              {steps.map((step, i) => (
                <article
                  className={`step step-${i}`}
                  key={step[0]}
                >
                  <span className="step-number">{i + 1}</span>

                  <div className="step-copy">
                    <h3>{step[0]}</h3>
                    <p>{step[1]}</p>
                  </div>

                  <div className="step-art">
                    <span className="art-orbit orbit-one" />
                    <span className="art-orbit orbit-two" />
                    <div className="art-icon">{step[2]}</div>
                    <div className="art-file file-one">▤</div>
                    <div className="art-file file-two">▦</div>
                    <b>{step[3]}</b>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="comparison section">
          <SectionTitle description="Descubre cómo Atlas transforma las tareas repetitivas en procesos más simples, organizados y eficientes.">
            Con todo <em>en manos de Atlas</em>, dedicarás más
            <br />
            tiempo para lo que realmente importa
          </SectionTitle>

          <div className="comparison-box">
            <div>
              <h3>Antes</h3>

              {[
                'Documentos en distintas carpetas',
                'Clasificación manual de comprobantes',
                'Revisiones repetitivas',
                'Seguimiento disperso de obligaciones en softwares diversos',
              ].map((x) => (
                <p key={x}>{x}</p>
              ))}
            </div>

            <div className="with-atlas">
              <h3>
                Con Atlas <Mascot />
              </h3>

              {[
                'Información centralizada por cliente',
                'Procesamiento y clasificación asistida',
                'Alertas de posibles inconsistencias',
                'Vencimientos y pendientes organizados',
              ].map((x) => (
                <p key={x}>{x}</p>
              ))}
            </div>
          </div>

          <div className="tagline">
            <h2>
              <em>Atlas organiza</em>, tú tomas la decisión
            </h2>
            <p>
              La tecnología como apoyo a tu criterio profesional,
              aplicado a la contabilidad
            </p>
          </div>
        </section>

        <section className="contact section" id="contacto">
          <div className="contact-copy">
            <div className="contact-decoration">
              <span />
              <span />
            </div>

            <h2>
              ¿Quieres conocer más sobre nuestra plataforma?
            </h2>

            <p>
              Cuéntanos sobre tus necesidades y te ayudaremos
              a encontrar la solución adecuada. Completa tus
              datos y uno de nuestros asesores te orientará
              según el tipo y cantidad de clientes que manejas.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                setSent(true)
              }}
            >
              <div className="form-row">
                <label>
                  Nombre completo
                  <input
                    required
                    placeholder="Ej. Samuel Alejandro Villagomez Rodríguez"
                  />
                </label>

                <label>
                  Correo electrónico
                  <input
                    type="email"
                    required
                    placeholder="Ej. nombre@empresa.com.ec"
                  />
                </label>
              </div>

              <div className="form-row form-options">
                <div>
                  <label>
                    ¿Cuál es tu perfil?
                    <select>
                      <option>Contador independiente</option>
                      <option>Firma contable</option>
                      <option>Empresa</option>
                    </select>
                  </label>

                  <label>
                    ¿Cuántos clientes o empresas gestionas?
                    <select>
                      <option>1 a 5</option>
                      <option>6 a 30</option>
                      <option>Más de 30</option>
                    </select>
                  </label>
                </div>

                <fieldset>
                  <legend>¿En qué podemos ayudarte?</legend>

                  {[
                    'Solicitar una demostración',
                    'Consultar planes y precios',
                    'Solicitar una cotización',
                    'Recibir más información',
                  ].map((x, i) => (
                    <label key={x}>
                      <input
                        type="radio"
                        name="help"
                        defaultChecked={i === 0}
                      />
                      {' '}{x}
                    </label>
                  ))}
                </fieldset>
              </div>

              <button className="submit" type="submit">
                Enviar información
              </button>

              {sent && (
                <p className="form-message" role="status">
                  Gracias por tu interés. El formulario necesita
                  conectarse a un servicio para enviar tus datos.
                </p>
              )}
            </form>
          </div>

          <div className="contact-visual">
            <div className="window">
              <span>✦</span>
              <span>✧</span>
              <span>✦</span>
            </div>

            <div className="books">▥ ▥ ▥ ▥</div>
            <Mascot />

            <div className="visual-caption">
              Más tiempo para
              <br />
              <em>lo que importa.</em>
            </div>
          </div>
        </section>

        <section className="pricing section" id="planes">
          <SectionTitle
            eyebrow="PLANES PARA CONTADORES"
            description="Elige el plan que acompaña a tu cartera de clientes y a tu equipo."
          >
            Menos tareas. <em>Más tiempo para crecer.</em>
          </SectionTitle>

          <div className="pricing-grid">
            {plans.map((plan, i) => (
              <article
                className={`plan ${i === 1 ? 'featured' : ''}`}
                key={plan.name}
              >
                <small>{plan.tag}</small>
                <h3>{plan.name}</h3>
                <p>{plan.description}</p>

                <div className="price">
                  {plan.price} <span>USD</span>
                </div>

                <small>por mes</small>
                <p className="capacity">{plan.capacity}</p>

                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      ✓ &nbsp;{feature}
                    </li>
                  ))}
                </ul>

                <a href="#contacto">
                  Elegir {i === 1 ? 'Pro' : plan.name}
                </a>
              </article>
            ))}
          </div>

          <p className="pricing-note">
            Facturación mensual en USD · Impuestos no incluidos · Sin permanencia
            <br />
            <small>
              Precios y capacidades de ejemplo; sujetos a definición comercial.
            </small>
          </p>
        </section>
      </main>

      <footer>
        <div className="footer-inner">
          <Logo />

          <div>
            <b>Atlas Core</b>
            <p>
              Guayaquil - Ecuador
              <br />
              Campus Gustavo Galindo
            </p>
          </div>

          <div>
            <b>Plataforma</b>
            <a href="#soluciones">Dashboard</a>
            <a href="#soluciones">Clientes</a>
            <a href="#soluciones">Comprobantes</a>
            <a href="#soluciones">Conciliación</a>
          </div>

          <div>
            <b>Recursos</b>
            <a href="#contacto">Contacto</a>
            <a href="#soluciones">Soluciones</a>
            <a href="#planes">Planes y Precios</a>
            <a href="#problema">Por qué Atlas</a>
          </div>
        </div>

        <div className="copyright">
          © 2026 Atlas Core. Todos los derechos reservados.
        </div>
      </footer>
    </>
  )
}

export default App
