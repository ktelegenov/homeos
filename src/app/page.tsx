"use client";

import { useEffect, useState } from "react";

type InboxTask = {
  id: string;
  title: string;
  description: string | null;
  date: string | null;
  reminders: string | null;
  labels: string | null;
};

export default function Home() {
  const [tasks, setTasks] = useState<InboxTask[]>([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    reminders: "",
    labels: "",
  });

  const handleChange = (
    field: keyof typeof form,
    value: string,
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const loadTasks = async () => {
      const response = await fetch("/api/tasks");
      if (!response.ok) {
        return;
      }
      const data = (await response.json()) as InboxTask[];
      setTasks(data);
    };

    void loadTasks();
  }, []);

  const addTask = async () => {
    if (!form.title.trim()) {
      return;
    }
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: form.title.trim(),
        description: form.description.trim(),
        date: form.date,
        reminders: form.reminders.trim(),
        labels: form.labels.trim(),
      }),
    });

    if (!response.ok) {
      return;
    }

    const task = (await response.json()) as InboxTask;
    setTasks((prev) => [task, ...prev]);
    setForm({
      title: "",
      description: "",
      date: "",
      reminders: "",
      labels: "",
    });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="border-b border-zinc-800 bg-zinc-900/40">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-red-500/90" />
            <div>
              <p className="text-sm font-semibold">Family OS</p>
              <p className="text-xs text-zinc-400">Personal workspace</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs text-zinc-400">
            <span className="rounded-full border border-zinc-800 px-2 py-1">
              Syncing
            </span>
            <span className="h-8 w-8 rounded-full border border-zinc-800" />
          </div>
        </div>
      </div>

      <main className="mx-auto flex w-full max-w-7xl gap-6 px-6 py-6">
        <aside className="hidden w-64 flex-shrink-0 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 sm:flex sm:flex-col">
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 px-3 py-2 text-xs text-zinc-400">
            Search
          </div>

          <nav className="mt-5 space-y-1 text-sm">
            {[
              { label: "Inbox", count: 4, active: false },
              { label: "Today", count: 3, active: true },
              { label: "Upcoming", count: 7, active: false },
            ].map((item) => (
              <div
                key={item.label}
                className={`flex items-center justify-between rounded-lg px-3 py-2 transition ${
                  item.active
                    ? "bg-zinc-800/70 text-zinc-50"
                    : "text-zinc-300 hover:bg-zinc-900"
                }`}
              >
                <span>{item.label}</span>
                <span className="text-xs text-zinc-400">{item.count}</span>
              </div>
            ))}
          </nav>

          <div className="mt-auto rounded-xl border border-zinc-800 bg-zinc-950/60 px-3 py-3 text-xs text-zinc-400">
            Focus: Inbox
          </div>
        </aside>

        <section className="flex-1 space-y-6">
          <header className="flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Inbox</h2>
              <p className="mt-1 text-sm text-zinc-400">
                Capture everything, organize later.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="rounded-lg border border-zinc-800 bg-zinc-950/60 px-3 py-2 text-xs text-zinc-300">
                List
              </button>
              <button className="rounded-lg border border-zinc-800 bg-zinc-950/60 px-3 py-2 text-xs text-zinc-300">
                Sort
              </button>
              <button
                onClick={addTask}
                className="rounded-lg border border-zinc-800 bg-red-500/90 px-3 py-2 text-xs font-semibold text-white"
              >
                + Add Task
              </button>
            </div>
          </header>

          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <div className="space-y-4">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
                <div className="space-y-4">
                  <input
                    value={form.title}
                    onChange={(event) =>
                      handleChange("title", event.target.value)}
                    placeholder="Task name"
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-700"
                  />
                  <textarea
                    value={form.description}
                    onChange={(event) =>
                      handleChange("description", event.target.value)}
                    placeholder="Description"
                    className="min-h-[100px] w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-700"
                  />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      type="date"
                      value={form.date}
                      onChange={(event) =>
                        handleChange("date", event.target.value)}
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-700"
                    />
                    <input
                      value={form.reminders}
                      onChange={(event) =>
                        handleChange("reminders", event.target.value)}
                      placeholder="Reminders"
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-700"
                    />
                  </div>
                  <input
                    value={form.labels}
                    onChange={(event) =>
                      handleChange("labels", event.target.value)}
                    placeholder="Labels"
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-700"
                  />
                  <button
                    onClick={addTask}
                    className="w-full rounded-xl border border-zinc-800 bg-red-500/90 px-4 py-3 text-sm font-semibold text-white hover:bg-red-500"
                  >
                    Add to Inbox
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
                <h3 className="text-base font-semibold">Inbox Tasks</h3>
                <div className="mt-4 space-y-3">
                  {tasks.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-zinc-800 px-4 py-6 text-center text-sm text-zinc-500">
                      No tasks yet.
                    </div>
                  ) : (
                    tasks.map((task) => (
                      <div
                        key={task.id}
                        className="rounded-xl border border-zinc-800 bg-zinc-950/40 px-4 py-3"
                      >
                        <div className="text-sm font-semibold text-zinc-100">
                          {task.title}
                        </div>
                        {task.description && (
                          <p className="mt-1 text-xs text-zinc-400">
                            {task.description}
                          </p>
                        )}
                        <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-zinc-400">
                          {task.date && (
                            <span className="rounded-full border border-zinc-800 px-2 py-0.5">
                              {new Date(task.date).toLocaleDateString()}
                            </span>
                          )}
                          {task.reminders && (
                            <span className="rounded-full border border-zinc-800 px-2 py-0.5">
                              {task.reminders}
                            </span>
                          )}
                          {task.labels && (
                            <span className="rounded-full border border-zinc-800 px-2 py-0.5">
                              {task.labels}
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
                <h3 className="text-base font-semibold">Today</h3>
                <div className="mt-4 rounded-xl border border-dashed border-zinc-800 px-4 py-6 text-center text-sm text-zinc-500">
                  Move tasks here when scheduled.
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
                <h3 className="text-base font-semibold">Next 7 Days</h3>
                <div className="mt-4 rounded-xl border border-dashed border-zinc-800 px-4 py-6 text-center text-sm text-zinc-500">
                  Upcoming tasks will appear here.
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
