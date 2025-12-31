import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  ShoppingCart,
  Package,
  LayoutDashboard,
  FileText,
  TrendingUp,
  Users,
  Plug,
  Shield,
  Settings,
  HelpCircle,
  Warehouse,
  ChevronDown,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { useState } from "react";

/* =======================
   STORE SIDEBAR MENU DATA
======================= */

const menuItems = [
  {
    title: "Store Home",
    icon: Home,
    url: "/storeHome",
  },
  {
    title: "Orders",
    icon: ShoppingCart,
    subItems: [
      { title: "Your Orders", url: "/store/yourOrders" ,icon: <div className="border border-green-700 rounded-md  pl-1 pr-1 font-thin text-[10px]">New</div> },
      { title: "Global Orders", url: "/store/globalOrders" },
      { title: "Orders Dashboard", url: "/store/ordersDashboard" },
      { title: "Order Details", url: "/store/orderDetails" },
      { title: "Returns & Refunds", url: "/store/returnsRefunds" },
    ],
  },
  {
    title: "Products & Catalog",
    icon: Package,
    subItems: [
      { title: "All Products", url: "/store/products" },
      { title: "Add Product", url: "/store/products/add" },
      { title: "Categories", url: "/store/products/categories" },
      { title: "Pricing & Set Discounts", url: "/store/products/pricing" },
    ],
  },
  // {
  //   title: "Store Design & Pages",
  //   icon: LayoutDashboard,
  //   subItems: [
  //     { title: "Theme Library", url: "/store/design/themes" },
  //     { title: "Page Builder", url: "/store/design/pages" },
  //     { title: "Header & Footer", url: "/store/design/layout" },
  //     { title: "Navigation Menus", url: "/store/design/navigation" },
  //   ],
  // },
  {
    title: "Marketing & Growth",
    icon: TrendingUp,
    subItems: [
      { title: "Campaigns", url: "/store/marketing/campaigns"},
      { title: "Coupons & Offers", url: "/store/marketing/coupons" },
      { title: "Abandoned Carts", url: "/store/marketing/abandoned" },
    ],
  },
  {
    title: "Customers",
    icon: Users,
    url: "/store/customers",
  },
  {
    title: "Analytics",
    icon: FileText,
    url: "/store/analytics",
  },
  {
    title: "Integrations",
    icon: Plug,
    url: "/store/integrations",
  },
  {
    title: "Compliance & Trust",
    icon: Shield,
    url: "/store/compliance",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/store/settings",
  },
  {
    title: "Help & Support",
    icon: HelpCircle,
    url: "/store/help",
  },
  {
    title: "Inventory & Stock Control",
    icon: Warehouse,
    url: "/inventory",
  },
];

/* =======================
   STORE SIDEBAR COMPONENT
======================= */

export function StoreSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const hasActiveSubItem = (subItems?: { url: string }[]) =>
    subItems?.some((item) => location.pathname.startsWith(item.url));

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-2xl font-bold mb-6">
            <a href="/" className="flex items-center gap-1 text-primary">
              Pharm<span className="text-cyan-400">Eco</span>
            </a>
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
                          className={`justify-between ${
                            hasActiveSubItem(item.subItems)
                              ? "bg-muted"
                              : ""
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <item.icon className="h-4 w-4" />
                            {open && <span>{item.title}</span>}
                            
                          </div>
                          {open && (
                            <ChevronDown
                              className={`h-4 w-4 transition-transform ${
                                openMenus.includes(item.title)
                                  ? "rotate-180"
                                  : ""
                              }`}
                            />
                          )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>

                      {open && (
                        <CollapsibleContent>
                          <SidebarMenuSub className="ml-4 pl-3 border-l border-border">
                            {item.subItems.map((sub) => (
                              <NavLink key={sub.url} to={sub.url}>
                                <SidebarMenuSubItem className="flex justify-between">
                                  {sub.title} {sub.icon && sub.icon }
                                </SidebarMenuSubItem>
                              </NavLink>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      )}
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url}>
                        <item.icon className="h-4 w-4" />
                        {open && <span>{item.title} </span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>

          <SidebarFooter />
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
