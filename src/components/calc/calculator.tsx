import { FileService } from "@site/src/utils/FileManager";
import { useEffect } from "react";

declare const PxpCalcManager: any;

export default function PxpCalculator(props: { materialType: string }) {
  useEffect(() => {
    init();
  }, []);
  const init = async () => {
    await FileService.loadScript(
      "https://demo.pixlpark.ru/api/calc/externalCalc?isAdminPanel=true"
    );
    let container = document.getElementById("integratedCalculator");
    let params = {
      materialType: props.materialType,
    };
    let integrated = new PxpCalcManager(container, params);
    if (window.innerWidth <= 800) {
      (window as any).onCompleteLoadPxpCalc = (calc) => {
        calc.totalPriceCalculator.stickyBlock.isEnable(false);
        calc.totalPriceCalculator.stickyBlock.isEnable.subscribe((val) => {
          calc.totalPriceCalculator.stickyBlock.isEnable(false);
        });
      };
    }
  };
  return (
    <div
      id="integratedCalculator"
      className="url-document-printing"
      style={{ position: "relative", minHeight: "150px" }}
    />
  );
}
