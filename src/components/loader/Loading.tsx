import { LoaderIcon } from "@/assets/icons";

export const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full min-h-screen z-50 bg-white p-10 flex  items-center justify-center">
      {/* Spinner */}
      <div className="flex flex-col items-center">
        <LoaderIcon className="animate-spin w-10 h-10" />
        <p className="mt-4 text-black text-lg">Загрузка</p>
      </div>
    </div>
  );
};

export default Loading;
