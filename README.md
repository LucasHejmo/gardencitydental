# Garden Square Family Dentistry website

Static site. No build step. Upload the contents of this folder to the root of the repo.

## Pages
- `/` index.html
- `/services` services.html
- `/about` about.html
- `/new-patients` new-patients.html
- `/contact` contact.html
- 404.html is shown for missing pages (Cloudflare Workers static assets and GitHub Pages both pick it up)

## SEO included
- Unique title, meta description and canonical URL on every page
- Open Graph and Twitter share tags with a 1200x630 share image (`images/og-image.jpg`)
- Schema.org JSON-LD: `Dentist` (name, address, phone, email, services), `Person` for Dr. Hemant Seth, `BreadcrumbList`, and `FAQPage` on New Patients
- `sitemap.xml` and `robots.txt`
- Favicons, Apple touch icon and web manifest
- Descriptive image alt text and image dimensions set to avoid layout shift

## After deploying
1. Add the site in Google Search Console (Domain property for gardensquarefamilydentistry.ca, verify with a DNS TXT record in Cloudflare).
2. Submit `https://gardensquarefamilydentistry.ca/sitemap.xml` under Sitemaps.
3. Use URL Inspection on the home page and click Request Indexing.
4. Set up or claim the Google Business Profile with the exact same name, address and phone as the site. This drives the map results for "dentist near me".
5. Test the structured data at https://search.google.com/test/rich-results

## To update
- Add the postal code to the address in each page's JSON-LD block and on the Contact page once confirmed.
- Add opening hours to the JSON-LD (`openingHoursSpecification`) once set.
- If the domain is different, find and replace `https://gardensquarefamilydentistry.ca` in all files.
- The form posts to Web3Forms with the existing access key.
