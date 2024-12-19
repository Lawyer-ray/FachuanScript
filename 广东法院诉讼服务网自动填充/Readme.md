# 法穿工具箱 | 广东法院诉讼服务网自动填充项目

## 功能介绍
- 自动填充广东法院诉讼服务网登录页面的账号和密码
- 提供便捷的账号密码设置面板
- 支持密码的显示与隐藏
- 本地安全存储账号密码信息

## 公众号：法穿

## 安装说明
1. 首先需要安装 Tampermonkey 浏览器扩展
    - [Chrome版本](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
    - [Firefox版本](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
2. 点击本页面的"Install"按钮安装脚本

## 使用方法
1. 访问广东法院诉讼服务网登录页面
2. 在右上角的设置面板中输入您的账号密码
3. 点击"保存设置"按钮
4. 之后访问登录页面时将自动填充保存的账号密码

## 隐私说明
- 账号密码仅保存在本地浏览器中
- 不会上传或分享您的个人信息
- 建议在个人设备上使用

## 更新日志
### v1.0.0 (2024-12-19)
- 首次发布
- 实现基本的自动填充功能
- 添加账号密码设置面板

### v1.0.3(2024-12-19)
- 增加了两组账号密码保存功能
- 账号密码是使用GM_setValue和GM_getValue两组API保存，存储位置是在本地浏览器的Local Storage\leveldb

## 反馈与支持
如有问题或建议，请访问 [GitHub Issues](https://github.com/Lawyer-ray/FachuanScript.git/issues) 页面反馈