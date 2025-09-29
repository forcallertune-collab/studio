import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { advertiserServices } from "@/lib/data";

export default function AdminServicesPage() {
    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle>Manage Services</CardTitle>
                        <CardDescription>Edit prices, limits, and availability of advertiser services.</CardDescription>
                    </div>
                    <Button>Add New Service</Button>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Service Name</TableHead>
                            <TableHead>Platform</TableHead>
                            <TableHead>Price (per 1k)</TableHead>
                            <TableHead>Min Quantity</TableHead>
                            <TableHead>Max Quantity</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {advertiserServices.map(service => (
                            <TableRow key={service.id}>
                                <TableCell className="font-medium">{service.name}</TableCell>
                                <TableCell className="capitalize">{service.platform}</TableCell>
                                <TableCell>₹{service.price.toFixed(2)}</TableCell>
                                <TableCell>{service.min.toLocaleString()}</TableCell>
                                <TableCell>{service.max.toLocaleString()}</TableCell>
                                <TableCell>
                                    <Button variant="outline" size="sm">Edit</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
