const LINE_OFFICIAL_ACCOUNT_ID = "@774zckii";
const CONTACT_EMAIL = "sora29128616@gmail.com";

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

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector("#contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      await submitNetlifyForm(contactForm);
      window.location.href = buildLineUrl(buildLineMessage(contactForm));
    });

    const emailButton = document.querySelector("#email-submit");

    if (emailButton) {
      emailButton.addEventListener("click", async () => {
        await submitNetlifyForm(contactForm);
        window.location.href = buildMailUrl(buildLineMessage(contactForm));
      });
    }
  }
});

window.buildLineMessage = buildLineMessage;
window.buildLineUrl = buildLineUrl;
window.buildMailUrl = buildMailUrl;
window.submitNetlifyForm = submitNetlifyForm;
