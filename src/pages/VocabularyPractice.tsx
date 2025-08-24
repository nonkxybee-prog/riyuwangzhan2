import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VocabularyUploader from '@/components/VocabularyUploader';
import PrintButton from '@/components/PrintButton';
import { Word, shuffleArray } from '@/lib/excelParser';
import { cn } from '@/lib/utils';

// 练习类型定义
type PracticeType = 'jp-to-cn' | 'cn-to-jp';

export default function VocabularyPractice() {
  const navigate = useNavigate();
  
  // 状态管理
  const [allWords, setAllWords] = useState<Word[]>([]);
  const [practiceWords, setPracticeWords] = useState<Word[]>([]);
  const [practiceType, setPracticeType] = useState<PracticeType>('jp-to-cn');
  const [randomOrder, setRandomOrder] = useState(true);
  const [wordCount, setWordCount] = useState(10);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // 处理单词加载完成
  const handleWordsLoaded = (words: Word[]) => {
    setAllWords(words);
    // 默认选择不超过10个单词或所有单词（如果少于10个）
    setWordCount(Math.min(10, words.length));
  };
  
  // 生成练习单词
  const generatePracticeWords = () => {
    if (allWords.length === 0) return;
    
    setIsGenerating(true);
    
    // 复制并打乱单词数组
    let selectedWords = [...allWords];
    
    // 随机排序
    if (randomOrder) {
      selectedWords = shuffleArray(selectedWords);
    }
    
    // 选择指定数量的单词
    selectedWords = selectedWords.slice(0, wordCount);
    
    setPracticeWords(selectedWords);
    setIsGenerating(false);
  };
  
  // 根据练习类型获取问题和答案
  const getQuestionAndAnswer = (word: Word) => {
    if (practiceType === 'jp-to-cn') {
      return {
        question: word.japanese,
        answer: word.chinese,
        questionLabel: '日语', 
        answerLabel: '中文'
      };
    } else {
      return {
        question: word.chinese,
        answer: word.japanese,
        questionLabel: '中文',
        answerLabel: '日语'
      };
    }
  };
  
  // 处理单词数量变化
  const handleWordCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0 && value <= allWords.length) {
      setWordCount(value);
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
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">单词默写练习</h1>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* 文件上传区域 */}
        <div className={cn("mb-8", allWords.length > 0 ? "" : "mb-12")}>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">上传单词文件</h2>
          <VocabularyUploader 
            onWordsLoaded={handleWordsLoaded}
            className="w-full"
          />
        </div>
        
        {allWords.length > 0 ? (
          <>
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
                    <option value="jp-to-cn">日语 → 中文</option>
                    <option value="cn-to-jp">中文 → 日语</option>
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
              
              {/* 单词数量选择 */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  选择默写单词数量 ({wordCount}/{allWords.length})
                </label>
                <input
                  type="range"
                  min="1"
                  max={allWords.length}
                  value={wordCount}
                  onChange={handleWordCountChange}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>1</span>
                  <span>{allWords.length}</span>
                </div>
              </div>
              
              {/* 生成按钮 */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={generatePracticeWords}
                  disabled={isGenerating}
                  className={cn(
                    "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200",
                    isGenerating ? "opacity-70 cursor-not-allowed" : ""
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
            {practiceWords.length > 0 ? (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    单词练习表 ({practiceWords.length} 个单词)
                  </h2>
                  <PrintButton printElementId="vocabularyPracticeSheet" />
                </div>
                
                <div id="vocabularyPracticeSheet" className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                  {/* 练习表头信息 */}
                  <div className="mb-8 text-center">
   <h3 className="text-xs print:text-[9px] font-bold text-gray-900 dark:text-white mb-2">日语单词练习</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      练习类型: {practiceType === 'jp-to-cn' ? '日语 → 中文' : '中文 → 日语'}
                    </p>
                    <p className="text-gray-500 dark:text-gray-500 text-sm mt-1">
                      </p>
                  </div>
                  
                  {/* 练习表格 */}
                  <div className="space-y-6">
                    {practiceWords.map((word, index) => {
                      const { question, answer, questionLabel, answerLabel } = getQuestionAndAnswer(word);
                      return (
                        <div key={word.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              问题 {index + 1} ({questionLabel})
                            </span>
                            {word.pronunciation && (
                              <span className="text-xs text-gray-500 dark:text-gray-400 italic"> 
                                发音: {word.pronunciation}
                              </span>
                            )}
                          </div>
                          
                          <div className="mb-2">
                             <p className="text-sm print:text-[10px] font-semibold text-gray-900 dark:text-white">
                              {question}
                            </p>
                          </div>
                          
                          <div className="flex items-center">
                            <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">
                              {answerLabel}:
                            </span>
                            <div className="flex-grow border-b-2 border-dashed border-gray-300 dark:border-gray-600 h-6 min-h-[24px]"></div>
                          </div>
                          
                          {word.example && (
                            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 italic">
                              例句: {word.example}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* 答案区域 - 打印时隐藏 */}
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
                      <div className="space-y-4">
                        {practiceWords.map((word, index) => {
                          const { question, answer } = getQuestionAndAnswer(word);
                          return (
                            <div key={word.id} className="text-sm">
                              <span className="font-medium text-gray-900 dark:text-white">{index + 1}. </span>
                              <span className="text-gray-700 dark:text-gray-300">{question} → {answer}</span>
                              {word.pronunciation && (
                                <span className="text-gray-500 dark:text-gray-400 ml-2">
                                  ({word.pronunciation})
                                </span>
                              )}
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
                <i className="fa-solid fa-lightbulb text-4xl text-yellow-500 mb-4"></i>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">准备就绪</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  已加载 {allWords.length} 个单词，点击"生成练习表"开始练习
                </p>
                <button
                  onClick={generatePracticeWords}
                  disabled={isGenerating}
                  className={cn(
                    "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200",
                    isGenerating ? "opacity-70 cursor-not-allowed" : ""
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
            )}
          </>
        ) : (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-8 text-center">
            <i className="fa-solid fa-info-circle text-4xl text-blue-500 mb-4"></i>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">尚未上传单词文件</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
              请上传包含日语单词的Excel文件开始练习
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
              <p className="mb-2"><i className="fa-solid fa-check-circle text-green-500 mr-1"></i> 文件应包含日语和中文列</p>
              <p><i className="fa-solid fa-check-circle text-green-500 mr-1"></i> 支持可选的发音和例句列</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}