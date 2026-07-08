# CV PDF — página 2, copy final (gate aplicado)

## Cabecera de página
PORTFOLIO — LECTURA OPCIONAL
Un proyecto en profundidad. La página 1 ya es el CV completo: esto es para
quien quiera ver cómo trabajo.

## Caso — Atlas (Crown Lift Trucks)

**Problema**
Un equipo técnico de mantenimiento de carretillas elevadoras (Cataluña y
Baleares) necesita repartir su carga cada día, cada mes y cada año: qué
máquina lleva cada técnico, qué ruta, qué prioridad. Es un problema real de
asignación y rutas de técnicos (Technician Routing and Scheduling Problem,
TRSP en la literatura), no un ejercicio de clase: cada decisión mal tomada es
un viaje de más o un cliente esperando de más.

**Enfoque**
El motor reparte en tres capas que nunca se pisan entre sí: una dura que
filtra antes de puntuar (técnico habitual, zona, habilitación), una real que
pondera cercanía contra equidad de carga, y una de desempate que nunca saca
una máquina de su zona. Se resuelve por aproximación sucesiva y búsqueda
local: mover y cambiar piezas hasta que no hay una mejora clara que hacer.

**Construcción**
Lo dirigí y lo construí con Claude sin escribir yo el código de producción:
no vengo del código, vengo del problema. Está calibrado con datos reales de
productividad y desplazamiento del equipo, no con estimaciones, y
contrastado contra la literatura profesional del sector antes de dar
cualquier decisión por buena. Cada cambio pasa primero por una suite de
regresión: si empeora la línea base, no se acepta.

**Resultado**
Hoy es un prototipo funcional que el equipo usa de forma informal, no un
despliegue oficial de la empresa. Sigue vivo: cada mejora se prueba primero
contra la línea base antes de entrar.

### Ficha técnica (grid término · valor, no lista de frases)
- Capas — estructural (dura) · primaria (cercanía/equidad) · secundaria (desempate, no cruza zona)
- Optimización — aproximación sucesiva + búsqueda local (move / swap)
- Literatura — índice RIME · reglas EDD/SPT · búsqueda local y Tabu Search
- Regresión — línea base fija de equidad de carga y kilometraje, en cada cambio
- Construcción — con Claude, sin código de producción propio
- Despliegue — versionado, número de build visible

## Cierre
El mismo movimiento se repite en todo lo que construyo: encontrar el punto
donde el criterio manual ya no aguanta la escala, y construir con IA la
pieza que lo sustituye por algo medible y que se puede volver a probar. No
escribo el código de producción por gusto de programar: lo hago porque es
la forma más rápida de comprobar si una idea de proceso funciona antes de
pedirle a alguien que la implemente en serio.

## Nota — caso e-commerce B2C retirado de la página 2 (2026-07-08)
Se quitó de la página 2 (era el caso más corto y "en desarrollo") para dar
aire real a Atlas y a la ficha técnica sin desbordar a una 3ª página. Sigue
representado en la página 1, viñeta "Proyecto propio · e-commerce B2C".
