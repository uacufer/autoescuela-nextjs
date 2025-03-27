# Autoescuela Next.js

Sitio web para autoescuela desarrollado con Next.js, TypeScript y Tailwind CSS.

## Características

- Diseño responsive con Tailwind CSS
- Formulario de contacto con validación
- Páginas para servicios y permisos de conducir
- API para gestionar mensajes de contacto
- Estructura de proyecto feature-first

## Estructura del Proyecto

```
/src
  /app              # Páginas y rutas de la aplicación
  /components       # Componentes reutilizables
    /layout         # Componentes de estructura (Header, Footer)
    /ui             # Componentes de interfaz de usuario
    /forms          # Formularios y componentes relacionados
  /types            # Definiciones de TypeScript
  /utils            # Utilidades y helpers
  /hooks            # Custom hooks de React
```

## Tecnologías

- Next.js 14.1
- TypeScript
- Tailwind CSS
- React 19

## Comenzando

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build
```