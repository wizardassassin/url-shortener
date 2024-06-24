import UrlForm from "./url-form";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-6 items-center p-24">
      <h1 className="font-bold text-3xl">URL Shortener</h1>
      <UrlForm />
      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-4xl lg:grid-cols-3 lg:text-left">
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className="mb-3 text-2xl font-semibold">Shorten</h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Take long URLs and condense them down into a short link.
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className="mb-3 text-2xl font-semibold">QR Code</h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Generate a QR Code to scan into a URL.
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className="mb-3 text-2xl font-semibold">Statistics</h2>
          <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">
            Track the number of times the URL has been used.
          </p>
        </div>
      </div>
    </main>
  );
}
