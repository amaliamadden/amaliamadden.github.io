import Image from "next/image";
import portraitPhoto from "../public/amalia-portrait.jpg";
import { SparkleCursor } from "./sparkle-cursor";
import { VisitorTracker } from "./visitor-tracker";

function PortraitPhoto() {
  return (
    <figure className="portrait-card">
      <div className="portrait-window">
        <Image
          className="portrait-photo"
          src={portraitPhoto}
          alt="Amalia smiling by the sea"
          fill
          sizes="(max-width: 680px) 138px, 154px"
        />
        <span className="portrait-sparkle">✦</span>
      </div>
      <p>me irl</p>
    </figure>
  );
}

export default function Home() {
  return (
    <main className="site-shell">
      <SparkleCursor />

      <aside className="rainbow-rail" aria-label="Page navigation">
        <a href="#top" aria-label="Back to top">
          <span aria-hidden="true">⌂</span>
          <small>top</small>
        </a>
        <a href="#about">
          <span aria-hidden="true">★</span>
          <small>about</small>
        </a>
        <a href="#links">
          <span aria-hidden="true">↗</span>
          <small>links</small>
        </a>
        <a href="#visitors">
          <span aria-hidden="true">☺</span>
          <small>visitors</small>
        </a>
      </aside>

      <div className="page-wrap">
        <header className="masthead" id="top">
          <h1>Amalia Madden</h1>
        </header>

        <section className="web-panel about-panel" id="about">
          <div className="panel-pin panel-pin-one" aria-hidden="true">✦</div>
          <div className="panel-pin panel-pin-two" aria-hidden="true">✦</div>
          <h2>~ about me ~</h2>
          <div className="about-grid">
            <div className="about-copy">
              <p>
                Hi, I&apos;m <strong>Amalia!</strong>{" "}I&apos;m a theoretical particle
                physicist from London, UK. I&apos;m currently a postdoc at <strong>KITP</strong>,
                Santa Barbara, California, and I did my PhD at the <strong>Perimeter
                Institute</strong> in Canada.
              </p>
              <p>
                I am interested in designing experiments to look for <strong>dark matter</strong>,
                and <strong>AI agents</strong> to automate searching for new physics
                beyond the Standard Model.
              </p>
            </div>
            <PortraitPhoto />
          </div>
        </section>

        <section className="web-panel links-panel" id="links">
          <h2>~ find me elsewhere ~</h2>
          <p className="links-intro">a few portals to the rest of the web</p>
          <nav className="link-list" aria-label="External profiles">
            <a href="https://orcid.org/0009-0002-5393-8759" target="_blank" rel="noreferrer">
              <span className="link-spark cyan" aria-hidden="true">✦</span>
              ORCID
              <span aria-hidden="true">↗</span>
            </a>
            <a href="https://inspirehep.net/authors/1995752" target="_blank" rel="noreferrer">
              <span className="link-spark pink" aria-hidden="true">✦</span>
              INSPIRE
              <span aria-hidden="true">↗</span>
            </a>
            <a href="https://www.linkedin.com/in/amalia-madden-233b08168" target="_blank" rel="noreferrer">
              <span className="link-spark green" aria-hidden="true">✦</span>
              LinkedIn
              <span aria-hidden="true">↗</span>
            </a>
          </nav>
          <p className="email-line">
            or email me at <a href="mailto:amadden@kitp.ucsb.edu">amadden@kitp.ucsb.edu</a> !!
          </p>
        </section>

        <VisitorTracker />

        <footer>
          <p>© 2001 (spiritually) · last updated: yesterday probably · no rights reserved</p>
          <a href="#top">beam me back to the top ↑</a>
        </footer>
      </div>
    </main>
  );
}
