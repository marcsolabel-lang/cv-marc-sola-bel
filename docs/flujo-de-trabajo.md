# FLUJO DE TRABAJO — CV MARC SOLA (manual operativo)

Cómo construir la web paso a paso, trabajando como un estudio de diseño. No es el QUÉ
(eso está en el Documento A) ni la estrategia (Documento B): es el CÓMO TRABAJAR, en
orden, para que tanto el producto como el método sean profesionales.

PRINCIPIO RECTOR: iterar lo necesario para el resultado esperado, no omitir para
facilitar. Calidad por encima de prisa.

MÉTODO DE ITERACIÓN (doble rasero): Claude hace el 1er borrador → Marc dibuja/anota
encima (2º borrador) → se trabaja juntos sobre el 2º → versión final → Claude Code la
construye. Reaccionar y corregir sobre algo planteado rinde más que partir de cero.

ROLES: Director de diseño (Claude, concepto y criterio) · Marc (decisiones, gusto,
contenido real, assets) · Claude Design (explorar aspecto) · Claude Code (construir
producto) · Auditor (verificar posición/alineación/accesibilidad sobre lo construido).

═══════════════════════════════════════════════════════════
FASE 0 — PREPARACIÓN (antes de tocar nada visual)
═══════════════════════════════════════════════════════════

0.1 Tener a mano los tres documentos: A (construcción), B (estrategia, privado), este flujo.
0.2 Reunir/empezar los ASSETS (en paralelo a todo lo demás, no al final):
    - Capturas del Crown Planner: alta resolución, ventana limpia, datos FICTICIOS.
    - Excel descargable con datos 100% ficticios.
    - Foto de perfil (a evaluar con dirección antes de usarla).
0.3 Confirmar el cabo de despliegue: repo creado (hecho) + dónde se publica (Vercel).

═══════════════════════════════════════════════════════════
FASE 1 — EL HERO COMO VIÑETA-MODELO (el lenguaje de toda la web)
═══════════════════════════════════════════════════════════

El Hero define el lenguaje visual que heredan las 7 viñetas restantes. Por eso se clava
PRIMERO y con calma. No se avanza a otras viñetas hasta que el Hero esté cerrado.

1.1 Claude entrega el 1er BORRADOR del Hero (boceto conceptual: composición, jerarquía,
    dónde va cada elemento sobre la rejilla). — ESTE PASO YA EN MARCHA.
1.2 Marc dibuja/anota ENCIMA: qué mover, qué crece, qué no le encaja. No hace falta que
    sea bonito — flechas y notas valen. Es el 2º borrador.
1.3 Se trabaja juntos sobre el 2º borrador hasta acordar la composición final del Hero.
1.4 Marc lo lleva a Claude Design (en escritorio): genera el Hero real, itera el aspecto
    fino (tipografía, peso variable, rombo, espaciado) hasta que LO VE bien.
1.5 Marc trae captura del Hero de Design → Claude (director) lo audita contra el Documento
    A: ¿respeta tokens, rejilla, arma tipográfica, jerarquía? Se afina.
1.6 Hero CERRADO. Su lenguaje (tamaños reales, comportamiento, espaciados) queda como
    referencia para las demás.

═══════════════════════════════════════════════════════════
FASE 2 — LAS DEMÁS VIÑETAS (heredan el lenguaje del Hero)
═══════════════════════════════════════════════════════════

Más rápido que el Hero: ya no se inventa lenguaje, se aplica. Orden por importancia.

2.1 CROWN PLANNER (la 2ª pieza de mayor impacto). Mismo doble rasero: borrador Claude →
    boceto Marc → Design → validación. Atención especial al carrusel y a la affordance.
2.2 Resto de viñetas en orden narrativo: Cita · Sobre mí · Formación · Experiencia ·
    Liderazgo · Contacto. Cada una: aplicar lenguaje del Hero, generar en Design, validar.
2.3 Las viñetas de la "zona de riesgo" (Sobre mí, Formación, Experiencia) se cuidan para
    que sean ágiles — no pueden ser lentas o se pierde al lector antes del clímax.
2.4 Revisión de CONJUNTO: leer las 8 viñetas de corrido. ¿Fluye la narrativa? ¿El ritmo de
    fondos funciona? ¿Hay algún salto brusco? Ajustar transiciones entre viñetas.

═══════════════════════════════════════════════════════════
FASE 3 — CONSTRUCCIÓN REAL (Claude Code)
═══════════════════════════════════════════════════════════

Con el aspecto ya decidido y visto, se construye el producto real. El Documento A es la
especificación que Claude Code ejecuta.

3.1 Montar primero el SISTEMA: tokens (color, tipografía, espaciado, radios, duraciones),
    rejilla de 12, breakpoints. Esto antes que cualquier viñeta — es el esqueleto.
3.2 Construir el Hero real sobre el sistema. Verificar que coincide con lo aprobado en Design.
3.3 Construir las demás viñetas sobre el sistema, en orden.
3.4 Implementar efectos del catálogo (gesto base, peso variable, hover unificado, carrusel,
    marco técnico, rombo). Recordar: solo transform/opacity, prefers-reduced-motion.
3.5 Implementar estados/fallbacks: imágenes que no cargan, JS que falla, carga rápida.
3.6 Integrar assets reales (capturas, Excel, foto si entra).

═══════════════════════════════════════════════════════════
FASE 4 — AUDITORÍA Y PULIDO
═══════════════════════════════════════════════════════════

4.1 AUDITOR DE POSICIÓN entra (solo ahora, sobre algo construido): verifica anclaje,
    alineación a la rejilla, coherencia entre breakpoints, estado reposado
    (prefers-reduced-motion), jerarquía de color. Reporta ✅/⚠️/❌ por elemento.
4.2 ACCESIBILIDAD: verificar contraste WCAG AA de cada par texto/fondo (especial atención
    al terracota — usar terracota-profundo en texto pequeño). Navegación por teclado, foco.
4.3 RESPONSIVE real: probar en 360 / 768 / 1440 de verdad, no asumir.
4.4 El ROMBO y los detalles finales (prioridad baja, al final).
4.5 Revisión final de dirección: ¿el resultado cumple la visión? ¿algo huele a prototipo?

═══════════════════════════════════════════════════════════
FASE 5 — DESPLIEGUE
═══════════════════════════════════════════════════════════

5.1 Verificar que el enlace de la demo del Crown Planner apunta a la versión con datos
    de ejemplo (NO datos reales).
5.2 Decisión LinkedIn: actualizar para alinear con el CV, o no enlazar todavía.
5.3 Publicar (Vercel). Probar el sitio publicado en móvil y escritorio reales.
5.4 Revisar que no se subió el Documento B (privado) al repo.

═══════════════════════════════════════════════════════════
QUÉ HACE CLAUDE DESIGN vs CLAUDE CODE (resumen)
═══════════════════════════════════════════════════════════

CLAUDE DESIGN (Fases 1-2): explorar y decidir el ASPECTO. Rápido, visual, iterás por chat.
  Lo usas en escritorio. Aquí se encuentra el lenguaje visual.
CLAUDE CODE (Fases 3-5): construir el PRODUCTO real. Tokens, rejilla, responsive,
  accesibilidad, despliegue. Corre también desde móvil. Aquí se materializa con el Doc A.

Regla: no construir en Code hasta tener el lenguaje visto en Design. No quedarse solo en
Design (no da producto desplegable ni el sistema técnico). Los dos, en orden.
