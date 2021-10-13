export const convertActionToChipColor = (action) => {
    let result = "grey";
    if (action.startsWith("Rejected")) {
      result = "red";
    } else if (action.startsWith("Disetujui")) {
      result = "green";
    } else if (action.startsWith("Menunggu")) {
      result = "blue";
    }
    return result;
  };