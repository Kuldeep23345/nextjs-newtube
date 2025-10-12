interface LayoutProps {
  children: React.ReactNode;
}
import { StudioLayout } from "@/modules/studio/ui/layouts/studio-layout";

const Layout = ({ children }: LayoutProps) => {
  return <StudioLayout>{children}</StudioLayout>;
};

export default Layout;
