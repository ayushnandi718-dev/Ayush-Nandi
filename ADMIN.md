# Portfolio admin portal

The site at `https://ayushapd.dpdns.org` is driven by [`src/data/portfolio.json`](src/data/portfolio.json).
Sign in at `/admin`, edit the sections, and hit **Save changes**. The server commits the
JSON file (or an MDX blog post) to this repository with the GitHub API, which triggers a
Vercel redeploy automatically.

## One-time setup

1. Create a **fine-grained personal access token** for your account with:
   - Repository access: **Only select repositories** → `Ayush-Nandi`
   - Permissions → Contents: **Read and write**
2. In Vercel → Project → Settings → Environment Variables, add (for Production,
   Preview and Development):

   | Variable | Value |
   | --- | --- |
   | `ADMIN_PASSWORD` | The password you want to use at `/admin` |
   | `ADMIN_SESSION_SECRET` | A long random string (used to sign the session cookie) |
   | `GITHUB_TOKEN` | The fine-grained token from step 1 |
   | `GITHUB_REPO_OWNER` | `ayushnandi718-dev` |
   | `GITHUB_REPO_NAME` | `Ayush-Nandi` |
   | `GITHUB_BRANCH` | `main` |

3. Redeploy. Visit `https://ayushapd.dpdns.org/admin` and sign in.

For local development, copy `.env.example` to `.env.local`, fill in the values, then:

```bash
npm install --legacy-peer-deps
npm run dev
```

> Without `GITHUB_TOKEN`, the admin portal loads the bundled JSON defaults but saving
> is disabled. In local development the portal always loads the on-disk JSON, so it
> matches the homepage you are previewing; a successful save still commits to GitHub.
> On Vercel, the GitHub commit triggers a rebuild instead.

## What you can edit

- Hero copy and CTA buttons
- Projects: section title, See More link, and every project card's category, title,
  links, screenshot path, skill keys (`html`, `css`, `js`, `react`, `nextjs`, `ts`,
  `tailwind`, `vite`, `gsap`, `chrome`), tagline, description, and feature text
- What I'm Building Now: heading, description, case-study project cards (icon, title,
  summary, tech tags, Problem / Solution / Result, GitHub link), View More link, and
  builder metrics
- My Journey paragraphs, profile card, and contact details
- Tech stack groups, social links, footer, SEO metadata, and site identity
- Blog posts: edit existing MDX, create new posts, and delete posts

## Security notes

- The session is an httpOnly, `SameSite=Lax`, Secure (in production) cookie signed with
  `ADMIN_SESSION_SECRET` (falling back to `ADMIN_PASSWORD`) and expires after 7 days.
- Never commit `GITHUB_TOKEN`, `ADMIN_PASSWORD`, or `.env.local` to the repository.
- `/admin` is marked `noindex` so it does not appear in search results.
