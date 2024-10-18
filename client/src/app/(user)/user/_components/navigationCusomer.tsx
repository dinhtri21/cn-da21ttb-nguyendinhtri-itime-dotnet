"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { GearIcon, ExitIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { GoHistory } from "react-icons/go";
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { TfiClipboard } from "react-icons/tfi";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Cookies from "js-cookie";
import { customerApi } from "@/apis/customerApi";
import CustomToast from "@/components/react-toastify/reactToastify";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "@/redux/slices/userSlice";
import { setCartItemCount } from "@/redux/slices/cartItemsSlide";

export default function NavigationCusomer() {
  const pathname = usePathname();
  const user = useSelector((state: RootState) => state.user);
  const token = Cookies.get("token");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      if (!token) return;
      const res = await customerApi.LogoutCustomer(token);
      Cookies.remove("token");
      Cookies.remove("userId");
      Cookies.remove("accessToken");
      CustomToast.showSuccess("Đăng xuất thành công !");
      handleDeleteDataRedux();
      router.push("/login");
      // window.location.href = '/login';
    } catch (error) {
      CustomToast.showError("Đăng xuất thất bại !");
      console.error("Failed to logout:", error);
    }
  };

  const handleDeleteDataRedux = () => {
    dispatch(clearUser());
    dispatch(setCartItemCount(0));
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4">
      <div className="flex items-center justify-between border-2 px-3 py-3 rounded-xl bg-background">
        <div className="flex items-center gap-3">
          <Image
            src={"/img/avatar-customer.jpg"}
            width={60}
            height={60}
            alt="avatar"
            className="border rounded-full w-[60px] h-[60px] object-cover"
          />
          <div>
            <h2 className="font-semibold text-slate-800 dark:text-white text-base">
              {user && user.fullName}
            </h2>
            {/* <p>{user && user.email}</p> */}
            <p className="text-gray-600 dark:text-white text-sm">
              {user && user.email}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <AlertDialog>
            <AlertDialogTrigger>
              <div className="flex items-center gap-2 border px-2 py-1 rounded-xl hover:bg-slate-100">
                <ExitIcon width={20} height={20} />
                <span className="hidden md:block">Đăng xuất</span>
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Bạn có chắc muốn đăng xuất tài khoản ?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Tài khoản của bạn sẽ được đăng xuất khỏi ITime.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Huỷ</AlertDialogCancel>
                <AlertDialogAction onClick={handleLogout}>
                  Đăng xuất
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <GearIcon className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/user/setting">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>{/* Đăng xuất */}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* <div className="grid md:grid-cols-4 grid-cols-2 gap-3 md:gap-4 mt-3 md:mt-6">
        <Link
          href={"/user"}
          className={`${
            pathname == "/user"
              ? " border-slate-400 text-slate-400"
              
              : "text-gray-500 hover:border-slate-400 hover:text-slate-400"
          }  flex items-center rounded-xl gap-2 cursor-pointer px-4 bg-background py-3 border `}
        >
          <TfiClipboard className={`w-6 h-6 `} />
          <p className="font-medium">Chờ xác nhận</p>
        </Link>
        <div className="flex items-center rounded-xl gap-2 cursor-pointer px-4 bg-background py-2 border text-gray-500 hover:bg-slate-100">
          <LiaShippingFastSolid className="w-6 h-6 " />
          <p className="font-medium ">Đang vận chuyển</p>
        </div>
        <div className="flex items-center rounded-xl gap-2 cursor-pointer px-4 bg-background py-2 border text-gray-500 hover:bg-slate-100">
          <MdOutlineDeliveryDining className="w-6 h-6 " />
          <p className="font-medium ">Đang giao</p>
        </div>
       
        <Link
          href={"/user/history"}
          className={`${
            pathname == "/user/history"
              ? "border-slate-400 text-slate-400"
              : "text-gray-500 hover:border-slate-400 hover:text-slate-400"
          } flex items-center rounded-xl gap-2 cursor-pointer px-4 bg-background py-2 border `}
        >
          <TfiClipboard className={`w-6 h-6`} />
          <p className="font-medium">Lịch sử mua hàng</p>
        </Link>
      </div> */}
    </div>
  );
}
