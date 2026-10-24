# JL DATA PRO — Sitio Web

Página web profesional para **JL DATA PRO**: venta de computadoras, laptops, accesorios y servicio técnico informático.

## Características

- Diseño profesional con paleta roja y blanco
- Catálogo de productos con filtros por categoría
- Sección de servicio técnico de laptops
- Formulario de contacto vía WhatsApp
- Responsive (móvil, tablet, desktop)
- Optimizado para Firebase Hosting

## Estructura

```
JL DATAPRO/
├── index.html
├── manifest.webmanifest
├── firebase.json
├── .firebaserc
└── assets/
    ├── css/
    │   ├── main.css
    │   ├── components.css
    │   └── responsive.css
    ├── js/
    │   ├── products.js
    │   ├── navigation.js
    │   └── main.js
    └── images/
        └── favicon.svg
```

## Personalización

Antes de publicar, actualiza estos datos en los archivos:

1. **WhatsApp**: busca `51999999999` y reemplázalo con tu número real
2. **Email**: cambia `contacto@jldatapro.com` por tu correo
3. **Ubicación**: edita la dirección en la sección de contacto
4. **Productos**: modifica el array `PRODUCTS` en `assets/js/products.js`
5. **Firebase**: cambia el ID del proyecto en `.firebaserc`

## Panel de administración

Accede en `/login` con un usuario creado en **Firebase Authentication** (Email/Password).

1. Firebase Console → Authentication → Sign-in method → Email/Password (activar)
2. Crear usuario administrador
3. Firestore → crear base de datos
4. Desplegar reglas: `firebase deploy --only firestore:rules`
5. Editar `assets/js/firebase-config.js` con tus credenciales del proyecto

Desde el dashboard puedes agregar, editar y eliminar productos. Los cambios se reflejan en la página principal automáticamente.

## Despliegue en Firebase

```bash
# Instalar Firebase CLI (si no lo tienes)
npm install -g firebase-tools

# Iniciar sesión
firebase login

# Crear proyecto en Firebase Console: https://console.firebase.google.com

# Vincular proyecto (cambia jldatapro por tu ID)
firebase use jldatapro

# Desplegar
firebase deploy --only hosting
```

## Vista local

Abre `index.html` directamente en el navegador, o usa un servidor local:

```bash
npx serve .


##Login de prueba
Usuario: test_probe_user_99@jldatapro.com
Contraseña: ProbePassword123!
```
