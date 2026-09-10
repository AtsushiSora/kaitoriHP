(function () {
  const MEASUREMENT_ID = "G-N0K4M21MW6";
  const PRODUCTION_HOSTS = new Set(["haisha.order-auto.com", "www.haisha.order-auto.com"]);

  if (!PRODUCTION_HOSTS.has(window.location.hostname)) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function () {
      window.dataLayer.push(arguments);
    };

  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "granted",
  });
  window.gtag("js", new Date());
  window.gtag("config", MEASUREMENT_ID);

  const tag = document.createElement("script");
  tag.async = true;
  tag.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(tag);

  function track(name, parameters = {}) {
    window.gtag("event", name, parameters);
  }

  function getContactMethod(href) {
    if (href.startsWith("tel:")) return "phone";
    if (href.startsWith("mailto:")) return "email";
    if (href.includes("line.me/") || href.includes("lin.ee/")) return "line";
    return "";
  }

  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest("a[href]");
    if (!link) return;

    const contactMethod = getContactMethod(link.href);
    if (!contactMethod) return;

    track("contact_click", { contact_method: contactMethod });
  });

  window.orderAutoAnalytics = {
    trackLead(contactMethod) {
      track("generate_lead", { contact_method: contactMethod });
    },
  };

  if (/\/thanks(?:\.html)?\/?$/.test(window.location.pathname)) {
    track("generate_lead", { contact_method: "netlify_form" });
  }
})();
