# AUDIT HERO — Hero.html vs Documento A

Comparación entre el diseño generado en Claude Design (Hero.html aprobado
por Marc el 2026-06-02) y la especificación de construcción (doc-A).

---

## ALINEADO CON DOC A ✓

- Textos literales (§1): eyebrow, tagline, lead — exactos. Correcciones
  aplicadas: "sistemas," y "soluciones." con coma y punto.
- Fondo oscuro (§2 ritmo O–O–C–C–C–C–O–O) ✓
- Topbar modelo Yann Novak (§4): 4 elementos, línea fina, menú desplegable ✓
- Peso variable del statement al cursor (§5 HERO acento especial) ✓
- Animaciones solo transform + opacity (§5 regla global) ✓
- prefers-reduced-motion: estados finales visibles, sin animación (§9) ✓
- Terracota-vivo #C0542A (§3.2) ✓
- Bricolage Grotesque variable + Cormorant reservada (§3.1) ✓
- Gesto base entrada: fade + leve subida con stagger (§5) ✓
- Fallback font-weight digno si JS no carga (§9) ✓
- Responsive topbar: colapsa en móvil (§4) ✓

---

## DESVIACIONES — DECISIONES APROBADAS POR MARC

### 1. Composición: Centrada vs Editorial
- Doc A §6: "Tercios: peso izquierda (col 1-7), aire derecha (col 8-12) —
  el aire NO se llena." → composición Editorial asimétrica.
- Hero.html: CENTRADA — texto centrado, rombo ocupa toda la viñeta como fondo.
- Veredicto: Marc aprobó explícitamente Manifiesto + Centrada.
- Consecuencia: la rejilla de tercios (§3.3) no aplica al Hero; sí aplica
  al resto de viñetas que siguen la spec.

### 2. El rombo: protagonista 3D vs firma discreta
- Doc A §8: "FIRMA VISUAL discreta que da unidad. Efecto sobrio (rotación/
  parallax, transform puro). Prioridad BAJA."
- Doc A §5: "ROMBO-FIRMA: rotación/parallax sobria al cursor/scroll."
- Doc A §10 no-objetivos: "'La red' (nodos conectados, pulsos, 3D, ondas
  táctiles) — demasiado para una web sobria."
- Hero.html: octaedro de alambre 3D en canvas, con física de peonza (momento
  angular, fricción, drag para lanzar), ocupa toda la viñeta, es el elemento
  visual protagonista.
- Veredicto: Marc aprobó este diseño. El rombo del Hero es una excepción
  consciente a §8 y §10. Las siguientes apariciones del rombo (Experiencia,
  Contacto) deben seguir siendo discretas y sobrias según la spec.

---

## DESVIACIONES — PENDIENTE DE DECISIÓN DE MARC

### 3. Nombre completo en topbar: "Marc Sola Bel" vs "Marc Sola" — CERRADO
- Doc A §4: "Marc Sola" · "CV" · "2016—26" · "[MENÚ]"
- Decisión (2026-06-03): **"Marc Sola Bel"** — nombre completo con apellido.
  El Doc A usa el nombre corto como placeholder; la decisión de marca es Bel incluido.

### 4. Nombre en hero content — CERRADO
- Doc A §1 y §6: nombre como elemento del Hero en N6.
- Decisión (2026-06-03): **no se añade nombre en el hero content**.
  El nombre vive exclusivamente en la topbar. En composición Centrada el
  statement domina solo; añadir el nombre restaría fuerza al golpe inicial.

---

## FIX TÉCNICO APLICADO HOY

- `html { font-size: 112.5%; }` → base 1rem = 18px como establece §3.1.
  Estaba en el Hero.html pero faltaba en globals.css.

---

## NOTA: PESO VARIABLE — rango

- Doc A §5: "200↔800 según proximidad".
- Hero.html (Manifiesto): rango real 630↔900 (→800 clamp).
  Fórmula: NEAR=min(900, 830+70)=900 · FAR=max(300, 830−200)=630.
- El efecto existe y es correcto. El rango más estrecho y en registro
  alto es consecuencia de la voz Manifiesto (peso base 830). Si en
  algún momento se quiere recuperar el dramatismo 200↔800, cambiar
  FAR a un valor fijo de 200.
