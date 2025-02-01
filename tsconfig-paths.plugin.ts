import { parse } from 'jsonc-parser'
import type { AliasOptions, Plugin } from 'vite'

import { readFile } from 'node:fs/promises'
import path from 'node:path'

export interface TsconfigPathsPluginOptions {
  tsconfigPath?: string
}

export function tsconfigPathsPlugin(
  options: TsconfigPathsPluginOptions = {},
): Plugin {
  const { tsconfigPath = './tsconfig.json' } = options

  return {
    name: 'vitest-tsconfig-paths',
    async config(config) {
      try {
        const absolutePath = path.resolve(tsconfigPath)
        const tsconfigContent = await readFile(absolutePath, 'utf-8')
        const tsconfig = parse(tsconfigContent)

        const compilerOptions = tsconfig.compilerOptions || {}
        const baseUrl = compilerOptions.baseUrl || '.'
        const paths: Record<string, Array<string>> = compilerOptions.paths || {}

        const resolvedBaseUrl = path.resolve(
          path.dirname(absolutePath),
          baseUrl,
        )

        // Converter paths para array de aliases
        const aliases = Object.entries(paths).flatMap(([alias, patterns]) => {
          return patterns.map((pattern) => ({
            find: new RegExp(`^${alias.replace('*', '(.*)')}$`),
            replacement: path.resolve(
              resolvedBaseUrl,
              pattern.replace('*', '$1'),
            ),
          }))
        })

        const existingAliases = normalizeAliases(config.resolve?.alias || [])

        return {
          ...config,
          resolve: {
            ...config.resolve,
            alias: [...existingAliases, ...aliases],
          },
        }
      } catch (error) {
        console.error('Error processing tsconfig paths:', error)
        return config
      }
    },
  }
}

interface NormalizeAliases {
  find: string | RegExp
  replacement: string
}

function normalizeAliases(aliasOptions: AliasOptions): NormalizeAliases[] {
  if (Array.isArray(aliasOptions)) return aliasOptions
  return Object.entries(aliasOptions).map(([find, replacement]) => ({
    find,
    replacement,
  }))
}
