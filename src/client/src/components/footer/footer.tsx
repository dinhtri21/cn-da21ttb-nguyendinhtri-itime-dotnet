import Image from "next/image";
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
    <div className="w-full bg-black text-gray-700 dark:bg-black">
      <div className="hidden container mx-auto max-w-screen-xl md:grid grid-cols-2 md:grid-cols-5 gap-3 py-10 px-4">
        <div className="col-span-2">
          <Image
            className=""
            alt="Next.js Streaming"
            src={"/logo/logo-light2.svg"}
            width={100}
            height={100}
          />
          <div className="pr-12 line-clamp-3 text-gray-200 overflow-hidden mt-1">
            Chào mừng đến với iTime – thiên đường của những chiếc đồng hồ tinh
            tế và sang trọng. Khám phá iTime để trải nghiệm vẻ đẹp của thời gian
            một cách hoàn hảo nhất.
          </div>
        </div>
        <div className="flex justify-end">
          <div>
            <p className="font-medium uppercase text-white">Liên hệ</p>
            <ul className="text-gray-200 mt-1">
              <li>Hno: 126 Nguyễn Thiện Thành, Phường 5, Trà Vinh, Việt Nam</li>
              <li>+84 0357929230</li>
              <li>tringuyen.21092003@gmail.com</li>
            </ul>
          </div>
        </div>
        <div className="flex justify-end">
          <div>
            <p className="font-medium uppercase text-white">Hỗ trợ</p>
            <ul className="text-gray-200 mt-1">
              <li>
                <Link href={"#"}>Hướng dẫn mua hàng</Link>
              </li>
              <li>
                <Link href={"#"}>Bảo hành đổi và trả</Link>
              </li>
              <li>
                <Link href={"#"}>Về chúng tôi</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-end">
          <div>
            <p className="font-medium uppercase text-white">Theo dõi</p>
            <ul className="text-gray-200 mt-1">
              <li>
                <Link className="flex items-center gap-1" href={"#"}>
                  {/* <PiFacebookLogoLight /> */}
                  <Image
                    className=""
                    alt="Next.js Streaming"
                    src={"/icon/facebook.svg"}
                    width={16}
                    height={16}
                  />
                  <span>Facebook</span>
                </Link>
              </li>
              <li>
                <Link className="flex items-center gap-1" href={"#"}>
                  {/* <PiInstagramLogoLight /> */}
                  <Image
                    className=""
                    alt="Next.js Streaming"
                    src={"/icon/instagram.svg"}
                    width={16}
                    height={16}
                  />
                  <span>Intagram</span>
                </Link>
              </li>
              <li>
                <Link className="flex items-center gap-1" href={"#"}>
                  {/* <PiYoutubeLogoLight /> */}
                  <Image
                    className=""
                    alt="Next.js Streaming"
                    src={"/icon/youtube.svg"}
                    width={16}
                    height={16}
                  />
                  <span>Youtube</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="py-8 max-w-screen-xl mx-auto border-gray-500 border-t-[0.5px] col-span-12 font-normal text-sm text-center text-gray-200">
        <p>@20234 ITIME. All rights reserved.</p>
      </div>
      {/*  */}
      <div className="md:hidden grid container mx-auto max-w-screen-xl py-10 px-4">
        <div className="">
          <Image
            className=""
            alt="Next.js Streaming"
            src={"/logo/logo-light.svg"}
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
                  Hno: 126 Nguyễn Thiện Thành, Phường 5, Trà Vinh, Việt Nam
                </li>
                <li>+84 0357929230</li>
                <li>tringuyen.21092003@gmail.com</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Hỗ trợ</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>
                  <Link href={"#"}>Hướng dẫn mua hàng</Link>
                </li>
                <li>
                  <Link href={"#"}>Bảo hành đổi và trả</Link>
                </li>
                <li>
                  <Link href={"#"}>Về chúng tôi</Link>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <div>
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
          </div>
        </Accordion>
        <div className="font-normal text-sm text-center text-gray-500 mt-5">
          <p>@20234 ITIME. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
