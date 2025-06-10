# 🌟 Boys II Planet Ranker

Um aplicativo interativo para criar e compartilhar seu ranking dos 8 melhores trainees do Boys Planet. Construído com React, TypeScript e CSS modular.

![Boys II Planet Ranker](https://via.placeholder.com/800x400/1a0b2e/e879f9?text=Boys+II+Planet+Ranker)

## ✨ Funcionalidades

- 🎯 **Ranking Interativo**: Selecione e organize seus 8 trainees favoritos
- 🌌 **Formação Constellation**: Layout visual inspirado em K-pop com posição central destacada
- 🔍 **Busca e Filtros**: Encontre trainees por nome ou empresa
- 👁️ **Filtro de Eliminados**: Opção para mostrar/ocultar trainees eliminados
- 👑 **Destaque Top 8**: Visualize os trainees que chegaram ao top 8 oficial
- 📱 **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- 🖼️ **Download de Imagem**: Baixe seu ranking como imagem PNG
- 🎨 **Animações Suaves**: Efeitos visuais e transições elegantes
- 🎭 **Grades Coloridas**: Sistema de cores baseado nas grades A, B, C, D, F

## 🚀 Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para interfaces
- **TypeScript** - Tipagem estática para JavaScript
- **CSS Modules** - Estilização modular e organizada
- **Canvas API** - Geração de imagens para download
- **CSS Grid & Flexbox** - Layout responsivo
- **CSS Custom Properties** - Variáveis CSS para consistência
- **CSS Animations** - Animações e transições suaves

## 📁 Estrutura do Projeto

\`\`\`
boys2planet-ranker/
├── public/
│ ├── index.html
│ └── images/ # Imagens dos trainees
├── src/
│ ├── components/ # Componentes React
│ │ ├── Header.tsx
│ │ ├── Header.css
│ │ ├── TraineeCard.tsx
│ │ ├── TraineeCard.css
│ │ ├── TraineeList.tsx
│ │ ├── TraineeList.css
│ │ ├── RankingSlot.tsx
│ │ ├── RankingSlot.css
│ │ ├── RankingConstellation.tsx
│ │ └── RankingConstellation.css
│ ├── data/
│ │ └── trainees.ts # Dados dos trainees
│ ├── styles/ # Estilos globais
│ │ ├── base.css # Reset e variáveis CSS
│ │ ├── layout.css # Grid e containers
│ │ ├── animations.css # Animações
│ │ ├── utilities.css # Classes utilitárias
│ │ └── responsive.css # Media queries
│ ├── types/
│ │ └── trainee.ts # Tipos TypeScript
│ ├── App.tsx
│ ├── App.css # Importações dos módulos CSS
│ └── index.tsx
├── package.json
├── tsconfig.json
├── SECURITY.md # Relatório de segurança
└── README.md
\`\`\`

## 🛠️ Instalação e Configuração

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Passo a Passo

1. **Clone ou crie o projeto**
   \`\`\`bash
   npx create-react-app boys2planet-ranker --template typescript
   cd boys2planet-ranker
   \`\`\`

2. **Substitua os arquivos**

   - Substitua todos os arquivos gerados pelos arquivos do código fornecido
   - Mantenha a estrutura de pastas conforme mostrado acima

3. **Remova arquivos desnecessários**

   - Delete os seguintes arquivos que não são necessários para o projeto:
     - `src/App.test.tsx`
     - `src/react-app-env.d.ts`
     - `src/reportWebVitals.ts`
     - `src/setupTests.ts`
     - `public/robots.txt`
     - `public/manifest.json`

4. **Adicione as imagens dos trainees**

   - Crie a pasta `public/images/`
   - Adicione as fotos dos trainees seguindo o padrão de nomenclatura:
     - `kim-jiwoong.jpg`
     - `zhang-hao.jpg`
     - `sung-hanbin.jpg`
     - etc.

5. **Instale as dependências**
   \`\`\`bash
   npm install
   \`\`\`

6. **Execute o projeto**
   \`\`\`bash
   npm start
   \`\`\`

7. **Acesse o aplicativo**
   - Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 🔒 Segurança

### Vulnerabilidades Conhecidas

O projeto pode apresentar algumas vulnerabilidades em dependências de desenvolvimento (como `nth-check`, `postcss`, `webpack-dev-server`). Essas vulnerabilidades:

- ✅ **Não afetam a produção**
- ✅ **Não afetam os usuários finais**
- ✅ **São apenas em ferramentas de desenvolvimento**

### Comandos de Segurança

\`\`\`bash

# Verificar apenas dependências de produção

npm run audit-prod

# Verificar vulnerabilidades moderadas/altas

npm run security-check

# Atualizar dependências e verificar

npm run update-deps
\`\`\`

Para mais detalhes, consulte o arquivo [SECURITY.md](./SECURITY.md).

## 🧹 Limpeza do Projeto

O projeto foi otimizado removendo arquivos desnecessários do Create React App:

### Arquivos Removidos:

- **App.test.tsx** - Testes unitários (não necessários para este projeto)
- **react-app-env.d.ts** - Tipos do React App (não utilizados)
- **reportWebVitals.ts** - Métricas de performance (não necessárias)
- **setupTests.ts** - Configuração de testes (não utilizamos testes)
- **robots.txt** - SEO para crawlers (não necessário para SPA)
- **manifest.json** - PWA manifest (não é uma PWA)

### Benefícios:

- 📦 **Bundle menor** - Menos arquivos para processar
- 🧹 **Código limpo** - Apenas o essencial
- 🚀 **Build mais rápido** - Menos dependências
- 🎯 **Foco no projeto** - Sem distrações desnecessárias

## 🎨 Arquitetura CSS

O projeto utiliza uma arquitetura CSS modular e bem organizada:

### Variáveis CSS (CSS Custom Properties)

- Cores consistentes em todo o projeto
- Espaçamentos padronizados
- Tipografia unificada
- Facilita manutenção e temas

### Estrutura Modular

- **base.css**: Reset, variáveis e estilos fundamentais
- **layout.css**: Grid, containers e estruturas principais
- **animations.css**: Todas as animações do projeto
- **utilities.css**: Classes utilitárias reutilizáveis
- **responsive.css**: Media queries e breakpoints
- **Component.css**: Estilos específicos de cada componente

### Benefícios da Arquitetura

- 🔧 **Manutenção fácil**: Cada componente tem seus próprios estilos
- 🎯 **Organização clara**: Separação lógica de responsabilidades
- 🚀 **Performance**: Carregamento otimizado de estilos
- 🔄 **Reutilização**: Classes utilitárias para casos comuns
- 📱 **Responsividade**: Media queries centralizadas

## 🎮 Como Usar

1. **Selecionar Trainees**: Clique nos cards dos trainees para adicioná-los ao ranking
2. **Organizar Posições**: Arraste e solte para reordenar as posições
3. **Filtrar**: Use os filtros para mostrar/ocultar eliminados ou destacar o top 8
4. **Buscar**: Digite no campo de busca para encontrar trainees específicos
5. **Baixar Imagem**: Clique no botão "Download Image" para salvar seu ranking

## 🎨 Sistema de Grades

- **Grade A**: Rosa (#ec4899) - Trainees de nível mais alto
- **Grade B**: Roxo (#a855f7) - Trainees de nível alto
- **Grade C**: Azul (#3b82f6) - Trainees de nível médio
- **Grade D**: Ciano (#06b6d4) - Trainees de nível básico
- **Grade F**: Cinza (#6b7280) - Trainees iniciantes

## 📱 Responsividade

O aplicativo é totalmente responsivo e funciona em:

- 🖥️ **Desktop**: Layout em duas colunas
- 📱 **Tablet**: Layout em coluna única
- 📱 **Mobile**: Interface otimizada para toque
- 🖨️ **Print**: Estilos específicos para impressão

## 🚀 Build para Produção

\`\`\`bash
npm run build
\`\`\`

Isso criará uma pasta `build/` com os arquivos otimizados para produção.

### Verificação de Segurança antes do Deploy

\`\`\`bash

# Verificar vulnerabilidades de produção

npm run audit-prod

# Build e verificar se está tudo funcionando

npm run build
\`\`\`

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🙏 Agradecimentos

- Mnet pelo programa Boys Planet
- Todos os trainees que participaram do programa
- Comunidade K-pop por todo o apoio

---

**Feito com 💜 para a comunidade Boys Planet**
