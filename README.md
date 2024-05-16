This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Prerequisites

- Docker ^26.1.1
- Node ^21.7.1
- pnpm ^8.15.5

### Environment variables

You will need to provide the following env variables:

- `DATABASE_URL` - url to connect with the db (standard postgres url for dev and neon url for production)
- `RESEND_API_KEY` - API key for Resend in order to send emails
- `EMAIL_DOMAIN` - verified domain to use with Resend (can be Resend's test one in development)

Use `.env.development` for dev and `.env` for production.

## Getting Started

Install dependencies:

```bash
pnpm install
```

Build docker image for the postgres container:

```bash
pnpm run docker:db:build
```

Build and run docker container from the image:

```bash
pnpm run docker:db:up
```

> For subsequent starts of the container use:
>
> ```bash
> pnpm run docker:db:start
> ```

Create db tables with drizzle:

```bash
pnpm run drizzle:push
```

> You can optionally seed the db with:
>
> ```bash
> pnpm run drizzle:seed
> ```
>
> and inspect the db with Drizzle Studio:
>
> ```bash
> pnpm run drizzle:studio
> ```

Run the development server:

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build

This project automatically builds on commit. To build it locally configure env variables and run:

```bash
pnpm run build
```

You also need to push the db schema to neon with:

```bash
pnpm run drizzle:prod:push
```

For Resend to work in production you need to configure the domain and DNS records.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

Learn more about Drizzle ORM from the [docs](https://orm.drizzle.team/docs/overview).

Learn more about Resend from the [docs](https://resend.com/docs/introduction).
