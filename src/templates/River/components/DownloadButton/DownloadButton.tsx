import clsx from "clsx";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/ui/Button";
import { downloadPdf } from "@/utils/downloadPdf";

import styles from "./styles.module.scss";

type DownloadButtonProps = {
  isVisible: boolean;
  onShortPdfChange?: (isShort: boolean) => void;
};

export const DownloadButton: FC<DownloadButtonProps> = ({ isVisible, onShortPdfChange }) => {
  const { t } = useTranslation("common");
  const [isLoading, setIsLoading] = useState(false);

  const handleDownloadPdf = () => {
    setIsLoading(true);
    downloadPdf(() => {
      setIsLoading(false);
    });
  };

  const handleDownloadShortPdf = () => {
    setIsLoading(true);
    onShortPdfChange?.(true);
    downloadPdf(() => {
      setIsLoading(false);
      onShortPdfChange?.(false);
    });
  };

  return (
    <div
      className={clsx(styles.button, {
        [styles.visible]: isVisible,
      })}
    >
      <Button onClick={handleDownloadShortPdf} isLoading={isLoading}>
        {t("downloadPdfShort")}
      </Button>

      <Button onClick={handleDownloadPdf} isLoading={isLoading}>
        {t("downloadPdfFull")}
      </Button>
    </div>
  );
};
