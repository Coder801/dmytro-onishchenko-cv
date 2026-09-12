import { useRouter } from "next/router";

import { ResumeView } from "@/components/ResumeView";

const ResumeVariantPage = () => {
  const router = useRouter();
  const variant = router.query.variant as string | undefined;

  if (!router.isReady || !variant) {
    return null;
  }

  return <ResumeView resumeQuery={{ profile: variant }} />;
};

export default ResumeVariantPage;
