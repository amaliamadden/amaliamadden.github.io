import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("exports Amalia's portfolio as static HTML", async () => {
  const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");

  assert.match(html, /<title>Amalia Madden \| Theoretical Particle Physicist<\/title>/i);
  assert.match(html, /Amalia Madden/);
  assert.match(html, /theoretical particle physicist/);
  assert.match(html, /find me elsewhere/);
  assert.match(html, /amadden@kitp\.ucsb\.edu/);
  assert.match(html, /og\.png/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
});

test("ships motion, visitor tracking, and the guestbook", async () => {
  const [page, cursor, visitorTracker, guestbook, styles, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/sparkle-cursor.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/visitor-tracker.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/guestbook.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /className="rainbow-rail"/);
  assert.match(page, /<LuckyCat/);
  assert.match(page, /amalia-portrait\.jpg/);
  assert.match(page, /<strong>Amalia!<\/strong>\{" "\}I&apos;m/);
  assert.match(page, /alt="Amalia smiling by the sea"/);
  assert.match(page, /<p>me irl<\/p>/);
  assert.doesNotMatch(page, /me irl-ish/);
  assert.doesNotMatch(page, /PortraitPlaceholder|portrait-face|hair-back/);
  assert.match(page, /--nudge-x/);
  assert.match(page, /--nudge-y/);
  assert.match(page, /--tilt/);
  assert.doesNotMatch(styles, /cat-bob/);
  assert.match(styles, /animation:\s*cat-wave/);
  assert.match(styles, /cat-wave 1\.15s ease-in-out/);
  assert.match(styles, /opacity:\s*0\.58/);
  assert.match(styles, /saturate\(0\.72\) contrast\(1\.06\)/);
  assert.match(cursor, /pointermove/);
  assert.match(cursor, /cursor-sparkle/);
  assert.match(styles, /::-webkit-scrollbar-thumb/);
  assert.match(styles, /background: linear-gradient/);
  assert.doesNotMatch(styles, /\.custom-cursor\s*{[^}]*border-radius:\s*50%/s);
  assert.match(styles, /\.custom-cursor\s*{[^}]*color:\s*#2468e8/s);
  assert.match(styles, /\.masthead h1\s*{[^}]*Comic Sans MS[^}]*-webkit-text-fill-color:\s*#fff[^}]*-webkit-text-stroke:\s*6px/s);
  assert.match(styles, /\.web-panel\s*{[^}]*border:\s*6px double currentColor/s);
  assert.match(styles, /\.web-panel\s*{[^}]*box-shadow:\s*4px 4px 0 #77678c/s);
  assert.match(styles, /\.portrait-card\s*{[^}]*border:\s*4px double/s);
  assert.match(styles, /\.rainbow-rail\s*{[^}]*border:\s*4px double/s);
  assert.doesNotMatch(styles, /backdrop-filter|scroll-behavior:\s*smooth|transition:/);
  assert.match(styles, /--paper:\s*rgba\(255, 253, 247, 0\.88\)/);
  assert.match(styles, /\.rainbow-rail a:nth-child\(4\)/);
  assert.match(styles, /\.about-panel h2\s*{[^}]*text-align:\s*left/s);
  assert.match(styles, /\.web-panel h2\s*{[^}]*font-weight:\s*900[^}]*-webkit-text-fill-color:\s*#fff/s);
  assert.match(styles, /\.web-panel h2\s*{[^}]*-webkit-text-stroke:\s*4px/s);
  assert.match(styles, /\.guestbook h2\s*{[^}]*-webkit-text-stroke:\s*3px/s);
  assert.match(styles, /\.cat-wall\s*{[^}]*#e1f4ff/s);
  assert.match(styles, /\.links-panel\s*{[^}]*margin-top:\s*70px/s);
  assert.doesNotMatch(styles, /\.web-panel\s*{[^}]*inset 0 0/s);
  assert.doesNotMatch(styles, /\.about-copy strong\s*{[^}]*text-shadow/s);
  assert.doesNotMatch(styles, /\.portrait-card\s*{[^}]*rotate/s);
  assert.doesNotMatch(styles, /\.link-list a:hover[^}]*translateX/s);
  assert.match(page, /<VisitorTracker \/>/);
  assert.doesNotMatch(page, /currently orbiting Santa Barbara/);
  assert.doesNotMatch(page, /online &amp; looking for dark matter|status-tape/);
  assert.doesNotMatch(page, /welcome to my tiny corner|eyebrow/);
  assert.match(page, /I am interested in designing experiments/);
  assert.doesNotMatch(page, /I work on designing experiments/);
  assert.match(page, /orcid\.org\/0009-0002-5393-8759/);
  assert.match(page, /inspirehep\.net\/authors\/1995752/);
  assert.match(page, /linkedin\.com\/in\/amalia-madden-233b08168/);
  assert.match(visitorTracker, /api\.counterapi\.dev\/v1/);
  assert.match(visitorTracker, /window\.localStorage/);
  assert.match(visitorTracker, /<Guestbook \/>/);
  assert.match(guestbook, /https:\/\/giscus\.app\/client\.js/);
  assert.match(guestbook, /NEXT_PUBLIC_GISCUS_REPO_ID/);
  assert.match(guestbook, /data-term", "Guestbook"/);
  assert.doesNotMatch(visitorTracker, /flagEmoji|Intl\.Locale|flag-list/);
  assert.doesNotMatch(packageJson, /vinext|wrangler|react-loading-skeleton/);

  await assert.rejects(access(new URL("app/_sites-preview", root)));
});
