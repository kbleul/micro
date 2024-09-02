import Image from "next/image";
import Logo from "@public/logo.png";

import { forwardRef } from "react";
import { Title } from "rizzui";
import { TfiCheckBox } from "react-icons/tfi";
import { MdCheckBoxOutlineBlank } from "react-icons/md";

const DepositeInvoice = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <main ref={ref} className="px-8 py-6 pt-6 text-gray-800 font-medium">
      <section className="grid grid-cols-4 items-center">
        <div className="col-span-1 flex justify-start items-center">
          <Image src={Logo} alt="iamge" width={200} height={200} />
        </div>

        <div className="col-span-2 text-center">
          <Title as="h3" className="text-[2rem] mb-2 text-gray-600">
            ድሮጋ ግሩፕ ገ/ቁ/ብ/ኃ/የኅ/ሥራ ማህበር
          </Title>
          <Title as="h3" className="text-[2rem] text-gray-600">
            DROGA GROUP SACCOS LTD
          </Title>

          <p className="text-xl">
            አዲስ አበባ ኢትዮጵያ <span>Addis Ababa Ethiopia</span>
          </p>

          <Title as="h5" className="text-2xl text-gray-600">
            ማጠራቀሚያ ሒሳብ ገቢ የሚደረግበት ማዘዣ
          </Title>
          <Title
            as="h5"
            className="text-2xl underline before:decoration-gray-800 text-gray-600"
          >
            Saving Account Deposit Voucher
          </Title>
        </div>

        <div className="col-span-1 justify-self-end pr-10 text-lg">
          <div className="flex justify-center items-end mb-1">
            <p>ቀን</p>
            <p className="ml-10 border-b border-b-gray-700 w-36"></p>
          </div>

          <div className="flex justify-center items-end mb-1">
            <p>Date</p>
            <p className="ml-6 border-b border-b-gray-700 w-36"></p>
          </div>

          <p className="mt-6">
            <Title as="h6" className="text-xl text-red-700">
              No. 0099900989
            </Title>
          </p>
        </div>
      </section>

      <div className="mt-2 text-xl">
        <p>የአባሉ ደብተር ከዚህ ማዘዣ ጋር ተያይዞ መቅረብ አለበት </p>
        <p className="font-semibold">Pass book must accompany this voucher</p>
      </div>

      <article className="pr-28 my-6  text-xl">
        <section className="flex justify-start items-center gap-4 mb-4">
          <div className="flex flex-col">
            <p>ገቢ ለ </p>
            <p>Credit</p>
          </div>
          <p className="w-4/5 border-b border-gray-700"></p>
        </section>
        <section className="grid grid-cols-3 border-t border-t-gray-700justify-start items-center gap-2 mb-4">
          <section className="flex justify-start items-center gap-2 col-span-2">
            <div className="flex flex-col">
              <p>ብር</p>
              <p>Birr</p>
            </div>
            <p className="w-full border-b border-gray-700 mx-4"></p>
          </section>
          <section className="flex justify-start items-center gap-2 col-span-1 border-gray-700">
            <div className="flex flex-col px-4 border-r border-r-gray-700">
              <p>ብር</p>
              <p>Birr</p>
            </div>
            <p className="px-4"></p>
          </section>
        </section>

        <section className="flex justify-start items-center gap-2 mt-6 mb-4">
          <p>የተከፈለበት ምክንያት</p>
          <p className="w-4/5 border-b border-gray-700"></p>
        </section>
        <section className="flex justify-start items-center gap-2 mt-6 mb-4">
          <p>የደብተር ቁጥር / Client No.</p>
          <p className="w-3/5 border-b border-gray-700"></p>
        </section>

        <section className="flex justify-start items-center gap-10 mt-6 mb-4">
          <div className="flex gap-4 items-center">
            <p>በጥሬ</p>
            <TfiCheckBox />
          </div>

          <div className="flex gap-4 items-center">
            <p>በባንክ</p>
            <MdCheckBoxOutlineBlank />
          </div>

          <div className="flex justify-start items-end gap-2">
            <p>ባንክ የገባበት ቀን</p>
            <p className="w-36 border-b border-gray-700 border-dashed"></p>
          </div>

          <div className="flex gap-4 items-end">
            <p>በቼክ</p>
            <MdCheckBoxOutlineBlank />
          </div>

          <section className="flex justify-start items-end gap-2">
            <p>የቼክ ቁጥር</p>
            <p className="w-36 border-b border-gray-700 border-dashed"></p>
          </section>
        </section>
      </article>

      <article className="grid grid-cols-8 justify-start items-center border my-8 text-xl text-center">
        <section className="border border-gray-700 border-l-0">
          <div className="py-2">
            <p>መመዝዝቢያ</p>
            <p className="text-lg">Registration</p>
          </div>
          <div className="grid grid-cols-3 border-t border-t-gray-700">
            <p className="col-span-2 border-r border-r-gray-700 text-base py-2">1000</p>
            <p className="col-span-1 text-base py-2">00</p>
          </div>
        </section>

        <section className="border border-gray-700 border-l-0">
          <div className="py-2">
            <p>መመዝዝቢያ</p>
            <p className="text-lg">Registration</p>
          </div>
          <div className="grid grid-cols-3 border-t border-t-gray-700">
            <p className="col-span-2 border-r border-r-gray-700 text-base py-2">1000</p>
            <p className="col-span-1 text-base py-2">00</p>
          </div>
        </section>

        <section className="border border-gray-700 border-l-0">
          <div className="py-2">
            <p>መመዝዝቢያ</p>
            <p className="text-lg">Registration</p>
          </div>
          <div className="grid grid-cols-3 border-t border-t-gray-700">
            <p className="col-span-2 border-r border-r-gray-700 text-base py-2">1000</p>
            <p className="col-span-1 text-base py-2">00</p>
          </div>
        </section>

        <section className="border border-gray-700 border-l-0">
          <div className="py-2">
            <p>መመዝዝቢያ</p>
            <p className="text-lg">Registration</p>
          </div>
          <div className="grid grid-cols-3 border-t border-t-gray-700">
            <p className="col-span-2 border-r border-r-gray-700 text-base py-2">1000</p>
            <p className="col-span-1 text-base py-2">00</p>
          </div>
        </section>

        <section className="border border-gray-700 border-l-0">
          <div className="py-2">
            <p>መመዝዝቢያ</p>
            <p className="text-lg">Registration</p>
          </div>
          <div className="grid grid-cols-3 border-t border-t-gray-700">
            <p className="col-span-2 border-r border-r-gray-700 text-base py-2">1000</p>
            <p className="col-span-1 text-base py-2">00</p>
          </div>
        </section>

        <section className="border border-gray-700 border-l-0">
          <div className="py-2">
            <p>መመዝዝቢያ</p>
            <p className="text-lg">Registration</p>
          </div>
          <div className="grid grid-cols-3 border-t border-t-gray-700">
            <p className="col-span-2 border-r border-r-gray-700 text-base py-2">1000</p>
            <p className="col-span-1 text-base py-2">00</p>
          </div>
        </section>

        <section className="border border-gray-700 border-l-0">
          <div className="py-2">
            <p>መመዝዝቢያ</p>
            <p className="text-lg">Registration</p>
          </div>
          <div className="grid grid-cols-3 border-t border-t-gray-700">
            <p className="col-span-2 border-r border-r-gray-700 text-base py-2">1000</p>
            <p className="col-span-1 text-base py-2">00</p>
          </div>
        </section>

        <section className="border border-gray-700 border-l-0">
          <div className="py-2">
            <p>መመዝዝቢያ</p>
            <p className="text-lg">Registration</p>
          </div>
          <div className="grid grid-cols-3 border-t border-t-gray-700">
            <p className="col-span-2 border-r border-r-gray-700 text-base py-2">1000</p>
            <p className="col-span-1 text-base py-2">00</p>
          </div>
        </section>
      </article>

      <article className="grid grid-cols-2 gap-20 mb-4 text-xl">
        <section className="flex justify-start items-center gap-2">
          <div className="flex flex-col">
            <p>የገንዘብ ተቀባይ ሪርማ</p>
            <p>Cashier's Signature</p>
          </div>
          <p></p>
        </section>
        <section className="flex justify-start items-center gap-2">
          <div className="flex flex-col">
            <p>የገንዘብ ተቀባይ ሪርማ</p>
            <p>Client Signature</p>
          </div>
          <p></p>
        </section>
      </article>

      <p className="mb-4 text-xl">
        <span className="">ማሳሰቢያ ፡- </span>የገንዘብ ተቀባይ ፊርማ እና ማህተም ከለለው ተቀባይነት
        የለውም፡፡
      </p>
    </main>
  );
});

export default DepositeInvoice;
