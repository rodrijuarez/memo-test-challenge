This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Installation

Before you can run the project, you'll need to install the necessary dependencies. Follow these steps to get started:

1. Clone the repository:

```bash
git clone https://github.com/rodrijuarez/memo-test-challenge
```

2. Navigate to the project directory:
``` bash
cd memo-test-challenge
```

3. Install the dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
```

## Using Storybook

This project uses [Storybook](https://storybook.js.org/) for developing and showcasing components in isolation. To start Storybook:

```bash
npm run storybook
# or
yarn storybook
# or
pnpm storybook
```

Storybook will start on http://localhost:6006 by default. You can create stories for your components in the *.stories.js files located alongside your component files. Learn more about writing stories in the Storybook documentation.

## Creating an .env.local file

This project uses environment variables to store sensitive information like API keys. To set up your environment variables, create a file called `.env.local` at the root of the project.

You can use the `.env.example` file as a reference to create your own `.env.local` file. Copy the contents of the `.env.example` file and paste them into the newly created `.env.local` file. Replace the placeholder values with the actual values for each environment variable.

Example:

```makefile
# .env.example
NEXT_PUBLIC_API_KEY=your_api_key_here

# .env.local
NEXT_PUBLIC_API_KEY=myactualapikey123
```

Remember not to commit your `.env.local` file to the repository. The `.gitignore` file should already have an entry for `.env.local` to ensure it doesn't get committed accidentally.


## Getting Started
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
