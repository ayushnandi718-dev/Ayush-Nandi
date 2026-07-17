export default function DevToolsBlocked() {
  return (
    <div className="flex h-screen items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
        <p className="text-lg text-gray-400 mb-6">
          Developer tools are not allowed on this site.
        </p>
        <a
          href="/"
          className="inline-block rounded-lg bg-white px-6 py-3 text-black font-semibold hover:bg-gray-200 transition"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
