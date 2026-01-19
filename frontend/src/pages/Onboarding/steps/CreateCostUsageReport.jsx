import StepLayout from "../components/StepLayout";
import Step from "../components/Step";
import "../Onboarding.css";
import CopyField from "../components/CopyField";
import { createAccount } from "../../../api/accountApi";
import { toast } from "react-toastify";

function CreateCostUsageReport({ roleArn, accountId, accountName, onNext, onBack }) {

    const handleSaveAndNext = async () => {
    if (!roleArn || !accountId || !accountName) {
      toast.error("Please fill all account details before proceeding!");
      return;
    }

    try {
      await createAccount({
        arn: roleArn,
        accountId,
        accountName
      });
      toast.success("AWS Account saved successfully!");
      onNext();
    } catch (err) {
      if (err.response?.status === 409) {
        toast.error("AWS account already exists!");
      } else {
        toast.error("Failed to save AWS account!");
        console.error(err);
      }
    }
  };


  return (
    <StepLayout
      title="Create Cost & Usage Report"
      subtitle="Create a Cost & Usage Report by following these steps"
      onBack={onBack}
      onNext={handleSaveAndNext}
      nextLabel="Next - Review & Finish"
    >


      <Step number={1}>
        Go to{" "}
        <a
          href="https://console.aws.amazon.com/billing/home#/reports"
          target="_blank"
          rel="noreferrer"
        >
          Cost and Usage Reports
        </a>{" "}
        in the Billing Dashboard and click on <b>Create report</b>.
      </Step>



      <Step number={2}>
         Name the report as shown below and select the <b>Include resource IDs</b> checkbox -
      </Step>

      {/* <div className="readonly-input">
        ck-tuner-275595855473-hourly-cur
      </div> */}
      <CopyField value="ck-tuner-275595855473-hourly-cur" />
      


      <div className="step image-step">
        <img
          src="/images/ARN.png"
          alt="Configuration Details"
          className="image-container"
        />
      </div>

      {/* <Step>
        Ensure the above configuration is checked and click <b>Next</b>.
      </Step> */}

    
      <Step number={3}>
        In <i>Configure S3 Bucket</i>, provide the name of the S3 bucket that was created -
      </Step>

      <div className="step image-step">
        <img
          src="/images/ARN.png"
          alt="S3 Bucket Configuration"
          className="image-container"
        />
      </div>


      <Step number={4}>
        In the <i>Delivery options</i> section, enter the below-mentioned Report path prefix -
      </Step>


      {/* <div className="step readonly-input">
        Report path prefix: <b>275595855473</b>
      </div> */}

      <CopyField value="275595855473" />


      {/* <div className="step">
        Additionally, ensure that the following checks are in place
        <ul className="checklist">
          <li>
            <p>Time granularity:</p><b> Hourly</b>
          </li>
          <li>
            <b>Enable report data integration for:</b> Amazon QuickSight
          </li>
        </ul>
      </div> */}

      <div className="step image-step">
        <img
          src="/images/ARN.png"
          alt="QuickSight Integration"
          className="image-container"
        />
      </div>

    
      <Step number={5}>
         Click on <b>Next</b>. Now, review the configuration of the Cost and Usage Report. Once satisfied, click on <b>Create Report</b>.
      </Step>
    </StepLayout>
  );
}

export default CreateCostUsageReport;
