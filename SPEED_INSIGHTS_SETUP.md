# Vercel Speed Insights Setup

This project now includes Vercel Speed Insights to monitor and track website performance metrics.

## What was installed

- **Package**: `@vercel/speed-insights` (v2.0.0)
- **Integration Method**: Official Vercel-hosted script (recommended for static sites)

## Implementation Details

### Files Modified

All HTML files now include the Speed Insights script before the closing `</body>` tag:
- `index.html`
- `about.html`
- `contact.html`
- `project.html`
- `skills.html`
- `webprojects.html`
- `404.html`
- `thankyou.html`

### Integration Code

Each HTML file includes the following snippet before the closing `</body>` tag:

```html
<!-- ✅ VERCEL SPEED INSIGHTS -->
<script>
  window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };
</script>
<script defer src="/_vercel/speed-insights/script.js"></script>
```

### How it Works

The Speed Insights script is automatically loaded on every page and will:
- Track Core Web Vitals (LCP, FID, CLS, INP)
- Monitor page load performance
- Measure real user metrics
- Send data to Vercel's Speed Insights dashboard

### Deployment

When deploying to Vercel:

1. Push your code to the connected Git repository
2. Vercel automatically deploys the site
3. The `/_vercel/speed-insights/*` routes are automatically available
4. Speed Insights will start collecting data after deployment
5. View metrics in your Vercel dashboard under "Speed Insights"

### Enabling Speed Insights Dashboard

To view the collected data:

1. Go to your Vercel dashboard
2. Select your project
3. Click "Speed Insights" in the sidebar
4. Click "Enable" if not already enabled

Note: Speed Insights is available on all Vercel plans. Data will appear in the dashboard after a few page visits.

### Performance Impact

The Speed Insights script is:
- **Tiny**: ~1KB gzipped
- **Async**: Loaded with `defer` - doesn't block page rendering
- **Efficient**: Minimal performance overhead
- **Hosted by Vercel**: No bundling or build step required

## Technical Details

- **Framework**: Vanilla JavaScript (static HTML)
- **Integration Method**: Official Vercel-hosted script
- **Loading Strategy**: Deferred loading from Vercel CDN
- **Browser Support**: Modern browsers (ES6+)

## Maintenance

The package is installed for reference but the integration uses Vercel's hosted script. To update:

```bash
npm install @vercel/speed-insights@latest
```

No build step or bundling is required. The Vercel-hosted script is automatically updated.
