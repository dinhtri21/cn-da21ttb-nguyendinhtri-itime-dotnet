import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TabsContent } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal } from "lucide-react";

import Image from "next/image";
import { PlusIcon, MinusIcon, Cross1Icon } from "@radix-ui/react-icons";

const products = [
  {
    productId: 1,
    productName: "SMILE KID 47 mm Trẻ em SL064-01",
    price: 1000000,
    quantity: 25,
    total: 10000000,
  },
  {
    productId: 1,
    productName: "SMILE KID 47 mm Trẻ em SL064-01",
    price: 1000000,
    quantity: 25,
    total: 10000000,
  },
  {
    productId: 1,
    productName: "SMILE KID 47 mm Trẻ em SL064-01",
    price: 1000000,
    quantity: 25,
    total: 10000000,
  },
  {
    productId: 1,
    productName: "SMILE KID 47 mm Trẻ em SL064-01",
    price: 1000000,
    quantity: 25,
    total: 10000000,
  },
];

export function TableProduct() {
  return (
    <div>
      <div className="grid grid-cols-10 gap-8">
        <div className="col-span-10 md:col-span-7 grid grid-flow-row gap-1">
          <div className="hidden md:grid grid-cols-12 grid-flow-row border-b gap-2 p-3">
            <div className="col-span-1 flex  justify-center">Ảnh</div>
            <div className="col-span-4 flex  justify-center">Tên sản phẩm</div>
            <div className="col-span-2 flex  justify-center">Giá</div>
            <div className="col-span-2 flex  justify-center">Số lượng</div>
            <div className="col-span-3 flex  justify-center">Thành tiền</div>
          </div>

          {products.map((product) => (
            <div
              key={product.productId}
              className="grid grid-rows-2 grid-flow-col md:grid-cols-12 md:grid-rows-subgrid gap-2 py-3 px-1 md:p-3 border-b relative"
            >
              <div
                className="absolute top-2 left-0 md:top-[50%] md:translate-y-[-50%] md:left-[97%] dark:bg-slate-800 bg-slate-200 rounded-full p-[5px]
               hover:bg-slate-400 hover:text-white cursor-pointer dark:hover:bg-slate-600"
              >
                <Cross1Icon width={10} height={10} />
              </div>
              <div className="row-span-2 md:col-span-1  overflow-hidden">
                <img
                  className="rounded-md"
                  src="https://dummyimage.com/100x100"
                />
                {/* <Image
                  src={"https://dummyimage.com/100x100"}
                  width={100}
                  height={100}
                  className="object-cover"
                  alt="Picture of the author"
                /> */}
              </div>
              <div className="md:col-span-4 flex md:justify-center items-center ">
                <span className="line-clamp-1">{product.productName}</span>
              </div>
              <div className="md:col-span-2 flex  md:justify-center items-center">
                {product.price}
              </div>
              <div className="md:col-span-2 flex  justify-center items-center">
                <div className="p-1 border-[0.1px] border-slate-500 rounded hover:bg-slate-200 cursor-pointer dark:hover:bg-slate-800">
                  <MinusIcon />
                </div>
                <span className="px-2">{product.quantity}</span>
                <div className="p-1 border-[0.1px] border-slate-500 rounded hover:bg-slate-200 cursor-pointer dark:hover:bg-slate-800">
                  <PlusIcon />
                </div>
              </div>
              <div className="md:col-span-3 flex  justify-center items-center">
                {product.total}
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-10 md:col-span-3 dark:bg-slate-800 rounded-md bg-slate-200 px-3 py-2 md:px-4 flex flex-col gap-3">
          <h2 className="uppercase font-semibold md:text-center  text-lg">
            Thông tin đơn hàng
          </h2>
          <div className="flex justify-between">
            <p className="font-semibold  text-lg">Tổng tiền:</p>
            <span className="text-customOrange text-lg">200000000</span>
          </div>
          <p className="">
            - Phí vận chuyển sẽ được tính ở thanh toán. <br />- Bạn cũng có thể
            nhập mã giảm giá ở trang thanh toán.
          </p>
        </div>
      </div>
    </div>
    // <TabsContent value="all">
    // <Card x-chunk="dashboard-06-chunk-0">
    //   <CardHeader>
    //     <CardTitle>Products</CardTitle>
    //     <CardDescription>
    //       Manage your products and view their sales performance.
    //     </CardDescription>
    //   </CardHeader>
    //   <CardContent>
    //     <Table>
    //       <TableHeader className="hidden md:table-header-group">
    //         <TableRow>
    //           <TableHead className="w-[100px] table-cell">
    //             <span className="sr-only">Image</span>
    //           </TableHead>
    //           <TableHead>Tên</TableHead>
    //           <TableHead>Trạng thái</TableHead>
    //           <TableHead>Giá</TableHead>
    //           <TableHead className="table-cell">Số lượng</TableHead>
    //           <TableHead className="table-cell">Thành tiền</TableHead>
    //           <TableHead>
    //             <span className="sr-only">Actions</span>
    //           </TableHead>
    //         </TableRow>
    //       </TableHeader>
    //       <TableBody>
    //         <TableRow>
    //           <TableCell className="table-cell">
    //             <Image
    //               alt="Product image"
    //               className="aspect-square rounded-md object-cover"
    //               height="64"
    //               src="/placeholder.svg"
    //               width="64"
    //             />
    //           </TableCell>
    //           <TableCell className="font-medium">
    //             {/* Laser Lemonade Machine */}
    //             Lorem ipsum dolor sit amet consectetur adipisicing elit.
    //             Doloribus obcaecati facere consectetur in nesciunt quae quaerat
    //             accusamus, deserunt esse consequatur, cupiditate voluptatibus
    //             voluptatem, soluta numquam iusto? Laborum quasi reprehenderit
    //             non?
    //           </TableCell>
    //           <TableCell>
    //             <Badge variant="outline">Draft</Badge>
    //           </TableCell>
    //           <TableCell>$499.99</TableCell>
    //           <TableCell className="table-cell">25</TableCell>
    //           <TableCell className="table-cell">2023-07-12 10:42 AM</TableCell>
    //           <TableCell>
    //             <DropdownMenu>
    //               <DropdownMenuTrigger asChild>
    //                 <Button aria-haspopup="true" size="icon" variant="ghost">
    //                   <MoreHorizontal className="h-4 w-4" />
    //                   <span className="sr-only">Toggle menu</span>
    //                 </Button>
    //               </DropdownMenuTrigger>
    //               <DropdownMenuContent align="end">
    //                 <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //                 <DropdownMenuItem>Edit</DropdownMenuItem>
    //                 <DropdownMenuItem>Delete</DropdownMenuItem>
    //               </DropdownMenuContent>
    //             </DropdownMenu>
    //           </TableCell>
    //         </TableRow>
    //         {/* <TableRow>
    //           <TableCell className="table-cell">
    //             <Image
    //               alt="Product image"
    //               className="aspect-square rounded-md object-cover"
    //               height="64"
    //               src="/placeholder.svg"
    //               width="64"
    //             />
    //           </TableCell>
    //           <TableCell className="font-medium">
    //             Hypernova Headphones
    //           </TableCell>
    //           <TableCell>
    //             <Badge variant="outline">Active</Badge>
    //           </TableCell>
    //           <TableCell>$129.99</TableCell>
    //           <TableCell className="table-cell">100</TableCell>
    //           <TableCell className="table-cell">2023-10-18 03:21 PM</TableCell>
    //           <TableCell>
    //             <DropdownMenu>
    //               <DropdownMenuTrigger asChild>
    //                 <Button aria-haspopup="true" size="icon" variant="ghost">
    //                   <MoreHorizontal className="h-4 w-4" />
    //                   <span className="sr-only">Toggle menu</span>
    //                 </Button>
    //               </DropdownMenuTrigger>
    //               <DropdownMenuContent align="end">
    //                 <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //                 <DropdownMenuItem>Edit</DropdownMenuItem>
    //                 <DropdownMenuItem>Delete</DropdownMenuItem>
    //               </DropdownMenuContent>
    //             </DropdownMenu>
    //           </TableCell>
    //         </TableRow> */}
    //       </TableBody>
    //     </Table>
    //   </CardContent>
    //   <CardFooter>
    //     <div className="text-xs text-muted-foreground">
    //       Showing <strong>1-10</strong> of <strong>32</strong> products
    //     </div>
    //   </CardFooter>
    // </Card>
    // </TabsContent>
  );
}
