
import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import './Inicio.css'

// ============================================
// TIPOS DE DATOS
// ============================================

type InicioProps = {
  onLogout: () => void
}

type Cliente = {
  id: number
  ruc: string
  nombre: string
  estado: string
}

type Obligacion = {
  id: number
  cliente: string
  tipo: string
  estado: 'vencida' | 'hoy' | 'proxima' | 'aldia'
  detalle: string
}

type Honorario = {
  id: number
  cliente: string
  actividad: string
  monto: number
  fecha: string
  cobrado: boolean
}

type MenuItem = {
  id: string
  nombre: string
  icono: string
  hijos?: { id: string; nombre: string }[]
}

// ============================================
// DATOS DE DEMOSTRACIÓN
// ============================================

const clientesDemo: Cliente[] = [
  { id: 1, ruc: '0992847561001', nombre: 'Comercial Andina S.A.', estado: 'Activo' },
  { id: 2, ruc: '0912345678001', nombre: 'María Torres', estado: 'Activo' },
  { id: 3, ruc: '0997654321001', nombre: 'Servicios del Pacífico', estado: 'Activo' },
  { id: 4, ruc: '0923456789001', nombre: 'Carlos Mendoza', estado: 'Activo' },
  { id: 5, ruc: '0991234567001', nombre: 'Distribuidora del Sur', estado: 'Activo' },
  { id: 6, ruc: '0918765432001', nombre: 'Ana Rodríguez', estado: 'Activo' },
  { id: 7, ruc: '0993456781001', nombre: 'Inversiones Costa Azul', estado: 'Activo' },
  { id: 8, ruc: '0924567890001', nombre: 'Pedro Zambrano', estado: 'Activo' },
  { id: 9, ruc: '0998765432001', nombre: 'Grupo Empresarial Delta', estado: 'Activo' },
  { id: 10, ruc: '0915678901001', nombre: 'Lucía Fernández', estado: 'Activo' },
]

const obligacionesDemo: Obligacion[] = [
  { id: 1, cliente: 'Comercial Andina S.A.', tipo: 'IVA', estado: 'vencida', detalle: 'Declaración pendiente' },
  { id: 2, cliente: 'María Torres', tipo: 'IVA', estado: 'hoy', detalle: 'Vence hoy' },
  { id: 3, cliente: 'Servicios del Pacífico', tipo: 'ATS', estado: 'proxima', detalle: 'Próximo vencimiento' },
  { id: 4, cliente: 'Carlos Mendoza', tipo: 'Impuesto a la Renta', estado: 'vencida', detalle: 'Declaración pendiente' },
  { id: 5, cliente: 'Distribuidora del Sur', tipo: 'RDEP', estado: 'aldia', detalle: 'Obligación al día' },
  { id: 6, cliente: 'Ana Rodríguez', tipo: 'IVA', estado: 'proxima', detalle: 'Próximo vencimiento' },
  { id: 7, cliente: 'Inversiones Costa Azul', tipo: 'IVA', estado: 'hoy', detalle: 'Vence hoy' },
  { id: 8, cliente: 'Pedro Zambrano', tipo: 'ATS', estado: 'vencida', detalle: 'Declaración pendiente' },
  { id: 9, cliente: 'Grupo Empresarial Delta', tipo: 'IVA', estado: 'aldia', detalle: 'Obligación al día' },
  { id: 10, cliente: 'Lucía Fernández', tipo: 'IVA', estado: 'proxima', detalle: 'Próximo vencimiento' },
]

function fechaLocal() {
  const fecha = new Date()
  const anio = fecha.getFullYear()
  const mes = String(fecha.getMonth() + 1).padStart(2, '0')
  const dia = String(fecha.getDate()).padStart(2, '0')
  return `${anio}-${mes}-${dia}`
}

const fechaDemo = fechaLocal()

const honorariosDemo: Honorario[] = [
  { id: 1, cliente: 'Comercial Andina S.A.', actividad: 'Declaración IVA', monto: 420, fecha: fechaDemo, cobrado: true },
  { id: 2, cliente: 'María Torres', actividad: 'Impuesto a la Renta', monto: 350, fecha: fechaDemo, cobrado: true },
  { id: 3, cliente: 'Servicios del Pacífico', actividad: 'Anexo ATS', monto: 260, fecha: fechaDemo, cobrado: true },
  { id: 4, cliente: 'Carlos Mendoza', actividad: 'Asesoría tributaria', monto: 255, fecha: fechaDemo, cobrado: true },
  { id: 5, cliente: 'Distribuidora del Sur', actividad: 'Declaración IVA', monto: 80, fecha: fechaDemo, cobrado: false },
  { id: 6, cliente: 'Ana Rodríguez', actividad: 'Impuesto a la Renta', monto: 100, fecha: fechaDemo, cobrado: false },
  { id: 7, cliente: 'Inversiones Costa Azul', actividad: 'Anexo ATS', monto: 60, fecha: fechaDemo, cobrado: false },
  { id: 8, cliente: 'Pedro Zambrano', actividad: 'Asesoría tributaria', monto: 125, fecha: fechaDemo, cobrado: false },
]

// ============================================
// MENÚ LATERAL
// ============================================

const menu: MenuItem[] = [
  { id: 'inicio', nombre: 'INICIO', icono: '⌂' },
  {
    id: 'clientes',
    nombre: 'Clientes',
    icono: '♙',
    hijos: [
      { id: 'visualizar-clientes', nombre: 'Visualizar clientes' },
      { id: 'registrar-cliente', nombre: 'Registrar nuevo cliente' },
      { id: 'editar-cliente', nombre: 'Editar cliente' },
    ],
  },
  { id: 'comprobantes', nombre: 'Comprobantes', icono: '▤' },
  { id: 'conciliacion', nombre: 'Conciliación', icono: '⇄' },
  {
    id: 'anexos',
    nombre: 'Anexos tributarios',
    icono: '▦',
    hijos: [
      { id: 'ats', nombre: 'Anexo Transaccional Simplificado (ATS)' },
      { id: 'rdep', nombre: 'RDEP' },
      { id: 'aps', nombre: 'APS' },
      { id: 'adi', nombre: 'Anexo de Dividendos (ADI)' },
      { id: 'ice', nombre: 'Anexo ICE' },
    ],
  },
  { id: 'declaraciones', nombre: 'Declaraciones', icono: '▧' },
  { id: 'calendario', nombre: 'Calendario tributario', icono: '▦' },
  { id: 'alertas', nombre: 'Alertas y vencimientos', icono: '◉' },
  { id: 'reportes', nombre: 'Reportes y estadísticas', icono: '▥' },
  { id: 'asistente', nombre: 'Asistente Atlas IA', icono: '✦' },
  { id: 'honorarios', nombre: 'Gestión de honorarios', icono: '$' },
  { id: 'configuracion', nombre: 'Configuración', icono: '⚙' },
  { id: 'seguridad', nombre: 'Seguridad y usuarios', icono: '◇' },
]

// ============================================
// FUNCIONES AUXILIARES
// ============================================

function leerDatos<T>(clave: string, inicial: T): T {
  try {
    const guardado = localStorage.getItem(clave)
    return guardado ? JSON.parse(guardado) as T : inicial
  } catch {
    return inicial
  }
}

function dinero(valor: number) {
  return new Intl.NumberFormat('es-EC', {
    style: 'currency',
    currency: 'USD',
  }).format(valor)
}

function descargarCSV(clientes: Cliente[]) {
  const filas = [
    ['RUC', 'Nombre o razón social', 'Estado'],
    ...clientes.map(c => [c.ruc, c.nombre, c.estado]),
  ]

  const contenido = '\uFEFF' + filas
    .map(fila =>
      fila.map(valor =>
        `"${String(valor).replace(/"/g, '""')}"`
      ).join(';')
    )
    .join('\r\n')

  const archivo = new Blob([contenido], {
    type: 'text/csv;charset=utf-8;',
  })

  const url = URL.createObjectURL(archivo)
  const enlace = document.createElement('a')
  enlace.href = url
  enlace.download = 'Atlas_Core_Clientes.csv'
  document.body.appendChild(enlace)
  enlace.click()
  enlace.remove()
  URL.revokeObjectURL(url)
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

export default function Inicio({ onLogout }: InicioProps) {

  const [seccion, setSeccion] = useState('inicio')
  const [expandido, setExpandido] = useState<string[]>([])
  const [menuMovil, setMenuMovil] = useState(false)
  const [busqueda, setBusqueda] = useState('')
  const [filtroSemaforo, setFiltroSemaforo] = useState('todos')

  const [clientes, setClientes] = useState<Cliente[]>(() =>
    leerDatos('atlas_clientes_demo', clientesDemo)
  )

  const [honorarios, setHonorarios] = useState<Honorario[]>(() =>
    leerDatos('atlas_honorarios_demo', honorariosDemo)
  )

  const [nuevoRuc, setNuevoRuc] = useState('')
  const [nuevoNombre, setNuevoNombre] = useState('')
  const [mensajeCliente, setMensajeCliente] = useState('')

  const [clienteEditar, setClienteEditar] = useState('')
  const [nombreEditar, setNombreEditar] = useState('')

  const [honorarioCliente, setHonorarioCliente] = useState('')
  const [honorarioActividad, setHonorarioActividad] = useState('Declaración IVA')
  const [honorarioMonto, setHonorarioMonto] = useState('')
  const [honorarioCobrado, setHonorarioCobrado] = useState(true)

  // ==========================================
  // DATOS CALCULADOS
  // ==========================================

  const clientesFiltrados = useMemo(() => {
    const texto = busqueda.toLowerCase().trim()
    return clientes.filter(c =>
      c.nombre.toLowerCase().includes(texto) ||
      c.ruc.includes(texto)
    )
  }, [clientes, busqueda])

  const resumenObligaciones = {
    vencida: obligacionesDemo.filter(o => o.estado === 'vencida').length,
    hoy: obligacionesDemo.filter(o => o.estado === 'hoy').length,
    proxima: obligacionesDemo.filter(o => o.estado === 'proxima').length,
    aldia: obligacionesDemo.filter(o => o.estado === 'aldia').length,
  }

  const obligacionesFiltradas = obligacionesDemo.filter(o =>
    filtroSemaforo === 'todos' || o.estado === filtroSemaforo
  )

  const mesActual = fechaLocal().slice(0, 7)

  const honorariosMes = honorarios.filter(h =>
    h.fecha.startsWith(mesActual)
  )

  const totalFacturado = honorariosMes.reduce(
    (suma, h) => suma + h.monto, 0
  )

  const totalCobrado = honorariosMes
    .filter(h => h.cobrado)
    .reduce((suma, h) => suma + h.monto, 0)

  const totalPendiente = totalFacturado - totalCobrado

  const grafico = useMemo(() => {
    const grupos: Record<string, { cobrado: number; pendiente: number }> = {}

    honorariosMes.forEach(h => {
      if (!grupos[h.actividad]) {
        grupos[h.actividad] = { cobrado: 0, pendiente: 0 }
      }

      if (h.cobrado) {
        grupos[h.actividad].cobrado += h.monto
      } else {
        grupos[h.actividad].pendiente += h.monto
      }
    })

    return Object.entries(grupos).map(([nombre, valores]) => ({
      nombre,
      ...valores,
    }))
  }, [honorariosMes])

  const maxGrafico = Math.max(
    1,
    ...grafico.map(g => g.cobrado + g.pendiente)
  )

  // ==========================================
  // FUNCIONES DE NAVEGACIÓN
  // ==========================================

  function navegar(destino: string) {
    setSeccion(destino)
    setMenuMovil(false)
    setMensajeCliente('')
  }

  function alternarMenu(id: string) {
    setExpandido(actual =>
      actual.includes(id)
        ? actual.filter(x => x !== id)
        : [...actual, id]
    )
  }

  // ==========================================
  // REGISTRAR CLIENTE
  // ==========================================

  function registrarCliente(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const ruc = nuevoRuc.trim()
    const nombre = nuevoNombre.trim()

    if (!/^\d{13}$/.test(ruc)) {
      setMensajeCliente('El RUC debe contener 13 dígitos numéricos.')
      return
    }

    if (clientes.some(c => c.ruc === ruc)) {
      setMensajeCliente('Este RUC ya está registrado.')
      return
    }

    if (!nombre) {
      setMensajeCliente('Ingresa el nombre o razón social.')
      return
    }

    const nuevos = [
      ...clientes,
      {
        id: Date.now(),
        ruc,
        nombre,
        estado: 'Activo',
      },
    ]

    setClientes(nuevos)
    localStorage.setItem('atlas_clientes_demo', JSON.stringify(nuevos))
    setNuevoRuc('')
    setNuevoNombre('')
    setMensajeCliente('Cliente registrado correctamente.')
  }

  // ==========================================
  // EDITAR CLIENTE
  // ==========================================

  function editarCliente(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!clienteEditar || !nombreEditar.trim()) {
      setMensajeCliente('Selecciona un cliente e ingresa su nombre.')
      return
    }

    const nuevos = clientes.map(c =>
      String(c.id) === clienteEditar
        ? { ...c, nombre: nombreEditar.trim() }
        : c
    )

    setClientes(nuevos)
    localStorage.setItem('atlas_clientes_demo', JSON.stringify(nuevos))
    setMensajeCliente('Cliente actualizado correctamente.')
  }

  // ==========================================
  // REGISTRAR HONORARIO
  // ==========================================

  function registrarHonorario(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const monto = Number(honorarioMonto)

    if (!honorarioCliente || !Number.isFinite(monto) || monto <= 0) {
      return
    }

    const nuevo: Honorario = {
      id: Date.now(),
      cliente: honorarioCliente,
      actividad: honorarioActividad,
      monto,
      fecha: fechaLocal(),
      cobrado: honorarioCobrado,
    }

    const nuevos = [...honorarios, nuevo]
    setHonorarios(nuevos)
    localStorage.setItem('atlas_honorarios_demo', JSON.stringify(nuevos))

    setHonorarioMonto('')
    setHonorarioCliente('')
  }

  // ==========================================
  // CAMBIAR ESTADO DE COBRO
  // ==========================================

  function cambiarCobro(id: number) {
    const nuevos = honorarios.map(h =>
      h.id === id ? { ...h, cobrado: !h.cobrado } : h
    )

    setHonorarios(nuevos)
    localStorage.setItem('atlas_honorarios_demo', JSON.stringify(nuevos))
  }

  // ==========================================
  // TABLA REUTILIZABLE DE CLIENTES
  // ==========================================

  function tablaClientes() {
    return (
      <div className="ac-tabla-contenedor">
        <table className="ac-tabla">
          <thead>
            <tr>
              <th>RUC</th>
              <th>Nombre / Razón social</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {clientesFiltrados.map(cliente => (
              <tr key={cliente.id}>
                <td className="ac-ruc">{cliente.ruc}</td>
                <td>{cliente.nombre}</td>
                <td>
                  <span className="ac-estado-activo">
                    ● {cliente.estado}
                  </span>
                </td>
              </tr>
            ))}
            {clientesFiltrados.length === 0 && (
              <tr>
                <td colSpan={3} className="ac-vacio">
                  No se encontraron clientes.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }

  function buscadorClientes() {
    return (
      <div className="ac-herramientas">
        <input
          className="ac-input ac-busqueda"
          type="search"
          placeholder="Buscar por RUC o nombre..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />
        <button
          className="ac-btn ac-btn-secundario"
          onClick={() => descargarCSV(clientesFiltrados)}
        >
          ↓ Descargar CSV
        </button>
      </div>
    )
  }

  // ==========================================
  // SEMÁFORO TRIBUTARIO
  // ==========================================

  function semaforo() {
    const estados = [
      { id: 'vencida', nombre: 'Vencidas', numero: resumenObligaciones.vencida, color: 'rojo' },
      { id: 'hoy', nombre: 'Vencen hoy', numero: resumenObligaciones.hoy, color: 'naranja' },
      { id: 'proxima', nombre: 'Próximas a vencer', numero: resumenObligaciones.proxima, color: 'amarillo' },
      { id: 'aldia', nombre: 'Al día', numero: resumenObligaciones.aldia, color: 'verde' },
    ]

    return (
      <>
        <div className="ac-semaforo-grid">
          {estados.map(estado => (
            <button
              key={estado.id}
              type="button"
              className={`ac-semaforo-card ac-${estado.color} ${
                filtroSemaforo === estado.id ? 'ac-seleccionado' : ''
              }`}
              onClick={() =>
                setFiltroSemaforo(
                  filtroSemaforo === estado.id ? 'todos' : estado.id
                )
              }
            >
              <span className="ac-semaforo-nombre">
                <i className={`ac-luz ac-${estado.color}`} />
                {estado.nombre}
              </span>
              <strong>{estado.numero}</strong>
            </button>
          ))}
        </div>

        <div className="ac-obligaciones-lista">
          {obligacionesFiltradas.map(obligacion => (
            <div className="ac-obligacion" key={obligacion.id}>
              <span className={`ac-indicador ac-${obligacion.estado}`} />
              <div>
                <strong>{obligacion.cliente}</strong>
                <small>
                  {obligacion.tipo} · {obligacion.detalle}
                </small>
              </div>
            </div>
          ))}
        </div>

        <p className="ac-nota">
          Datos de demostración. Los vencimientos todavía no
          están conectados al SRI.
        </p>
      </>
    )
  }

  // ==========================================
  // GRÁFICO DE HONORARIOS
  // ==========================================

  function graficoHonorarios() {
    return (
      <div className="ac-grafico">
        <div className="ac-grafico-leyenda">
          <span><i className="ac-leyenda-cobrado" /> Cobrado</span>
          <span><i className="ac-leyenda-pendiente" /> Pendiente</span>
        </div>

        {grafico.length === 0 ? (
          <p className="ac-vacio">No hay honorarios registrados este mes.</p>
        ) : (
          grafico.map(grupo => (
            <div className="ac-grafico-fila" key={grupo.nombre}>
              <div className="ac-grafico-etiqueta">
                <span>{grupo.nombre}</span>
                <strong>{dinero(grupo.cobrado + grupo.pendiente)}</strong>
              </div>

              <div className="ac-grafico-pista">
                <div
                  className="ac-barra-cobrada"
                  style={{
                    width: `${(grupo.cobrado / maxGrafico) * 100}%`,
                  }}
                  title={`Cobrado: ${dinero(grupo.cobrado)}`}
                />
                <div
                  className="ac-barra-pendiente"
                  style={{
                    width: `${(grupo.pendiente / maxGrafico) * 100}%`,
                  }}
                  title={`Pendiente: ${dinero(grupo.pendiente)}`}
                />
              </div>
            </div>
          ))
        )}
      </div>
    )
  }

  // ==========================================
  // RESUMEN FINANCIERO
  // ==========================================

  function resumenHonorarios() {
    return (
      <div className="ac-finanzas-grid">
        <div className="ac-finanza">
          <span>Honorarios facturados</span>
          <strong>{dinero(totalFacturado)}</strong>
          <small>Este mes</small>
        </div>

        <div className="ac-finanza">
          <span>Ingresos cobrados</span>
          <strong className="ac-texto-verde">
            {dinero(totalCobrado)}
          </strong>
          <small>Este mes</small>
        </div>

        <div className="ac-finanza">
          <span>Pendiente de cobro</span>
          <strong className="ac-texto-naranja">
            {dinero(totalPendiente)}
          </strong>
          <small>Este mes</small>
        </div>
      </div>
    )
  }

  // ==========================================
  // CONTENIDO SEGÚN LA SECCIÓN
  // ==========================================

  function contenido() {

    // INICIO
    if (seccion === 'inicio') {
      return (
        <>
          <div className="ac-bienvenida">
            <div>
              <span className="ac-etiqueta">PANEL PRINCIPAL</span>
              <h1>Bienvenido a nuestro software más completo</h1>
              <p>
                Organiza tus clientes, supervisa las obligaciones
                tributarias y controla tus honorarios desde un solo lugar.
              </p>
            </div>
            <div className="ac-bienvenida-icono">✦</div>
          </div>

          <div className="ac-estadisticas">
            <div className="ac-estadistica">
              <span>Clientes registrados</span>
              <strong>{clientes.length}</strong>
              <small>Cartera actual</small>
            </div>

            <div className="ac-estadistica">
              <span>Declaraciones vencidas</span>
              <strong className="ac-texto-rojo">
                {resumenObligaciones.vencida}
              </strong>
              <small>Requieren atención</small>
            </div>

            <div className="ac-estadistica">
              <span>Vencen hoy</span>
              <strong className="ac-texto-naranja">
                {resumenObligaciones.hoy}
              </strong>
              <small>Atención inmediata</small>
            </div>

            <div className="ac-estadistica">
              <span>Ingresos cobrados del mes</span>
              <strong className="ac-texto-verde">
                {dinero(totalCobrado)}
              </strong>
              <small>Honorarios recibidos</small>
            </div>
          </div>

          <div className="ac-columnas">

            <section className="ac-tarjeta">
              <div className="ac-tarjeta-encabezado">
                <div>
                  <h2>♙ Cartera de clientes</h2>
                  <p>Consulta y descarga tus clientes registrados.</p>
                </div>
                <span className="ac-contador">
                  {clientes.length} clientes
                </span>
              </div>

              {buscadorClientes()}
              {tablaClientes()}

              <button
                className="ac-enlace"
                onClick={() => navegar('visualizar-clientes')}
              >
                Ver todos los clientes →
              </button>
            </section>

            <section className="ac-tarjeta">
              <div className="ac-tarjeta-encabezado">
                <div>
                  <h2>✦ Asistente Atlas IA</h2>
                  <p>Monitor de obligaciones tributarias.</p>
                </div>
              </div>

              {semaforo()}
            </section>

          </div>

          <section className="ac-tarjeta ac-tarjeta-finanzas">
            <div className="ac-tarjeta-encabezado">
              <div>
                <h2>$ Gestión de honorarios</h2>
                <p>Resumen de tus ingresos del mes actual.</p>
              </div>

              <button
                className="ac-btn ac-btn-primario"
                onClick={() => navegar('honorarios')}
              >
                Gestionar honorarios →
              </button>
            </div>

            {resumenHonorarios()}
            {graficoHonorarios()}
          </section>
        </>
      )
    }

    // VISUALIZAR CLIENTES
    if (seccion === 'visualizar-clientes') {
      return (
        <section className="ac-tarjeta">
          <div className="ac-tarjeta-encabezado">
            <div>
              <h2>Visualizar clientes</h2>
              <p>Consulta tu cartera de contribuyentes.</p>
            </div>
            <button
              className="ac-btn ac-btn-primario"
              onClick={() => navegar('registrar-cliente')}
            >
              + Nuevo cliente
            </button>
          </div>
          {buscadorClientes()}
          {tablaClientes()}
        </section>
      )
    }

    // REGISTRAR CLIENTE
    if (seccion === 'registrar-cliente') {
      return (
        <section className="ac-tarjeta ac-formulario-tarjeta">
          <h2>Registrar nuevo cliente</h2>
          <p>Agrega un contribuyente a tu cartera.</p>

          <form className="ac-formulario" onSubmit={registrarCliente}>
            <label>
              RUC del contribuyente
              <input
                className="ac-input"
                value={nuevoRuc}
                onChange={e => setNuevoRuc(e.target.value)}
                placeholder="Ingresa los 13 dígitos del RUC"
                maxLength={13}
                required
              />
            </label>

            <label>
              Nombre o razón social
              <input
                className="ac-input"
                value={nuevoNombre}
                onChange={e => setNuevoNombre(e.target.value)}
                placeholder="Nombre del cliente"
                required
              />
            </label>

            <button className="ac-btn ac-btn-primario" type="submit">
              Guardar cliente
            </button>
          </form>

          {mensajeCliente && (
            <p className="ac-mensaje">{mensajeCliente}</p>
          )}

          <p className="ac-nota">
            Registro local de demostración. La validación del RUC
            comprueba su longitud, no su existencia en el SRI.
          </p>
        </section>
      )
    }

    // EDITAR CLIENTE
    if (seccion === 'editar-cliente') {
      return (
        <section className="ac-tarjeta ac-formulario-tarjeta">
          <h2>Editar cliente</h2>
          <p>Actualiza el nombre o razón social de un cliente.</p>

          <form className="ac-formulario" onSubmit={editarCliente}>
            <label>
              Seleccionar cliente
              <select
                className="ac-input"
                value={clienteEditar}
                onChange={e => {
                  setClienteEditar(e.target.value)
                  const cliente = clientes.find(
                    c => String(c.id) === e.target.value
                  )
                  setNombreEditar(cliente?.nombre ?? '')
                }}
                required
              >
                <option value="">Seleccionar...</option>
                {clientes.map(c => (
                  <option key={c.id} value={String(c.id)}>
                    {c.ruc} - {c.nombre}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Nombre o razón social
              <input
                className="ac-input"
                value={nombreEditar}
                onChange={e => setNombreEditar(e.target.value)}
                required
              />
            </label>

            <button className="ac-btn ac-btn-primario" type="submit">
              Guardar cambios
            </button>
          </form>

          {mensajeCliente && (
            <p className="ac-mensaje">{mensajeCliente}</p>
          )}
        </section>
      )
    }

    // ASISTENTE
    if (seccion === 'asistente' || seccion === 'alertas') {
      return (
        <section className="ac-tarjeta">
          <div className="ac-tarjeta-encabezado">
            <div>
              <h2>✦ Asistente Atlas IA</h2>
              <p>Estado de las obligaciones de tu cartera.</p>
            </div>
          </div>

          {semaforo()}

          <p className="ac-nota">
            Esta versión muestra un monitor de ejemplo.
            La integración con IA y el calendario real del SRI
            se implementarán posteriormente.
          </p>
        </section>
      )
    }

    // HONORARIOS
    if (seccion === 'honorarios') {
      return (
        <>
          <section className="ac-tarjeta">
            <div className="ac-tarjeta-encabezado">
              <div>
                <h2>Gestión de honorarios</h2>
                <p>Controla los servicios realizados y sus cobros.</p>
              </div>
            </div>

            {resumenHonorarios()}
            {graficoHonorarios()}
          </section>

          <section className="ac-tarjeta">
            <h2>Registrar honorario</h2>

            <form
              className="ac-formulario ac-formulario-grid"
              onSubmit={registrarHonorario}
            >
              <label>
                Cliente
                <select
                  className="ac-input"
                  value={honorarioCliente}
                  onChange={e => setHonorarioCliente(e.target.value)}
                  required
                >
                  <option value="">Seleccionar cliente...</option>
                  {clientes.map(c => (
                    <option key={c.id} value={c.nombre}>
                      {c.nombre}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Actividad realizada
                <select
                  className="ac-input"
                  value={honorarioActividad}
                  onChange={e => setHonorarioActividad(e.target.value)}
                >
                  <option>Declaración IVA</option>
                  <option>Impuesto a la Renta</option>
                  <option>Anexo ATS</option>
                  <option>Anexo RDEP</option>
                  <option>Asesoría tributaria</option>
                  <option>Contabilidad mensual</option>
                  <option>Otros servicios</option>
                </select>
              </label>

              <label>
                Valor del servicio (USD)
                <input
                  className="ac-input"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={honorarioMonto}
                  onChange={e => setHonorarioMonto(e.target.value)}
                  placeholder="Ej. 35.00"
                  required
                />
              </label>

              <label>
                Estado del pago
                <select
                  className="ac-input"
                  value={honorarioCobrado ? 'si' : 'no'}
                  onChange={e => setHonorarioCobrado(e.target.value === 'si')}
                >
                  <option value="si">Cobrado</option>
                  <option value="no">Pendiente de cobro</option>
                </select>
              </label>

              <button className="ac-btn ac-btn-primario" type="submit">
                + Registrar honorario
              </button>
            </form>
          </section>

          <section className="ac-tarjeta">
            <h2>Historial de honorarios</h2>

            <div className="ac-tabla-contenedor">
              <table className="ac-tabla">
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Actividad</th>
                    <th>Fecha</th>
                    <th>Valor</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {[...honorarios].reverse().map(h => (
                    <tr key={h.id}>
                      <td>{h.cliente}</td>
                      <td>{h.actividad}</td>
                      <td>{h.fecha}</td>
                      <td>{dinero(h.monto)}</td>
                      <td>
                        <button
                          className={`ac-estado-pago ${
                            h.cobrado ? 'ac-pagado' : 'ac-pendiente'
                          }`}
                          onClick={() => cambiarCobro(h.id)}
                        >
                          {h.cobrado ? 'Cobrado' : 'Pendiente'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="ac-nota">
              Haz clic en el estado de un honorario para cambiarlo
              entre cobrado y pendiente.
            </p>
          </section>
        </>
      )
    }

    // OTROS MÓDULOS
    const nombres: Record<string, string> = {
      comprobantes: 'Comprobantes',
      conciliacion: 'Conciliación',
      ats: 'Anexo Transaccional Simplificado (ATS)',
      rdep: 'RDEP',
      aps: 'APS',
      adi: 'Anexo de Dividendos (ADI)',
      ice: 'Anexo ICE',
      declaraciones: 'Declaraciones',
      calendario: 'Calendario tributario',
      reportes: 'Reportes y estadísticas',
      configuracion: 'Configuración',
      seguridad: 'Seguridad y usuarios',
    }

    return (
      <section className="ac-tarjeta ac-modulo-pendiente">
        <div className="ac-modulo-icono">✦</div>
        <h2>{nombres[seccion] || 'Módulo Atlas Core'}</h2>
        <p>
          Estamos preparando este módulo para que puedas
          administrar todas tus operaciones desde Atlas Core.
        </p>
        <button
          className="ac-btn ac-btn-primario"
          onClick={() => navegar('inicio')}
        >
          ← Volver a INICIO
        </button>
      </section>
    )
  }

  // ==========================================
  // ESTRUCTURA GENERAL DEL PANEL
  // ==========================================

  return (
    <div className="ac-aplicacion">

      {/* MENÚ LATERAL */}

      <aside className={`ac-sidebar ${menuMovil ? 'ac-sidebar-abierto' : ''}`}>

        <div className="ac-logo">
          <div className="ac-logo-icono">✦</div>
          <div>
            <strong>ATLAS CORE</strong>
            <small>Centro de operaciones</small>
          </div>
        </div>

        <div className="ac-sidebar-titulo">
          MENÚ PRINCIPAL
        </div>

        <nav className="ac-navegacion">
          {menu.map(item => (
            <div className="ac-menu-grupo" key={item.id}>

              <button
                type="button"
                className={`ac-menu-item ${
                  seccion === item.id ||
                  item.hijos?.some(h => h.id === seccion)
                    ? 'ac-menu-activo'
                    : ''
                }`}
                onClick={() => {
                  if (item.hijos) {
                    alternarMenu(item.id)
                  } else {
                    navegar(item.id)
                  }
                }}
              >
                <span className="ac-menu-icono">{item.icono}</span>
                <span className="ac-menu-nombre">{item.nombre}</span>
                {item.hijos && (
                  <span className="ac-menu-flecha">
                    {expandido.includes(item.id) ? '⌄' : '›'}
                  </span>
                )}
              </button>

              {item.hijos && expandido.includes(item.id) && (
                <div className="ac-submenu">
                  {item.hijos.map(hijo => (
                    <button
                      type="button"
                      key={hijo.id}
                      className={`ac-submenu-item ${
                        seccion === hijo.id ? 'ac-submenu-activo' : ''
                      }`}
                      onClick={() => navegar(hijo.id)}
                    >
                      {hijo.nombre}
                    </button>
                  ))}
                </div>
              )}

            </div>
          ))}
        </nav>

        <div className="ac-sidebar-inferior">
          <div className="ac-usuario">
            <div className="ac-avatar">AC</div>
            <div>
              <strong>Usuario demo</strong>
              <small>Administrador</small>
            </div>
          </div>

          <button
            type="button"
            className="ac-cerrar-sesion"
            onClick={onLogout}
          >
            ↪ Cerrar sesión
          </button>
        </div>

      </aside>

      {/* CONTENIDO PRINCIPAL */}

      <div className="ac-principal">

        <header className="ac-header">
          <div className="ac-header-izquierda">
            <button
              type="button"
              className="ac-menu-movil"
              onClick={() => setMenuMovil(!menuMovil)}
            >
              ☰
            </button>

            <div>
              <strong>Atlas Core</strong>
              <small>Panel de administración</small>
            </div>
          </div>

          <div className="ac-header-derecha">
            <span className="ac-demo-badge">
              MODO DEMOSTRACIÓN
            </span>
            <span className="ac-header-avatar">AC</span>
          </div>
        </header>

        <main className="ac-contenido">
          {seccion !== 'inicio' && (
            <div className="ac-migas">
              <button onClick={() => navegar('inicio')}>
                INICIO
              </button>
              <span> / </span>
              <strong>
                {menu.find(m => m.id === seccion)?.nombre ||
                  menu.flatMap(m => m.hijos || [])
                    .find(h => h.id === seccion)?.nombre ||
                  seccion}
              </strong>
            </div>
          )}

          {contenido()}
        </main>

        <footer className="ac-footer">
          © 2026 Atlas Core · Plataforma de gestión contable y tributaria
          <span>Versión de demostración</span>
        </footer>

      </div>
    </div>
  )
}
