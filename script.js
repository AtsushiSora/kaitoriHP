const LINE_OFFICIAL_ACCOUNT_ID = "@774zckii";
const CONTACT_EMAIL = "info@order-auto.com";
const integrationConfig = window.orderAutoIntegration || {};
const supabaseUrl = String(integrationConfig.supabaseUrl || "").replace(/\/$/, "");
const supabasePublishableKey = String(integrationConfig.supabasePublishableKey || "");

function getFieldValue(form, fieldName) {
  const field = form.elements[fieldName];
  return field ? field.value.trim() : "";
}

function buildLineMessage(form) {
  const rows = [
    "廃車の無料引き取りについて相談したいです。",
    "",
    `お名前：${getFieldValue(form, "name") || "未入力"}`,
    `メールアドレス：${getFieldValue(form, "email") || "未入力"}`,
    `電話番号：${getFieldValue(form, "phone") || "未入力"}`,
    `車種：${getFieldValue(form, "car") || "未入力"}`,
    `年式：${getFieldValue(form, "year") || "未入力"}`,
    `走行距離：${getFieldValue(form, "mileage") || "未入力"}`,
    `車の状態：${getFieldValue(form, "condition") || "未入力"}`,
    `引き取り場所・相談内容：${getFieldValue(form, "message") || "未入力"}`,
  ];

  return rows.join("\n");
}

function buildMailSubject() {
  return "廃車の無料引き取り相談";
}

function buildMailUrl(message) {
  const params = new URLSearchParams({
    subject: buildMailSubject(),
    body: message,
  });

  return `mailto:${CONTACT_EMAIL}?${params.toString()}`;
}

function buildLineUrl(message) {
  const encodedMessage = encodeURIComponent(message);

  if (LINE_OFFICIAL_ACCOUNT_ID) {
    return `https://line.me/R/oaMessage/${LINE_OFFICIAL_ACCOUNT_ID}/?${encodedMessage}`;
  }

  return `https://line.me/R/msg/text/?${encodedMessage}`;
}

async function submitNetlifyForm(form) {
  if (!form.dataset.netlify) {
    return;
  }

  const formData = new FormData(form);

  if (!formData.get("form-name") && form.name) {
    formData.set("form-name", form.name);
  }

  try {
    await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
      keepalive: true,
    });
  } catch (error) {
    // GitHub PagesではNetlify Formsが動かないため、失敗してもLINE・メール導線を優先します。
  }
}

function validateContactForm(form) {
  const email = form.elements.email;
  const phone = form.elements.phone;
  const hasContact = Boolean(email?.value.trim() || phone?.value.trim());
  if (email) email.setCustomValidity(hasContact ? "" : "メールアドレスまたは電話番号を入力してください。");
  if (!form.reportValidity()) return false;
  if (email) email.setCustomValidity("");
  return true;
}

async function submitManagementInquiry(form) {
  if (!supabaseUrl || !supabasePublishableKey) return false;
  const response = await fetch(`${supabaseUrl}/rest/v1/rpc/submit_website_inquiry`, {
    method: "POST",
    headers: {
      apikey: supabasePublishableKey,
      Authorization: `Bearer ${supabasePublishableKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      p_source: "scrap_site",
      p_customer_name: getFieldValue(form, "name"),
      p_email: getFieldValue(form, "email"),
      p_phone: getFieldValue(form, "phone"),
      p_message: buildLineMessage(form),
      p_interested_vehicle_id: null,
      p_website: getFieldValue(form, "bot-field"),
    }),
  });
  if (!response.ok) throw new Error("Management inquiry submission failed");
  return true;
}

async function recordInquiry(form) {
  await Promise.allSettled([submitNetlifyForm(form), submitManagementInquiry(form)]);
}

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector("#contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!validateContactForm(contactForm)) return;
      window.orderAutoAnalytics?.trackLead("line");
      await recordInquiry(contactForm);
      window.location.href = buildLineUrl(buildLineMessage(contactForm));
    });

    const emailButton = document.querySelector("#email-submit");

    if (emailButton) {
      emailButton.addEventListener("click", async () => {
        if (!validateContactForm(contactForm)) return;
        window.orderAutoAnalytics?.trackLead("email");
        await recordInquiry(contactForm);
        window.location.href = buildMailUrl(buildLineMessage(contactForm));
      });
    }
  }
});

window.buildLineMessage = buildLineMessage;
window.buildLineUrl = buildLineUrl;
window.buildMailUrl = buildMailUrl;
window.submitNetlifyForm = submitNetlifyForm;
window.submitManagementInquiry = submitManagementInquiry;
