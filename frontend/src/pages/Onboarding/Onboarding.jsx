
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import IamRoleSetup from "./steps/IamRoleSetup";
import AddCustomerManagedPolicy from "./steps/AddCustomerPolicy";
import CreateCostUsageReport from "./steps/CreateCostUsageReport";

function Onboarding() {
  const [step, setStep] = useState(1);

  const [roleArn, setRoleArn] = useState("");
  const [accountId, setAccountId] = useState("");
  const [accountName, setAccountName] = useState("");

  return (
    <>
      {step === 1 && (
        <IamRoleSetup
          roleArn={roleArn}
          setRoleArn={setRoleArn}
          accountId={accountId}
          setAccountId={setAccountId}
          accountName={accountName}
          setAccountName={setAccountName}
          onNext={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <AddCustomerManagedPolicy
          onNext={() => setStep(3)}
          onBack={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <CreateCostUsageReport
          roleArn={roleArn}
          accountId={accountId}
          accountName={accountName}
          onBack={() => setStep(2)}
          onNext={() => alert("All steps completed!")}
        />
      )}
    </>
  );
}


export default Onboarding;
 