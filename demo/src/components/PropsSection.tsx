const props = [
  {
    name: "src",
    type: "string",
    required: true,
    desc: "URL to a .json or .lottie file",
  },
  { name: "loop", type: "boolean", default: "false", desc: "Loop playback" },
  { name: "autoplay", type: "boolean", default: "true", desc: "Play automatically once loaded" },
  { name: "speed", type: "number", default: "1", desc: "Playback speed multiplier" },
  { name: "direction", type: "1 | -1", default: "1", desc: "Playback direction" },
  {
    name: "backgroundColor",
    type: "string",
    default: '"transparent"',
    desc: "Background color for the container",
  },
  { name: "id", type: "string", desc: "Container element id" },
  { name: "className", type: "string", desc: "Container class name" },
  { name: "style", type: "React.CSSProperties", desc: "Inline styles for the container" },
  {
    name: "role",
    type: "React.AriaRole",
    default: '"img"',
    desc: "Accessible role for the container",
  },
  { name: "aria-label", type: "string", desc: "Accessible label describing the animation" },
  {
    name: "aria-hidden",
    type: "boolean",
    desc: "Hide decorative animations from assistive tech",
  },
  {
    name: "playerRef",
    type: "Ref<DotLottiePlayerRef>",
    desc: "Imperative playback controls",
  },
  { name: "onLoad", type: "() => void", desc: "Fires when the animation is loaded" },
  { name: "onError", type: "(error: Error) => void", desc: "Fires when loading or playback fails" },
  { name: "onComplete", type: "() => void", desc: "Fires when a non-looping animation completes" },
  { name: "onLoopComplete", type: "() => void", desc: "Fires at the end of each loop" },
  { name: "onFrame", type: "(frame: number) => void", desc: "Fires on every rendered frame" },
  { name: "onEnterFrame", type: "(frame: number) => void", desc: "Alias of onFrame" },
];

export function PropsSection() {
  return (
    <section id="props" className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">API reference</span>
          <h2 className="section-title">Every prop, explained.</h2>
          <p className="section-desc">
            A small, predictable API. Everything except <code>src</code> is
            optional.
          </p>
        </div>

        <div className="panel table-panel">
          <div className="table-wrap">
            <table className="props-table">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {props.map((prop) => (
                  <tr key={prop.name}>
                    <td>
                      <code className="prop-name">{prop.name}</code>
                      {prop.required && <span className="required-badge">required</span>}
                    </td>
                    <td>
                      <span className="type-tag">{prop.type}</span>
                    </td>
                    <td>
                      {prop.default ? <code>{prop.default}</code> : <span className="empty">—</span>}
                    </td>
                    <td>{prop.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
