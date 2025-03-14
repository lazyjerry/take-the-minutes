# 會議紀錄產生器

這個專案是一個基於 Cloudflare Workers 的「會議紀錄產生器」。使用者可以透過網頁表單填寫會議相關資訊（包含會議名稱、副標題、地點、出席人員、列席人員，以及富文本編輯的內容），系統會自動產生可視化的會議紀錄頁面，並支援列印成 A4 PDF。會議紀錄頁面中還提供「下載 PDF」按鈕，方便使用者取得最終檔案。

## 線上 Demo

請點擊以下網址查看線上 Demo：  
[https://take-the-minutes.crazyjerry.workers.dev/](https://take-the-minutes.crazyjerry.workers.dev/)

⚠ **請注意：**
- **Demo 網址僅為範例，實際可依您的部署環境做調整。**
- **您可在瀏覽器開發人員工具（F12 或 Ctrl + Shift + I）中執行 `fillFields()` 來測試自動填入功能（若已在程式中實作）。**

---

## 功能特色

- **網頁表單填寫**  
  透過網頁表單輸入「會議名稱、副標題、會議目的、地點、開始/結束時間、出席與列席人員」等資訊，並使用 Quill 富文本編輯器完善「預計內容」、「需討論 / 確認項目」、「備註 / 臨時動議」、「已完成進度」、「待辦事項」等欄位。

- **網頁表單填寫**  
  即時保存功能，更新資料會自動儲存到本地瀏覽器內，不小心刷新頁面也能即時復原。註：PDF 下載以後自動清空。

- **自動產生會議紀錄頁面**  
  表單送出後，系統會將使用者輸入的資料整合到會議紀錄模板中，並進行格式化顯示。所有欄位（包括出席人員、列席人員）都會被即時套用在紀錄頁面內。

- **PDF 下載功能**  
  會議紀錄頁面在右下角提供浮動圓形按鈕「下載 PDF」，使用 [html2pdf.js](https://github.com/eKoopmans/html2pdf.js) 將整個頁面轉換為 PDF 供下載列印。

- **JSON 匯入 / 匯出**  
  表單提供「匯入 JSON」與「匯出 JSON」功能，讓使用者可以快速備份、恢復資料。也支援在瀏覽器本地使用 `localStorage` 存取已填寫的表單資訊，避免重新整理或意外關閉造成資料遺失。

- **富文本編輯器**  
  採用 [Quill](https://quilljs.com/) 為主的富文本編輯器，提供多樣式編排，包括標題、粗體、斜體、連結、清單等，並可插入外部連結方便查閱相關文件。

- **日期 / 時間選擇器**  
  使用 [Flatpickr](https://flatpickr.js.org/) 套件，讓使用者輕鬆選取會議開始/結束日期與時間，免去手動輸入的繁瑣流程。

---

## 部署方式

您可以使用 **Cloudflare Wrangler** 來將此專案部署到 Cloudflare Workers。

### 1. 下載專案

```bash
git clone https://github.com/lazyjerry/take-the-minutes.git
cd take-the-minutes
```

### 2. 修改 `package.json` 版本號

打開 `package.json`，調整 `"version"` 欄位，例如：

```json
{
  "name": "take-the-minutes",
  "version": "1.0.1",
  ...
}
```

### 3. 確認 `wrangler.toml` 或 `wrangler.jsonc` 設定

請打開 `wrangler.toml`（或相應的設定檔），檢查 **Cloudflare 帳戶 ID、專案名稱、相容日期** 等設定是否正確。

### 4. 安裝相依套件

```bash
npm install
```

### 5. 部署至 Cloudflare Workers

```bash
wrangler deploy
```

部署成功後，您的 Worker 將能夠在 `https://take-the-minutes.<你的 workers 網域>.workers.dev/`（或您設定的自訂網域）進行存取。

---

## 自定義

- **介面樣式**  
  您可以編輯 `form.html` 與 `pdf.html` 中的 HTML、CSS 來改變會議紀錄的整體外觀，包括自訂配色、字型以及企業識別圖示等。

- **功能擴充**  
  若您希望引入更進階的功能（例如：與後端資料庫串接、進階 XSS 防護、權限管理），請在 `index.js` 或其他對應檔案中自行實作相關邏輯。

---

## 授權

本專案預設採用 **MIT** 授權，歡迎自由使用、修改與散布。若需其他授權方式，請於您的 fork 或衍生專案中自行註記。 
