import CartLoader from "@/components/loader/CartLoader";

const ProfileLoading = () => {
  return (
    <div className="fixed top-[189px] left-0 right-0 w-screen z-50">
      <div className="container mx-auto relative">
        <CartLoader className="h-1 w-full" />
      </div>
    </div>
  );
};

export default ProfileLoading;
