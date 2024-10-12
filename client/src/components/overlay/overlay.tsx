import Image from "next/image";

export default function Overlay() {
  return (
    <div className="bg-slate-200 w-screen h-screen flex items-center justify-center">
        <Image className="animate-pulse" src={"/logo/logo-dark.svg"} width={200} height={200} alt={""} />
    </div>
  );
}
