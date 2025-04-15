import CartLoader from "@/components/loader/CartLoader";

const ProfileLoading = () => {
  return (
    <div className="relative">
      <CartLoader className="-top-[110px] -left-10 h-1" />
    </div>
  );
};

export default ProfileLoading;
