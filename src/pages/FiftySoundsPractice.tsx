import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fiftySoundsData, rowNames, practiceTypes, PracticeType } from '@/lib/fiftySoundsData';
import PrintButton from '@/components/PrintButton';
import { cn } from '@/lib/utils';

export default function FiftySoundsPractice() {
  const navigate = useNavigate();
  
  // 状态管理
  const [selectedRows, setSelectedRows] = useState<string[]>(rowNames);
  const [practiceType, setPracticeType] = useState<PracticeType>('romaji-to-hiragana');
  const [randomOrder, setRandomOrder] = useState(true);
  const [practiceItems, setPracticeItems] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // 生成练习项目
  const generatePracticeItems = () => {
    setIsGenerating(true);
    
    // 根据选择的行筛选字符
    let allItems: any[] = [];
    
    fiftySoundsData.rows.forEach(row => {
      if (selectedRows.includes(row.rowName)) {
        row.characters.forEach(char => {
          allItems.push(char);
        });
      }
    });
    
    // 随机排序
    if (randomOrder) {
      allItems = allItems.sort(() => Math.random() - 0.5);
    }
    
    setPracticeItems(allItems);
    setIsGenerating(false);
  };
  
  // 切换行选择
  const toggleRowSelection = (rowName: string) => {
    setSelectedRows(prev => 
      prev.includes(rowName)
        ? prev.filter(r => r !== rowName)
        : [...prev, rowName]
    );
  };
  
  // 全选/取消全选
  const toggleSelectAll = () => {
    setSelectedRows(prev => 
      prev.length === rowNames.length 
        ? [] 
        : [...rowNames]
    );
  };
  
  // 初始生成练习项目
  useEffect(() => {
    generatePracticeItems();
  }, []);
  
  // 根据练习类型获取显示内容
  const getQuestionAndAnswer = (item: any) => {
    switch (practiceType) {
      case 'romaji-to-hiragana':
        return { question: item.romaji, answer: item.hiragana, type: '平假名' };
      case 'romaji-to-katakana':
        return { question: item.romaji, answer: item.katakana, type: '片假名' };
      case 'hiragana-to-romaji':
        return { question: item.hiragana, answer: item.romaji, type: '罗马音' };
      case 'katakana-to-romaji':
        return { question: item.katakana, answer: item.romaji, type: '罗马音' };
      default:
        return { question: item.romaji, answer: item.hiragana, type: '平假名' };
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 顶部导航 */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/')}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mr-4"
              >
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">五十音图默写练习</h1>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* 选项设置区域 */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">练习设置</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 练习类型选择 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                练习类型
              </label>
              <select
                value={practiceType}
                onChange={(e) => setPracticeType(e.target.value as PracticeType)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {practiceTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            
            {/* 随机排序选项 */}
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="randomOrder" 
                checked={randomOrder}
                onChange={(e) => setRandomOrder(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="randomOrder" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                随机排序
              </label>
            </div>
          </div>
          
          {/* 行选择 */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                选择要练习的行
              </label>
              <button
                onClick={toggleSelectAll}
                className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                {selectedRows.length === rowNames.length ? '取消全选' : '全选'}
              </button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {rowNames.map(rowName => (
                <label 
                  key={rowName}
                  className={cn(
                    "flex items-center justify-center p-2 border rounded-md cursor-pointer transition-colors",
                    selectedRows.includes(rowName)
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-400"
                      : "border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500"
                  )}
                > 
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(rowName)}
                    onChange={() => toggleRowSelection(rowName)} 
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{rowName}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* 生成按钮 */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={generatePracticeItems}
              disabled={isGenerating || selectedRows.length === 0}
              className={cn(
                "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200",
                (isGenerating || selectedRows.length === 0) ? "opacity-70 cursor-not-allowed" : ""
              )}
            >
              {isGenerating ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                  生成中...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-sync-alt mr-2"></i>
                  生成练习表
                </>
              )}
            </button>
          </div>
        </div>
        
        {/* 练习表预览区域 */}
        {practiceItems.length > 0 ? (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                练习表预览 ({practiceItems.length} 个项目)
              </h2>
              <PrintButton printElementId="practiceSheet" />
            </div>
            
               <div id="practiceSheet" className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
               {/* 移除标题后的练习表内容 */}
              
              {/* 练习表格 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6">
                {practiceItems.map((item, index) => {
                  const { question, answer, type } = getQuestionAndAnswer(item);
                  return (
                    <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-2">
                       <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 print:text-[7px]">
                          问题 {index + 1}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 print:text-[6px]">
                          ({type})
                        </span>
                      </div>
                      <div className="flex items-center">
                         <span className="text-xs font-semibold text-gray-900 dark:text-white mr-3">
                           {question}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">→</span>
                        <div className="ml-3 flex-grow border-b-2 border-dashed border-gray-300 dark:border-gray-600 h-6"></div>
                      </div>                      
                    </div>
                  );
                })}
              </div>
              
              {/* 答案区域 - 打印时隐藏，实际使用时可以作为单独的答案页 */}
              <div className="mt-12 print:hidden">
                <button 
                  onClick={(e) => {
                    const answerSection = e.target.closest('div')?.nextElementSibling as HTMLElement;
                    if (answerSection) {
                      answerSection.classList.toggle('hidden');
                    }
                  }}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                >
                  <i className="fa-solid fa-eye mr-1"></i> 查看答案
                </button>
                
                <div className="hidden mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"> 
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">答案</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
                    {practiceItems.map((item, index) => {
                      const { question, answer } = getQuestionAndAnswer(item);
                      return (
                        <div key={index} className="text-sm">
                          <span className="font-medium text-gray-900 dark:text-white">{index + 1}. </span>
                          <span className="text-gray-700 dark:text-gray-300">{question} → {answer}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-8 text-center">
            <i className="fa-solid fa-info-circle text-4xl text-blue-500 mb-4"></i>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">未选择任何练习内容</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">请至少选择一行五十音图进行练习</p>
            <button
              onClick={toggleSelectAll}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <i className="fa-solid fa-check-square mr-2"></i>全选所有行
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
