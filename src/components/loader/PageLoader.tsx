
export const PageLoader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-[10px] z-50">
      <div className="w-full h-full bg-gradient-to-r from-blue-300 via-cerulean to-cerulean/75 animate-loading-bar" />
    </div>
  );
};

export default PageLoader;
