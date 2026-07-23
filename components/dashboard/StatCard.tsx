import {
  MessageSquare,
  Smile,
  Frown,
  Clock,
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
}

export default function StatCard({
  title,
  value,
}: StatCardProps) {
  const getIcon = () => {
    switch (title) {
      case "Total Feedback":
        return <MessageSquare size={28} />;
      case "Positive":
        return <Smile size={28} />;
      case "Negative":
        return <Frown size={28} />;
      case "Pending Review":
        return <Clock size={28} />;
      default:
        return <MessageSquare size={28} />;
    }
  };

  return (
    <div
      className="
      bg-white
      rounded-2xl
      shadow-md
      p-6
      transition-all
      duration-300
      hover:shadow-xl
      hover:-translate-y-1
      border
      border-gray-200
      "
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm font-medium">
            {title}
          </p>

          <h2 className="text-4xl font-bold text-gray-900 mt-2">
            {value}
          </h2>

          <p className="text-xs text-gray-400 mt-2">
            Updated live
          </p>
        </div>

        <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
          {getIcon()}
        </div>
      </div>
    </div>
  );
}