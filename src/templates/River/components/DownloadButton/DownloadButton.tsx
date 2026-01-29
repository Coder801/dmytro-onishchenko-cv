import clsx from "clsx";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/ui/Button";
import { downloadPdf } from "@/utils/downloadPdf";

import styles from "./styles.module.scss";

type DownloadButtonProps = {
  onExpandWorkHistory?: () => void;
  onCollapseWorkHistory?: () => void;
  className?: string;
};

const EXPAND_DELAY_MS = 1000;

export const DownloadButton: FC<DownloadButtonProps> = ({
  onExpandWorkHistory,
  onCollapseWorkHistory,
  className,
}) => {
  const { t } = useTranslation("common");
  const [isLoadingFull, setIsLoadingFull] = useState(false);
  const [isLoadingShort, setIsLoadingShort] = useState(false);
  const isDisabled = isLoadingFull || isLoadingShort;

  const handleDownloadPdfFull = () => {
    setIsLoadingFull(true);
    onExpandWorkHistory?.();
    setTimeout(() => {
      downloadPdf(() => {
        setIsLoadingFull(false);
      });
    }, EXPAND_DELAY_MS);
  };

  const handleDownloadPdfShort = () => {
    setIsLoadingShort(true);
    onCollapseWorkHistory?.();
    downloadPdf(() => {
      setIsLoadingShort(false);
    });
  };

  return (
    <div className={clsx(styles.button, className)}>
      <Button
        onClick={handleDownloadPdfShort}
        disabled={isDisabled}
        isLoading={isLoadingShort}
      >
        {t("downloadPdfShort")}
      </Button>

      <Button
        onClick={handleDownloadPdfFull}
        disabled={isDisabled}
        isLoading={isLoadingFull}
      >
        {t("downloadPdfFull")}
      </Button>
    </div>
  );
};
