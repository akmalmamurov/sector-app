import { LoaderIcon } from "@/assets/icons";

export const PageLoader = () => {
  return (
    <div className="fixed top-0 left-0 w-full min-h-screen z-50 bg-white p-10 flex  items-center justify-center">
      {/* Spinner */}
      <div className="flex flex-col items-center">
        <LoaderIcon className="animate-spin w-14 h-14" />

        <p className="mt-4 text-black text-xl">Загрузка</p>
      </div>

      {/* Loading text */}
    </div>
  );
};

export default PageLoader;
