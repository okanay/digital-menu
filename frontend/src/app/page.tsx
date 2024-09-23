import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center h-screen gap-2 dark:bg-black bg-white">
      <Image
        className="dark:invert"
        src="/logo.png"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />
      <p className="text-lg tracking-wide font-mono">Coming soon...</p>
    </main>
  );
}
