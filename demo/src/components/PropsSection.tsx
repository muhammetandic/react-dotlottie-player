export function PropsSection() {
  const props = [
    {
      name: "src",
      type: "string",
      required: true,
      desc: "URL to .json or .lottie file",
    },
    {
      name: "loop",
      type: "boolean",
      default: "false",
      desc: "Loop animation playback",
    },
    {
      name: "autoplay",
      type: "boolean",
      default: "true",
      desc: "Auto-play when loaded",
    },
    {
      name: "speed",
      type: "number",
      default: "1",
      desc: "Playback speed multiplier",
    },
    {
      name: "direction",
      type: "1 | -1",
      default: "1",
      desc: "Playback direction",
    },
    {
      name: "backgroundColor",
      type: "string",
      default: "'transparent'",
      desc: "Container background",
    },
    {
      name: "id",
      type: "string",
      desc: "Container element id",
    },
    {
      name: "className",
      type: "string",
      desc: "Container class name",
    },
    {
      name: "style",
      type: "React.CSSProperties",
      desc: "Inline styles for the container",
    },
    {
      name: "role",
      type: "React.AriaRole",
      default: "'img'",
      desc: "Accessible role for the container",
    },
    {
      name: "aria-label",
      type: "string",
      desc: "Accessible label for the animation",
    },
    {
      name: "aria-hidden",
      type: "boolean",
      desc: "Hide from assistive tech (decorative)",
    },
    {
      name: "playerRef",
      type: "Ref<DotLottiePlayerRef>",
      desc: "Imperative playback controls",
    },
    {
      name: "onLoad",
      type: "() => void",
      desc: "Callback when animation loads",
    },
    {
      name: "onError",
      type: "(error: Error) => void",
      desc: "Callback on error",
    },
    {
      name: "onComplete",
      type: "() => void",
      desc: "Callback when animation completes",
    },
    {
      name: "onLoopComplete",
      type: "() => void",
      desc: "Callback when loop completes",
    },
    {
      name: "onFrame",
      type: "(frame: number) => void",
      desc: "Callback on each frame",
    },
    {
      name: "onEnterFrame",
      type: "(frame: number) => void",
      desc: "Callback on each frame",
    },
  ];

  return (
    <section id="props" className="section">
      <div className="container">
        <h2 className="section-title">Props</h2>
        <p className="section-desc">All available component props</p>

        <div className="card">
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
                    <code>{prop.name}</code>
                  </td>
                  <td>
                    <span className="type-tag">{prop.type}</span>
                  </td>
                  <td>{prop.default || "—"}</td>
                  <td>{prop.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
