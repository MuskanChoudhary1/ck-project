import { useState } from "react";
import StepLayout from "../components/StepLayout";
import Step from "../components/Step";
import PolicyBox from "../components/PolicyBox";
import "../Onboarding.css";
import CopyField from "../components/CopyField";
import { useAuth } from "../../../context/AuthContext";

function IamRoleSetup({
  roleArn,
  setRoleArn,
  accountId,
  setAccountId,
  accountName,
  setAccountName,
  onNext,
}) {
  const policy = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::951485052809:role/ck-tuner-nonprod-transitive-role"
      },
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": {
          "sts:ExternalId": "MU1HX0RFRkFVTFQwMzM5NTZlYS1kMDE3LTRjYmQtYjY3ZS1jMGI4NWJjY2U4Yzk="
        }
      }
    },
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "s3.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}`;

  const { isReadOnly } = useAuth();

  const [errors, setErrors] = useState({
    roleArn: "",
    accountId: "",
    accountName: "",
  });

  const validate = () => {
    let newErrors = {};

    if (!roleArn.trim()) {
      newErrors.roleArn = "Role ARN is required";
    }

    if (!accountId.trim()) {
      newErrors.accountId = "Account ID is required";
    } else if (!/^\d{10}$/.test(accountId)) {
      newErrors.accountId = "Account ID must be 10 digits";
    }

    if (!accountName.trim()) {
      newErrors.accountName = "Account Name is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return (
    <StepLayout
      title="Create an IAM Role"
      subtitle="Create an IAM Role by following these steps"
      // onNext={() => {
      //   if (validate()) {
      //     onNext();
      //   }
      // }}
      onNext={() => {
        if (validate()) {
          onNext();
        }
      }}
      nextLabel="Next - Add Customer Managed Policies"
      nextDisabled={isReadOnly}
      // nextLabel="Next - Add Customer Managed Policies"
      // nextDisabled={!roleArn}
      // nextDisabled={!roleArn || !accountId || !accountName}
    >
      <Step number={1}>
        Log into AWS account & &nbsp;
        <a
          href="https://us-east-1.console.aws.amazon.com/iamv2/home#/roles/create"
          target="_blank"
          rel="noreferrer"
        >
          Create an IAM Role
        </a>
      </Step>

      <Step number={2}>
        In the <i>Trusted entity type</i> section, select{" "}
        <b>Custom trust policy</b>. Replace the prefilled policy with the policy
        provided below:
      </Step>

      <PolicyBox policy={policy} />

      <Step number={3}>
        Click on <b>Next</b> to go to the <i>Add permissions page</i>. We would
        not be adding any permissions for now because the permission policy
        content will be dependent on the AWS Account ID retrieved from the IAM
        Role. Click on <b>Next</b>.
      </Step>

      <Step number={4}>
        In the <i>Role name field</i>, enter the below-mentioned role name, and
        click on <b>Create Role</b>:
      </Step>

      {/* <div className="readonly-input">CK-Tuner-Role-dev2</div> */}

      <CopyField value="CK-Tuner-Role-dev2" />

      <Step number={5}>
        Go to the newly create IAM Role and copy the Role ARN -
      </Step>

      <img className="image-container" src="/images/ARN.png" alt="Role ARN" />

      <div className="iam-inputs">
        <Step number={6}>Paste the copied Role ARN below -</Step>

        <input
          type="text"
          className="input"
          placeholder="Enter IAM Role ARN"
          value={roleArn}
          onChange={(e) => {
            setRoleArn(e.target.value);
            setErrors({ ...errors, roleArn: "" });
          }}
        />
        {errors.roleArn && <p className="error-text">{errors.roleArn}</p>}

        <Step number={7}>Enter Account ID -</Step>

        <input
          type="text"
          className="input"
          placeholder="Enter Account ID"
          value={accountId}
          onChange={(e) => {
            setAccountId(e.target.value);
            setErrors({ ...errors, accountId: "" });
          }}
        />
        {errors.accountId && <p className="error-text">{errors.accountId}</p>}

        <Step number={8}>Enter Account name -</Step>

        <input
          type="text"
          className="input"
          placeholder="Enter Account Name"
          value={accountName}
          onChange={(e) => {
            setAccountName(e.target.value);
            setErrors({ ...errors, accountName: "" });
          }}
        />
        {errors.accountName && (
          <p className="error-text">{errors.accountName}</p>
        )}
      </div>
    </StepLayout>
  );
}

export default IamRoleSetup;
