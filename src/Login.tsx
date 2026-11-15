
import { useState } from 'react'
import type { FormEvent } from 'react'
import './Login.css'

// ============================================
// PROPIEDADES DEL LOGIN
// ============================================

type LoginProps = {
  onBack: () => void
  onLogin: () => void
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

export default function Login({
  onBack,
  onLogin,
}: LoginProps) {

  const [usuario, setUsuario] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [mostrarClave, setMostrarClave] = useState(false)
  const [mensaje, setMensaje] = useState('')

  // Credenciales para demostración
  const USUARIO_DEMO = 'sincorreo@gmail.com'
  const CLAVE_DEMO = '1234'

  // ============================================
  // FUNCIÓN PARA INICIAR SESIÓN
  // ============================================

  const iniciarSesion = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setMensaje('')

    const correoIngresado = usuario.trim().toLowerCase()

    if (
      correoIngresado === USUARIO_DEMO &&
      contrasena === CLAVE_DEMO
    ) {
      // Credenciales correctas:
      // se abre el panel INICIO de Atlas Core
      onLogin()
      return
    }

    // Credenciales incorrectas
    setMensaje(
      'Correo electrónico o contraseña incorrectos.'
    )
  }

  // ============================================
  // INTERFAZ DE INICIO DE SESIÓN
  // ============================================

  return (
    <div className="atlas-login">

      {/* PANEL IZQUIERDO */}

      <section className="atlas-login-left">

        <button
          type="button"
          className="atlas-login-back"
          onClick={onBack}
        >
          ← Volver al inicio
        </button>

        <div className="atlas-login-brand">

          <div className="atlas-login-brand-icon">
            ◈
          </div>

          <h1>ATLAS CORE</h1>

          <p>
            Automatización y Transformación de
            Liquidaciones Avanzadas con Sistemas
            Inteligentes.
          </p>

        </div>

        {/* ILUSTRACIÓN DE ATLAS */}

        <div className="atlas-login-illustration">

          <div className="atlas-login-orbit orbit-outer" />
          <div className="atlas-login-orbit orbit-inner" />

          <div className="atlas-login-globe">

            <span className="globe-continent continent-one" />
            <span className="globe-continent continent-two" />
            <span className="globe-continent continent-three" />

            <span className="globe-line line-one" />
            <span className="globe-line line-two" />
            <span className="globe-line line-three" />

          </div>

          <div className="atlas-login-atlas">

            <div className="atlas-head" />
            <div className="atlas-body" />

            <div className="atlas-arm arm-left" />
            <div className="atlas-arm arm-right" />

            <div className="atlas-leg leg-left" />
            <div className="atlas-leg leg-right" />

          </div>

        </div>

        <div className="atlas-login-left-footer">

          <p>
            Tu información en orden.
            <br />
            <strong>Tu tiempo en tus manos.</strong>
          </p>

        </div>

      </section>

      {/* PANEL DERECHO */}

      <section className="atlas-login-right">

        <div className="atlas-login-form-container">

          <div className="atlas-login-welcome">

            <span className="atlas-login-tag">
              BIENVENIDO A ATLAS CORE
            </span>

            <h2>Inicia sesión</h2>

            <p>
              Accede a tu espacio de trabajo y
              administra tus clientes, obligaciones
              tributarias y honorarios desde un
              solo lugar.
            </p>

          </div>

          {/* FORMULARIO */}

          <form
            className="atlas-login-form"
            onSubmit={iniciarSesion}
          >

            {/* CORREO ELECTRÓNICO */}

            <div className="atlas-login-field">

              <label htmlFor="atlas-correo">
                Correo electrónico
              </label>

              <div className="atlas-login-input-wrapper">

                <span className="atlas-login-input-icon">
                  ✉
                </span>

                <input
                  id="atlas-correo"
                  type="email"
                  placeholder="Ingresa tu correo electrónico"
                  value={usuario}
                  onChange={(event) => {
                    setUsuario(event.target.value)
                    setMensaje('')
                  }}
                  autoComplete="username"
                  required
                />

              </div>

            </div>

            {/* CONTRASEÑA */}

            <div className="atlas-login-field">

              <label htmlFor="atlas-clave">
                Contraseña
              </label>

              <div className="atlas-login-input-wrapper">

                <span className="atlas-login-input-icon">
                  🔒
                </span>

                <input
                  id="atlas-clave"
                  type={mostrarClave ? 'text' : 'password'}
                  placeholder="Ingresa tu contraseña"
                  value={contrasena}
                  onChange={(event) => {
                    setContrasena(event.target.value)
                    setMensaje('')
                  }}
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="atlas-login-show-password"
                  onClick={() => {
                    setMostrarClave(!mostrarClave)
                  }}
                  aria-label={
                    mostrarClave
                      ? 'Ocultar contraseña'
                      : 'Mostrar contraseña'
                  }
                >
                  {mostrarClave ? 'Ocultar' : 'Mostrar'}
                </button>

              </div>

            </div>

            {/* MENSAJE DE ERROR */}

            {mensaje && (

              <div
                className="atlas-login-error"
                role="alert"
              >
                ⚠ {mensaje}
              </div>

            )}

            {/* BOTÓN INICIAR SESIÓN */}

            <button
              type="submit"
              className="atlas-login-submit"
            >
              Iniciar sesión
              <span>→</span>
            </button>

          </form>

          {/* CREDENCIALES DE PRUEBA */}

          <div className="atlas-login-demo">

            <span className="atlas-login-demo-title">
              ACCESO DE DEMOSTRACIÓN
            </span>

            <p>
              Utiliza las siguientes credenciales
              para explorar Atlas Core:
            </p>

            <div className="atlas-login-demo-credentials">

              <div>
                <small>Correo electrónico</small>
                <strong>sincorreo@gmail.com</strong>
              </div>

              <div>
                <small>Contraseña</small>
                <strong>1234</strong>
              </div>

            </div>

          </div>

          {/* PIE DE PÁGINA */}

          <div className="atlas-login-bottom">

            <p>
              © 2026 Atlas Core.
              Todos los derechos reservados.
            </p>

          </div>

        </div>

      </section>

    </div>
  )
}
