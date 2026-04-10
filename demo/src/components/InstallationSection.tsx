import { TabGroup } from "./TabGroup";
import { CodeBlock } from "./CodeBlock";

export function InstallationSection() {
  return (
    <section id="installation" className="section">
      <div className="container">
        <h2 className="section-title">Installation</h2>
        <p className="section-desc">Get started in seconds</p>

        <div className="card">
          <TabGroup tabs={["npm", "pnpm", "yarn"]} defaultTab="npm">
            <CodeBlock language="bash">npm install @mhmmt/react-dotlottie-player</CodeBlock>
            <CodeBlock language="bash">pnpm add @mhmmt/react-dotlottie-player</CodeBlock>
            <CodeBlock language="bash">yarn add @mhmmt/react-dotlottie-player</CodeBlock>
          </TabGroup>
        </div>

        <div className="card">
          <p style={{ color: "var(--text-muted)" }}>
            No additional configuration required. The package works out of the
            box.
          </p>
        </div>
      </div>
    </section>
  );
}
