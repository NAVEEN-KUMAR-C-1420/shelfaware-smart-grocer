import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  BarChart3,
  TrendingDown,
  TrendingUp,
  Package,
  Archive,
  Trash2,
  Filter,
  DollarSign,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

interface GroceryItem {
  id: string;
  name: string;
  brand: string;
  purchaseDate: string;
  expiryDate: string;
  status: 'fresh' | 'near-expiry' | 'expired' | 'archived';
  daysUntilExpiry: number;
  category: string;
  price: number;
}

const Dashboard = () => {
  const { toast } = useToast();
  const [sortBy, setSortBy] = useState("expiryDate");
  const [filterBy, setFilterBy] = useState("all");
  
  const [items, setItems] = useState<GroceryItem[]>([
    {
      id: '1',
      name: 'Organic Milk',
      brand: 'Fresh Valley',
      purchaseDate: '2024-01-20',
      expiryDate: '2024-01-27',
      status: 'near-expiry',
      daysUntilExpiry: 2,
      category: 'Dairy',
      price: 4.99
    },
    {
      id: '2',
      name: 'Whole Wheat Bread',
      brand: 'Baker\'s Choice',
      purchaseDate: '2024-01-18',
      expiryDate: '2024-01-25',
      status: 'expired',
      daysUntilExpiry: -1,
      category: 'Bakery',
      price: 3.49
    },
    {
      id: '3',
      name: 'Greek Yogurt',
      brand: 'Creamy Delights',
      purchaseDate: '2024-01-22',
      expiryDate: '2024-02-05',
      status: 'fresh',
      daysUntilExpiry: 10,
      category: 'Dairy',
      price: 5.99
    },
    {
      id: '4',
      name: 'Fresh Spinach',
      brand: 'Green Garden',
      purchaseDate: '2024-01-23',
      expiryDate: '2024-01-28',
      status: 'near-expiry',
      daysUntilExpiry: 3,
      category: 'Vegetables',
      price: 2.99
    },
    {
      id: '5',
      name: 'Chicken Breast',
      brand: 'Farm Fresh',
      purchaseDate: '2024-01-21',
      expiryDate: '2024-02-10',
      status: 'fresh',
      daysUntilExpiry: 15,
      category: 'Meat',
      price: 12.99
    },
    {
      id: '6',
      name: 'Expired Tomatoes',
      brand: 'Garden Fresh',
      purchaseDate: '2024-01-15',
      expiryDate: '2024-01-22',
      status: 'archived',
      daysUntilExpiry: -3,
      category: 'Vegetables',
      price: 4.49
    }
  ]);

  const getStatusInfo = (status: string, daysUntilExpiry: number) => {
    switch (status) {
      case 'fresh':
        return {
          icon: CheckCircle,
          color: 'text-success',
          bgColor: 'bg-success/10',
          borderColor: 'border-success/20',
          label: 'Fresh',
          emoji: '✅'
        };
      case 'near-expiry':
        return {
          icon: Clock,
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/20',
          label: 'Near Expiry',
          emoji: '⚠️'
        };
      case 'expired':
        return {
          icon: AlertTriangle,
          color: 'text-destructive',
          bgColor: 'bg-destructive/10',
          borderColor: 'border-destructive/20',
          label: 'Expired',
          emoji: '❌'
        };
      case 'archived':
        return {
          icon: Archive,
          color: 'text-muted-foreground',
          bgColor: 'bg-muted/10',
          borderColor: 'border-muted/20',
          label: 'Archived',
          emoji: '📦'
        };
      default:
        return {
          icon: Package,
          color: 'text-muted-foreground',
          bgColor: 'bg-muted/10',
          borderColor: 'border-muted/20',
          label: 'Unknown',
          emoji: '❓'
        };
    }
  };

  const archiveItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, status: 'archived' as const } : item
    ));
    toast({
      title: "Item Archived",
      description: "Item has been moved to archived items.",
    });
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    toast({
      title: "Item Deleted",
      description: "Item has been permanently deleted.",
      variant: "destructive"
    });
  };

  const restoreItem = (id: string) => {
    const item = items.find(i => i.id === id);
    if (item) {
      const today = new Date();
      const expiry = new Date(item.expiryDate);
      const diffTime = expiry.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      let newStatus: 'fresh' | 'near-expiry' | 'expired' = 'fresh';
      if (diffDays < 0) newStatus = 'expired';
      else if (diffDays <= 3) newStatus = 'near-expiry';
      
      setItems(items.map(item => 
        item.id === id ? { ...item, status: newStatus, daysUntilExpiry: diffDays } : item
      ));
      toast({
        title: "Item Restored",
        description: "Item has been restored to active inventory.",
      });
    }
  };

  const filteredItems = items.filter(item => {
    if (filterBy === 'all') return true;
    return item.status === filterBy;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'expiryDate':
        return new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime();
      case 'name':
        return a.name.localeCompare(b.name);
      case 'category':
        return a.category.localeCompare(b.category);
      case 'status':
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  const activeItems = items.filter(item => item.status !== 'archived');
  const archivedItems = items.filter(item => item.status === 'archived');
  
  const stats = {
    total: activeItems.length,
    fresh: activeItems.filter(item => item.status === 'fresh').length,
    nearExpiry: activeItems.filter(item => item.status === 'near-expiry').length,
    expired: activeItems.filter(item => item.status === 'expired').length,
    archived: archivedItems.length,
    totalValue: activeItems.reduce((sum, item) => sum + item.price, 0),
    expiredValue: activeItems.filter(item => item.status === 'expired').reduce((sum, item) => sum + item.price, 0)
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your grocery inventory and consumption patterns</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Items</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <Package className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Fresh</p>
                  <p className="text-2xl font-bold text-success">{stats.fresh}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Near Expiry</p>
                  <p className="text-2xl font-bold text-warning">{stats.nearExpiry}</p>
                </div>
                <Clock className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Expired</p>
                  <p className="text-2xl font-bold text-destructive">{stats.expired}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                  <p className="text-2xl font-bold text-primary">${stats.totalValue.toFixed(2)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Waste Value</p>
                  <p className="text-2xl font-bold text-destructive">${stats.expiredValue.toFixed(2)}</p>
                </div>
                <TrendingDown className="h-8 w-8 text-destructive" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active">Active Items ({stats.total})</TabsTrigger>
            <TabsTrigger value="archived">Archived Items ({stats.archived})</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            {/* Filters and Sorting */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <Select value={filterBy} onValueChange={setFilterBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Items</SelectItem>
                      <SelectItem value="fresh">Fresh Only</SelectItem>
                      <SelectItem value="near-expiry">Near Expiry</SelectItem>
                      <SelectItem value="expired">Expired Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="expiryDate">Expiry Date</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="category">Category</SelectItem>
                    <SelectItem value="status">Status</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Items List */}
            <Card>
              <CardHeader>
                <CardTitle>Active Inventory</CardTitle>
                <CardDescription>
                  {sortedItems.length} items • Sorted by {sortBy.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sortedItems.length === 0 ? (
                    <div className="text-center py-8">
                      <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No items match your current filter</p>
                    </div>
                  ) : (
                    sortedItems.map((item) => {
                      const statusInfo = getStatusInfo(item.status, item.daysUntilExpiry);
                      const StatusIcon = statusInfo.icon;

                      return (
                        <div
                          key={item.id}
                          className={cn(
                            "p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-lg",
                            statusInfo.bgColor,
                            statusInfo.borderColor
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className={cn("p-2 rounded-full", statusInfo.bgColor)}>
                                <StatusIcon className={cn("h-5 w-5", statusInfo.color)} />
                              </div>
                              <div>
                                <h3 className="font-semibold text-foreground">{item.name}</h3>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  <span>{item.brand}</span>
                                  <span>•</span>
                                  <span>{item.category}</span>
                                  <span>•</span>
                                  <span>${item.price}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-right">
                                <Badge variant="outline" className={cn("mb-1", statusInfo.color)}>
                                  {statusInfo.emoji} {statusInfo.label}
                                </Badge>
                                <p className="text-xs text-muted-foreground">
                                  Expires: {new Date(item.expiryDate).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => archiveItem(item.id)}
                                  className="hover:bg-muted"
                                >
                                  <Archive className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => deleteItem(item.id)}
                                  className="hover:bg-destructive/10 hover:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="archived" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Archived Items</CardTitle>
                <CardDescription>
                  Items that have been archived or removed from active inventory
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {archivedItems.length === 0 ? (
                    <div className="text-center py-8">
                      <Archive className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No archived items</p>
                      <p className="text-sm text-muted-foreground">Items you archive will appear here</p>
                    </div>
                  ) : (
                    archivedItems.map((item) => {
                      const statusInfo = getStatusInfo(item.status, item.daysUntilExpiry);
                      const StatusIcon = statusInfo.icon;

                      return (
                        <div
                          key={item.id}
                          className="p-4 rounded-lg border-2 bg-muted/10 border-muted/20"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="p-2 rounded-full bg-muted/20">
                                <StatusIcon className="h-5 w-5 text-muted-foreground" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-foreground">{item.name}</h3>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  <span>{item.brand}</span>
                                  <span>•</span>
                                  <span>{item.category}</span>
                                  <span>•</span>
                                  <span>${item.price}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-right">
                                <Badge variant="outline" className="mb-1 text-muted-foreground">
                                  📦 Archived
                                </Badge>
                                <p className="text-xs text-muted-foreground">
                                  Expired: {new Date(item.expiryDate).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => restoreItem(item.id)}
                                  className="hover:bg-primary/10 hover:text-primary"
                                >
                                  Restore
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => deleteItem(item.id)}
                                  className="hover:bg-destructive/10 hover:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;