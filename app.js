const list = document.querySelector("#research-list");

function parseFrontMatter(markdown) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    return { data: {}, body: markdown };
  }

  const data = {};
  for (const line of match[1].split("\n")) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    data[key] = value.replace(/^["']|["']$/g, "");
  }

  return { data, body: match[2].trim() };
}

function parseResearchDocument(markdown) {
  return markdown
    .split(/\n---direction---\n/g)
    .map((block) => block.trim())
    .filter(Boolean)
    .map(parseFrontMatter);
}

function inlineMarkdown(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

function markdownToHtml(markdown) {
  const lines = markdown.split("\n");
  const html = [];
  let listItems = [];

  function flushList() {
    if (!listItems.length) return;
    html.push(`<ul>${listItems.map((item) => `<li>${inlineMarkdown(item)}</li>`).join("")}</ul>`);
    listItems = [];
  }

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      flushList();
      continue;
    }

    if (line.startsWith("### ")) {
      flushList();
      html.push(`<h4>${inlineMarkdown(line.slice(4))}</h4>`);
    } else if (line.startsWith("## ")) {
      flushList();
      html.push(`<h3>${inlineMarkdown(line.slice(3))}</h3>`);
    } else if (line.startsWith("- ")) {
      listItems.push(line.slice(2));
    } else {
      flushList();
      html.push(`<p>${inlineMarkdown(line)}</p>`);
    }
  }

  flushList();
  return html.join("");
}

function tagList(tags = "") {
  return tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
    .map((tag) => `<span>${inlineMarkdown(tag)}</span>`)
    .join("");
}

function renderResearch(items) {
  list.innerHTML = items
    .map(
      ({ data, body }) => `
        <article class="research-card">
          <div class="research-card-main">
            <p class="research-label">${inlineMarkdown(data.label || "Research")}</p>
            <h3>${inlineMarkdown(data.title || "未命名研究方向")}</h3>
            <p class="research-summary">${inlineMarkdown(data.summary || "")}</p>
            <div class="tag-list">${tagList(data.tags)}</div>
          </div>
          <div class="research-detail">${markdownToHtml(body)}</div>
          ${data.detail ? `
            <details class="research-extra">
              <summary>详细介绍</summary>
              <p>${inlineMarkdown(data.detail)}</p>
            </details>
          ` : ""}
        </article>
      `,
    )
    .join("");
}

async function loadResearch() {
  try {
    const response = await fetch("content/research.md");
    if (!response.ok) {
      throw new Error("Cannot load content/research.md");
    }
    const items = parseResearchDocument(await response.text());
    renderResearch(items);
  } catch (error) {
    list.innerHTML =
      '<p class="loading error">研究方向内容加载失败。请检查 content/research.md 是否存在。</p>';
  }
}

loadResearch();
