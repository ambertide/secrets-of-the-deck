import { Yeseva_One } from "next/font/google";
import { Playfair_Display } from "next/font/google";

const titleFont = Yeseva_One({ weight: "400", subsets: [ 'latin' ]});
const bodyFont = Playfair_Display({ weight: "variable", subsets: [ 'latin' ]});

const fonts = {
  title: titleFont,
  body: bodyFont
};

export default fonts;