# TypeScript + Jest (ES Module)

## Struktur Proyek

```
typescript-basic/
├── src/
│   └── say-hello.ts
├── tests/
│   └── say-hello.test.ts
├── .gitignore
├── jest.config.js
├── package.json
└── tsconfig.json
```

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

Menghasilkan `tsconfig.json`. Ubah bagian berikut agar memakai ES module dan mengenali Jest:

```jsonc
{
  "compilerOptions": {
    "outDir": "./dist",
    "module": "nodenext",
    "target": "esnext",
    "types": ["jest"],
    "strict": true,
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*", "tests/**/*"]
}
```

| Opsi | Fungsi |
|------|--------|
| `module: nodenext` | Memakai sistem ES module modern milik Node.js |
| `target: esnext` | Hasil kompilasi memakai fitur JavaScript terbaru |
| `types: ["jest"]` | Agar `describe`, `it`, `expect` dikenali |
| `include` | Folder `src` dan `tests` ikut dicek tipenya |

Catatan: `rootDir` sengaja tidak diisi karena ada dua folder sumber (`src` dan `tests`).

### c. Aktifkan ES module di `package.json`

```json
{
  "type": "module",
  "scripts": {
    "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js"
  }
}
```

- `"type": "module"`: file dianggap ES module (`import`/`export`), bukan CommonJS.
- `--experimental-vm-modules`: flag Node yang dibutuhkan Jest untuk menjalankan ES module. Warning `ExperimentalWarning: VM Modules` yang muncul saat test itu normal dan bisa diabaikan.

### d. Buat konfigurasi Jest

Buat `jest.config.js` (jangan pakai hasil `ts-jest config:init` karena memakai `module.exports`):

```js
/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { useESM: true }],
  },
};
```

- `preset` dan `useESM`: ts-jest mengeluarkan ES module, bukan CommonJS.
- `moduleNameMapper`: Jest bisa menemukan file `.ts` walau import ditulis `.js`.

## 2. Menulis Test

Di `nodenext`, import relatif **wajib memakai ekstensi `.js`** (walau file aslinya `.ts`).

`src/say-hello.ts`:

```ts
export function sayHello(name: string): string {
  return `Hello ${name}`;
}
```

`tests/say-hello.test.ts`:

```ts
import { sayHello } from '../src/say-hello.js';

describe('sayHello', () => {
  it('should return hello adit', () => {
    expect(sayHello('adit')).toBe('Hello adit');
  });
});
```

## 3. Menjalankan Test

```bash
npm test
```

Hasil yang diharapkan:

```
PASS tests/say-hello.test.ts
  sayHello
    ✓ should return hello adit

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
```

## 4. Git

Buat `.gitignore`:

```gitignore
node_modules/
dist/
build/
coverage/
.env
.env.*
*.log
.DS_Store
.vscode/
.idea/
```

Yang di-commit: `package.json`, `package-lock.json`, `tsconfig.json`, `jest.config.js`, folder `src/` dan `tests/`.

## 5. Menjalankan Proyek Setelah Clone

```bash
npm install
npm test
npm test -- -t "sayHello" -> menjalankan satu tes
```

## Troubleshooting

| Error | Solusi |
|-------|--------|
| `Relative import paths need explicit file extensions` | Tambahkan `.js` di import relatif |
| `Cannot find name 'describe'` | Pastikan `"types": ["jest"]` di `tsconfig.json` |
| `module is not defined in ES module scope` | `jest.config.js` masih memakai `module.exports`, ganti ke `export default` |
| `ERESOLVE` saat install Babel | Tidak perlu Babel, proyek ini memakai `ts-jest` |
| `File is not under 'rootDir'` | Hapus `rootDir` dari `tsconfig.json` atau arahkan ke `"."` |