import { execSync } from 'child_process';
import fs from 'fs';

async function buildForNetlify() {
  console.log('🚀 Build Netlify - Sono Zen');

  try {
    // Limpar arquivos antigos
    console.log('🧹 Limpando cache...');
    if (fs.existsSync('dist')) {
      fs.rmSync('dist', { recursive: true, force: true });
    }
    if (fs.existsSync('node_modules/.vite')) {
      fs.rmSync('node_modules/.vite', { recursive: true, force: true });
    }

    // Verificar se node_modules existe
    if (!fs.existsSync('node_modules')) {
      console.log('📦 Instalando dependências...');
      execSync('npm ci', { stdio: 'inherit' });
    }

    // Build com configurações otimizadas
    console.log('⚡ Construindo aplicação...');
    process.env.NODE_ENV = 'production';
    process.env.VITE_BUILD_TARGET = 'netlify';
    
    execSync('vite build --mode production', { 
      stdio: 'inherit',
      env: {
        ...process.env,
        NODE_OPTIONS: '--max-old-space-size=4096'
      }
    });

    console.log('🔧 Construindo servidor...');
    execSync('esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', { 
      stdio: 'inherit' 
    });

    // Verificar se o build foi bem-sucedido
    if (!fs.existsSync('dist/public/index.html')) {
      throw new Error('Build falhou - index.html não encontrado');
    }

    console.log('✅ Build concluído! Timer: 2.5s, sem música');
    
  } catch (error) {
    console.error('❌ Erro no build:', error.message);
    process.exit(1);
  }
}

buildForNetlify();