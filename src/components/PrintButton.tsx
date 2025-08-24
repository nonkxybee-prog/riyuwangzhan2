import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

interface PrintButtonProps {
  printElementId: string;
  className?: string;
}

/**
 * 打印按钮组件，用于触发指定元素的打印功能
 */
export default function PrintButton({ printElementId, className = "" }: PrintButtonProps) {
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = () => {
    // 获取要打印的元素
    const printElement = document.getElementById(printElementId);
    
    if (!printElement) {
      toast.error("未找到打印内容，请先生成练习表");
      return;
    }

    setIsPrinting(true);
    
    // 创建打印区域
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      toast.error("无法打开打印窗口，请检查浏览器设置");
      setIsPrinting(false);
      return;
    }

    // 获取当前文档的样式
    const styleSheets = Array.from(document.styleSheets);
    let styles = "";
    
    styleSheets.forEach(styleSheet => {
      try {
// @ts-expect-error: Accessing cssRules may have type issues in some environments
        Array.from(styleSheet.cssRules).forEach(rule => {
          styles += rule.cssText;
        });
      } catch (e) {
        console.log("无法访问样式表:", e);
      }
    });

    // 设置打印窗口内容
    printWindow.document.write(`
      <html>
        <head>
          <title>日语学习练习表</title>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
            <style>
              ${styles}
              @page {
                size: 3in auto;
                margin: 0;
                marks: none;
                bleed: 0;
                crop: 0;
                header: none; /* Remove default header */
                footer: none; /* Remove default footer */
              }
              @media print {
                body {
                  margin: 0 !important;
                  padding: 0 !important;
                  height: auto !important;
                  min-height: auto !important;
                }
                body * {
                  visibility: hidden;
                }
                #print-content, #print-content * {
                  visibility: visible;
                }
                #print-content {
                  position: absolute;
                  left: 0;
                  top: 0;
                  transform: none; /* Remove centering transform for narrow paper */
                  width: 3in; /* 3-inch width */margin: 0;
                  padding: 0.25in; /* Add small internal padding */
                  box-sizing: border-box;
                  page-break-after: avoid;
                }
                /* Prevent blank pages */
                html, body {
                  height: 100%;
                  overflow: visible;
                }
              }
            </style>
        </head>
        <body>
          <div id="print-content">${printElement.innerHTML}</div>
        </body>
      </html>
    `);

    printWindow.document.close();
    
    // 等待打印窗口加载完成后执行打印
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
        setIsPrinting(false);
      }, 500);
    };
  };

  return (
    <button
      onClick={handlePrint}
      disabled={isPrinting}
      className={cn(
        "inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200",
        isPrinting ? "opacity-70 cursor-not-allowed" : "",
        className
      )}
    >
      {isPrinting ? (
        <>
          <i className="fa-solid fa-spinner fa-spin mr-2"></i>
          准备打印...
        </>
      ) : (
        <>
          <i className="fa-solid fa-print mr-2"></i>
          打印练习表
        </>
      )}
    </button>
  );
}