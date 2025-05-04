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
        <ProfileHeader />

        <div className="border border-t-0 border-superSilver overflow-hidden shadow-sectionShadow">
          <div>{children}</div>
        </div>
      </Container>
    </div>
  );
}
