import { SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/components/layout/Header";
import { InventorySidebar } from "./InventorySidebar";
import { StoreSidebar } from "./StoreSidebar";

interface Props {
  children: React.ReactNode;
}

export const StoreSidebarLayout = ({ children }: Props) => (
  <SidebarProvider defaultOpen={true}>
    <div className="min-h-screen flex w-full">
      <StoreSidebar />
      <div className="flex-1 flex flex-col">
        
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  </SidebarProvider>
);
