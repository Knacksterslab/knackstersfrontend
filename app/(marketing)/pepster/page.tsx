import type { Metadata } from "next";
import PepsterPitchPage from "@/components/pepster/PepsterPitchPage";

export const metadata: Metadata = {
  title: "Pepster - Experiential Dating Platform | Knacksters Portfolio",
  description: "Pepster transforms online dating by prioritizing real-life interactions over digital messaging. Connect through curated experiences at partner venues and build authentic connections.",
  keywords: ["Pepster", "experiential dating", "dating app", "real-life connections", "dating platform", "date venues", "authentic dating"],
};

export default function PepsterRoute() {
  return <PepsterPitchPage />;
}
