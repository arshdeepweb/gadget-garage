// Import images
import header1 from './1.png';
import header2 from './2.png';
import header3 from './3.png';
import iphone from './ph.jpg';

// Import React icons
import { FaMobile } from "react-icons/fa";
import { RiComputerFill } from "react-icons/ri";
import { BsFillLaptopFill, BsSmartwatch, BsEarbuds } from "react-icons/bs";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";

// Export assets for headers
export const assets = {
  headers: [header1, header2, header3],
  iphone,
};

// Define categories
export const categories = [
  {
    name: "Laptop",
    icon: BsFillLaptopFill, // Pass the component, not JSX
  },
  {
    name: "Computer",
    icon: RiComputerFill,
  },
  {
    name: "Mobile",
    icon: FaMobile,
  },
  {
    name: "Watch",
    icon: BsSmartwatch,
  },
  {
    name: "Accessories",
    icon: TfiLayoutGrid4Alt,
  },
  {
    name: "Earphone",
    icon: BsEarbuds,
  },
];

// Default export
export default { assets, categories };
