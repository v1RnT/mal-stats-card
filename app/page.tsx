"use client";

import { useState, useSyncExternalStore, useEffect, useCallback } from "react";

import { CopyButton } from "@/src/components/CopyButton";

import { LayoutType } from "@/src/enums/LayoutType";
import { ThemeType } from "@/src/enums/ThemeType";
import { MediaType } from "@/src/enums/MediaType";

import MalLogo from "../src/assets/icons/mal-icon.svg";
import LoaderIcon from "../src/assets/icons/loader-icon.svg";

export default function Home() {
  const [inputUsername, setInputUsername] = useState("fknalive");
  const [validatedUsername, setValidatedUsername] = useState<string | null>(
    null
  );
  const [types, setType] = useState<MediaType>(MediaType.Anime);
  const [themes, setTheme] = useState<ThemeType>(ThemeType.Dark);
  const [layouts, setLayout] = useState<LayoutType>(LayoutType.Full);
  const [customWidth, setCustomWidth] = useState("");
  const [customHeight, setCustomHeight] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const origin = useSyncExternalStore(
    () => () => {},
    () => window.location.origin,
    () => ""
  );

  const constructUrl = useCallback(
    (userToUse: string) => {
      const params = new URLSearchParams();
      if (userToUse) params.set("user", userToUse);
      if (types !== "anime") params.set("type", types);
      if (themes !== "dark") params.set("theme", themes);
      if (layouts !== "full") params.set("layout", layouts);
      if (customWidth) params.set("width", customWidth);
      if (customHeight) params.set("height", customHeight);
      return `/api/card?${params.toString()}`;
    },
    [types, themes, layouts, customWidth, customHeight]
  );

  const handleGenerate = useCallback(async () => {
    if (!inputUsername.trim()) return;

    setIsLoading(true);
    setError(null);

    const testParams = new URLSearchParams();
    testParams.set("user", inputUsername);
    const testPath = `/api/card?${testParams.toString()}`;
    const fullTestPath = `${origin}${testPath}`;

    try {
      const res = await fetch(fullTestPath);

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "User not found");
      }

      setValidatedUsername(inputUsername);
    } catch (err: unknown) {
      console.error(err);
      setError("We couldn't find this user. Please check the spelling.");
      setValidatedUsername(null);
      setPreviewUrl(null);
    } finally {
      setIsLoading(false);
    }
  }, [inputUsername, origin]);

  useEffect(() => {
    if (validatedUsername) {
      const path = constructUrl(validatedUsername);
      setPreviewUrl(path);
    }
  }, [validatedUsername, constructUrl]);

  useEffect(() => {
    if (origin && !validatedUsername) handleGenerate();
  }, [handleGenerate, origin, validatedUsername]);

  const handleDownloadSvg = async () => {
    if (!previewUrl) return;
    try {
      setIsDownloading(true);
      const res = await fetch(previewUrl);
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${validatedUsername}_stats.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadPng = () => {
    if (!previewUrl) return;
    setIsDownloading(true);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = previewUrl;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const link = document.createElement("a");
        link.download = `${validatedUsername}_stats.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      }
      setIsDownloading(false);
    };
    img.onerror = () => setIsDownloading(false);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans selection:bg-blue-500/30">
      <header className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <MalLogo />
            <span className="font-bold tracking-tight">MAL Stats Card</span>
          </div>
          <a
            href="https://github.com/v1RnT/mal-stats-card"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-neutral-400 hover:text-white transition-colors"
          >
            GitHub
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 space-y-8">
          <section>
            <label className="block text-xs font-semibold uppercase text-neutral-500 mb-2">
              Username
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputUsername}
                onChange={(event) => setInputUsername(event.target.value)}
                onKeyDown={(event) => event.key === "Enter" && handleGenerate()}
                placeholder="MAL Username"
                className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-4 rounded-lg transition-colors flex items-center justify-center min-w-[100px]"
              >
                {isLoading ? <LoaderIcon /> : "Generate"}
              </button>
            </div>
          </section>

          <div className="grid grid-cols-2 gap-6">
            <section>
              <label className="block text-xs font-semibold uppercase text-neutral-500 mb-2">
                Type
              </label>
              <div className="flex bg-neutral-900 rounded-lg p-1 border border-neutral-800">
                {["anime", "manga"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setType(type as MediaType)}
                    className={`flex-1 py-1.5 text-xs font-medium rounded capitalize transition-all ${
                      types === type
                        ? "bg-neutral-700 text-white shadow-sm"
                        : "text-neutral-500 hover:text-neutral-300"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <label className="block text-xs font-semibold uppercase text-neutral-500 mb-2">
                Theme
              </label>
              <div className="flex bg-neutral-900 rounded-lg p-1 border border-neutral-800">
                {["dark", "light"].map((theme) => (
                  <button
                    key={theme}
                    onClick={() => setTheme(theme as ThemeType)}
                    className={`flex-1 py-1.5 text-xs font-medium rounded capitalize transition-all ${
                      themes === theme
                        ? "bg-neutral-700 text-white shadow-sm"
                        : "text-neutral-500 hover:text-neutral-300"
                    }`}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </section>
          </div>

          <section>
            <label className="block text-xs font-semibold uppercase text-neutral-500 mb-2">
              Layout
            </label>
            <div className="flex flex-col gap-2">
              {[
                {
                  id: "full",
                  label: "Full Details",
                  desc: "Includes lists & graph",
                },
                {
                  id: "mini",
                  label: "Mini Widget",
                  desc: "Smaller sized card",
                },
                {
                  id: "line",
                  label: "Line Strip",
                  desc: "Just a progress bar",
                },
              ].map((layout) => (
                <button
                  key={layout.id}
                  onClick={() => setLayout(layout.id as LayoutType)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg border transition-all text-left ${
                    layouts === layout.id
                      ? "bg-blue-600/10 border-blue-600/50 text-blue-400"
                      : "bg-neutral-900 border-neutral-800 hover:border-neutral-700 text-neutral-400"
                  }`}
                >
                  <span className="text-sm font-medium">{layout.label}</span>
                  <span className="text-xs opacity-60">{layout.desc}</span>
                </button>
              ))}
            </div>
          </section>

          <section>
            <label className="block text-xs font-semibold uppercase text-neutral-500 mb-2">
              Override Size (Optional)
            </label>
            <div className="flex gap-3">
              <div className="relative w-full">
                <span className="absolute left-3 top-2.5 text-neutral-600 text-xs font-bold">
                  W
                </span>
                <input
                  type="number"
                  placeholder="Auto"
                  value={customWidth}
                  onChange={(event) => setCustomWidth(event.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-8 pr-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="relative w-full">
                <span className="absolute left-3 top-2.5 text-neutral-600 text-xs font-bold">
                  H
                </span>
                <input
                  type="number"
                  placeholder="Auto"
                  value={customHeight}
                  onChange={(event) => setCustomHeight(event.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-8 pr-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </section>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-8">
          <div className="flex-1 flex items-center justify-center min-h-[400px] bg-neutral-900/30 border border-dashed border-neutral-800 rounded-xl p-8 relative overflow-hidden">
            {previewUrl && !isLoading && !error && (
              <div className="absolute top-4 right-4 flex gap-2 z-10">
                <button
                  onClick={() =>
                    window.open(`${origin}${previewUrl}`, "_blank")
                  }
                  disabled={isDownloading}
                  className="bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium px-3 py-1.5 rounded border border-neutral-700 transition-colors disabled:opacity-50"
                >
                  Link
                </button>

                <button
                  onClick={handleDownloadSvg}
                  disabled={isDownloading}
                  className="bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium px-3 py-1.5 rounded border border-neutral-700 transition-colors disabled:opacity-50"
                >
                  SVG
                </button>

                <button
                  onClick={handleDownloadPng}
                  disabled={isDownloading}
                  className="bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium px-3 py-1.5 rounded border border-neutral-700 transition-colors disabled:opacity-50"
                >
                  PNG
                </button>
              </div>
            )}
            {isLoading ? (
              <div className="flex flex-col items-center gap-3 text-blue-500">
                <LoaderIcon />
                <span className="text-sm font-medium animate-pulse">
                  Checking User...
                </span>
              </div>
            ) : error ? (
              <div className="text-center px-4">
                <div className="text-red-500 text-4xl mb-2">¯\_(ツ)_/¯</div>
                <h3 className="text-white font-bold text-lg">User not found</h3>
                <p className="text-neutral-400 text-sm mt-1">{error}</p>
              </div>
            ) : previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`${origin}${previewUrl}`}
                alt="Preview"
                className="shadow-2xl rounded-xl transition-all duration-500 animate-in fade-in zoom-in-95"
              />
            ) : (
              <span className="text-neutral-600 font-medium">
                Click Generate to preview
              </span>
            )}
          </div>

          <div className="space-y-4">
            <div className="relative group">
              <label className="block text-xs font-semibold uppercase text-neutral-500 mb-2">
                Direct Link
              </label>
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 font-mono text-sm text-neutral-300 truncate pr-20">
                {previewUrl ? `${origin}${previewUrl}` : "..."}
              </div>
              {previewUrl && <CopyButton text={`${origin}${previewUrl}`} />}
            </div>

            <div className="relative group">
              <label className="block text-xs font-semibold uppercase text-neutral-500 mb-2">
                Markdown (GitHub)
              </label>
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 font-mono text-sm text-blue-400 truncate pr-20">
                {previewUrl ? `![My Stats](${origin}${previewUrl})` : "..."}
              </div>
              {previewUrl && (
                <CopyButton text={`![My Stats](${origin}${previewUrl})`} />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
