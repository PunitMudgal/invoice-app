import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import Logo from "./Logo";

const Footer = () => {
  return (
    <Card className="w-full absolute bottom-0 left-0 flex justify-between items-center p-2">
      <Logo />
      <CardDescription>Copyright © 2025 - All right reserved</CardDescription>
    </Card>
  );
};

export default Footer;
