const min = 0;
const max = 100;

const num_of_sections = 5;
const width_of_section = (max - min) / num_of_sections;

const marks = [
  {
    value: width_of_section * 0,
    scaledValue: 10,
    label: "10 Documents",
    lable_secondary: "One Employee per Day",
  },
  {
    value: width_of_section * 1,
    scaledValue: 100,
    label: "100 Documents",
    lable_secondary: "One Team's Work per Day",
  },
  {
    value: width_of_section * 2,
    scaledValue: 1000,
    label: "1000 Documents",
    lable_secondary: "One Product Team per Day",
  },
  {
    value: width_of_section * 3,
    scaledValue: 10000,
    label: "10,000 Documents",
    lable_secondary: "One GTM Motion",
  },
  {
    value: width_of_section * 4,
    scaledValue: 100000,
    label: "100,000 Documents",
    lable_secondary: "One GTM Motion + One Quater Customer Interaction",
  },
  {
    value: width_of_section * 5,
    scaledValue: 1000000,
    label: "1,000,000 + Documents",
    lable_secondary: "One End to End offering per year",
  },
];

export { marks, min, max, width_of_section };
