# 日语学习助手

一个帮助学习日语的React应用，包含五十音图练习和单词表练习功能。

## 功能特点

- 五十音图默写练习：支持罗马音与平假名、片假名互译
- 单词表练习：上传Excel文件进行中日互译练习
- 支持打印练习表功能
- 响应式设计，适配各种设备

## 项目结构

```
.
├── .gitignore
├── README.md
├── index.html
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── src/
│   ├── App.tsx
│   ├── components/
│   ├── contexts/
│   ├── hooks/
│   ├── index.css
│   ├── lib/
│   ├── main.tsx
│   ├── pages/
│   └── vite-env.d.ts
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 安装与使用

1. 克隆仓库
2. 安装依赖：`pnpm install`
3. 开发模式：`pnpm dev`
4. 构建项目：`pnpm build`

## 上传到GitHub的文件清单

以下是所有需要上传到GitHub的文件：

### 根目录文件
- .gitignore
- README.md
- index.html
- package.json
- pnpm-lock.yaml
- postcss.config.js
- tailwind.config.js
- tsconfig.json
- vite.config.ts

### src目录所有文件
- src/App.tsx
- src/index.css
- src/main.tsx
- src/vite-env.d.ts
- src/components/Empty.tsx
- src/components/PrintButton.tsx
- src/components/VocabularyUploader.tsx
- src/contexts/authContext.ts
- src/hooks/useTheme.ts
- src/lib/excelParser.ts
- src/lib/fiftySoundsData.ts
- src/lib/utils.ts
- src/pages/FiftySoundsPractice.tsx
- src/pages/Home.tsx
- src/pages/VocabularyPractice.tsx

## 如何上传到GitHub

1. 将所有上述文件添加到本地仓库：
   ```
   git add .
   ```

2. 提交更改：
   ```
   git commit -m "Initial commit"
   ```

3. 推送到GitHub：
   ```
   git push origin main
   ```

或者，您可以将所有文件压缩为ZIP文件，然后通过GitHub网页界面上传。