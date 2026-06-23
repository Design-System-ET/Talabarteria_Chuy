# Acceso Directo a la App desde el Celular

## ¿Por qué aparece la opción "Instalar" en mi celular?

Cuando navegás a tu sitio web desde Chrome en Android (o Safari en iOS), el navegador puede mostrar un mensaje preguntándote si querés **instalar la aplicación**. Esto NO es magia ni un error: es gracias al archivo **`site.webmanifest`** que está vinculado en tu `index.html`.

### ¿Qué hace el manifest?

El archivo `site.webmanifest` le dice al navegador:

- El nombre de la "app" (`name` y `short_name`)
- Los iconos que debe usar (`icons`)
- Qué color de fondo y tema usar (`background_color`, `theme_color`)
- Que se abra en modo **standalone** (sin barra de direcciones, como una app nativa)
- La URL de inicio (`start_url`)

```json
{
  "name": "Talabartería Chuy",
  "short_name": "Talabartería",
  "display": "standalone",
  "start_url": "/",
  ...
}
```

Con solo esta información, Chrome considera que tu sitio es una **Progressive Web App (PWA)** mínima y te ofrece agregarlo a la pantalla de inicio.

---

## ¿Qué pasa cuando "instalás" el sitio?

> **Sin service worker** (que es tu caso actual) la "instalación" crea **un acceso directo** en el escritorio del celular.

Ese acceso directo abre el sitio en una **ventana sin navegador** (sin barra de direcciones ni pestañas), exactamente como se ve una app nativa. Pero **no funciona sin conexión a internet** porque no hay un service worker que cachee los archivos.

### Resumen de lo que SÍ y NO tenés:

| Característica | ¿Funciona? |
|---|---|
| Acceso directo desde el escritorio | ✅ Sí, gracias al manifest |
| Se abre sin barra de direcciones | ✅ Sí, por `"display": "standalone"` |
| Icono personalizado en el celular | ✅ Sí, por los `icons` del manifest |
| Funciona sin internet (offline) | ❌ No, falta service worker |
| Notificaciones push | ❌ No, falta service worker |
| Carga instantánea desde caché | ❌ No, falta service worker |

---

## ¿Qué es un Service Worker y para qué sirve?

Un **Service Worker** es un archivo JavaScript (`sw.js`) que el navegador instala y ejecuta **en segundo plano**, separado de tu página web. Actúa como un **proxy** entre el navegador y la red.

### ¿Qué permite?

- **Modo offline**: el SW cachea los archivos (HTML, CSS, JS, imágenes) y los sirve cuando no hay internet.
- **Carga instantánea**: al tener los archivos cacheados, el sitio abre al toque.
- **Notificaciones push**: podés enviar notificaciones aunque el usuario no esté en el sitio.
- **Actualizaciones silenciosas**: el SW puede actualizar archivos en background sin molestar al usuario.

Sin service worker, el "instalar" solo crea un **marcador con ventana propia**. Es útil, pero limitado.

---

## ¿Querés agregar un Service Worker? (Paso a paso)

Vas a necesitar:

1. **Agregar la dependencia** `vite-plugin-pwa` al proyecto
2. **Configurar el plugin** en `vite.config.js`
3. **Crear o ajustar** el `site.webmanifest`
4. **Ejecutar** `npm run build` para generar el service worker automáticamente

### Paso 1: Instalar el plugin

```bash
npm install vite-plugin-pwa -D
```

### Paso 2: Configurar `vite.config.js`

```js
import { defineConfig } from "vite";
import { resolve } from "path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/Talabarteria_Chuy/",
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Talabartería Chuy",
        short_name: "Talabartería",
        description: "Talabartería artesanal en Chuy, Rocha",
        theme_color: "#1a73e8",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/src/assets/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/src/assets/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,jpg,jpeg,svg,gif}"],
      },
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        contacto: resolve(__dirname, "pages/contacto.html"),
        store: resolve(__dirname, "pages/store.html"),
      },
    },
  },
});
```

### Paso 3: Tener los iconos en las rutas correctas

Asegurate de tener los archivos de iconos en `/src/assets/` o donde hayas configurado.

### Paso 4: Compilar

```bash
npm run build
```

El plugin generará automáticamente:

- `dist/sw.js` → el service worker
- `dist/manifest.webmanifest` → el manifest actualizado

### Paso 5: Subir a GitHub Pages

```bash
npm run deploy
```

A partir de ahí, cuando alguien visite el sitio desde el celular y lo "instale", va a tener:

- ✅ Acceso directo con icono
- ✅ Ventana sin navegador (standalone)
- ✅ **Funcionamiento offline** (las páginas que ya visitó se cargan sin internet)
- ✅ Carga más rápida en visitas siguientes

---

## ¿Y si NO querés que aparezca el cartel de "Instalar"?

Si la opción de instalación te molesta y preferís no tenerla, simplemente **sacá la línea del manifest** de tu `index.html`:

```diff
- <link rel="manifest" href="/site.webmanifest" />
```

O directamente eliminá o renombrá el archivo `site.webmanifest`. Con eso el navegador ya no ofrecerá instalar el sitio.

---

## Conclusión

| Situación | ¿Qué pasa? |
|---|---|
| **Solo manifest** (tu caso actual) | El navegador ofrece "Instalar". Crea un acceso directo que abre el sitio en ventana tipo app. Requiere internet para funcionar. |
| **Manifest + Service Worker** | El navegador ofrece "Instalar". Crea una app que funciona offline, carga más rápido y puede enviar notificaciones. |
| **Sin manifest** | No aparece opción de instalar. Es un sitio web común. |

Elegí la opción que mejor se adapte a tu necesidad.
