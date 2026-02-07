# Maqueta E-commerce

Template de E-commerce reutilizable con arquitectura en capas.

## 🚀 Tecnologías

- **Backend**: ASP.NET Core Web API (.NET 8/9)
- **Frontend**: React + Vite
- **Base de Datos**: Firebase Firestore
- **Autenticación**: Firebase Authentication

## 📋 Características

- ✅ Arquitectura en capas (Entities, DataAccess, Business, API)
- ✅ Autenticación con email/contraseña
- ✅ Catálogo de productos
- ✅ Diseño responsive y moderno
- ✅ Fácil personalización (colores, textos, branding)

## 🛠️ Configuración Inicial

### Requisitos
- .NET 8 SDK o superior
- Node.js 18+
- Cuenta de Firebase

### 1. Backend

```bash
# Configurar Firebase
# 1. Copia tu firebase-credentials.json a Ecommerce.API/
# 2. Edita Ecommerce.API/appsettings.json con tu Project ID

# Ejecutar
dotnet run --project Ecommerce.API
```

### 2. Frontend

```bash
cd client

# Instalar dependencias
npm install

# Configurar Firebase
# Edita src/firebase.js con tus credenciales web

# Ejecutar
npm run dev
```

## 📖 Documentación

- **Guía de Configuración**: Ver `configuration_guide.md` en la carpeta `.gemini/antigravity/brain/`
- **Setup Firebase**: Ver `firebase_setup.md` y `firebase_web_config.md`

## 🎨 Personalización

Consulta `configuration_guide.md` para saber dónde modificar:
- Colores y branding
- Nombre de la tienda
- Productos de demostración
- Configuración de Firebase

## 📦 Estructura del Proyecto

```
maquetaecommerce/
├── Ecommerce.API/          # API REST
├── Ecommerce.Business/     # Lógica de negocio
├── Ecommerce.DataAccess/   # Repositorios
├── Ecommerce.Entities/     # Modelos
└── client/                 # Frontend React
    ├── src/
    │   ├── components/     # Componentes reutilizables
    │   ├── pages/          # Páginas (Home, Login, Register)
    │   └── contexts/       # AuthContext
    └── public/
```

## 🔐 Seguridad

⚠️ **IMPORTANTE**: No subas `firebase-credentials.json` a Git. El archivo `.gitignore` ya lo excluye.

## 📝 Licencia

Este es un template reutilizable para diferentes clientes.
