import Image from "next/image";

type LogoProps = {
  logo?: string;
  logoAltText?: string;
};

const LogoBox = ({ logo = "/teams/mclaren-logo.svg", logoAltText = "" }: LogoProps) => {
  return (
    <div className="logo-box">
      <Image
        src={logo}
        alt={`${logoAltText} logo`}
        width={40}
        height={40}
      />
    </div>
  );
};

export default LogoBox;
