// Part 1: switch between left-to-right and right-to-left

// languages that are written right to left
const rtlLanguages = ["ar", "he", "fa", "ur"];

const html = document.documentElement;
const ltrStyles = document.getElementById("bootstrap-ltr");
const rtlStyles = document.getElementById("bootstrap-rtl");
const timeline = document.querySelector(".timeline");

// Returns true if the page is currently in a right-to-left language
function isRtl() {
  // when Google Translate runs it adds one of these classes to the <html> tag
  if (html.classList.contains("translated-rtl")) {
    return true;
  }
  if (html.classList.contains("translated-ltr")) {
    return false;
  }

  // if there is no class, look at the language code (like "ar" or "ar-SA")
  const lang = html.getAttribute("lang").toLowerCase().split("-")[0];
  return rtlLanguages.includes(lang);
}

// Sets the page direction and turns on the matching Bootstrap stylesheet
function updateDirection() {
  const rtl = isRtl();

  if (rtl) {
    html.setAttribute("dir", "rtl");
    ltrStyles.media = "not all";
    rtlStyles.media = "all";
  } else {
    html.setAttribute("dir", "ltr");
    ltrStyles.media = "all";
    rtlStyles.media = "not all";
  }

  // send the timeline back to the start
  timeline.scrollLeft = 0;
}

// run once when the page loads
updateDirection();

// run again any time the lang attribute or the class on <html> changes
const watcher = new MutationObserver(updateDirection);
watcher.observe(html, { attributes: true, attributeFilter: ["lang", "class"] });


// Part 2: newsletter form

const form = document.getElementById("newsletter-form");
const message = document.getElementById("form-status");

form.addEventListener("submit", function (event) {
  // stop the page from reloading
  event.preventDefault();
  message.textContent = "";

  // if the email is empty or not a real email, show the error and stop
  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    return;
  }

  // there is no server behind this form, so just show a thank you message
  form.classList.remove("was-validated");
  form.reset();
  message.textContent = "Thanks for subscribing! Check your inbox to confirm.";
});
