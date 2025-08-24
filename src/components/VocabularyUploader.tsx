import { useState, useRef } from 'react';
import { toast } from 'sonner';
import { parseExcelFile, Word } from '@/lib/excelParser';
import { cn } from '@/lib/utils';

interface VocabularyUploaderProps {
  onWordsLoaded: (words: Word[]) => void;
  className?: string;
}

/**
 * 单词文件上传组件
 * 支持Excel文件上传并解析单词数据
 */
export default function VocabularyUploader({ onWordsLoaded, className = "" }: VocabularyUploaderProps) { 
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // 处理文件上传
  const handleFileUpload = async (file: File) => {
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      toast.error('请上传Excel文件 (.xlsx 或 .xls)');
      return;
    }
    
    setIsProcessing(true);
    setUploadedFileName(file.name);
    
    try {
      const words = await parseExcelFile(file);
      onWordsLoaded(words);      
      toast.success(`成功解析 ${words.length} 个单词`);
      } catch (error) {
        // 显示更详细的错误信息给用户
        const errorMsg = error instanceof Error ? error.message : '解析文件时出错';
        toast.error(`文件解析失败: ${errorMsg}`, { duration: 8000 });
        setUploadedFileName(null);
      } finally {
      setIsProcessing(false);
    }
  };
  
  // 处理拖放事件
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };
  
  // 触发文件选择对话框
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  // 处理文件选择
  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
      // 重置文件输入，以便可以上传相同的文件
      e.target.value = '';
    }
  };
  
  return (
    <div className={cn("w-full", className)}>
      {/* 隐藏的文件输入 */} 
      <input
        type="file"
        ref={fileInputRef}
        accept=".xlsx,.xls"
        onChange={handleFileSelected}
        className="hidden"
      />
      
      {/* 上传区域 */}
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200",
          isDragging 
            ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20" 
            : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 bg-white dark:bg-gray-800",
          isProcessing ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
        )}
        onClick={!isProcessing ? triggerFileInput : undefined}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isProcessing ? (
          <div className="space-y-4">
            <div className="inline-block p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
              <i className="fa-solid fa-spinner fa-spin text-blue-600 dark:text-blue-400 text-xl"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">处理中...</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              正在解析文件内容，请稍候
            </p>
          </div>
        ) : uploadedFileName ? (
          <div className="space-y-4">
            <div className="inline-block p-3 rounded-full bg-green-100 dark:bg-green-900/30">
              <i className="fa-solid fa-check text-green-600 dark:text-green-400 text-xl"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">文件已上传</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto break-all">
              {uploadedFileName}
            </p>
            <button
              onClick={() => {
                setUploadedFileName(null);
                onWordsLoaded([]);
              }}
              className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <i className="fa-solid fa-times-circle mr-1"></i> 更换文件
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="inline-block p-3 rounded-full bg-gray-100 dark:bg-gray-700">
              <i className="fa-solid fa-file-excel text-green-600 dark:text-green-400 text-2xl"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">上传单词Excel文件</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              拖放文件到此处或点击选择文件，支持 .xlsx 和 .xls 格式
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              文件应包含日语和中文列，支持自动识别标题行
            </p>
          </div>
        )}
      </div>
    </div>
  );
}