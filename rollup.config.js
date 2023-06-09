import rollupTypescript from 'rollup-plugin-typescript2'
import del from 'rollup-plugin-delete'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: `dist/index.mjs`,
      format: `es`,
      exports: 'auto'
    },
    {
      file: `dist/index.cjs`,
      format: `cjs`,
      exports: 'auto'
    }
  ],
  plugins: [
    del({ targets: 'dist/*' }),
    rollupTypescript({ useTsconfigDeclarationDir: true }),
  ]
}
