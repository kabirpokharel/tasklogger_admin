const stringCase = (text, caseType) => {
  switch (caseType) {
    case "upper":
      return text.toUpperCase();
    case "lower":
      return text.toLowerCase();
    case "capitalize":
      const words = text.toLowerCase().split(" ");
      const capitalizedTextArray = words.map((w, i) => w.charAt(0).toUpperCase() + w.substr(1));
      return capitalizedTextArray.join(" ");
    default:
      return text;
  }
};

export default stringCase;
