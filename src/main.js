import "./style.css";
import { NOMISMA_CONFIG as config } from "./config.js";

const money = (value) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
// Accept plain digits or correctly grouped thousands, with optional naira symbol
// and whitespace. Reject decimals, signs and ambiguous comma grouping.
const parseLoanAmount = (value) => {
  const normalized = value.replace(/\s/g, "").replace(/^₦/, "");
  if (!/^(?:\d+|\d{1,3}(?:,\d{3})+)$/.test(normalized)) return NaN;
  const amount = Number(normalized.replace(/,/g, ""));
  return Number.isSafeInteger(amount) ? amount : NaN;
};
const whatsapp = (message) =>
  `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`;
const contactUrl = whatsapp(
  "Hello Nomisma, I would like to make a loan application. Please assist me with the next steps.",
);
const arrow = '<span aria-hidden="true">↗</span>';
const chat =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M21 11.5a9 9 0 0 1-13.5 7.8L3 21l1.7-4.5A9 9 0 1 1 21 11.5Z"/><path d="M8 8c0 4 4 8 8 8M8 8l2 2m4 4 2 2"/></svg>';
const waLink = (label = "Chat on WhatsApp", extra = "") =>
  `<a class="button secondary ${extra}" href="${contactUrl}" target="_blank" rel="noopener noreferrer">${chat}${label}</a>`;

document.querySelector("#app").innerHTML = `
<a class="skip-link" href="#main">Skip to content</a>
<div class="announcement">Your next move starts with a conversation.</div>
<header class="container header"><a href="#" aria-label="Nomisma Financial Services home"><img class="logo" src="/assets/nomisma-logo.jpeg" width="1280" height="475" alt="Nomisma — ...adding value"></a><nav aria-label="Main navigation"><a class="nav-link" href="#how-it-works">How it works</a>${waLink("WhatsApp", "header-whatsapp")}<a class="button primary" href="#apply">Apply Now ${arrow}</a></nav></header>
<main id="main">
<section class="hero"><div class="container hero-grid">
<div class="hero-copy"><h1>Making your <em>financial goals easier</em></h1><p class="lead">Whether you are a salary earner or a business owner, start your loan application with Nomisma.</p>
<section class="financing-terms" aria-labelledby="terms-title"><h2 id="terms-title" class="eyebrow">Interest rates</h2><dl><div><dt>${config.shortTermLabel}</dt><dd>${config.rateShortTerm}% monthly</dd></div><div><dt>${config.longTermLabel}</dt><dd>${config.rateLongTerm}% monthly</dd></div></dl></section>
<div class="actions"><a class="button primary" href="#apply">Apply Now ${arrow}</a>${waLink()}</div></div>
<section class="form-card" id="apply" aria-labelledby="form-title" tabindex="-1"><div class="form-heading"><p class="eyebrow">Let’s get started</p><span class="form-tag">Loan application</span></div><h2 id="form-title">Start your loan application.</h2>
<form id="enquiry-form"><p class="required-note">All fields are required.</p>
<fieldset class="applicant"><legend>I’m applying as a</legend><div class="choices"><label><input type="radio" name="applicantType" value="Salary Earner" required><span><span aria-hidden="true">♙</span> Salary Earner</span></label><label><input type="radio" name="applicantType" value="Business Owner" required><span><span aria-hidden="true">▤</span> Business Owner</span></label></div></fieldset>
<div class="fields"><div class="field full"><label for="full-name">Full name</label><input id="full-name" name="fullName" autocomplete="name" maxlength="120" required placeholder="Your full name"></div>
<div class="field full"><label for="email">Email Address</label><input id="email" name="email" type="email" autocomplete="email" required placeholder="Your email address"></div>
<div class="field"><label for="amount">Loan amount (₦)</label><input id="amount" name="amount" type="text" inputmode="numeric" maxlength="40" required placeholder="e.g. ₦1,000,000" aria-describedby="amount-help"></div>
<div class="field"><label for="phone">Phone / WhatsApp number</label><input id="phone" name="phone" type="tel" autocomplete="tel" maxlength="24" required placeholder="Your phone number" aria-describedby="phone-help"><span class="sr-only" id="phone-help">Enter 10 to 15 digits, with an optional country code.</span></div></div>
<p id="amount-help" class="amount-help">Enter an amount between ${money(config.loanMin)} and ${money(config.loanMax)}.</p>
<div class="honeypot" aria-hidden="true"><label for="website">Leave this field empty</label><input id="website" name="_honey" tabindex="-1" autocomplete="off"></div>
<p class="privacy-help">For your safety, do not submit passwords, PINs, BVN, NIN or sensitive banking credentials through this form.</p>
<label class="consent"><input type="checkbox" name="consent" required><span>I consent to Nomisma using the information I provide to contact me regarding this loan application.</span></label>

<button class="button primary submit" type="submit">Send loan application ${arrow}</button><p class="form-footnote">A loan application is the first step. It is not a loan approval.</p></form>
<div id="form-status" role="status" aria-live="polite" aria-atomic="true"></div><a id="fallback" class="button secondary" href="${contactUrl}" target="_blank" rel="noopener noreferrer" hidden>${chat}Continue on WhatsApp</a>
<div id="success" hidden tabindex="-1"><div class="success-icon" aria-hidden="true">✓</div><p>To further your loan application . . .</p><a id="success-whatsapp" class="button primary" target="_blank" rel="noopener noreferrer">${chat}Continue on WhatsApp</a></div>
</section></div></section>
<section class="container serve section" aria-labelledby="serve-title"><div class="section-heading"><div><p class="eyebrow">Who we serve</p><h2 id="serve-title">Different goals.<br>The same thoughtful approach.</h2></div><p>Personal priorities or business possibilities.<br>Tell us what moving forward means to you.</p></div><div class="serve-grid"><article class="serve-card"><div class="card-top"><span class="line-icon" aria-hidden="true">♙</span><span class="card-label">Personal needs</span></div><h3>Salary Earners</h3><p>Explore loan options for important personal needs and planned expenses, subject to an assessment of your circumstances.</p><a href="#apply" data-applicant="Salary Earner">Apply as a Salary Earner ${arrow}</a></article><article class="serve-card business"><div class="card-top"><span class="line-icon" aria-hidden="true">▤</span><span class="card-label">Business goals</span></div><h3>Business Owners</h3><p>Start a conversation about working capital, expansion or other eligible needs for the business you are building.</p><a href="#apply" data-applicant="Business Owner">Apply as a Business Owner ${arrow}</a></article></div></section>
<section class="process section" id="how-it-works"><div class="container"><p class="eyebrow">How it works</p><h2>A clear place to start</h2><ol class="steps"><li><span>01</span><h3>Submit your application</h3><p>Share your name, loan amount and phone number.</p></li><li><span>02</span><h3>Eligibility review</h3><p>Nomisma reviews your application as the first step in assessing eligibility.</p></li><li><span>03</span><h3>Discuss your next steps</h3><p>A Nomisma representative contacts you with the appropriate next steps.</p></li></ol></div></section>
<section class="container disclosure"><span class="notice-icon" aria-hidden="true">i</span><div><h2>Before you apply</h2><p>Submitting a loan application does not constitute loan approval. Loan amount, eligibility, documentation requirements, repayment terms and final approval are subject to Nomisma’s assessment and applicable terms. Advertised rates are based on the selected repayment duration.</p></div></section>
<section class="container final-cta"><div><h2>So what’s next?</h2><p>Start an enquiry or speak with us on WhatsApp.</p></div><div class="actions"><a class="button lime" href="#apply">Apply Now ${arrow}</a>${waLink()}</div></section>
</main><footer class="container footer"><div><strong>Nomisma Financial Services</strong><p class="tagline">...adding value</p></div><a href="${contactUrl}" target="_blank" rel="noopener noreferrer">WhatsApp ${arrow}</a><p class="copyright">© ${new Date().getFullYear()} Nomisma Financial Services.<br>All rights reserved.</p></footer>
<nav class="mobile-bar" aria-label="Quick contact"><a class="button primary" href="#apply">Apply Now ${arrow}</a>${waLink("WhatsApp")}</nav>`;

const form = document.querySelector("#enquiry-form");
// Use native validation messages after setting the specific amount and phone messages.
form.noValidate = true;
const status = document.querySelector("#form-status");
const fallback = document.querySelector("#fallback");
const submit = form.querySelector('[type="submit"]');
let sending = false;
for (const link of document.querySelectorAll("[data-applicant]")) {
  link.addEventListener("click", () => {
    if (form.hidden) return;
    const option = [...form.querySelectorAll('[name="applicantType"]')].find(
      (input) => input.value === link.dataset.applicant,
    );
    option.checked = true;
    option.focus({ preventScroll: true });
  });
}
form.addEventListener("input", (event) => event.target.setCustomValidity?.(""));
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (sending) return;
  for (const input of form.querySelectorAll(
    'input[required]:not([type="radio"]):not([type="checkbox"])',
  )) {
    input.setCustomValidity(
      input.value.trim() ? "" : "Please complete this field.",
    );
  }
  const phone = form.elements.phone;
  const digits = phone.value.replace(/\D/g, "");
  phone.setCustomValidity(
    /^\+?[\d\s().-]+$/.test(phone.value) &&
      digits.length >= 10 &&
      digits.length <= 15
      ? ""
      : "Please enter a valid phone number with 10 to 15 digits.",
  );
  const amount = form.elements.amount;
  const requestedAmount = parseLoanAmount(amount.value);
  amount.setCustomValidity(
    !amount.value.trim()
      ? "Please enter a loan amount."
      : !Number.isFinite(requestedAmount)
        ? "Enter a whole-naira amount, such as ₦1,000,000."
        : requestedAmount < config.loanMin
          ? `Minimum loan amount is ${money(config.loanMin)}.`
          : requestedAmount > config.loanMax
            ? `Maximum loan amount is ${money(config.loanMax)}.`
            : "",
  );
  if (!form.reportValidity()) return;
  if (form.elements._honey.value) return;
  const values = Object.fromEntries(
    [...new FormData(form)].map(([key, value]) => [key, value.trim()]),
  );
  const detailMessage = `Hello Nomisma, I just submitted a loan application through your website.\n\nName: ${values.fullName}\nApplicant type: ${values.applicantType}\nLoan amount: ${money(requestedAmount)}\nPhone: ${values.phone}\n\nPlease assist me with the next steps.`;
  fallback.href = whatsapp(
    detailMessage.replace(
      "I just submitted a loan application through your website.",
      "I would like help with a loan application. I could not confirm submission through your website.",
    ),
  );
  status.textContent = "";
  fallback.hidden = true;
  if (!/^[a-f0-9]+$/i.test(config.formSubmitToken ?? "")) {
    status.textContent =
      "Loan applications are not available yet. Your details have been kept here. Please continue on WhatsApp to contact Nomisma.";
    fallback.hidden = false;
    return;
  }
  sending = true;
  submit.disabled = true;
  submit.textContent = "Sending application…";
  form.setAttribute("aria-busy", "true");
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(config.formSubmitToken)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify({
          _subject: `New Nomisma Loan Application — ${values.fullName.replace(/[\r\n]/g, " ")}`,
          _template: "table",
          _honey: values._honey,
          "Full Name": values.fullName,
          "Phone Number": values.phone,
          "Applicant Type": values.applicantType,
          "Email Address": values.email,
          "Loan Amount": money(requestedAmount),
          Consent:
            "I consent to Nomisma using the information I provide to contact me regarding this loan application.",
        }),
      },
    );
    const result = await response.json();
    if (!response.ok || !(result.success === true || result.success === "true"))
      throw new Error("Submission not confirmed");
    form.hidden = true;
    document.querySelector("#form-title").innerHTML =
      "Thank you<br>Your loan application has been received.";
    document.querySelector("#success-whatsapp").href = whatsapp(detailMessage);
    document.querySelector("#success").hidden = false;
    status.textContent = "";
    document.querySelector("#success").focus();
  } catch {
    status.textContent =
      "We couldn’t confirm that your application was submitted. Your details are still here. Please try again or continue on WhatsApp for help.";
    fallback.hidden = false;
  } finally {
    clearTimeout(timeout);
    sending = false;
    submit.disabled = false;
    submit.innerHTML = `Send loan application ${arrow}`;
    form.removeAttribute("aria-busy");
  }
});

// Keep quick actions available on mobile without covering the application or notices.
if (typeof IntersectionObserver !== "undefined") {
  const mobileBar = document.querySelector(".mobile-bar");
  const visibleSections = new Set();
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) visibleSections.add(entry.target);
      else visibleSections.delete(entry.target);
    }
    mobileBar.hidden = visibleSections.size > 0;
  });
  for (const section of document.querySelectorAll(
    "#apply, .financing-terms, .disclosure, .footer",
  )) {
    observer.observe(section);
  }
}
