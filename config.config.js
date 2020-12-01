var url = "http://ec2-18-216-174-43.us-east-2.compute.amazonaws.com";
var port = "8001";
var databaseUrl = "mongodb://localhost:27017/Aqsit";
var username = "aaqsitadmin";
var password = "aaqsitadmin";

var PaytmConfig = {
  mid: "yyVflW74983216648322",
  key: "r&yU9ebd3c6YSQu5",
  website: "DEFAULT",
};
var price = "100";
var smsgateway = {
  apikey: "USsCj1sPEu4-nv8NUjw8DNx3JpK48SldvHHwSQrjU4",
  username: "trishananalyst@gmail.com",
  sender: "ADIOTP",
  hash: "4d5a9bf8e8d205099abd95303a989178c96d606615da07ab02d4da1736d6e66f",
};
var ProjectStage = [
  "Concept",
  "Design ",
  "Execution",
  "Final Touch",
  "Project Completed",
];
var DesignStyle = [
  {
    name: "Modern",
    image: "Modern.jpg",
  },
  {
    name: "Contemporary",
    image: "Contemporary.jpg",
  },
  {
    name: "Minimalist",
    image: "Minimalist.jpg",
  },
  {
    name: "Industrial",
    image: "Industrial.jpg",
  },
  {
    name: "Traditional",
    image: "Traditional.jpg",
  },
  {
    name: "Transitional",
    image: "Transitional.jpg",
  },
  {
    name: "Rustic",
    image: "Rustic.jpg",
  },
  {
    name: "Mid Century Modern",
    image: "Mid_Century_Modern.jpg",
  },
  {
    name: "Scandinavian",
    image: "Scandinavian.jpg",
  },
  {
    name: "French Country",
    image: "French_Country.jpg",
  },
  {
    name: "Bohemian",
    image: "Bohemian.jpg",
  },
  {
    name: "Shabby Chic",
    image: "Shabby_Chic.jpg",
  },
  {
    name: "Coastal",
    image: "Coastal.jpg",
  },
  {
    name: "Hollywood Glam",
    image: "Hollywood_Glam.jpg",
  },
  {
    name: "Eclectic",
    image: "Eclectic.jpg",
  },
];
var ClientBriefQuestions = [
  { question: "Family Description" },
  { question: "Kitchen Description" },
  { question: "Bathroom Description" },
  { question: "Bedroom Description" },
  { question: "Kids Room Description" },
  { question: "Living Room Description" },
];

var ContactCategoery = [
  {
    categoery: "Client",
  },
  {
    categoery: "Vendor",
  },
];
var SpendCategories = [
  {
    categoery: "Design Fee",
  },
];

var Column = [
  { title: "To do" },
  { title: "In Progress" },
  { title: "Completed" },
];

// sender : "TXTLCL",
// var nodemailer = {ADIOTP
//     email : "DoNotReply@adios.world",
//     password : "@adios123"
// }

var nodemailer = {
  email: "adios.do.not.reply@gmail.com",
  password: "@adios123",
};

var sms = {
  apiKey: "290315AxJ3hIL05d5ba6a9",
  senderId: "AQSIND",
  smsType: "4",
};

module.exports = {
  url: url,
  port: port,
  databaseUrl: databaseUrl,
  username: username,
  password: password,
  PaytmConfig: PaytmConfig,
  price: price,
  smsgateway: smsgateway,
  nodemailer: nodemailer,
  ProjectStates: ProjectStage,
  ClientBriefQuestions: ClientBriefQuestions,
  DesignStyle: DesignStyle,
  ContactCategoery: ContactCategoery,
  SpendCategories: SpendCategories,
  Column: Column,
  sms: sms,
};
