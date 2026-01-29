import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Byte Runner - Cybersecurity Educational Game | Knacksters",
  description: "Learn cybersecurity through an interactive endless runner game. Solve real-world security puzzles, dodge cyber threats, and test your skills.",
  keywords: ["cybersecurity game", "educational game", "endless runner", "security training", "phishing detection", "cyber threats"],
};

export default function ByteRunnerPage() {
  return (
    <div className="w-full h-screen flex flex-col">
      <iframe
        src="https://byte-runner-seven.vercel.app"
        className="w-full flex-1 border-0"
        title="Byte Runner - Cybersecurity Game"
        allow="accelerometer; gyroscope; fullscreen"
      />
    </div>
  );
}
