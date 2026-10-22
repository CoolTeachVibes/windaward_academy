# Conectar el formulario con Google Sheets

Los registros de la landing se envían a tu hoja:
https://docs.google.com/spreadsheets/d/1JqZzfRhSv_4fCoDO5ycZVZGW31aXlD_ewgq0_iIawkE/edit

Un sitio estático no puede escribir en Google Sheets directamente, así que se usa un
**Google Apps Script** (gratuito, dentro de tu cuenta de Google) como receptor.
Toma unos 2 minutos.

## Pasos

1. Abre la hoja de cálculo con la cuenta propietaria.
2. Menú **Extensiones → Apps Script**.
3. Borra el contenido de `Código.gs` y pega el contenido de `Code.gs` (este directorio). Guarda.
4. En la barra superior selecciona la función `setup` y pulsa **Ejecutar**.
   Acepta los permisos (solo acceden a esta hoja). Se creará la pestaña **Inscripciones** con encabezados.
5. Pulsa **Implementar → Nueva implementación**.
   - Tipo: **Aplicación web**
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier persona**
   - Pulsa **Implementar** y copia la **URL de la aplicación web** (termina en `/exec`).
6. Abre `src/config.ts` y pega la URL en `SHEETS_ENDPOINT`:

   ```ts
   export const SHEETS_ENDPOINT = "https://script.google.com/macros/s/AKfycb.../exec";
   ```

7. Ejecuta `npm run build` y vuelve a publicar el sitio.

## Verificar

Llena el formulario de la landing. En segundos aparecerá una fila nueva en la pestaña
**Inscripciones** con fecha, nombre, correo, WhatsApp, institución, perfil, método de pago,
referencia y monto. La columna **Comprobante enviado** queda en "Pendiente" para que la
marques al recibir el comprobante por WhatsApp (+52 449 285 0638).

## Si cambias el script

Cada cambio requiere **Implementar → Administrar implementaciones → Editar → Nueva versión**.
La URL `/exec` se mantiene igual.

## Nota

Mientras `SHEETS_ENDPOINT` esté vacío, el formulario sigue funcionando: los datos viajan
completos en el mensaje de WhatsApp, y la landing lo indica en pantalla.
