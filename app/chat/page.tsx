import AIChat from "@/components/chat/AIChat";

export default function ChatPage() {
  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold mb-6">
        AI Feedback Assistant
      </h1>

      <AIChat />
    </main>
  );
}