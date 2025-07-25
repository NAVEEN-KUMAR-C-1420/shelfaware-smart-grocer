import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  Plus,
  Scan,
  AlertTriangle,
  CheckCircle,
  Clock,
  Trash2,
  Bell,
  Calendar,
  Package
} from "lucide-react";
import { cn } from "@/lib/utils";

interface GroceryItem {
  id: string;
  name: string;
  brand: string;
  purchaseDate: string;
  expiryDate: string;
  status: 'fresh' | 'near-expiry' | 'expired';
  daysUntilExpiry: number;
}

const Cart = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<GroceryItem[]>([
    {
      id: '1',
      name: 'Organic Milk',
      brand: 'Fresh Valley',
      purchaseDate: '2024-01-20',
      expiryDate: '2024-01-27',
      status: 'near-expiry',
      daysUntilExpiry: 2
    },
    {
      id: '2',
      name: 'Whole Wheat Bread',
      brand: 'Baker\'s Choice',
      purchaseDate: '2024-01-18',
      expiryDate: '2024-01-25',
      status: 'expired',
      daysUntilExpiry: -1
    },
    {
      id: '3',
      name: 'Greek Yogurt',
      brand: 'Creamy Delights',
      purchaseDate: '2024-01-22',
      expiryDate: '2024-02-05',
      status: 'fresh',
      daysUntilExpiry: 10
    },
    {
      id: '4',
      name: 'Fresh Spinach',
      brand: 'Green Garden',
      purchaseDate: '2024-01-23',
      expiryDate: '2024-01-28',
      status: 'near-expiry',
      daysUntilExpiry: 3
    },
    {
      id: '5',
      name: 'Chicken Breast',
      brand: 'Farm Fresh',
      purchaseDate: '2024-01-21',
      expiryDate: '2024-02-10',
      status: 'fresh',
      daysUntilExpiry: 15
    }
  ]);

  const [newItem, setNewItem] = useState({
    name: '',
    brand: '',
    purchaseDate: '',
    expiryDate: ''
  });

  const [notifications] = useState([
    {
      id: '1',
      message: 'Whole Wheat Bread has expired!',
      type: 'expired',
      time: '2 hours ago'
    },
    {
      id: '2',
      message: 'Organic Milk expires in 2 days',
      type: 'warning',
      time: '1 day ago'
    },
    {
      id: '3',
      message: 'Fresh Spinach expires in 3 days',
      type: 'warning',
      time: '1 day ago'
    }
  ]);

  const calculateStatus = (expiryDate: string): { status: 'fresh' | 'near-expiry' | 'expired', daysUntilExpiry: number } => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { status: 'expired', daysUntilExpiry: diffDays };
    } else if (diffDays <= 3) {
      return { status: 'near-expiry', daysUntilExpiry: diffDays };
    } else {
      return { status: 'fresh', daysUntilExpiry: diffDays };
    }
  };

  const getStatusInfo = (status: string, daysUntilExpiry: number) => {
    switch (status) {
      case 'fresh':
        return {
          icon: CheckCircle,
          color: 'text-success',
          bgColor: 'bg-success/10',
          borderColor: 'border-success/20',
          label: 'Fresh',
          emoji: '✅',
          description: `${daysUntilExpiry} days remaining`
        };
      case 'near-expiry':
        return {
          icon: Clock,
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/20',
          label: 'Near Expiry',
          emoji: '⚠️',
          description: daysUntilExpiry === 0 ? 'Expires today' : `${daysUntilExpiry} days remaining`
        };
      case 'expired':
        return {
          icon: AlertTriangle,
          color: 'text-destructive',
          bgColor: 'bg-destructive/10',
          borderColor: 'border-destructive/20',
          label: 'Expired',
          emoji: '❌',
          description: `Expired ${Math.abs(daysUntilExpiry)} day${Math.abs(daysUntilExpiry) !== 1 ? 's' : ''} ago`
        };
      default:
        return {
          icon: Package,
          color: 'text-muted-foreground',
          bgColor: 'bg-muted/10',
          borderColor: 'border-muted/20',
          label: 'Unknown',
          emoji: '📦',
          description: 'Status unknown'
        };
    }
  };

  const handleAddItem = () => {
    if (!newItem.name || !newItem.brand || !newItem.purchaseDate || !newItem.expiryDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to add an item.",
        variant: "destructive"
      });
      return;
    }

    const { status, daysUntilExpiry } = calculateStatus(newItem.expiryDate);
    
    const item: GroceryItem = {
      id: Date.now().toString(),
      ...newItem,
      status,
      daysUntilExpiry
    };

    setItems([...items, item]);
    setNewItem({ name: '', brand: '', purchaseDate: '', expiryDate: '' });
    
    toast({
      title: "Item Added Successfully",
      description: `${newItem.name} has been added to your inventory.`,
    });
  };

  const handleScanItem = () => {
    toast({
      title: "OCR Scanner",
      description: "OCR scanning feature will be available soon!",
    });
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    toast({
      title: "Item Removed",
      description: "Item has been removed from your inventory.",
    });
  };

  const statusCounts = {
    fresh: items.filter(item => item.status === 'fresh').length,
    nearExpiry: items.filter(item => item.status === 'near-expiry').length,
    expired: items.filter(item => item.status === 'expired').length
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Track Your Groceries</h1>
          <p className="text-muted-foreground">Add items to your inventory and monitor their freshness</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Add Items */}
          <div className="lg:col-span-1">
            {/* Add Item Form */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add New Item
                </CardTitle>
                <CardDescription>
                  Manually enter grocery item details or scan labels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Item Name</Label>
                  <Input
                    id="name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    placeholder="e.g., Organic Milk"
                  />
                </div>
                <div>
                  <Label htmlFor="brand">Brand</Label>
                  <Input
                    id="brand"
                    value={newItem.brand}
                    onChange={(e) => setNewItem({ ...newItem, brand: e.target.value })}
                    placeholder="e.g., Fresh Valley"
                  />
                </div>
                <div>
                  <Label htmlFor="purchaseDate">Purchase Date</Label>
                  <Input
                    id="purchaseDate"
                    type="date"
                    value={newItem.purchaseDate}
                    onChange={(e) => setNewItem({ ...newItem, purchaseDate: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={newItem.expiryDate}
                    onChange={(e) => setNewItem({ ...newItem, expiryDate: e.target.value })}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={handleAddItem} className="flex-1" variant="fresh">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                  <Button onClick={handleScanItem} variant="tech" size="icon">
                    <Scan className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Notification Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications
                </CardTitle>
                <CardDescription>
                  Recent alerts about your items
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div key={notification.id} className={cn(
                      "p-3 rounded-lg border",
                      notification.type === 'expired' ? 'bg-destructive/10 border-destructive/20' : 'bg-warning/10 border-warning/20'
                    )}>
                      <div className="flex items-start gap-2">
                        {notification.type === 'expired' ? (
                          <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
                        ) : (
                          <Clock className="h-4 w-4 text-warning mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm font-medium">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Items List */}
          <div className="lg:col-span-2">
            {/* Status Overview */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-success">{statusCounts.fresh}</div>
                  <p className="text-sm text-muted-foreground">Fresh Items ✅</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-warning">{statusCounts.nearExpiry}</div>
                  <p className="text-sm text-muted-foreground">Near Expiry ⚠️</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-destructive">{statusCounts.expired}</div>
                  <p className="text-sm text-muted-foreground">Expired ❌</p>
                </CardContent>
              </Card>
            </div>

            {/* Items List */}
            <Card>
              <CardHeader>
                <CardTitle>Your Grocery Inventory</CardTitle>
                <CardDescription>
                  {items.length} items total • Color-coded by freshness status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.length === 0 ? (
                    <div className="text-center py-8">
                      <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No items in your inventory yet</p>
                      <p className="text-sm text-muted-foreground">Add your first grocery item to get started</p>
                    </div>
                  ) : (
                    items.map((item) => {
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
                            <div className="flex items-center gap-3">
                              <div className={cn("p-2 rounded-full", statusInfo.bgColor)}>
                                <StatusIcon className={cn("h-5 w-5", statusInfo.color)} />
                              </div>
                              <div>
                                <h3 className="font-semibold text-foreground">{item.name}</h3>
                                <p className="text-sm text-muted-foreground">{item.brand}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-right">
                                <Badge variant="outline" className={cn("mb-1", statusInfo.color)}>
                                  {statusInfo.emoji} {statusInfo.label}
                                </Badge>
                                <p className="text-xs text-muted-foreground">{statusInfo.description}</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeItem(item.id)}
                                className="hover:bg-destructive/10 hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <Separator className="my-3" />
                          
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Purchased: {new Date(item.purchaseDate).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Expires: {new Date(item.expiryDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;