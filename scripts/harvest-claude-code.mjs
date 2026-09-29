#!/usr/bin/env node
/**
 * Harvest every Claude Code project on THIS machine into one inventory.
 *
 *   node scripts/harvest-claude-code.mjs            # scans ~/.claude/projects
 *   node scripts/harvest-claude-code.mjs /path/to/projects
 *
 * Reads only local transcript files. Sends nothing anywhere.
 * Writes harvest-output/claude-code-projects.{json,md} (git-ignored).
 * REVIEW the output before sharing: first prompts can contain private text.
 */
import { readdirSync, readFileSync, statSync, mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";
import { execFileSync } from "node:child_process";

const root = process.argv[2] || join(homedir(), ".claude", "projects");
if (!existsSync(root)) { console.error(`No such folder: ${root}`); process.exit(1); }

const textOf = (c) =>
  typeof c === "string" ? c
  : Array.isArray(c) ? c.filter((b) => b && b.type === "text").map((b) => b.text).join("\n") : "";
const isNoise = (t) => !t || /^<(command-|local-command|system-reminder|user-prompt)/.test(t.trim()) || t.startsWith("Caveat:");

const projects = new Map();

for (const dir of readdirSync(root)) {
  const full = join(root, dir);
  if (!statSync(full).isDirectory()) continue;
  for (const f of readdirSync(full).filter((f) => f.endsWith(".jsonl"))) {
    let cwd = null, first = null, last = null, users = 0, assistants = 0, firstPrompt = "", branch = null;
    const tools = {}; const edited = new Set();
    for (const line of readFileSync(join(full, f), "utf8").split("\n")) {
      if (!line.trim()) continue;
      let o; try { o = JSON.parse(line); } catch { continue; }
      if (o.cwd) cwd = o.cwd;
      if (o.gitBranch) branch = o.gitBranch;
      if (o.timestamp) { first = first && first < o.timestamp ? first : o.timestamp; last = last && last > o.timestamp ? last : o.timestamp; }
      if (o.type === "user" && !o.isMeta) {
        const t = textOf(o.message?.content);
        if (!isNoise(t)) { users++; if (!firstPrompt) firstPrompt = t.trim().slice(0, 400); }
      } else if (o.type === "assistant") {
        assistants++;
        for (const b of o.message?.content || []) {
          if (b?.type === "tool_use") {
            tools[b.name] = (tools[b.name] || 0) + 1;
            const p = b.input?.file_path; if (p && /^(Edit|Write|NotebookEdit)$/.test(b.name)) edited.add(p);
          }
        }
      }
    }
    if (!users && !assistants) continue;
    const key = cwd || dir;
    const p = projects.get(key) || { path: key, sessions: 0, userMessages: 0, assistantMessages: 0, firstSeen: null, lastSeen: null, tools: {}, filesEdited: new Set(), prompts: [], branches: new Set() };
    p.sessions++; p.userMessages += users; p.assistantMessages += assistants;
    p.firstSeen = !p.firstSeen || (first && first < p.firstSeen) ? first : p.firstSeen;
    p.lastSeen = !p.lastSeen || (last && last > p.lastSeen) ? last : p.lastSeen;
    for (const [k, v] of Object.entries(tools)) p.tools[k] = (p.tools[k] || 0) + v;
    edited.forEach((e) => p.filesEdited.add(e));
    if (firstPrompt) p.prompts.push({ at: first, text: firstPrompt });
    if (branch) p.branches.add(branch);
    projects.set(key, p);
  }
}

const out = [...projects.values()].map((p) => {
  let remote = null;
  try { if (existsSync(p.path)) remote = execFileSync("git", ["-C", p.path, "remote", "get-url", "origin"], { stdio: ["ignore", "pipe", "ignore"] }).toString().trim(); } catch {}
  return {
    name: p.path.split("/").filter(Boolean).pop(), path: p.path, gitRemote: remote,
    sessions: p.sessions, userMessages: p.userMessages, assistantMessages: p.assistantMessages,
    firstSeen: p.firstSeen, lastSeen: p.lastSeen,
    topTools: Object.entries(p.tools).sort((a, b) => b[1] - a[1]).slice(0, 6),
    filesEdited: p.filesEdited.size, branches: [...p.branches],
    firstPrompts: p.prompts.sort((a, b) => (a.at || "").localeCompare(b.at || "")).slice(0, 3)
  };
}).sort((a, b) => (b.lastSeen || "").localeCompare(a.lastSeen || ""));

mkdirSync("harvest-output", { recursive: true });
writeFileSync("harvest-output/claude-code-projects.json", JSON.stringify(out, null, 2));
const md = ["# Claude Code projects on this machine", "", `Scanned: \`${root}\` · ${out.length} projects`, ""]
  .concat(out.map((p) => [
    `## ${p.name}`, `- path: \`${p.path}\``, p.gitRemote ? `- remote: ${p.gitRemote}` : "- remote: (none / folder gone)",
    `- ${p.sessions} sessions · ${p.userMessages} prompts · ${p.filesEdited} files edited`,
    `- ${String(p.firstSeen).slice(0, 10)} → ${String(p.lastSeen).slice(0, 10)}`,
    `- tools: ${p.topTools.map(([k, v]) => `${k}×${v}`).join(", ") || "-"}`,
    ...p.firstPrompts.map((x) => `- first prompt (${String(x.at).slice(0, 10)}): ${x.text.replace(/\s+/g, " ").slice(0, 220)}`), ""
  ].join("\n"))).join("\n");
writeFileSync("harvest-output/claude-code-projects.md", md);
console.log(`Found ${out.length} projects. See harvest-output/claude-code-projects.md`);
