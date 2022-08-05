import { useRef, useEffect } from "react";

interface PreviewProps {
  code: string;
}

const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener("message", (event) => {
            try {
              eval(event.data);
            } catch(e) {
              const root = document.getElementById('root');
              root.innerHTML = '<div style="color:red"><h4>Runtime Error:</h4>' + e + '</div>';
              console.err(e);
            }
          }, false)
        </script>
      </body>
    </html>
  `;

export const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    iframe.current.contentWindow.postMessage(code, "*");
  }, [code]);

  return (
    <iframe
      title="codeEditor"
      srcDoc={html}
      sandbox="allow-scripts"
      ref={iframe}
    />
  );
};
