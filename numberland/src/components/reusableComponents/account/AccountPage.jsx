import React from "react";
import { useParams } from "react-router-dom";
import Account from "./Account";
import data from "../../data/accounts";

export default function AccountPage() {
  const { accountType } = useParams();

  const filteredData = data.filter(
    (account) => account.component === accountType
  );

  return (
    <div>
      {filteredData.map((account, index) => (
        <Account key={index} {...account} />
      ))}
    </div>
  );
}
