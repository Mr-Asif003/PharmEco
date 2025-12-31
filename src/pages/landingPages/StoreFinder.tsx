import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Phone, Clock, Star, Navigation as NavigationIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Mock store data
const mockStores = [
  {
    id: 1,
    name: "MediCare Plus Pharmacy",
    region: "New York",
    address: "123 Medical Center Dr, New York, NY 10001",
    phone: "+1 (555) 123-4567",
    rating: 4.8,
    isOpen: true,
    is24x7: true,
    distance: "0.5 km",
  },
  {
    id: 2,
    name: "HealthFirst Medical Store",
    region: "New York",
    address: "456 Broadway Ave, New York, NY 10002",
    phone: "+1 (555) 234-5678",
    rating: 4.6,
    isOpen: true,
    is24x7: false,
    distance: "1.2 km",
  },
  {
    id: 3,
    name: "City Wellness Pharmacy",
    region: "Los Angeles",
    address: "789 Sunset Blvd, Los Angeles, CA 90028",
    phone: "+1 (555) 345-6789",
    rating: 4.9,
    isOpen: true,
    is24x7: true,
    distance: "2.1 km",
  },
  {
    id: 4,
    name: "Quick Meds Pharmacy",
    region: "Los Angeles",
    address: "321 Hollywood Rd, Los Angeles, CA 90027",
    phone: "+1 (555) 456-7890",
    rating: 4.5,
    isOpen: false,
    is24x7: false,
    distance: "3.5 km",
  },
  {
    id: 5,
    name: "Green Cross Pharmacy",
    region: "Chicago",
    address: "567 Michigan Ave, Chicago, IL 60611",
    phone: "+1 (555) 567-8901",
    rating: 4.7,
    isOpen: true,
    is24x7: false,
    distance: "1.8 km",
  },
];

const StoreFinder = () => {
  const [region, setRegion] = useState("");
  const [storeName, setStoreName] = useState("");
  const [filteredStores, setFilteredStores] = useState(mockStores);

  const handleSearch = () => {
    const filtered = mockStores.filter((store) => {
      const matchesRegion = region === "" || store.region.toLowerCase().includes(region.toLowerCase());
      const matchesName = storeName === "" || store.name.toLowerCase().includes(storeName.toLowerCase());
      return matchesRegion && matchesName;
    });
    setFilteredStores(filtered);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Find Medical Stores Near You
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Search for pharmacies and medical stores by region and name
            </p>
          </motion.div>

          {/* Search Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <Card className="glass-effect">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Enter region (e.g., New York)"
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Enter store name"
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button onClick={handleSearch} className="w-full" variant="patient">
                  <Search className="mr-2 h-5 w-5" />
                  Search Stores
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results */}
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">
                Found {filteredStores.length} {filteredStores.length === 1 ? "Store" : "Stores"}
              </h2>
              <p className="text-muted-foreground">
                {region && storeName
                  ? `Showing results for "${storeName}" in "${region}"`
                  : region
                  ? `Showing results in "${region}"`
                  : storeName
                  ? `Showing results for "${storeName}"`
                  : "Showing all stores"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredStores.map((store, index) => (
                <motion.div
                  key={store.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="glass-effect hover-scale h-full">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <CardTitle className="text-xl mb-1">{store.name}</CardTitle>
                          <CardDescription className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {store.region}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{store.rating}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {store.is24x7 && (
                          <Badge variant="secondary" className="bg-patient/10 text-patient">
                            24x7
                          </Badge>
                        )}
                        {store.isOpen ? (
                          <Badge variant="secondary" className="bg-green-500/10 text-green-600 dark:text-green-400">
                            Open Now
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-red-500/10 text-red-600 dark:text-red-400">
                            Closed
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start gap-2 text-sm">
                        <NavigationIcon className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                        <span>{store.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{store.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{store.distance} away</span>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button variant="patient" className="flex-1">
                          View Store
                        </Button>
                        <Button variant="outline" className="flex-1">
                          Get Directions
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredStores.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Search className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No stores found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StoreFinder;
