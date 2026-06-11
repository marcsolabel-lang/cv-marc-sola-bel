# Brief de handoff — Sección "Demo Atlas (Crown Planner)" del CV

> Para el proyecto de **cloud design** (Claude Design) que montará la web-CV de Marc. Este
> documento empaqueta TODO lo necesario para explicar la sección de la demo de Atlas de la mejor
> forma posible: qué es, por qué importa, los insights verificados, cómo se accede, las capturas y
> la narrativa. Fuentes más profundas en el mismo repo: `docs/INSIGHTS-MODULOS.md` (insights con
> evidencia en código), `docs/DEMO-MODE.md` (cómo funciona el modo visitante), `ESPEC_ALGORITMOS.md`
> (la espec canónica del algoritmo).

---

## 1. Qué es (el pitch en una frase)
**Atlas (Crown Planner)** es una "torre de control" web de planificación de servicio técnico de
carretillas que Marc —perfil COMERCIAL/coordinación— concibió y construyó con IA como herramienta
interna real, en uso. Es la prueba tangible de que un perfil no-técnico puede llevar un producto
de la idea al deploy: un **optimizador de field-service** de verdad.

**El ángulo del CV:** "un comercial que materializó un optimizador real". Audiencia: reclutador
técnico/de producto (objetivo: **Sylo**). El algoritmo es el corazón; lo demás lo enmarca.

---

## 2. El activo: el algoritmo (insights verificados EN CÓDIGO)
No es marketing — cada frase está respaldada por la función que la implementa (ver
`docs/INSIGHTS-MODULOS.md`). Cuatro módulos, cuatro ideas distintas:

| Módulo | Insight (una idea, legible) | Qué lo hace no-trivial |
|---|---|---|
| **Diaria** | El técnico **habilitado**, no el primero libre (una trilateral solo a un especialista TSP) | Elegibilidad por habilidad real (`canHandle`) |
| **CAT** | Orquesta **reglas de negocio que compiten** (cuenta fija, batería, especialista) y aun así **equilibra la carga** | Solver GAP/VRP: 3 fases, búsqueda local move+swap → CoV→0 |
| **Mensual** | Equilibra por **horas reales** de trabajo, no por nº de revisiones | Esfuerzo (horas/modelo), no conteo |
| **Anual** | **Cadena temporal**: 4 revisiones/año encadenadas; mover una reajusta el resto del año en cascada | Dependencia temporal + recálculo en cascada |

**Marco técnico (para el reclutador técnico):** es un Problema de Asignación Generalizada (GAP),
variante del VRP/TRSP, resuelto con heurísticas + búsqueda local (move+swap, estilo 2-opt/Tabu).
Referencias reales: GAP/Tabu Search (INFORMS/Osman), búsqueda local con enfriamiento simulado.

---

## 3. La demo en vivo (lo que el visitante toca)
- **URL (deep link, compartible):** `https://crownplannerwebapp.vercel.app/?demo=1`
- **Acceso en 1 clic:** botón "Ver demo →" en la pantalla de login; o el enlace directo. Sin PIN.
- **Datos 100% ficticios** (técnicos A. Ferrer/L. Soto/M. Pons/J. Vidal/P. Riba, zonas Vallès
  Est/Baix Nord/Anoia/Litoral/Alt Segre, clientes ficticios, órdenes OR-1042…). Confidencialidad
  garantizada por doble barrera; **0 fugas verificadas** (Playwright). Es seguro mostrarlo.
- **Lo demostrable en 1 clic** (es lo que gana la entrevista):
  - **Diaria** → "Ejecutar demo" corre el **motor REAL** y el resultado se explica solo:
    "OR-1042 → A. Ferrer · único TSP en zona" + Equilibrio 0.55→0.40.
  - **CAT** → "Ejecutar demo" muestra las **4 capas** del GAP decidiendo (residente · bateryman ·
    TSP · cupo) + CoV 0.55→0.39 + 0% sin cobertura.
  - Cada módulo tiene un panel "Cómo decidió / se planificó" que explica su lógica en una frase.

---

## 4. Identidad visual (para que la web-CV case con la demo)
- **Modo noche** (dark) como protagonista. Acento **terracota `#C0542A`**.
- Tipografía display tipo **Bricolage Grotesque**; estética "control tower" sobria y densa de datos.
- Wordmark **ATLAS**. Fondo oscuro `#0A0A0A` en piezas hero.
- **OG image** (vista previa al compartir): `https://crownplannerwebapp.vercel.app/og-demo.png`
  (1200×630, ATLAS en terracota + KPIs −28%/−38%/−47%).

---

## 5. El carrusel del CV (narrativa cerrada por dirección)
Seis slides, arco **gancho → problema → inteligencia → autenticidad → escala → invitación**:
1. **Home noche** — el gancho ("producto real, modo noche espectacular").
2. **Motor Atlas / KPIs** — el qué y por qué (Sin vs Con: CoV −28%, Km −38%, Carga pico −47%).
3. **CAT · 4 capas** — el clímax de inteligencia (el solver razonando con múltiples reglas).
4. **Diaria · Ejecutar demo** — la autenticidad (motor real, 1 clic).
5. **Mapa de rutas (noche)** — el golpe visual / escala geográfica.
6. **Command bar ⌘K** — el cierre + CTA "Probar Atlas →" (al demo en vivo).

Mensual y Anual quedan navegables en la demo pero **fuera** del carrusel (su valor es el resultado
equilibrado, no el ruteo que hace brillar a CAT/Diaria). La Anual, ahora que comunica su cascada
temporal, es la 1ª candidata si se amplía a 7-8 slides.

---

## 6. Capturas (en `docs/CV-HANDOFF/capturas/`)
Set verificado en vivo (0 fugas), en **desktop (1440px)** y **móvil (390px)**:
`1-home`, `2-kpis`, `3-cat`, `4-diaria`, `5-mapa`, `6-command` × `{desktop, movil}`.
La demo es responsive (toggle día/noche también en móvil, en la topbar).

---

## 7. Cómo aprovechar esto en la web-CV (sugerencia, decide el director)
- La sección Atlas debe llevar el visitante de "qué bonito" → "qué inteligente" → "y es real".
- Apóyate en el algoritmo: la frase que más vende es que un perfil **comercial** construyó un
  **solver de optimización** que rutea por habilidad, respeta excepciones del negocio y equilibra
  carga — y que el reclutador puede **comprobarlo en 1 clic**.
- CTA primario de la sección: **"Probar Atlas en vivo →"** apuntando a `?demo=1`.
- Lo que NO hace falta explicar en la web (vive en la demo): el detalle de cada panel; la web
  enmarca y enlaza, la demo demuestra.
