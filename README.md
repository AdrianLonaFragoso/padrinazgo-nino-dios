# Padrinazgo del Niño Dios · Navidad 2026

Presentación web de la propuesta de padrinazgo del Niño Dios para la **Parroquia Virgen de la Anunciación**.

Es un sitio estático con una presentación (deck) de 4 diapositivas navegable con teclado, botones y gestos táctiles.

## Características

- 4 diapositivas: Portada, Motivación, Propuesta y Agradecimiento.
- Navegación con flechas ←/→, `Home`/`End`, botones Anterior/Siguiente e indicadores de progreso.
- Pantalla completa (tecla `F`).
- Diseño responsive y estilo de impresión (cada diapositiva en una hoja).
- Meta tags Open Graph / Twitter para que el enlace se vea bien al compartirlo (p. ej. por WhatsApp).

## Estructura del proyecto

```
.
├── index.html            # Estructura de la presentación
├── css/
│   └── styles.css        # Todos los estilos
├── js/
│   └── app.js            # Lógica de navegación del deck
├── assets/
│   ├── og-image.jpg      # Imagen de preview al compartir (1200×630)
│   ├── og-image.png      # Versión PNG de la misma imagen
│   └── og-image.html     # Plantilla fuente para regenerar la imagen
└── .gitignore
```

## Uso local

Al ser un sitio estático basta con abrir `index.html` en el navegador. Para servirlo localmente (recomendado para que funcionen bien las rutas):

```bash
python3 -m http.server 8000
```

Luego abre <http://localhost:8000>.

## Despliegue

Pensado para desplegarse en **Vercel** como sitio estático (sin build). Al desplegar, la URL de producción suele ser `https://padrinazgo-nino-dios.vercel.app`.

> **Importante:** los meta tags (`og:url`, `og:image`, `canonical`, `twitter:image`) apuntan a esa URL. Si Vercel asigna un dominio distinto, hay que actualizar esas referencias en `index.html`.

### Regenerar la imagen de preview

La imagen de preview se genera a partir de `assets/og-image.html` con Chrome headless:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --hide-scrollbars \
  --window-size=1200,630 \
  --screenshot="assets/og-image.png" \
  "file://$PWD/assets/og-image.html"
```

## Licencia

Uso privado para la Parroquia Virgen de la Anunciación.
