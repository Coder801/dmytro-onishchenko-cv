import { useRouter } from "next/router";

import { ResumeView } from "@/components/ResumeView";

const JobResumePage = () => {
  const router = useRouter();
  const company = router.query.company as string | undefined;
  const role = router.query.role as string | undefined;

  if (!router.isReady || !company || !role) {
    return null;
  }

  return <ResumeView resumeQuery={{ company, role }} />;
};

export default JobResumePage;
