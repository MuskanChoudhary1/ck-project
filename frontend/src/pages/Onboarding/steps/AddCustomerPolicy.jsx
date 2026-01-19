import { useState } from "react";
import StepLayout from "../components/StepLayout";
import Step from "../components/Step";
import PolicyBox from "../components/PolicyBox";
import "../Onboarding.css";
import CopyField from "../components/CopyField";


function AddCustomerManagedPolicy({ onNext, onBack }) {

  const customerManagedPolicy = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "CostAudit",
      "Effect": "Allow",
      "Action": [
        "dms:Describe*",
        "dms:List*",
        "kafka:Describe*",
        "kafka:Get*",
        "kafka:List*",
        "mq:Describe*",
        "mq:List*",
        "route53resolver:Get*",
        "route53resolver:List*",
        "memorydb:Describe*",
        "savingsplans:Describe*",
        "cloudsearch:Describe*",
        "quicksight:Describe*",
        "quicksight:List*",
        "codepipeline:Get*",
        "codepipeline:List*",
        "codebuild:List*",
        "codebuild:Get*",
        "codebuild:Describe*",
        "codebuild:BatchGet*",
        "codedeploy:List*",
        "codedeploy:BatchGet*",
        "codedeploy:Get*",
        "mediaconnect:Describe*",
        "mediaconnect:List*",
        "mediaconvert:Describe*",
        "mediaconvert:Get*",
        "mediaconvert:List*",
        "medialive:Describe*",
        "medialive:List*",
        "mediapackage:Describe*",
        "mediapackage:List*",
        "mediapackage-vod:Describe*",
        "mediapackage-vod:List*",
        "mediastore:DescribeObject",
        "mediastore:Get*",
        "mediastore:List*",
        "mediatailor:Describe*",
        "mediatailor:Get*",
        "mediatailor:List*",
        "ec2:Describe*",
        "elasticache:Describe*",
        "events:DescribeEventBus",
        "events:List*",
        "elasticloadbalancing:Describe*",
        "kinesis:List*",
        "kinesis:Describe*",
        "kinesisanalytics:Describe*",
        "kinesisanalytics:List*",
        "dynamodb:Describe*",
        "dynamodb:List*",
        "cloudwatch:Describe*",
        "cloudwatch:List*",
        "cloudwatch:GetMetricStatistics",
        "ecr:GetLifecyclePolicy",
        "ecr:GetRepositoryPolicy",
        "ecr-public:DescribeRepositories",
        "ecr:List*",
        "ecr:Describe*",
        "lambda:List*",
        "lambda:GetPolicy",
        "lambda:GetAccountSettings",
        "lambda:GetFunctionConfiguration",
        "lambda:GetFunctionCodeSigningConfig",
        "lambda:GetFunctionConcurrency",
        "lambda:GetFunctionConfiguration",
        "rds:Describe*",
        "rds:ListTagsForResource",
        "sqs:GetQueueAttributes",
        "sqs:List*",
        "firehose:Describe*",
        "firehose:List*",
        "kafka:Describe*",
        "kafka:List*",
        "glue:GetDevEndpoint",
        "s3:GetBucketPolicy",
        "s3:List*",
        "network-firewall:Describe*",
        "network-firewall:List*",
        "elasticfilesystem:Describe*",
        "kms:Describe*",
        "kms:List*",
        "kms:GetKeyRotationStatus",
        "kms:GetKeyPolicy",
        "elasticmapreduce:List*",
        "es:Describe*",
        "es:List*",
        "es:Get*",
        "aoss:Get*",
        "aoss:List*",
        "logs:Describe*",
        "logs:List*",
        "application-autoscaling:Describe*",
        "route53:List*",
        "redshift:Describe*",
        "backup:Describe*",
        "backup:Get*",
        "backup:List*",
        "dlm:Get*",
        "dlm:List*",
        "sagemaker:List*",
        "lambda:Get*"
      ],
      "Resource": "*"
    },
    {
      "Sid": "BillingReadOnly",
      "Effect": "Allow",
      "Action": [
        "billingconductor:List*",
        "billing:ListBillingViews"
      ],
      "Resource": "*"
    },
    {
      "Sid": "ComputeOptimizerReadAccess",
      "Effect": "Allow",
      "Action": [
        "compute-optimizer:Get*"
      ],
      "Resource": "*"
    },
    {
      "Sid": "CostExplorerAccess",
      "Effect": "Allow",
      "Action": [
        "ce:Describe*",
        "ce:Get*",
        "ce:List*"
      ],
      "Resource": "*"
    },
    {
      "Sid": "CURReportDefinitions",
      "Effect": "Allow",
      "Action": [
        "organizations:Describe*",
        "organizations:List*"
      ],
      "Resource": "*"
    },
    {
      "Sid": "PricingAPIAccess",
      "Effect": "Allow",
      "Action": [
        "pricing:*"
      ],
      "Resource": "*"
    },
    {
      "Sid": "WellArchitectedAccess",
      "Effect": "Allow",
      "Action": [
        "wellarchitected:*"
      ],
      "Resource": "*"
    },
    {
      "Sid": "ReadOnlyForOrgServices",
      "Effect": "Allow",
      "Action": [
        "detective:Describe*",
        "detective:List*",
        "detective:Get*",
        "devops-guru:Describe*",
        "devops-guru:List*",
        "devops-guru:Get*",
        "devops-guru:Search*",
        "guardduty:Describe*",
        "guardduty:Get*",
        "guardduty:List*",
        "inspector:Describe*",
        "inspector:Get*",
        "inspector2:List*",
        "inspector2:Get*",
        "inspector2:Describe*",
        "macie2:Describe*",
        "macie2:Get*",
        "macie2:List*",
        "account:Get*",
        "account:ListRegions",
        "auditmanager:Get*",
        "auditmanager:List*",
        "controltower:Describe*",
        "controltower:Get*",
        "controltower:List*",
        "sso:Describe*",
        "sso:List*",
        "sso:Get*",
        "sso:Search*",
        "sso-directory:Describe*",
        "sso-directory:Get*",
        "sso-directory:List*",
        "sso-directory:Search*",
        "aws-marketplace:DescribeAgreement",
        "aws-marketplace:Get*",
        "aws-marketplace:List*",
        "aws-marketplace:ViewSubscriptions",
        "aws-marketplace:SearchAgreements",
        "networkmanager:DescribeGlobalNetworks",
        "networkmanager:Get*",
        "networkmanager:List*",
        "trustedadvisor:Describe*",
        "trustedadvisor:List*",
        "cloudtrail:Describe*",
        "cloudtrail:Get*",
        "cloudtrail:List*",
        "cloudtrail:LookupEvents",
        "cloudformation:Describe*",
        "cloudformation:Get*",
        "cloudformation:List*",
        "compute-optimizer:DescribeRecommendationExportJobs",
        "config:Describe*",
        "config:Get*",
        "config:List*",
        "ds:Describe*",
        "ds:Get*",
        "ds:List*",
        "fms:Get*",
        "fms:List*",
        "access-analyzer:Get*",
        "access-analyzer:List*",
        "healthlake:Describe*",
        "healthlake:GetCapabilities",
        "healthlake:List*",
        "healthlake:ReadResource",
        "healthlake:Search*",
        "health:Describe*",
        "license-manager:Get*",
        "license-manager:List*",
        "servicecatalog:Describe*",
        "servicecatalog:Get*",
        "servicecatalog:List*",
        "servicecatalog:ScanProvisionedProducts",
        "servicecatalog:Search*",
        "securityhub:Describe*",
        "securityhub:Get*",
        "securityhub:List*",
        "ssm:Describe*",
        "ssm:List*",
        "ram:Get*",
        "ram:List*",
        "servicequotas:Get*",
        "servicequotas:List*",
        "s3:Describe*",
        "license-manager:GetGrant",
        "license-manager:ListTokens",
        "license-manager-user-subscriptions:List*"
      ],
      "Resource": "*"
    }
  ]
}`;

  return (
    <StepLayout
      title="Add Customer Managed Policies"
      subtitle="Create an Inline policy for the role by following these steps"
      onBack={onBack}
      onNext={onNext}
      nextLabel="Next - Create Cost & Usage Report"
      // nextDisabled={!policyArn}
    >
      <Step number={1}>
        Go to the{" "}
        <a
          href="https://us-east-1.console.aws.amazon.com/iamv2/home#/policies/create"
          target="_blank"
          rel="noreferrer"
        >
          Create Policy{" "}
        </a>{" "}
        page.
      </Step>

      <Step number={2}>
        Click on the <b>JSON</b> tab and paste the following policy and click on
        Next:
      </Step>

      <PolicyBox policy={customerManagedPolicy} />

      <Step number={3}>
        In the <b>Name</b> field, enter below-mentioned policy name and click on
        Create Policy
      </Step>

      {/* <div className="readonly-input">cktuner-CostAuditPolicy</div> */}
      <CopyField value="cktuner-CostAuditPolicy" />
      

      <Step number={4}>
        Again, go to the{" "}
        <a
          href="https://us-east-1.console.aws.amazon.com/iamv2/home#/policies/create"
          target="_blank"
          rel="noreferrer"
        >
          Create Policy
        </a>{" "}
        page.
      </Step>

      <Step number={5}>
        Click on the <b>JSON</b> tab and paste the following policy and click on
        Next:
      </Step>

      <PolicyBox policy={customerManagedPolicy} />

      <Step number={6}>
        In the <b>Name</b> field, enter below-mentioned policy name and click on
        Create Policy
      </Step>

      {/* <div className="readonly-input">cktuner-SecAuditPolicy</div> */}
            <CopyField value="cktuner-SecAuditPolicy" />


      <Step number={7}>
        Again, go to the{" "}
        <a
          href="https://us-east-1.console.aws.amazon.com/iamv2/home#/policies/create"
          target="_blank"
          rel="noreferrer"
        >
          Create Policy Page
        </a>
        .
      </Step>

      <Step number={8}>
        Click on the JSON tab and paste the following policy and click on Next:
      </Step>

      <PolicyBox policy={customerManagedPolicy} />

      <Step number={9}>
        In the <b>Name</b> field, enter below-mentioned policy name and click on
        Create Policy
      </Step>

      {/* <div className="readonly-input">cktuner-TunerReadEssentials</div> */}
      <CopyField value="ktuner-TunerReadEssentials" />


      <Step number={10}>
        Go to the <a href="https://us-east-1.console.aws.amazon.com/iamv2/home#/roles/CK-Tuner-Role" target="_blank" rel="noreferrer">CK-Tuner-Role</a>
      </Step>

      <img
        className="image-container"
        src="/images/ARN.png"
        alt="Attach Customer Managed Policy"
      />

      <Step number={11}>
        In Permission policies, click on <b>Add permissions &gt; Attach Policy</b>.
      </Step>

      <img
        className="image-container"
        src="/images/ARN.png"
        alt="Attach Customer Managed Policy Step 2"
      />

      <Step number={12}>
        Filter by Type &gt; Customer managed then search for <b>cktuner-CostAuditPolicy, cktuner-SecAuditPolicy, cktuner-TunerReadEssentials</b> and select them.
      </Step>

      <img
        className="image-container"
        src="/images/ARN.png"
        alt="Attach Customer Managed Policy Step 3"
      />
      
      <Step number={13}>
        Now, click on <b>Add permissions</b>
      </Step>

    </StepLayout>
  );
}

export default AddCustomerManagedPolicy;
