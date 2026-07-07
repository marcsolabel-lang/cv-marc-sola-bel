# CV PDF — página 2, copy final (gate aplicado)

## Cabecera de página
PORTFOLIO — LECTURA OPCIONAL
Dos proyectos en profundidad. La página 1 ya es el CV completo: esto es para
quien quiera ver cómo trabajo.

## Caso 1 — Atlas (Crown Lift Trucks)

**Problema**
Un equipo técnico de mantenimiento de carretillas elevadoras (Cataluña y
Baleares) necesita repartir su carga cada día, cada mes y cada año: qué
máquina lleva cada técnico, qué ruta, qué prioridad. Es un problema real de
asignación y rutas de técnicos (Technician Routing and Scheduling Problem,
TRSP en la literatura), no un ejercicio de clase: cada decisión mal tomada es
un viaje de más o un cliente esperando de más.

**Enfoque**
El motor reparte en tres capas que nunca se pisan entre sí. La primera es
dura y filtra antes de puntuar nada: cliente con técnico habitual, zona,
habilitación técnica. La segunda es el reparto real: cercanía geográfica
contra equidad de carga entre técnicos. La tercera solo desempata (dificultad
del modelo de máquina, afinidad con el cliente) y nunca saca una máquina de
su zona. La asignación se resuelve por aproximación sucesiva y búsqueda
local: mover y cambiar piezas hasta que no hay una mejora clara que hacer.

**Cómo se construyó**
Lo dirigí y lo construí con Claude, sin escribir yo el código de producción:
no vengo del código, vengo del problema. El motor está calibrado con datos
reales de productividad y desplazamiento del equipo, no con estimaciones.
Antes de dar por buena una decisión de diseño, contrasté el algoritmo contra
la literatura profesional del sector: el índice RIME de criticidad de
avería, las reglas de secuenciación EDD/SPT, y la búsqueda local (o Tabu
Search) como método estándar para este tipo de problema NP-duro. Cada cambio
pasa por una suite de tests de regresión con una línea base fija de equidad
de carga y kilometraje: si un factor nuevo la empeora, no se acepta.

**Resultado**
Hoy es un prototipo funcional que el equipo usa de forma informal, no un
despliegue oficial de la empresa. Sigue vivo: cada mejora se prueba primero
contra la línea base antes de entrar.

### Bloque de especificidad (tratamiento mono, dato como ornamento)
- 3 capas de restricciones: estructural (dura) · primaria (cercanía + equidad) · secundaria (desempate, nunca cruza zona)
- Optimización: aproximación sucesiva + búsqueda local (move / swap)
- Contrastado contra el estándar del sector: índice RIME · reglas EDD / SPT · búsqueda local y Tabu Search
- Test de regresión: línea base fija de equidad de carga y kilometraje, en cada cambio
- Construido con Claude, sin código de producción propio
- Despliegue versionado, número de build visible

## Caso 2 — Proyecto propio de e-commerce B2C (anonimizado)

**Problema**
Entrar en un nicho de venta online sin repetir el error más común: elegir
producto por intuición o por lo que ya vende cualquiera, y competir después
solo por precio.

**Enfoque**
Evalúo cada categoría candidata con los mismos datos que usaría para decidir
una inversión: volumen de búsqueda real, dispersión de precio entre
competidores, margen posible una vez descontados logística y devoluciones.
Un producto entra en catálogo solo si el asesoramiento, no el precio, puede
ser la razón de compra.

**Cómo se construyó**
El canal (contenido, fichas, precio) se automatiza con IA de principio a
fin; el precio se calcula por margen objetivo, no por redondeo ni por copiar
al competidor.

**Resultado**
En desarrollo: la fase de selección de producto está cerrada; la de
automatización del canal, en marcha.

## Cierre
En los dos casos se repite el mismo movimiento: encontrar el punto donde el
criterio manual ya no aguanta la escala, y construir con IA la pieza que lo
sustituye por algo medible y que se puede volver a probar. No escribo el
código de producción por gusto de programar: lo hago porque es la forma más
rápida de comprobar si una idea de proceso funciona antes de pedirle a
alguien que la implemente en serio.
