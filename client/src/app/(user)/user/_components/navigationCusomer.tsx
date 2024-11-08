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
import { setCartItemCount } from "@/redux/slices/cartItemsSlice";
import { PiUserThin } from "react-icons/pi";

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
      <div className="flex items-center justify-between border  px-3 py-3 rounded-xl  ">
        <div className="flex items-center gap-3">
          {/* <Image
            src={"/img/avatar-customer.jpg"}
            width={60}
            height={60}
            alt="avatar
            className="border rounded-full w-[60px] h-[60px] object-cover"
          /> */}
          <PiUserThin className="w-[40px] h-[40px] text-gray-500" />
          <div>
            <h2 className=" text-gray-700 dark:text-white text-base">
              {user && user.fullName}
            </h2>
            {/* <p>{user && user.email}</p> */}
            <p className="text-gray-500 dark:text-white text-sm">
                {user && user.email } | {user && user.phoneNumber} 
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <AlertDialog>
            <AlertDialogTrigger>
              <div className="flex items-center gap-2 border  px-2 py-1 rounded-xl hover:bg-slate-100">
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
              <Button variant="secondary" size="icon" className="rounded-full bg-white border ">
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
    </div>
  );
}

