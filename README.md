# Clínica veterinaria

Frontend de la aplicación veterinaria, construido con React y Vite.

## Estructura de `src`

```text
src/
  app/         Entrada, rutas y estilos de la aplicación
  assets/      Imágenes e iconos
  features/    Funcionalidades agrupadas por módulo
    administracion/
    autenticacion/
    cajero/
    cliente/
    demo/
    inicio/
    veterinario/
  services/    Comunicación con la API
  shared/      Componentes y estilos reutilizados entre módulos
  styles/      Estilos globales
```

## Convenciones

- Mantén cada pantalla y sus estilos junto a su módulo dentro de `features/`.
- Coloca en `shared/` solo componentes o estilos utilizados por más de un módulo.
- Guarda las peticiones HTTP en `services/` y los recursos estáticos en `assets/`.

## Desarrollo

```sh
npm ci
npm run dev
```

Los comandos `npm run build` y `npm run lint` compilan y revisan el frontend.

Para apuntar a un backend local, configura `VITE_API_BASE_URL` en `.env.local`.

## Prototipos de interfaces

Al ejecutar `npm run dev`, abre `http://localhost:5173/demo` para recorrer las interfaces de administración, veterinaria, caja y cliente. La galería solo está habilitada en desarrollo. Las pantallas nuevas usan datos ilustrativos y los cambios hechos ahí no se envían ni guardan en la API; las pantallas existentes conservan sus integraciones actuales.
