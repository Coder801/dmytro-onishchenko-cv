import clsx from "clsx";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/ui/Button";
import { trackEvent } from "@/utils";
import { downloadPdf } from "@/utils/downloadPdf";

import styles from "./styles.module.scss";

type DownloadButtonProps = {
  onCollapseWorkHistory?: () => void;
  className?: string;
};

export const DownloadButton: FC<DownloadButtonProps> = ({
  onCollapseWorkHistory,
  className,
}) => {
  const { t } = useTranslation("common");
  const [isLoadingFull, setIsLoadingFull] = useState(false);
  const [isLoadingShort, setIsLoadingShort] = useState(false);
  const isDisabled = isLoadingFull || isLoadingShort;

  const handleDownloadPdfFull = () => {
    setIsLoadingFull(true);
    trackEvent({
      action: "download_pdf",
      category: "PDF",
      label: "full",
    });
    downloadPdf(
      () => {
        setIsLoadingFull(false);
      },
      { showAllWorkHistory: true },
    );
  };

  const handleDownloadPdfShort = () => {
    setIsLoadingShort(true);
    trackEvent({
      action: "download_pdf",
      category: "PDF",
      label: "short",
    });
    onCollapseWorkHistory?.();
    downloadPdf(() => {
      setIsLoadingShort(false);
    });
  };

  return (
    <div className={clsx(styles.buttons, className)}>
      <Button
        onClick={handleDownloadPdfShort}
        disabled={isDisabled}
        isLoading={isLoadingShort}
        className={styles.button}
      >
        {t("downloadPdf")} <span>({t("downloadLastThreeJobs")})</span>
      </Button>

      <Button
        onClick={handleDownloadPdfFull}
        disabled={isDisabled}
        isLoading={isLoadingFull}
        className={styles.button}
      >
        {t("downloadPdf")} <span>({t("downloadFullCv")})</span>
      </Button>
    </div>
  );
};
