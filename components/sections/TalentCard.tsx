import Image from "next/image";

interface TalentCardProps {
  image: string;
  name?: string;
  role?: string;
}

export default function TalentCard({ image, name, role }: TalentCardProps) {
  return (
    <div className="shrink-0 w-[233px] pointer-events-auto">
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-white shadow-none mt-6 opacity-50 rounded-[20px] border border-solid border-transparent transition-[opacity,border-color] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:opacity-100 hover:border-[rgb(252,136,56)] cursor-pointer">
        <Image
          src={image}
          alt={name || "Talent profile"}
          fill
          sizes="(max-width: 768px) 200px, (max-width: 1024px) 250px, 300px"
          className="object-cover"
          priority={false}
        />
        {/* Text overlay at bottom-left */}
        {(name || role) && (
          <div className="absolute bottom-0 left-0 p-4 pb-5">
      {name && (
              <p className="text-white font-bold text-lg leading-tight mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                {name}
              </p>
            )}
            {role && (
              <p className="text-gray-200 text-sm leading-tight opacity-90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                {role}
              </p>
            )}
        </div>
      )}
      </div>
    </div>
  );
}
