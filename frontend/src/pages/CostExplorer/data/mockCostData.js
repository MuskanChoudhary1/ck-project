// export const costChartData = [
//   { label: "Jul 2025", value: "42441" },
//   { label: "Aug 2025", value: "36717" },
//   { label: "Sep 2025", value: "38043" },
//   { label: "Oct 2025", value: "33826" },
//   { label: "Nov 2025", value: "31355" },
//   { label: "Dec 2025", value: "29059" },
// ];


export const costChartData = {
  categories: [
    {
      category: [
        { label: "Jul 2025" },
        { label: "Aug 2025" },
        { label: "Sep 2025" },  
        { label: "Oct 2025" },
        { label: "Nov 2025" },
        { label: "Dec 2025" },
      ],
    },
  ],

  dataset: [
    {
      seriesname: "Amazon EC2",
      data: [
        { value: 42441 },
        { value: 36717 },
        { value: 38043 },
        { value: 33826 },
        { value: 31355 },
        { value: 29059 },
      ],
    },
    {
      seriesname: "Amazon S3",
      data: [
        { value: 15200 },
        { value: 14100 },
        { value: 14850 },
        { value: 13200 },
        { value: 12500 },
        { value: 11800 },
      ],
    },
    {
      seriesname: "AWS Lambda",
      data: [
        { value: 6200 },
        { value: 5900 },
        { value: 6100 },
        { value: 5800 },
        { value: 5600 },
        { value: 5400 },
      ],
    },
    {
      seriesname: "Amazon RDS",
      data: [
        { value: 18300 },
        { value: 17500 },
        { value: 17900 },
        { value: 17000 },
        { value: 16500 },
        { value: 15800 },
      ],
    },
  ],
};


export const costTableData = [
  {
    service: "Amazon EC2",
    Jul: "$42,441",
    Aug: "$36,717",
    Sep: "$38,043",
    Oct: "$33,826",
    Nov: "$31,355",
    Dec: "$29,059",
    total: "$211,441",
  },
  {
    service: "Amazon S3",
    Jul: "$15,200",
    Aug: "$14,100",
    Sep: "$14,850",
    Oct: "$13,200",
    Nov: "$12,500",
    Dec: "$11,800",
    total: "$81,650",
  },
  {
    service: "AWS Lambda",
    Jul: "$6,200",
    Aug: "$5,900",
    Sep: "$6,100",
    Oct: "$5,800",
    Nov: "$5,600",
    Dec: "$5,400",
    total: "$35,000",
  },
  {
    service: "Amazon RDS",
    Jul: "$18,300",
    Aug: "$17,500",
    Sep: "$17,900",
    Oct: "$17,000",
    Nov: "$16,500",
    Dec: "$15,800",
    total: "$103,000",
  },
  {
    service: "Amazon CloudFront",
    Jul: "$8,500",
    Aug: "$8,200",
    Sep: "$8,350",
    Oct: "$7,900",
    Nov: "$7,500",
    Dec: "$7,200",
    total: "$47,650",
  },

];
