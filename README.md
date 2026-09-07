# Nomisma loan enquiry landing page

Vite + vanilla JavaScript/CSS. No runtime packages or external fonts.

## Run

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`

Publish the generated `dist` directory to a static HTTPS host.

## Client configuration

Client-confirmed contacts are already set in `src/config.js`; preserve them. Loan limits and confirmed monthly rates are centralised there too. The activated FormSubmit random identifier is configured as `formSubmitToken`; the recipient email is not included in frontend runtime code. The identifier is a public form endpoint, not a secret credential.

- Confirmed loan range: ₦500,000–₦50,000,000, inclusive.
- Confirmed pricing: from 3.8% monthly; 1–6 months at 4.2% monthly and 7–12 months at 3.8% monthly. Rates and terms depend on repayment duration and eligibility. No repayment calculations or additional pricing are inferred.
- Build again after configuration changes.
- Before sending advert traffic, submit a controlled enquiry with the client's permission and verify actual inbox delivery through the activated endpoint. A successful API response alone does not prove inbox delivery.
- Confirm the client's consent wording and use of FormSubmit for enquiry processing.
- On domain migration, verify HTTPS, email submission and WhatsApp again. Add the confirmed canonical URL and absolute social-sharing URL/image then; no production domain has been invented.

FormSubmit documentation: https://formsubmit.co/ajax-documentation and https://formsubmit.co/

## Scope and privacy

Initial enquiries collect only applicant category (Salary Earner or Business Owner), full name, loan amount, phone number and required contact consent. The payload includes these five values plus the email subject, email template and honeypot. No applicant reply-to field is sent. No repayment calculator, tracking, generated references, document uploads, financial credentials or approval promises. Applicant information is not stored in localStorage, cookies or analytics. WhatsApp opens only when the applicant chooses its link. Failure messages retain the form and do not assert successful submission.

## Verification

Production build and diff whitespace check passed. Temporary DOM tests used simulated responses for both applicant categories, both inclusive loan boundaries, formatted naira amounts, out-of-range and malformed/decimal rejection, unchanged invalid input, corrected retry, required consent, successful submission, rejected response, network failure, honeypot, duplicate submit prevention, exact payload and WhatsApp encoding. Category-card links, rate copy and removal of obsolete fields were also checked. No live email was sent. Internal anchors and WhatsApp destinations were checked.

Final Chrome responsive checks covered 375px, 390px, 430px, 768px and 1440px widths. Checked the hero, applicant controls, keyboard selection/focus, consent/submit spacing and clean initial form state. At 390px, the key hero copy and Apply Now are visible within an 844px-high viewport. The mobile bar hides while the form, financing terms, disclosure or footer is visible, avoiding content overlap. CSS retains safe-area spacing and reduced-motion handling. A real mobile WhatsApp app handoff and live FormSubmit inbox delivery remain to be verified. No live enquiry was sent during QA.

The requested `reference/original-landing.html` was absent. The supplied `reference/nomisma_loan_landing_page-3.html`, mini-app ZIP and public logo were inspected instead and preserved.

Loan input accepts plain digits, correctly grouped commas, whitespace and an optional leading ₦ symbol. Validation normalizes a separate numeric value without rewriting the applicant’s entry; emails and WhatsApp use formatted naira amounts. Ambiguous grouping, decimals, signs and scientific notation are rejected.
