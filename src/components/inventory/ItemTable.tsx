import { useState } from "react";
import { motion } from "framer-motion";
import { Edit, Trash2, Copy, MoreVertical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface ItemTableProps {
  searchQuery: string;
  selectedItems: string[];
  setSelectedItems: (items: string[]) => void;
}

const mockItems = [
  {
    id: "1",
    name: "Paracetamol 500mg",
    sku: "MED-001",
    barcode: "8901234567890",
    stock: 500,
    purchasePrice: 2.5,
    sellingPrice: 5.0,
    margin: 100,
    expiryDate: "2025-12-31",
    category: "Tablets",
    status: "In Stock",
  },
  {
    id: "2",
    name: "Amoxicillin 250mg",
    sku: "MED-002",
    barcode: "8901234567891",
    stock: 15,
    purchasePrice: 10.0,
    sellingPrice: 18.0,
    margin: 80,
    expiryDate: "2024-11-30",
    category: "Capsules",
    status: "Low",
  },
  {
    id: "3",
    name: "Cough Syrup 100ml",
    sku: "MED-003",
    barcode: "8901234567892",
    stock: 0,
    purchasePrice: 45.0,
    sellingPrice: 75.0,
    margin: 66.7,
    expiryDate: "2025-06-30",
    category: "Syrups",
    status: "Out",
  },
  {
    id: "4",
    name: "Insulin Injection 10ml",
    sku: "MED-004",
    barcode: "8901234567893",
    stock: 80,
    purchasePrice: 150.0,
    sellingPrice: 220.0,
    margin: 46.7,
    expiryDate: "2024-10-15",
    category: "Injections",
    status: "In Stock",
  },
];

const ItemTable = ({ searchQuery, selectedItems, setSelectedItems }: ItemTableProps) => {
  const [items] = useState(mockItems);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.barcode.includes(searchQuery)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "default";
      case "Low":
        return "secondary";
      case "Out":
        return "destructive";
      default:
        return "default";
    }
  };

  const isExpiringSoon = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry < 30;
  };

  const handleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems.map((item) => item.id));
    }
  };

  const handleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Item Inventory ({filteredItems.length})</span>
          <Badge variant="secondary">{selectedItems.length} selected</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Item Name</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Purchase</TableHead>
                <TableHead>Selling</TableHead>
                <TableHead>Margin %</TableHead>
                <TableHead>Expiry</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item, index) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group hover:bg-muted/50 transition-colors"
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={() => handleSelectItem(item.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="text-muted-foreground">{item.sku}</TableCell>
                  <TableCell>
                    <span className={item.stock < 20 ? "text-destructive font-semibold" : ""}>
                      {item.stock}
                    </span>
                  </TableCell>
                  <TableCell>${item.purchasePrice.toFixed(2)}</TableCell>
                  <TableCell>${item.sellingPrice.toFixed(2)}</TableCell>
                  <TableCell>{item.margin.toFixed(1)}%</TableCell>
                  <TableCell>
                    <span className={isExpiringSoon(item.expiryDate) ? "text-destructive font-semibold" : ""}>
                      {item.expiryDate}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => toast.info("Edit item: " + item.name)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast.info("Duplicate item: " + item.name)}>
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => toast.error("Delete item: " + item.name)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemTable;
