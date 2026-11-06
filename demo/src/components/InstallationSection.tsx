import { TabGroup } from "./TabGroup";
import { CodeBlock } from "./CodeBlock";
import { CheckIcon } from "./Icons";

const requirements = [
  "React 18 or newer",
  "Works with Vite, Next.js and CRA",
  "TypeScript types included",
  "No CSS import required",
];

export function InstallationSection() {
  return (
    <section id="installation" className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Installation</span>
          <h2 className="section-title">Drop it in. Press play.</h2>
          <p className="section-desc">
            Install the package with your preferred manager — there is nothing
            else to configure.
          </p>
        </div>

        <div className="install-layout">
          <div className="panel install-panel">
            <TabGroup
              tabs={["npm", "pnpm", "yarn", "bun"]}
              defaultTab="npm"
              label="Package manager"
            >
              <CodeBlock language="bash">npm install @mhmmt/react-dotlottie-player</CodeBlock>
              <CodeBlock language="bash">pnpm add @mhmmt/react-dotlottie-player</CodeBlock>
              <CodeBlock language="bash">yarn add @mhmmt/react-dotlottie-player</CodeBlock>
              <CodeBlock language="bash">bun add @mhmmt/react-dotlottie-player</CodeBlock>
            </TabGroup>
          </div>

          <aside className="panel requirements">
            <h3>What you get</h3>
            <ul>
              {requirements.map((item) => (
                <li key={item}>
                  <span className="check-badge">
                    <CheckIcon width={13} height={13} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
