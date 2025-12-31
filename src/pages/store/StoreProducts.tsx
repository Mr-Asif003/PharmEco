import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package, Search, Filter, RefreshCw, Eye, EyeOff, 
  Image, Tag, Globe, ArrowUpDown, MoreHorizontal,
  Check, X, Pencil, ExternalLink, Link2, TrendingUp,
  DollarSign, Percent, Camera, FileText, ChevronDown
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Product {
  id: string;
  name: string;
  brand: string;
  sku: string;
  category: string;
  basePrice: number;
  onlinePrice: number;
  discount: number;
  stock: number;
  visible: boolean;
  onlineOnly: boolean;
  images: number;
  seoScore: number;
  lastSynced: string;
}

const mockProducts: Product[] = [
  { id: "1", name: "Paracetamol 500mg", brand: "Calpol", sku: "MED001", category: "Pain Relief", basePrice: 45, onlinePrice: 42, discount: 7, stock: 150, visible: true, onlineOnly: false, images: 3, seoScore: 85, lastSynced: "2 min ago" },
  { id: "2", name: "Vitamin D3 1000IU", brand: "HealthVit", sku: "VIT002", category: "Vitamins", basePrice: 299, onlinePrice: 269, discount: 10, stock: 85, visible: true, onlineOnly: false, images: 2, seoScore: 72, lastSynced: "5 min ago" },
  { id: "3", name: "Digital Thermometer", brand: "Dr. Morepen", sku: "DEV003", category: "Devices", basePrice: 199, onlinePrice: 179, discount: 10, stock: 42, visible: true, onlineOnly: true, images: 4, seoScore: 90, lastSynced: "1 min ago" },
  { id: "4", name: "Hand Sanitizer 500ml", brand: "Dettol", sku: "HYG004", category: "Hygiene", basePrice: 175, onlinePrice: 175, discount: 0, stock: 200, visible: false, onlineOnly: false, images: 1, seoScore: 45, lastSynced: "10 min ago" },
  { id: "5", name: "Blood Pressure Monitor", brand: "Omron", sku: "DEV005", category: "Devices", basePrice: 1899, onlinePrice: 1699, discount: 11, stock: 18, visible: true, onlineOnly: true, images: 5, seoScore: 88, lastSynced: "3 min ago" },
  { id: "6", name: "Omega-3 Fish Oil", brand: "Naturemade", sku: "SUP006", category: "Supplements", basePrice: 599, onlinePrice: 549, discount: 8, stock: 65, visible: true, onlineOnly: false, images: 2, seoScore: 68, lastSynced: "7 min ago" },
  { id: "7", name: "Antiseptic Cream", brand: "Boroline", sku: "SKN007", category: "Skin Care", basePrice: 85, onlinePrice: 85, discount: 0, stock: 0, visible: false, onlineOnly: false, images: 1, seoScore: 52, lastSynced: "15 min ago" },
  { id: "8", name: "Glucose Strips (50)", brand: "Accu-Chek", sku: "DIA008", category: "Diabetes", basePrice: 899, onlinePrice: 849, discount: 6, stock: 35, visible: true, onlineOnly: false, images: 2, seoScore: 78, lastSynced: "4 min ago" },
];

const StoreProducts = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [seoDialogOpen, setSeoDialogOpen] = useState(false);
  const [selectedSeoProduct, setSelectedSeoProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "visible") return matchesSearch && product.visible;
    if (activeTab === "hidden") return matchesSearch && !product.visible;
    if (activeTab === "online-only") return matchesSearch && product.onlineOnly;
    if (activeTab === "out-of-stock") return matchesSearch && product.stock === 0;
    return matchesSearch;
  });

  const toggleVisibility = (id: string) => {
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, visible: !p.visible } : p
    ));
  };

  const toggleOnlineOnly = (id: string) => {
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, onlineOnly: !p.onlineOnly } : p
    ));
  };

  const toggleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id));
    }
  };

  const getSeoScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-500/10";
    if (score >= 60) return "text-yellow-600 bg-yellow-500/10";
    return "text-red-600 bg-red-500/10";
  };

  const stats = {
    total: products.length,
    visible: products.filter(p => p.visible).length,
    onlineOnly: products.filter(p => p.onlineOnly).length,
    outOfStock: products.filter(p => p.stock === 0).length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur"
      >
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                <Package className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Products (Synced View)</h1>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Link2 className="h-3 w-3" />
                  Stock synced from Inventory module
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Sync Now
              </Button>
              <Button size="sm" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                View Live Store
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            {[
              { label: "Total Products", value: stats.total, icon: Package, color: "text-blue-500 bg-blue-500/10" },
              { label: "Visible Online", value: stats.visible, icon: Eye, color: "text-green-500 bg-green-500/10" },
              { label: "Online Only", value: stats.onlineOnly, icon: Globe, color: "text-purple-500 bg-purple-500/10" },
              { label: "Out of Stock", value: stats.outOfStock, icon: X, color: "text-red-500 bg-red-500/10" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -2 }}
                className="p-4 rounded-xl border bg-card"
              >
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Search & Filters */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products by name or SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="pain-relief">Pain Relief</SelectItem>
                <SelectItem value="vitamins">Vitamins</SelectItem>
                <SelectItem value="devices">Devices</SelectItem>
                <SelectItem value="hygiene">Hygiene</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all" className="gap-2">
              All Products
              <Badge variant="secondary" className="text-xs">{products.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="visible" className="gap-2">
              <Eye className="h-3 w-3" />
              Visible
              <Badge variant="secondary" className="text-xs">{stats.visible}</Badge>
            </TabsTrigger>
            <TabsTrigger value="hidden" className="gap-2">
              <EyeOff className="h-3 w-3" />
              Hidden
              <Badge variant="secondary" className="text-xs">{products.length - stats.visible}</Badge>
            </TabsTrigger>
            <TabsTrigger value="online-only" className="gap-2">
              <Globe className="h-3 w-3" />
              Online Only
              <Badge variant="secondary" className="text-xs">{stats.onlineOnly}</Badge>
            </TabsTrigger>
            <TabsTrigger value="out-of-stock" className="gap-2">
              Out of Stock
              <Badge variant="secondary" className="text-xs">{stats.outOfStock}</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="m-0">
            {/* Bulk Actions */}
            <AnimatePresence>
              {selectedProducts.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-4 p-3 rounded-lg bg-primary/5 border border-primary/20 flex items-center justify-between"
                >
                  <span className="text-sm font-medium">
                    {selectedProducts.length} products selected
                  </span>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Eye className="h-3 w-3" />
                      Show All
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <EyeOff className="h-3 w-3" />
                      Hide All
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Percent className="h-3 w-3" />
                      Apply Discount
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Products Table */}
            <div className="rounded-xl border bg-card overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                        onCheckedChange={toggleSelectAll}
                      />
                    </TableHead>
                    <TableHead className="min-w-[250px]">Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        Pricing
                      </div>
                    </TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        Visibility
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center gap-1">
                        <Camera className="h-3 w-3" />
                        Media
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        SEO
                      </div>
                    </TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product, index) => (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className={`group hover:bg-muted/30 transition-colors ${
                        !product.visible ? "opacity-60" : ""
                      }`}
                    >
                      <TableCell>
                        <Checkbox
                          checked={selectedProducts.includes(product.id)}
                          onCheckedChange={(checked) => {
                            setSelectedProducts(prev =>
                              checked
                                ? [...prev, product.id]
                                : prev.filter(id => id !== product.id)
                            );
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center shrink-0">
                            <Package className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{product.name}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{product.brand}</span>
                              <span>•</span>
                              <span className="font-mono">{product.sku}</span>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-xs">
                          {product.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm">₹{product.onlinePrice}</span>
                            {product.discount > 0 && (
                              <Badge className="bg-green-500 text-[10px] px-1.5">
                                -{product.discount}%
                              </Badge>
                            )}
                          </div>
                          {product.discount > 0 && (
                            <p className="text-xs text-muted-foreground line-through">
                              ₹{product.basePrice}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={`font-medium text-sm ${
                            product.stock === 0 ? "text-red-500" : 
                            product.stock < 20 ? "text-yellow-500" : "text-green-500"
                          }`}>
                            {product.stock}
                          </span>
                          <span className="text-xs text-muted-foreground">units</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground">
                          Synced {product.lastSynced}
                        </p>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={product.visible}
                              onCheckedChange={() => toggleVisibility(product.id)}
                              className="scale-75"
                            />
                            <span className="text-xs">
                              {product.visible ? "Visible" : "Hidden"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox
                              checked={product.onlineOnly}
                              onCheckedChange={() => toggleOnlineOnly(product.id)}
                              className="h-3 w-3"
                            />
                            <span className="text-[10px] text-muted-foreground">
                              Online only
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1 h-8"
                          onClick={() => setEditingProduct(product)}
                        >
                          <Image className="h-3 w-3" />
                          <span className="text-xs">{product.images}</span>
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`gap-1 h-8 ${getSeoScoreColor(product.seoScore)}`}
                          onClick={() => {
                            setSelectedSeoProduct(product);
                            setSeoDialogOpen(true);
                          }}
                        >
                          <TrendingUp className="h-3 w-3" />
                          <span className="text-xs font-medium">{product.seoScore}%</span>
                        </Button>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Pencil className="h-3 w-3 mr-2" />
                              Edit Pricing
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Image className="h-3 w-3 mr-2" />
                              Manage Gallery
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="h-3 w-3 mr-2" />
                              Edit SEO
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <ExternalLink className="h-3 w-3 mr-2" />
                              View in Store
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* SEO Dialog */}
      <Dialog open={seoDialogOpen} onOpenChange={setSeoDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              SEO & Metadata
            </DialogTitle>
            <DialogDescription>
              Optimize {selectedSeoProduct?.name} for search engines
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* SEO Score */}
            <div className="p-4 rounded-xl bg-muted/50 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">SEO Score</p>
                <p className="text-xs text-muted-foreground">Based on title, description, and keywords</p>
              </div>
              <div className={`text-3xl font-bold ${getSeoScoreColor(selectedSeoProduct?.seoScore || 0)}`}>
                {selectedSeoProduct?.seoScore}%
              </div>
            </div>

            <div className="space-y-3">
              <div className="space-y-2">
                <Label className="text-xs">Meta Title</Label>
                <Input
                  defaultValue={`${selectedSeoProduct?.name} - Buy Online | PharmEco`}
                  className="text-sm"
                />
                <p className="text-[10px] text-muted-foreground">52/60 characters</p>
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Meta Description</Label>
                <Textarea
                  defaultValue={`Buy ${selectedSeoProduct?.name} by ${selectedSeoProduct?.brand} at best prices. Fast delivery, genuine products, and great discounts.`}
                  className="text-sm resize-none"
                  rows={3}
                />
                <p className="text-[10px] text-muted-foreground">128/160 characters</p>
              </div>

              <div className="space-y-2">
                <Label className="text-xs">URL Slug</Label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">pharmeco.store/products/</span>
                  <Input
                    defaultValue={selectedSeoProduct?.name.toLowerCase().replace(/\s+/g, "-")}
                    className="text-sm font-mono flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Keywords</Label>
                <Input
                  defaultValue={`${selectedSeoProduct?.category}, ${selectedSeoProduct?.brand}, medicine, online pharmacy`}
                  className="text-sm"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setSeoDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setSeoDialogOpen(false)}>
                Save SEO Settings
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StoreProducts;
