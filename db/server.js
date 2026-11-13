/**
 * 数据服务器 server.js
 * 作者：胡文豪
 * 时间：2026-11-13
 * 功能：提供 db.json 的 poems 数据接口，端口 3004
 */

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3004;

// 允许跨域（HTML 文件可能在其他端口访问）
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

/**
 * 静态图片服务：http://localhost:3004/images/6.jpg
 * 指向 db/images 目录
 */
app.use('/images', express.static(path.join(__dirname, 'images')));

/**
 * GET /api/poems
 * 返回 db.json 中 poems 数组
 */
app.get('/api/poems', (req, res) => {
  const dbPath = path.join(__dirname, 'db.json');
  fs.readFile(dbPath, 'utf-8', (err, data) => {
    if (err) {
      res.status(500).json({ error: '读取 db.json 失败' });
      return;
    }
    try {
      const json = JSON.parse(data);
      res.json(json.poems || []);
    } catch (e) {
      res.status(500).json({ error: 'db.json 格式错误' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`数据服务器已启动: http://localhost:${PORT}/api/poems`);
});
