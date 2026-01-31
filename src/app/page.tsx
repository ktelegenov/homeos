export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 py-16 text-zinc-50">
      <main className="flex w-full max-w-4xl flex-col items-center gap-10 text-center">
        <div className="space-y-4">
          <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">
            Family OS
          </h1>
          <p className="text-lg text-zinc-300 sm:text-xl">
            Hello World! System Online.
          </p>
        </div>
        <div className="grid w-full gap-6 sm:grid-cols-3">
          {[
            "Chores",
            "Budget",
            "Renovation",
          ].map((label) => (
            <div
              key={label}
              className="flex h-36 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/60 text-base font-medium text-zinc-200"
            >
              {label}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
