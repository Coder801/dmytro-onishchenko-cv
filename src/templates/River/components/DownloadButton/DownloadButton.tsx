import clsx from "clsx";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/ui/Button";
import { downloadPdf } from "@/utils/downloadPdf";

import styles from "./styles.module.scss";

type DownloadButtonProps = {
  isVisible: boolean;
};

export const DownloadButton: FC<DownloadButtonProps> = ({ isVisible }) => {
  const { t } = useTranslation("common");
  const [isLoading, setIsLoading] = useState(false);

  const handleDownloadPdf = () => {
    setIsLoading(true);
    downloadPdf(() => {
      setIsLoading(false);
    });
  };

  return (
    <div
      className={clsx(styles.button, {
        [styles.visible]: isVisible,
      })}
    >
      <Button onClick={handleDownloadPdf} isLoading={isLoading}>
        {t("downloadPdf")}
      </Button>
    </div>
  );
};
