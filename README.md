# Nomisma Loan Enquiry Landing Page

A focused, responsive landing page for starting a loan enquiry with Nomisma Financial Services.

Live site: https://nomisma-landing-page.vercel.app/

## Current live journey

The verified public deployment uses a direct WhatsApp journey. Visible application calls to action open the same configured Nomisma WhatsApp conversation.

The page currently provides:

- Separate entry points for salary earners and business owners
- Duration-based rate information
- Clear eligibility and no-automatic-approval disclosure
- Consistent direct-WhatsApp application calls to action
- Responsive presentation for mobile and desktop screens
- Centralised business values and contact configuration
- Safely encoded WhatsApp message content

No application form is present on the verified live deployment as of 10 October 2026.

## Historical implementation note

Earlier versions of this project included a form-based enquiry flow with input validation, consent, honeypot, loading, retry and success or failure behavior. That implementation is historical and must not be described as the current customer journey unless it is intentionally restored and verified.

## Technology

- Vite
- Vanilla JavaScript
- HTML and CSS
- No runtime UI framework

## Client configuration

The current WhatsApp destination, approved loan range and duration-based rates are centralised in src/config.js. Preserve client-confirmed values and rebuild after configuration changes.

Do not infer repayment calculations, approval outcomes, hidden charges or additional pricing. Changes to financial copy, contacts or application routing require client confirmation.

## Local setup

    npm install
    npm run dev
    npm run build
    npm run preview

Publish the generated dist directory to a static HTTPS host.

## Verification boundaries

- Verify every application call to action after contact changes.
- Check URL encoding and the exact destination before deployment.
- Test important mobile and desktop widths after layout changes.
- Opening a WhatsApp link in a browser does not prove a successful mobile-app handoff or completed application.
- Do not send a real enquiry without the client's permission.
- Do not claim conversion rates, enquiry volumes or lending outcomes without authorised records.
