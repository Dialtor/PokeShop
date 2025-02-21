# Rick and Morty + GraphQL (React + TypeScript + Vite)

Este proyecto muestra una aplicación basada en **React** y **TypeScript** creada con **Vite**. Consume la **API de GraphQL** de [Rick and Morty](https://rickandmortyapi.com/) para listar personajes, permitir la búsqueda y el filtrado, así como guardar personajes favoritos en un estado global.

---

## Tecnologías principales

- **React 18**  
- **TypeScript**  
- **Vite** (para un entorno de desarrollo rápido)  
- **Apollo Client** (para consumir GraphQL)  
- **Tailwind CSS** (para estilos)  

---

## Características

1. **Listado de Personajes**: Muestra todos los personajes disponibles en la API de Rick and Morty.  
2. **Búsqueda y Filtro**: Permite filtrar personajes por nombre y/o especie.  
3. **Favoritos**: Podrás marcar y desmarcar personajes como favoritos; se mostrarán en la sección "Starred Characters".  
4. **Responsive**: Adaptación para diferentes tamaños de pantalla.

---

## Estructura del proyecto

```bash
├── src
│   ├── api
│   │   └── GET_CHARACTERS.ts   # Query GraphQL para obtener personajes
│   ├── components
│   │   ├── Sidebar
│   │   │   ├── Sidebar.tsx     # Barra lateral con el buscador, filtros y listado
│   │   │   ├── Filter.tsx      # Componente para filtrar por tipo de personaje
│   │   │   ├── CharacterComponent.tsx
│   │   │   └── FavoritesComponent.tsx
│   │   └── ...
│   ├── store
│   │   └── useFavoriteStore.ts # Estado global (Zustand/Redux/Context, etc.)
│   ├── App.tsx                 # Raíz de la aplicación
│   ├── main.tsx                # Punto de entrada con createRoot
│   └── ...
├── public
│   └── ...
├── .eslintrc.cjs o eslint.config.js   # Configuración de ESLint
├── tsconfig.json
├── tsconfig.node.json
├── tsconfig.app.json
├── package.json
├── README.md
└── ...
