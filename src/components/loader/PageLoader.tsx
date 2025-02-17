import { LoaderIcon } from "@/assets/icons";

export const PageLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-400px)]">
      {/* Spinner */}
      <LoaderIcon className="animate-spin w-20 h-20" />

      {/* Loading text */}
      <p className="mt-[26px] text-black text-xl">Загрузка</p>
    </div>
  );
};

export default PageLoader;
