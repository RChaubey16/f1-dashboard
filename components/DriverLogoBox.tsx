import Image from "next/image";

type LogoProps = {
  logo?: string;
  logoAltText?: string;
};

const DriverLogoBox = ({
  logo = "/drivers/max-verstappen.svg",
  logoAltText = "",
}: LogoProps) => {
  return (
    <div className="relative bottom-[-12] right-[-10] w-[105px]">
      <Image
        src={logo}
        alt={`${logoAltText} logo`}
        width={105}
        height={105}
      />
    </div>
  );
};

export default DriverLogoBox;
