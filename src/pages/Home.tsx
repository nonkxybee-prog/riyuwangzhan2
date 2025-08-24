import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="py-8 px-4 text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">日语学习助手</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
          高效的日语学习工具，帮助你掌握五十音图和扩大日语词汇量
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Fifty Sounds Card */}
          <Link 
            to="/fifty-sounds" 
            className={cn(
              "group relative rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1",
              "border border-gray-100 dark:border-gray-700"
            )}
          > 
            <div className="p-8 h-full flex flex-col">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                <i className="fa-solid fa-table text-2xl text-blue-600 dark:text-blue-400"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">五十音图默写练习</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-auto">
                练习罗马音与平假名、片假名的互译默写，可选择特定行，支持随机排序和打印功能。
              </p>
              <div className="mt-6 inline-flex items-center text-blue-600 dark:text-blue-400 font-medium">
                开始练习
                <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
              </div>
            </div>
          </Link>

          {/* Vocabulary Card */}
          <Link 
            to="/vocabulary" 
            className={cn(
              "group relative rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1",
              "border border-gray-100 dark:border-gray-700"
            )} 
          >
            <div className="p-8 h-full flex flex-col">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-200 dark:group-hover:bg-green-800 transition-colors">
                <i className="fa-solid fa-file-import text-2xl text-green-600 dark:text-green-400"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">单词表默写练习</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-auto">
                上传自己的单词Excel文件，系统自动识别单词数量，可以选择中日互译默写，支持随机排序和打印。 
              </p>
              <div className="mt-6 inline-flex items-center text-green-600 dark:text-green-400 font-medium">
                开始练习
                <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
              </div>
            </div>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-500 dark:text-gray-400">
          <p>日语学习助手 &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}