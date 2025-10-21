import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  FileText,
  AlertTriangle,
  TrendingUp,
  Bot,
  Plug,
  Warehouse,
  Shield,
  ShoppingBag,
  Users,
  Settings,
  HelpCircle,
  Activity,
  ChevronDown,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/",
  },
  {
    title: "Inventory & Stock",
    icon: Package,
    subItems: [
      { title: "Stock Summary", url: "/inventory/summary" },
      { title: "Expiry Alerts", url: "/inventory/expiry" },
      { title: "Item Management", url: "/inventory/items" },
      { title: "Stock Adjustment", url: "/inventory/adjustment" },
      { title: "Branch Transfer", url: "/inventory/transfer" },
      { title: "Reorder Management", url: "/inventory/reorder" },
      { title: "Barcode & QR", url: "/inventory/barcode" },
    ],
  },
  {
    title: "Purchase Management",
    icon: ShoppingCart,
    subItems: [
      { title: "Purchase Orders", url: "/purchase/orders" },
      { title: "Goods Receipt (GRN)", url: "/purchase/grn" },
      { title: "Supplier Management", url: "/purchase/suppliers" },
      { title: "Returns & Replacements", url: "/purchase/returns" },
    ],
  },
  {
    title: "Sales & Billing",
    icon: FileText,
    subItems: [
      { title: "POS Counter", url: "/sales/pos" },
      { title: "Prescription Validation", url: "/sales/prescription" },
      { title: "Customer Management", url: "/sales/customers" },
      { title: "Sales Reports", url: "/sales/reports" },
    ],
  },
  {
    title: "Expiry & Waste Control",
    icon: AlertTriangle,
    subItems: [
      { title: "Expiry Tracker", url: "/expiry/tracker" },
      { title: "Returns Management", url: "/expiry/returns" },
      { title: "Waste Management", url: "/expiry/waste" },
    ],
  },
  {
    title: "Analytics & Insights",
    icon: TrendingUp,
    subItems: [
      { title: "Inventory Analytics", url: "/analytics/inventory" },
      { title: "Sales Analytics", url: "/analytics/sales" },
      { title: "Purchase Insights", url: "/analytics/purchase" },
      { title: "Profitability Dashboard", url: "/analytics/profitability" },
    ],
  },
  {
    title: "AI Assistant",
    icon: Bot,
    subItems: [
      { title: "Smart Recommendations", url: "/ai/recommendations" },
      { title: "Chatbot & Voice", url: "/ai/chatbot" },
      { title: "Anomaly Detection", url: "/ai/anomaly" },
      { title: "AI Prescription Reader", url: "/ai/prescription" },
    ],
  },
  {
    title: "Integration",
    icon: Plug,
    subItems: [
      { title: "Distributor APIs", url: "/integration/distributors" },
      { title: "Accounting", url: "/integration/accounting" },
      { title: "E-commerce", url: "/integration/ecommerce" },
      { title: "IoT & RFID", url: "/integration/iot" },
    ],
  },
  {
    title: "Warehouse & Branches",
    icon: Warehouse,
    subItems: [
      { title: "Warehouse Overview", url: "/warehouse/overview" },
      { title: "Branch Operations", url: "/warehouse/branches" },
      { title: "Cold Storage", url: "/warehouse/cold-storage" },
    ],
  },
  {
    title: "Compliance & Audit",
    icon: Shield,
    subItems: [
      { title: "Batch Traceability", url: "/compliance/traceability" },
      { title: "Regulatory Reports", url: "/compliance/reports" },
      { title: "Audit Logs", url: "/compliance/audit" },
      { title: "Recall Management", url: "/compliance/recall" },
    ],
  },
  {
    title: "Smart Procurement",
    icon: ShoppingBag,
    subItems: [
      { title: "Vendor Portal", url: "/procurement/vendors" },
      { title: "Dynamic Procurement", url: "/procurement/dynamic" },
      { title: "Quality Grading", url: "/procurement/quality" },
    ],
  },
  {
    title: "User Management",
    icon: Users,
    subItems: [
      { title: "Role Permissions", url: "/users/roles" },
      { title: "Device Access", url: "/users/devices" },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    subItems: [
      { title: "Organization", url: "/settings/organization" },
      { title: "Notifications", url: "/settings/notifications" },
      { title: "Backup & Recovery", url: "/settings/backup" },
      { title: "API & Webhooks", url: "/settings/api" },
    ],
  },
  {
    title: "Health Integration",
    icon: Activity,
    subItems: [
      { title: "EHR/EMR Sync", url: "/health/ehr" },
      { title: "Doctor Portal", url: "/health/doctors" },
      { title: "Health Records", url: "/health/records" },
    ],
  },
  {
    title: "Help & Support",
    icon: HelpCircle,
    url: "/support",
  },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<string[]>(["Inventory & Stock"]);

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) =>
      prev.includes(title) ? prev.filter((m) => m !== title) : [...prev, title]
    );
  };

  const isActive = (url: string) => location.pathname === url;
  const hasActiveSubItem = (subItems?: { url: string }[]) =>
    subItems?.some((item) => location.pathname === item.url);

  return (
    <Sidebar className="border-r border-border" collapsible="icon">
      <SidebarContent className="overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary font-semibold text-base mb-2">
            MediStock Pro
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) =>
                item.subItems ? (
                  <Collapsible
                    key={item.title}
                    open={openMenus.includes(item.title)}
                    onOpenChange={() => toggleMenu(item.title)}
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          className={`group ${
                            hasActiveSubItem(item.subItems)
                              ? "bg-accent text-accent-foreground"
                              : ""
                          }`}
                        >
                          <item.icon className="h-4 w-4" />
                          {open && <span>{item.title}</span>}
                          {open && (
                            <ChevronDown
                              className={`ml-auto h-4 w-4 transition-transform ${
                                openMenus.includes(item.title) ? "rotate-180" : ""
                              }`}
                            />
                          )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      {open && (
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.subItems.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.url}>
                                <SidebarMenuSubButton asChild>
                                  <NavLink
                                    to={subItem.url}
                                    className={({ isActive }) =>
                                      isActive ? "bg-accent text-accent-foreground font-medium" : ""
                                    }
                                  >
                                    {subItem.title}
                                  </NavLink>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      )}
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url!}
                        className={({ isActive }) =>
                          isActive ? "bg-accent text-accent-foreground font-medium" : ""
                        }
                      >
                        <item.icon className="h-4 w-4" />
                        {open && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
