import { useRouter } from "next/router";

import { ResumeView } from "@/components/ResumeView";

const RolePage = () => {
  const router = useRouter();
  const role = router.query.role as string | undefined;

  if (!router.isReady || !role) {
    return null;
  }

  return <ResumeView resumeQuery={{ role }} />;
};

export default RolePage;
