import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const warnings = [];

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (["node_modules", ".next", ".git"].includes(entry.name)) continue;
      walk(full, out);
    } else if (full.endsWith(".tsx")) {
      out.push(full);
    }
  }

  return out;
}

function rel(file) {
  return path.relative(root, file);
}

for (const file of walk(path.join(root, "app"))) {
  const content = fs.readFileSync(file, "utf8");

  const hrefRe = /href=\{?["'](#|javascript:void\(0\)|)["']\}?/g;
  let hrefMatch;

  while ((hrefMatch = hrefRe.exec(content))) {
    const line = content.slice(0, hrefMatch.index).split("\n").length;
    warnings.push({
      file: rel(file),
      line,
      issue: "Dead href found. Route this to a real demo page or remove the link.",
    });
  }

  const buttonRe = /<button\b([^>]*)>/g;
  let buttonMatch;

  while ((buttonMatch = buttonRe.exec(content))) {
    const attrs = buttonMatch[1] || "";
    const line = content.slice(0, buttonMatch.index).split("\n").length;

    const hasAction =
      /onClick=/.test(attrs) ||
      /type=["']submit["']/.test(attrs) ||
      /type=["']reset["']/.test(attrs) ||
      /disabled/.test(attrs) ||
      /aria-disabled/.test(attrs);

    const likelyToggle =
      /role=["']switch["']/.test(attrs) ||
      /toggle/i.test(attrs);

    if (!hasAction && !likelyToggle) {
      warnings.push({
        file: rel(file),
        line,
        issue: "Button has no visible onClick/submit/reset/disabled action.",
      });
    }
  }
}

console.log("===== VISIBLE ACTION AUDIT =====");

if (!warnings.length) {
  console.log("TOTAL VISIBLE ACTION WARNINGS: 0");
  process.exit(0);
}

for (const warning of warnings) {
  console.log(`${warning.file}:${warning.line} - ${warning.issue}`);
}

console.log("");
console.log(`TOTAL VISIBLE ACTION WARNINGS: ${warnings.length}`);
process.exit(0);
