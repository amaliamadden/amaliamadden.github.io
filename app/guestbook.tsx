"use client";

import { useEffect, useRef } from "react";

const giscusConfig = {
  repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
  repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID,
  category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
  categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
};

export function Guestbook() {
  const commentsRef = useRef<HTMLDivElement>(null);
  const configured = Object.values(giscusConfig).every(Boolean);

  useEffect(() => {
    const comments = commentsRef.current;
    if (!comments || !configured) return;

    comments.replaceChildren();
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", giscusConfig.repo!);
    script.setAttribute("data-repo-id", giscusConfig.repoId!);
    script.setAttribute("data-category", giscusConfig.category!);
    script.setAttribute("data-category-id", giscusConfig.categoryId!);
    script.setAttribute("data-mapping", "specific");
    script.setAttribute("data-term", "Guestbook");
    script.setAttribute("data-strict", "1");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", "light");
    script.setAttribute("data-lang", "en");
    script.setAttribute("data-loading", "lazy");
    comments.appendChild(script);

    return () => comments.replaceChildren();
  }, [configured]);

  return (
    <section className="guestbook" aria-labelledby="guestbook-title">
      <h2 id="guestbook-title">~ tiny guestbook ~</h2>
      <p>sign your name for the next internet traveler!</p>
      <div className="guestbook-screen" ref={commentsRef}>
        {!configured && <span>[ guestbook opening soon... ]</span>}
      </div>
    </section>
  );
}
