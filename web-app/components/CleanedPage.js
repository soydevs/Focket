import { useState } from "react";
import Link from "next/link";

const CleanedPage = ({ url, content }) => {
  const [showIframe, setShowIframe] = useState(false);
  return (
    <div>
      {content && (
        <button
          onClick={() => setShowIframe((val) => !val)}
          style={{ marginRight: 10 }}
        >
          Show {showIframe ? "Cleaned " : "Original "}page
        </button>
      )}
      <Link href='/'>
        <a style={{ color: "blue", marginRight: 10 }}>Home</a>
      </Link>
      <a
        target='_blank'
        rel='noopener noreferrer'
        style={{ color: "blue" }}
        href={url}
      >
        Visit Page
      </a>
      {content && !showIframe ? (
        <div
          className='container'
          style={{ textAlign: "justify", maxHeight: "70vh", overflow: "auto" }}
        >
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      ) : (
        <div style={{ display: "flex", height: "70vh" }}>
          <iframe style={{ flex: 1 }} src={url} frameBorder='0' />
        </div>
      )}
    </div>
  );
};

export default CleanedPage;
