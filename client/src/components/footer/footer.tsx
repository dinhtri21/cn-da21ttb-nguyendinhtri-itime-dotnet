import Image from "next/image";
import logoDark from "../../assets/logo/logo-dart.svg";
import logoLight from "../../assets/logo/logo-light.svg";
import { PiFacebookLogoLight } from "react-icons/pi";
import { PiInstagramLogoLight } from "react-icons/pi";
import { PiYoutubeLogoLight } from "react-icons/pi";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import Link from "next/link";

export default function Footer() {
  return (
    <div className="w-full bg-black text-white mt-8">
      <div className="hidden container mx-auto max-w-screen-xl md:grid grid-cols-2 md:grid-cols-5 gap-3 py-10 px-4">
        <div className="col-span-2">
          <Image
            className=""
            alt="Next.js Streaming"
            src={logoLight}
            width={100}
            height={100}
          />
          <div className="pr-5 line-clamp-2 overflow-hidden">
            Chào mừng đến với iTime – thiên đường của những chiếc đồng hồ tinh
            tế và sang trọng. Khám phá iTime để trải nghiệm vẻ đẹp của thời gian
            một cách hoàn hảo nhất.
          </div>
        </div>
        <div>
          <p className="font-medium uppercase">Liên hệ</p>
          <ul>
            <li>Hno: 126 Nguyen Van Thuong, P25, Binh Thanh Ditrict, HCM</li>
            <li>+84 0357929230</li>
            <li> abc@gmail.com</li>
          </ul>
        </div>
        <div>
          <p className="font-medium uppercase">Hỗ trợ</p>
          <ul>
            <li>
              <Link href={"#"}> Hướng dẫn mua hàng</Link>
            </li>
            <li>
              <Link href={"#"}> Bảo hành đổi và trả</Link>
            </li>
            <li>
              <Link href={"#"}> Hướng dẫn chọn size</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-medium uppercase">Theo dõi</p>
          <ul>
            <li>
              <Link className="flex items-center gap-1" href={"#"}>
                <PiFacebookLogoLight />
                <span>Facebook</span>
              </Link>
            </li>
            <li>
              <Link className="flex items-center gap-1" href={"#"}>
                <PiInstagramLogoLight />
                <span>Intagram</span>
              </Link>
            </li>
            <li>
              <Link className="flex items-center gap-1" href={"#"}>
                <PiYoutubeLogoLight />
                <span>Youtube</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="font-normal text-sm text-center text-gray-500">
          <p>@20234 ITIME. All rights reserved.</p>
        </div>
      </div>
      {/*  */}
      <div className="md:hidden grid container mx-auto max-w-screen-xl py-10 px-4">
        <div className="">
          <Image
            className=""
            alt="Next.js Streaming"
            src={logoLight}
            width={100}
            height={100}
          />
          <div className="pr-5 line-clamp-3 overflow-hidden mt-2">
            Chào mừng đến với iTime – thiên đường của những chiếc đồng hồ tinh
            tế và sang trọng. Khám phá iTime để trải nghiệm vẻ đẹp của thời gian
            một cách hoàn hảo nhất.
          </div>
        </div>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Liên hệ</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>
                  Hno: 126 Nguyen Van Thuong, P25, Binh Thanh Ditrict, HCM
                </li>
                <li>+84 0357929230</li>
                <li> abc@gmail.com</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Hỗ trợ</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>
                  <Link href={"#"}> Hướng dẫn mua hàng</Link>
                </li>
                <li>
                  <Link href={"#"}> Bảo hành đổi và trả</Link>
                </li>
                <li>
                  <Link href={"#"}> Hướng dẫn chọn size</Link>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Theo dõi</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>
                  <Link className="flex items-center gap-1" href={"#"}>
                    <PiFacebookLogoLight />
                    <span>Facebook</span>
                  </Link>
                </li>
                <li>
                  <Link className="flex items-center gap-1" href={"#"}>
                    <PiInstagramLogoLight />
                    <span>Intagram</span>
                  </Link>
                </li>
                <li>
                  <Link className="flex items-center gap-1" href={"#"}>
                    <PiYoutubeLogoLight />
                    <span>Youtube</span>
                  </Link>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="font-normal text-sm text-center text-gray-500 mt-5">
          <p>@20234 ITIME. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
