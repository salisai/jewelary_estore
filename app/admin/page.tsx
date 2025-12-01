'use client';

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, Tooltip, CartesianGrid, XAxis } from "recharts";
import { useStore } from "@/context/StoreContext";
import { ProductCategory, type Product } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const AdminPage = () => {
  const router = useRouter();
  const { user, products, orders, addProduct, deleteProduct, uploadImage } = useStore();
  const [isSaving, setIsSaving] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "catalog" | "orders">("overview");
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    price: 0,
    category: ProductCategory.RINGS,
    description: "",
    image: null,
    stock: 0
  });

  useEffect(() => {
    if (user && !user.isAdmin) {
      router.replace("/");
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="text-lg">Please sign in as an administrator to view the dashboard.</p>
        <Button onClick={() => router.push("/auth")}>Go to Auth</Button>
      </div>
    );
  }

  if (!user.isAdmin) {
    return null;
  }

  const revenue = orders.reduce((acc, order) => acc + order.total, 0);
  const pendingOrders = orders.filter((order) => order.status === "pending").length;
  const topProducts = [...products]
    .sort((a, b) => b.stock - a.stock)
    .slice(0, 5);

  const salesTrend = useMemo(() => {
    const map = new Map<string, number>();
    orders.forEach((order) => {
      const date = new Date(order.date).toLocaleDateString(undefined, { month: "short", day: "numeric" });
      map.set(date, (map.get(date) || 0) + order.total);
    });
    return Array.from(map.entries()).map(([name, total]) => ({ name, total }));
  }, [orders]);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a product image");
      return;
    }

    setIsSaving(true);
    try {
      const imageUrl = await uploadImage(file);
      await addProduct({ ...newProduct, image: imageUrl });
      setNewProduct({
        name: "",
        price: 0,
        category: ProductCategory.RINGS,
        description: "",
        image: null,
        stock: 0
      });
      setFile(null);
    } catch (error) {
      console.error(error);
      alert("Failed to add product");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Control center</p>
          <h1 className="text-3xl font-serif">Admin Dashboard</h1>
        </div>
        <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as typeof activeTab)}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="catalog">Catalog</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {activeTab === "overview" && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardDescription>Revenue</CardDescription>
                <CardTitle>${revenue.toFixed(2)}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-gray-500">Across {orders.length} orders</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardDescription>Active SKUs</CardDescription>
                <CardTitle>{products.length}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-gray-500">Maintained in Supabase</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardDescription>Pending Orders</CardDescription>
                <CardTitle>{pendingOrders}</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={(pendingOrders / Math.max(1, orders.length)) * 100} />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Sales trend</CardTitle>
              <CardDescription>Seven day revenue view</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              {salesTrend.length === 0 ? (
                <div className="h-full flex items-center justify-center text-gray-500">No sales data yet.</div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={salesTrend}>
                    <defs>
                      <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0a0a0a" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#0a0a0a" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <Tooltip />
                    <Area type="monotone" dataKey="total" stroke="#0a0a0a" fillOpacity={1} fill="url(#colorTotal)" />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Inventory</CardTitle>
              <CardDescription>Fast moving products by stock</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Category</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{product.category}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "catalog" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:sticky lg:top-24 h-fit">
            <CardHeader>
              <CardTitle>Add product</CardTitle>
              <CardDescription>Upload assets, pricing and inventory.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleAddProduct}>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      value={newProduct.price || ""}
                      onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={newProduct.stock || ""}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    className="w-full border border-gray-300 p-2 text-sm"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value as ProductCategory })}
                  >
                    {Object.values(ProductCategory).map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Product image</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const chosen = e.target.files?.[0];
                      if (chosen) setFile(chosen);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSaving}>
                  {isSaving ? "Saving..." : "Add Product"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Catalog</CardTitle>
              <CardDescription>Products synced with Supabase</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img src={product.image as string} alt={product.name} className="h-12 w-12 object-cover" />
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-xs text-gray-500">{product.category}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>${product.price}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => deleteProduct(product.id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "orders" && (
        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>Live feed from Supabase</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-gray-500">
                      No orders found.
                    </TableCell>
                  </TableRow>
                )}
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono text-xs">#{order.id}</TableCell>
                    <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                    <TableCell>${order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant={order.status === "paid" ? "success" : "secondary"}>{order.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminPage;

