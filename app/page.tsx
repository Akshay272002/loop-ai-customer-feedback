import Navbar from "@/components/home/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar/>
    <main className="min-h-screen flex items-center justify-center">
      
      <div className="text-center">
        
        <h1 className="text-5xl font-bold">LOOP AI</h1>
        <p className="mt-4 text-gray-500">
          AI Customer Feedback Intelligence Platform
        </p>
      </div>
    </main>
    </div>
  );
}