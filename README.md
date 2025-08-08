This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## API Setup

### Environment Variables

Create a `.env.local` file in the root directory with your MongoDB connection string:

```bash
MONGODB_URI=mongodb://localhost:27017/whatsapp-clone
```

For MongoDB Atlas, use:
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/whatsapp-clone?retryWrites=true&w=majority
```

### API Endpoints

- **GET** `/api/webhook` - Fetch all webhook data
- **POST** `/api/webhook` - Create new webhook entry
- **GET** `/api/test` - Test database connection
- **POST** `/api/test` - Create sample webhook data

### Troubleshooting

If `/api/webhook` returns an empty array `[]`:

1. **Check MongoDB Connection**: Visit `/api/test` to verify database connectivity
2. **Add Sample Data**: POST to `/api/test` to create sample webhook entries
3. **Check Environment Variables**: Ensure `MONGODB_URI` is set in `.env.local`
4. **Check Console Logs**: Look for database connection errors in the terminal

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
