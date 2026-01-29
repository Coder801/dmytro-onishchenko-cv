import clsx from "clsx";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/ui/Button";
import { downloadPdf } from "@/utils/downloadPdf";

import styles from "./styles.module.scss";

type DownloadButtonProps = {
  onExpandWorkHistory?: () => void;
  className?: string;
};

const EXPAND_DELAY_MS = 1000;

export const DownloadButton: FC<DownloadButtonProps> = ({
  onExpandWorkHistory,
  className,
}) => {
  const { t } = useTranslation("common");
  const [isLoading, setIsLoading] = useState(false);

  const handleDownloadPdfFull = () => {
    setIsLoading(true);
    onExpandWorkHistory?.();
    setTimeout(() => {
      downloadPdf(() => {
        setIsLoading(false);
      });
    }, EXPAND_DELAY_MS);
  };

  const handleDownloadPdfShort = () => {
    setIsLoading(true);
    downloadPdf(() => {
      setIsLoading(false);
    });
  };

  return (
    <div className={clsx(styles.button, className)}>
      <Button onClick={handleDownloadPdfShort} isLoading={isLoading}>
        {t("downloadPdfShort")}
      </Button>

      <Button onClick={handleDownloadPdfFull} isLoading={isLoading}>
        {t("downloadPdfFull")}
      </Button>
    </div>
  );
};
