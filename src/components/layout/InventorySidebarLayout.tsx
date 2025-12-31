import { SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/components/layout/Header";
import { InventorySidebar } from "./InventorySidebar";

interface Props {
  children: React.ReactNode;
}

export const InventorySidebarLayout = ({ children }: Props) => (
  <SidebarProvider defaultOpen={true}>
    <div className="min-h-screen flex w-full">
      <InventorySidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  </SidebarProvider>
);
