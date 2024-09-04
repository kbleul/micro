import Image from "next/image";
import Logo from "@public/logo.png";

import { forwardRef } from "react";
import { Title } from "rizzui";
import { TfiCheckBox } from "react-icons/tfi";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import { useGetHeaders } from "@/hooks/use-get-headers";
import Loading from "@/components/ui/Loading";
import { toWords } from "number-to-words";
import { convertDateTimeFormate } from "@/utils/time_manuplation";
import { paymentChannels } from "@/utils/dummy";

type DepositeInvoiceProps = {
  ledgerData: any;
  memberId: string;
  accountNumber: string;
};

const DepositeInvoice = forwardRef<HTMLDivElement, DepositeInvoiceProps>(
  (props, ref) => {
    const { ledgerData, memberId, accountNumber } = props;
    const headers = useGetHeaders({ type: "Json" });

    const memberData = useFetchData(
      [queryKeys.getAllMembers + memberId, memberId],
      `${process.env.NEXT_PUBLIC_BACKEND_URL}members/${memberId}`,
      headers
    );

    if (memberData.isFetching) {
      return (
        <div className="py-20 flex justify-center items-center">
          <Loading />
        </div>
      );
    }

    console.log(ledgerData);
    const Member = memberData?.data?.data;

    return (
      <main ref={ref} className="px-4 py-6 pt-6 text-gray-800 font-medium">
        <section className="grid grid-cols-4 items-center">
          <div className="col-span-1 flex justify-start items-center">
            <Image src={Logo} alt="iamge" width={140} height={140} />
          </div>

          <div className="col-span-2 text-center text-[1rem]">
            <Title as="h3" className="text-gray-600">
              ድሮጋ ግሩፕ ገ/ቁ/ብ/ኃ/የኅ/ሥራ ማህበር
            </Title>
            <Title as="h3" className="text-gray-600">
              DROGA GROUP SACCOS LTD
            </Title>

            <p className="">
              አዲስ አበባ ኢትዮጵያ <span>Addis Ababa Ethiopia</span>
            </p>

            <Title as="h5" className=" text-gray-600 mt-1">
             {ledgerData?.withdrawal > 0 ? "ወጪ ማዘዣ" : "ማጠራቀሚያ ሒሳብ ገቢ የሚደረግበት ማዘዣ"} 
            </Title>
            <Title
              as="h5"
              className=" underline before:decoration-gray-800 text-gray-600"
            >
              {ledgerData?.withdrawal > 0 ? "Withdrawl Voucher" : "Saving Account Deposit Voucher"}
            </Title>
          </div>

          <div className="col-span-1 justify-self-end text-sm">
            <div className="flex justify-center items-end mb-1">
              <p>ቀን</p>
              <p className="ml-6 border-b border-b-gray-700 w-28"></p>
            </div>

            <div className="flex justify-center items-end mb-1">
              <p>Date</p>
              <p className="ml-4 border-b border-b-gray-700 w-28">
                {convertDateTimeFormate(ledgerData?.date).split(",")[1]}
              </p>
            </div>

            <p className="mt-6">
              <Title as="h6" className="text-base text-red-700">
                No. 0099900989
              </Title>
            </p>
          </div>
        </section>

        <div className="mt-4">
          <p>የአባሉ ደብተር ከዚህ ማዘዣ ጋር ተያይዞ መቅረብ አለበት </p>
          <p className="font-semibold">Pass book must accompany this voucher</p>
        </div>

        <article className="pr-10 my-3  text-base">
          <section className="flex justify-start items-center gap-4 ">
            <div className="flex flex-col">
              <p>{ledgerData?.withdrawal > 0 ? "ክፈል ለ:" : "ገቢ ለ:"} </p>
              <p>Credit</p>
            </div>
            <p className="w-4/5 border-b border-gray-700 pl-6">
              {Member?.first_name + " " + Member?.last_name}
            </p>
          </section>
          <section className="grid grid-cols-3 justify-start items-center gap-2">
            <section className="flex justify-start items-center gap-2 col-span-2">
              <div className="flex flex-col">
                <p>ብር</p>
                <p>Birr</p>
              </div>
              <p className="w-full border-b border-gray-700 mx-4 pl-6">
                {toWords(ledgerData?.amount).toUpperCase()} BIRR
              </p>
            </section>
            <section className="flex justify-start items-center gap-2 col-span-1 border border-gray-700 ">
              <div className="flex flex-col px-4 border-r border-r-gray-700">
                <p>ብር</p>
                <p>Birr</p>
              </div>
              <p className="px-4">{ledgerData?.amount}</p>
            </section>
          </section>

          <section className="flex justify-start items-center gap-2 mt-5">
            <p>የተከፈለበት ምክንያት</p>
            <p className="w-3/5 border-b border-gray-700 pl-6">
              {ledgerData?.purpose}
            </p>
          </section>
          <section className="flex justify-start items-center gap-2 mt-5">
            <p>የደብተር ቁጥር / Client No.</p>
            <p className="w-3/5 border-b border-gray-700 pl-6">{accountNumber}</p>
          </section>

          <section className="flex justify-start items-center gap-4 mt-5 mb-1 text-base">
            <div className="flex gap-4 items-center">
              <p>በጥሬ</p>
              {ledgerData?.payment_channel === paymentChannels.cash ? (
                <TfiCheckBox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </div>

            <div className="flex gap-4 items-center">
              <p>በባንክ</p>
              {ledgerData?.payment_channel === paymentChannels.bank ? (
                <TfiCheckBox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </div>

            <div className="flex justify-start items-end gap-2">
              <p>ባንክ የገባበት ቀን</p>
              <p className="w-28 border-b border-gray-700 border-dashed">
                {ledgerData?.payment_channel === paymentChannels.bank &&
                  convertDateTimeFormate(ledgerData?.date).split(",")[1]}
              </p>
            </div>

            <div className="flex gap-4 items-end">
              <p>በቼክ</p>
              {ledgerData?.payment_channel === paymentChannels.cheque ? (
                <TfiCheckBox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </div>

            <section className="flex justify-start items-end gap-2">
              <p>የቼክ ቁጥር</p>
              <p className="w-28 border-b border-gray-700 border-dashed">
                {ledgerData?.payment_channel === paymentChannels.cheque &&
                  ledgerData?.cheque_number}
              </p>
            </section>
          </section>
        </article>

        <article className="grid grid-cols-7 justify-start items-center my-3 text-center">
          <section className="border border-gray-700">
            <div className="py-2">
              <p className="">መመዝዝቢያ</p>
              <p className="font-medium text-[11px]">Registration</p>
            </div>
            <div className="border-t border-t-gray-700">
              <p className="col-span-2 text-sm py-2">
                {ledgerData?.registration_fee &&
                ledgerData?.registration_fee > 0
                  ? ledgerData?.registration_fee
                  : "-"}
              </p>
            </div>
          </section>

          <section className="border border-gray-700 border-l-0">
            <div className="py-2">
              <p className="">መደበኛ ቁጠባ</p>
              <p className="font-medium text-[11px]">Compulsory Saving</p>
            </div>
            <div className="border-t border-t-gray-700">
              <p className="col-span-2 text-sm py-2">
                {ledgerData?.compulsory_saving &&
                ledgerData?.compulsory_saving > 0
                  ? ledgerData?.compulsory_saving
                  : "-"}
              </p>
            </div>
          </section>

          <section className="border border-gray-700 border-l-0">
            <div className="py-2">
              <p className="">የፍላጎት ቁጠባ</p>
              <p className="font-medium text-[11px]">Voluntary Saving</p>
            </div>
            <div className="border-t border-t-gray-700">
              <p className="col-span-2 text-sm py-2">
                {ledgerData?.regular_saving && ledgerData?.regular_saving > 0
                  ? ledgerData?.regular_saving
                  : "-"}
              </p>
            </div>
          </section>

          <section className="border border-gray-700 border-l-0">
            <div className="py-2">
              <p className="">ብድር ተመላሽ</p>
              <p className="font-medium text-[11px]">Loan Repayment</p>
            </div>
            <div className="border-t border-t-gray-700">
              <p className="col-span-2 text-sm py-2">
                {ledgerData?.paid && ledgerData?.paid > 0
                  ? ledgerData?.paid
                  : "-"}
              </p>
            </div>
          </section>

          <section className="border border-gray-700 border-l-0">
            <div className="py-2">
              <p className="">ወለድ</p>
              <p className="font-medium text-[11px]">Interest</p>
            </div>
            <div className="border-t border-t-gray-700">
              <p className="col-span-2 text-sm py-2">
                {ledgerData?.loan_interest && ledgerData?.loan_interest > 0
                  ? ledgerData?.loan_interest
                  : "-"}
              </p>
            </div>
          </section>

          <section className="border border-gray-700 border-l-0">
            <div className="py-2">
              <p className="">ቅጣት</p>
              <p className="font-medium text-[11px]">Penality</p>
            </div>
            <div className="border-t border-t-gray-700">
              <p className="col-span-2 text-sm py-2">
                {ledgerData?.penalty && ledgerData?.penalty > 0
                  ? ledgerData?.penalty
                  : "-"}
              </p>
            </div>
          </section>

          <section className="border border-gray-700 border-l-0">
            <div className="py-2">
              <p className="">ሌሎች</p>
              <p className="font-medium text-[11px]">Others</p>
            </div>
            <div className="border-t border-t-gray-700">
              <p className="col-span-2 text-sm py-2">-</p>
            </div>
          </section>
        </article>

        <article className="grid grid-cols-2 gap-20 mb-2">
          <section className="flex justify-start items-center gap-2 text-base">
            <div className="flex flex-col">
              <p>የገንዘብ ተቀባይ ሪርማ</p>
              <p>Cashier's Signature</p>
            </div>
            <p className="border-b border-b-gray-700 w-36"></p>
          </section>
          <section className="flex justify-start items-center gap-2">
            <div className="flex flex-col">
              <p>የገንዘብ ተቀባይ ሪርማ</p>
              <p>Client Signature</p>
            </div>
            <p className="border-b border-b-gray-700 w-36"></p>
          </section>
        </article>

        <p className="mb-1 text-base">
          <span className="">ማሳሰቢያ ፡- </span>የገንዘብ ተቀባይ ፊርማ እና ማህተም ከለለው ተቀባይነት
          የለውም፡፡
        </p>
      </main>
    );
  }
);

export default DepositeInvoice;
