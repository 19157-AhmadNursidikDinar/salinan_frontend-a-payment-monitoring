export const roleAdapter = (role_id) => {
  switch (role_id) {
    case 1:
      return "Admin";
    case 2:
      return "General Support";
    case 3:
      return "Accounting";
    case 4:
      return "User";
    default:
      return undefined;
  }
};

export const branchAdapter = (dataBranch, branch_id) => {
  let result = "";
  const selectedBranch = dataBranch.find((branch) => branch.id === branch_id);
  if (selectedBranch) {
    result = selectedBranch.branch_name;
  }
  return result;
};
