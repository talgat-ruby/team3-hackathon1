import Image from "next/image";
import IconConfirmation from "../../public/assets/icon-confirmation.svg";

function SuccessfullPage() {
  return (
    <div className="flex flex-col items-center font-ubuntu">
      <Image
        src={IconConfirmation}
        alt="confirmation-svg"
        className="mb-8 w-20 h-20"
      />
      <h1 className="uppercase text-[#022959] text-[32px] font-bold leading-[37px] mb-3">
        Thank you!
      </h1>
      <p className="text-[#9699AA] leading-6">
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremgaming.com.
      </p>
    </div>
  );
}

export default SuccessfullPage;
