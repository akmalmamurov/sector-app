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
        <div className="border border-superSilver overflow-hidden shadow-sectionShadow">
          <div className="bg-white">
            <ProfileHeader />
          </div>
          <div>{children}</div>
        </div>
      </Container>
    </div>
  );
}
