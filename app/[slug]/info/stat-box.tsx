import CopyButton from "./copy-button";
import QRCodeBox from "./qrcode-box";

export default function StatBox({
  host,
  slug,
  url,
  visits,
  createdAt,
  updatedAt,
}: {
  host: string;
  slug: string;
  url: string;
  visits: number;
  createdAt: Date;
  updatedAt: Date;
}) {
  const sourceUrl = new URL(slug, host);
  const destUrl = new URL(url);
  return (
    <>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-6">
        <div>
          <span>Shortened URL: </span>
          <a
            href={sourceUrl.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-blue-400 font-medium"
          >
            {sourceUrl.href}
          </a>{" "}
          <CopyButton text={sourceUrl.href} />
        </div>
        <div>
          <span>Original URL: </span>
          <a
            href={destUrl.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-blue-400 font-medium"
          >
            {destUrl.href}
          </a>{" "}
          <CopyButton text={destUrl.href} />
        </div>
      </div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-6">
        <div>
          <span>Creation Date: </span>
          <span className="font-medium">{createdAt.toLocaleString()}</span>
        </div>
        <div>
          <span>Last Visit: </span>
          <span className="font-medium">
            {visits !== 0 ? updatedAt.toLocaleString() : "N/A"}
          </span>
        </div>
      </div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-6">
        <span>Visits: </span>
        <span className="font-bold">{String(visits)}</span>
      </div>
      <QRCodeBox value={sourceUrl.href} />
    </>
  );
}
