# Open Design Docs

A comprehensive resource for design leadership and management, featuring AI-powered performance review assistance.

## 🚀 Features

- **Level Competencies**: Comprehensive frameworks for design roles
- **ReviewsAI**: AI-powered assistant for annual performance reviews
- **Job Descriptions**: Detailed role specifications
- **Interview Panels**: Structured interview processes
- **Leadership Resources**: Management and career development guides

## 🤖 ReviewsAI Setup

The ReviewsAI chatbot uses OpenAI GPT-4 to generate comprehensive performance reviews. To enable this feature:

### 1. Get OpenAI API Key
- Visit [OpenAI Platform](https://platform.openai.com/api-keys)
- Create a new API key
- Copy the key for the next step

### 2. Configure Environment Variables
Create a `.env` file in the root directory:

```bash
# OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Restart Development Server
After adding the environment variable, restart your development server:

```bash
npm run dev
```

The ReviewsAI will now use GPT-4 to generate structured, competency-aligned performance reviews.

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
# Trigger deployment with env vars
