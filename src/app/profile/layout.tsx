import { Container } from "@/components/container";
import ProfileHeader from "@/components/ProfileHeader";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="py-[58px]">
      <Container>
        <div className="bg-white shadow-sectionShadow border overflow-hidden">
          <ProfileHeader />
          <div className="p-6">{children}</div>
        </div>
      </Container>
    </div>
  );
}
