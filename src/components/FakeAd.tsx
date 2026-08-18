type Props = {
  size?: "banner" | "rectangle" | "sidebar" | "small";
  title: string;
  description: string;
  cta?: string;
  emoji?: string;
};

export default function FakeAd({
  size = "rectangle",
  title,
  description,
  cta = "TRY NOW",
  emoji = "🚀",
}: Props) {
  const sizeClasses = {
    banner: "w-full p-4 md:p-6",
    rectangle: "w-full max-w-sm p-4",
    sidebar: "w-full p-3",
    small: "w-full p-3",
  };

  return (
    <div
      className={`border-2 border-dashed border-orange-400 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg ${sizeClasses[size]} relative overflow-hidden`}
    >
      <div className="absolute top-1 left-1 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
        ADVERTISEMENT — DEMO
      </div>
      <div className="mt-5 text-center">
        <div className="text-2xl mb-1">{emoji}</div>
        <h3 className="font-bold text-sm md:text-base text-gray-900 leading-tight">
          {title}
        </h3>
        <p className="text-xs text-gray-600 mt-1 leading-snug">{description}</p>
        <button className="mt-3 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full transition">
          {cta}
        </button>
      </div>
    </div>
  );
}
