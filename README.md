## 1. Persiapan

### a. Install dependency

```bash
npm install --save-dev jest @types/jest ts-jest typescript
```

| Paket | Fungsi |
|-------|--------|
| `jest` | Test runner: menjalankan test dan menampilkan hasilnya |
| `@types/jest` | Type definition agar `describe`, `it`, `expect` dikenali TypeScript |
| `ts-jest` | Transformer agar Jest bisa langsung menjalankan file `.ts` (tanpa Babel) |
| `typescript` | Compiler TypeScript, dibutuhkan oleh `ts-jest` |

### b. Buat konfigurasi TypeScript

```bash
npx tsc --init
```

Menghasilkan `tsconfig.json`, berisi aturan compiler TypeScript (target, strict mode, dll). Lewati langkah ini kalau file tersebut sudah ada.

### c. Buat konfigurasi Jest

```bash
npx ts-jest config:init
```

Menghasilkan `jest.config.js` dengan preset `ts-jest`, supaya Jest tahu cara memproses file TypeScript.

### d. Tambahkan script test

Di `package.json`:

```json
"scripts": {
  "test": "jest"
}
```

### e. Jalankan test

```bash
npm test
```