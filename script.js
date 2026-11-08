const projects = {
  "security-header-scanner": {
    number: "LAB / 01 · WEB SECURITY",
    title: "Security Header Scanner",
    summary: "A beginner Python project for reviewing HTTPS usage and common HTTP response security headers on an authorized test website.",
    details: [
      ["Project status", "Learning project idea. Implement and test it before describing it as completed work."],
      ["Objective", "Understand how browsers receive security-related HTTP response headers and identify which common headers are present or missing."],
      ["Tools & technologies", "Python, Requests library, HTTP and HTTPS."],
      ["Tasks", "Accept a URL; validate that it uses an http:// or https:// scheme; send a request with a timeout; check Strict-Transport-Security, Content-Security-Policy, X-Content-Type-Options, X-Frame-Options, Referrer-Policy and Permissions-Policy; save findings to a text report."],
      ["Skills to practise", "HTTP basics, TLS/HTTPS awareness, Python requests, response-header analysis and report writing."],
      ["Expected outcome", "A command-line scanner and a sample report generated from a website you own or have permission to test."],
      ["Real-world relevance", "Security headers are one part of a website's defensive configuration. A missing header is a finding to review, not proof that a site is vulnerable." ]
    ],
    evidence: ["Add GitHub source code after implementation", "Add a screenshot of a permitted test run", "Add a sample scan report with no sensitive data"]
  },
  "password-checker": {
    number: "LAB / 02 · IDENTITY SECURITY",
    title: "Password Strength Checker",
    summary: "A small offline Python program that gives feedback about password strength without transmitting or saving the entered password.",
    details: [
      ["Project status", "Learning project idea. Complete the implementation and tests before marking it as finished."],
      ["Objective", "Practise basic password-security concepts and input validation."],
      ["Tools & technologies", "Python standard library; optionally getpass for hidden terminal input."],
      ["Tasks", "Check minimum length; check for uppercase and lowercase letters, digits and symbols; flag very common example passwords using a small local list; provide improvement suggestions; never print, log or store the actual password."],
      ["Skills to practise", "Python conditionals, string handling, secure handling of user input and authentication fundamentals."],
      ["Expected outcome", "A terminal application that gives a strength assessment and helpful feedback. Explain that a simple rules-based score is educational, not a guarantee of password security."],
      ["Real-world relevance", "Password guidance supports safer account practices. Production systems should use established password policy and secure password hashing rather than this checker as an authentication system."]
    ],
    evidence: ["Add source code after implementation", "Add screenshots using dummy test passwords only", "Add test cases for weak and stronger sample inputs"]
  },
  "file-integrity": {
    number: "LAB / 03 · FILE SECURITY",
    title: "File Integrity Monitor",
    summary: "A Python tool that uses SHA-256 hashes to notice changes in files within a folder you control.",
    details: [
      ["Project status", "Learning project idea. Publish measured results only after running your own tests."],
      ["Objective", "Learn how cryptographic hashes can help verify whether file contents have changed."],
      ["Tools & technologies", "Python, hashlib, pathlib and JSON."],
      ["Tasks", "Choose a test folder; calculate a SHA-256 hash for each file; save a baseline manifest; run the scan again; compare current hashes with the baseline; report new, modified and missing files."],
      ["Skills to practise", "Cryptographic hashing, file handling, Python dictionaries, JSON and basic integrity monitoring."],
      ["Expected outcome", "A baseline file and a comparison report that correctly identifies a file you intentionally modify in your test folder."],
      ["Real-world relevance", "File integrity monitoring can help detect unexpected changes to important files. A hash alone does not identify who changed a file or why."]
    ],
    evidence: ["Add source code and a sample manifest", "Add before-and-after test screenshots", "Document a test where a file is intentionally modified"]
  },
  "log-analyzer": {
    number: "LAB / 04 · SECURITY OPERATIONS",
    title: "Login Log Analyzer",
    summary: "A Python script that reads sample authentication logs and summarizes repeated failed login events.",
    details: [
      ["Project status", "Learning project idea. Start with synthetic sample logs rather than collecting real user data."],
      ["Objective", "Understand how security analysts review authentication events and look for unusual patterns."],
      ["Tools & technologies", "Python, text/CSV parsing and optionally collections.Counter."],
      ["Tasks", "Create a small synthetic log file; parse timestamps, usernames, source IP addresses and result fields; count failed logins by source; flag repeated failures above a configurable threshold; export a summary report."],
      ["Skills to practise", "Log analysis, parsing, basic detection logic, Python and security operations concepts."],
      ["Expected outcome", "A report showing event totals and any source addresses that cross the chosen threshold. Clearly label the threshold as a lab rule, not a universal indicator of attack."],
      ["Real-world relevance", "Authentication log analysis is a foundational SOC activity. Real investigations require context and correlation; repeated failures alone do not prove malicious activity."]
    ],
    evidence: ["Add synthetic sample log file", "Add source code and sample report", "Add test cases for normal and repeated-failure activity"]
  }
};

const dialog = document.getElementById("projectDialog");
const dialogTitle = document.getElementById("dialogTitle");
const dialogEyebrow = document.getElementById("dialogEyebrow");
const dialogSummary = document.getElementById("dialogSummary");
const dialogContent = document.getElementById("dialogContent");
const dialogEvidence = document.getElementById("dialogEvidence");

function openProject(key) {
  const project = projects[key];
  if (!project) return;
  dialogEyebrow.textContent = project.number;
  dialogTitle.textContent = project.title;
  dialogSummary.textContent = project.summary;
  dialogContent.replaceChildren();
  project.details.forEach(([heading, body]) => {
    const block = document.createElement("section");
    block.className = "detail-block";
    const title = document.createElement("h3");
    title.textContent = heading;
    const paragraph = document.createElement("p");
    paragraph.textContent = body;
    block.append(title, paragraph);
    dialogContent.append(block);
  });
  dialogEvidence.replaceChildren();
  const evidenceHeading = document.createElement("h3");
  evidenceHeading.textContent = "EVIDENCE TO ADD AFTER COMPLETION";
  const links = document.createElement("div");
  links.className = "evidence-links";
  project.evidence.forEach((item) => {
    const placeholder = document.createElement("span");
    placeholder.className = "evidence-link";
    placeholder.textContent = item;
    links.append(placeholder);
  });
  dialogEvidence.append(evidenceHeading, links);
  if (typeof dialog.showModal === "function") dialog.showModal();
  else dialog.setAttribute("open", "");
}

document.querySelectorAll("[data-project]").forEach((card) => {
  card.addEventListener("click", () => openProject(card.dataset.project));
});
document.getElementById("dialogClose").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});
const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");
menuToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});
siteNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});
document.querySelectorAll("[data-placeholder-link]").forEach((link) => {
  link.addEventListener("click", (event) => {
    const kind = link.dataset.placeholderLink;
    const current = link.getAttribute("href");
    const placeholder = kind === "github" ? "https://github.com/" : "https://www.linkedin.com/";
    if (current === placeholder) {
      event.preventDefault();
      alert(`Please replace this ${kind === "github" ? "GitHub" : "LinkedIn"} placeholder URL with your personal profile link in index.html.`);
    }
  });
});
document.getElementById("year").textContent = new Date().getFullYear();
