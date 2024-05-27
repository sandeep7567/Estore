import { PropertyI } from "@/types";
import { BackgroundGradient } from "./background-gradient";

interface BackgroundCardProps {
  _id: string;
  name: string;
  price: number;
  properties: PropertyI[];
  imageFile: string;
}

export const BackgroundCard = ({
  imageFile,
  name,
  price,
  properties,
}: BackgroundCardProps) => {
  return (
    <div>
      <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
        <img
          src={imageFile}
          alt={name}
          height="400"
          width="400"
          className="object-contain"
        />
        <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
          {name}
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {!!properties &&
            properties.map((property) => (
              <div key={property._id}>
                <p>{property.name}</p>
                <p>
                  {Array.isArray(property.value) ? (
                    property.value.map((v) => (
                      <div key={v}>
                        <p>{v}</p>
                      </div>
                    ))
                  ) : (
                    <p>{property.value}</p>
                  )}
                </p>
              </div>
            ))}
        </p>
        <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
          <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
            Rs{price}
          </span>
        </button>
        <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
          <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
            Buy now
          </span>
        </button>
      </BackgroundGradient>
    </div>
  );
};
