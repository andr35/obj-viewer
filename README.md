# OBJ-Viewer

View obj files (AR/VR).

## Run

Place the model in [./public/model/model.obj](./public/model/model.obj).

```bash
pnpm install

# VR requires https
pnpm dev --host 0.0.0.0 --https --no-fork
```

## Build

Build the application for production:

```bash
pnpm run build
pnpm run preview
```
