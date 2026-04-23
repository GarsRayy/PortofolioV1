export const PROJECT_META = [
  {
    id: 1,
    slug: "pplk-itera-website",
    title: "PPLK ITERA Website",
    category: "Web Development / UI/UX",
    color: "bg-garnet",
    img: "/images/pplk_itera_website_1776967239729.png",
  },
  {
    id: 2,
    slug: "income-prediction-ann",
    title: "Income Prediction (ANN)",
    category: "Data Science / ANN",
    color: "bg-garnet",
    img: "/images/income_prediction_ann_1776967206440.png",
  },
  {
    id: 3,
    slug: "spatial-mapping-kkn",
    title: "Spatial Mapping KKN",
    category: "Data Engineering / GIS",
    color: "bg-garnet",
    img: "/images/spatial_mapping_kkn_1776967255935.png",
  },
  {
    id: 4,
    slug: "study-quest",
    title: "Study Quest",
    category: "EdTech / Gamification",
    color: "bg-garnet",
    img: "/images/study_quest_app_1776968168422.png",
  },
  {
    id: 5,
    slug: "website-hmif-itera-2026",
    title: "Website HMIF ITERA 2026",
    category: "Web Development & UI/UX",
    color: "bg-garnet",
    img: "/images/hmif_website_placeholder.png",
  },
];

export const PROJECT_META_BY_SLUG = PROJECT_META.reduce((accumulator, item) => {
  accumulator[item.slug] = item;
  return accumulator;
}, {});
