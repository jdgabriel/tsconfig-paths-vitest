# Vite Plugin: Tsconfig Paths

Este plugin para Vite permite que você utilize os caminhos definidos no seu `tsconfig.json` como aliases no Vite, facilitando a importação de módulos com caminhos relativos.

## Instalação

Para usar este plugin, você precisará instalar os seguintes pacotes:
```sh
pnpm install vite jsonc-parser
```

## Como Usar
1. Crie ou edite seu arquivo de configuração do Vite (vite.config.ts ou vite.config.js) para incluir o plugin tsconfigPathsPlugin.
2. Certifique-se de que você tenha um arquivo tsconfig.json em seu projeto com as opções de caminhos configuradas.

Exemplo de Configuração com Vitest
Aqui está um exemplo de como configurar o Vitest para usar este plugin:
```ts
// vite.config.ts
import { defineConfig } from 'vite'
import { tsconfigPathsPlugin } from './path/to/tsconfigPathsPlugin'

export default defineConfig({
  plugins: [
    tsconfigPathsPlugin( /* { tsconfigPath: "./tsconfig.json" By default  } */ )
  ],
  test: {
    // Configurações do Vitest
  },
})
```
## Estrutura de Diretórios
Certifique-se de que a estrutura de diretórios do seu projeto seja semelhante à seguinte:
```bash
├── src
│   ├── main.ts
│   └── ...
├── tsconfig.json
└── vite.config.ts
```

## Exemplo de tsconfig.json
Seu arquivo `tsconfig.json` deve conter as opções de caminhos que você deseja usar:
```bash
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"],
      "@utils/*": ["src/utils/*"]
    }
  }
}
```

## Contribuindo
Se você encontrar algum problema ou tiver alguma sugestão, sinta-se à vontade para abrir uma issue ou enviar um pull request.
