const min = 0;
const max = 100;

const num_of_sections = 5;
const width_of_section = (max - min) / num_of_sections;

const marks = [
  {
    value: width_of_section * 0,
    scaledValue: 10,
    label: "10 Items",
    lable_secondary: "Items reflects slider value",
  },
  {
    value: width_of_section * 1,
    scaledValue: 100,
    label: "100 Items",
    lable_secondary: "Items reflects slider value",
  },
  {
    value: width_of_section * 2,
    scaledValue: 1000,
    label: "1000 Items",
    lable_secondary: "Items reflects slider value",
  },
  {
    value: width_of_section * 3,
    scaledValue: 1900, //increment 1 for 10
    label: "10,000 Items",
    lable_secondary: "Blocks are added with scaled down factor for the interval.",
  },
  {
    value: width_of_section * 4,
    scaledValue: 2800,
    label: "100,000 Items",
    lable_secondary: "Blocks are added with scaled down factor for the interval.",
  },
  {
    value: width_of_section * 5,
    scaledValue: 3800,
    label: "1,000,000 + Items",
    lable_secondary: "Blocks are added with scaled down factor for the interval.",
  },
];

export { marks, min, max, width_of_section };
