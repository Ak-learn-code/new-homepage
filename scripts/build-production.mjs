import { spawnSync } from 'node:child_process'

const result = spawnSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'build'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    VITE_SITE_URL: 'https://sidetwo.de',
    VITE_BASE_PATH: '/',
    VITE_DIRECTUS_URL: process.env.VITE_DIRECTUS_URL || 'https://directus.sidetwo.de',
  },
})

process.exit(result.status ?? 1)
