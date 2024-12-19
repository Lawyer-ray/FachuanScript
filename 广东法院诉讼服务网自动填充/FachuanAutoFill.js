// ==UserScript==
// @name         法穿工具箱
// @name:en      Law Tools Box
// @version      1.0.2
// @description  自动填写广东法院诉讼服务网账号密码，支持律师和个人账号登录
// @description:en Null
// @namespace    https://greasyfork.org/zh-CN/users/1412891-lawyer-ray
// @author       Kaisa
// @match        https://ssfw.gdcourts.gov.cn/web/loginA?action=lawyer_login
// @match        https://ssfw.gdcourts.gov.cn/web/loginA
// @match        https://ssfw.gdcourts.gov.cn/web/loginA?action=uc&identification=0
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    // 添加设置面板的样式
    GM_addStyle(`
        .settings-panel {
            position: fixed;
            top: 10px;
            right: 10px;
            background: white;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            z-index: 9999;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
        .settings-panel input {
            margin: 5px 0;
            padding: 3px;
            width: 200px;
        }
        .settings-panel button {
            margin-top: 5px;
            padding: 5px 10px;
            background: #4CAF50;
            color: white;
            border: none;
            border-radius: 3px;
            cursor: pointer;
        }
        .settings-panel button:hover {
            background: #45a049;
        }
        .password-container {
            position: relative;
            display: flex;
            align-items: center;
        }
        .toggle-password {
            position: absolute;
            right: 5px;
            cursor: pointer;
            user-select: none;
            color: #666;
        }
        .panel-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }
        .close-button {
            cursor: pointer;
            color: #666;
            font-size: 18px;
            padding: 5px;
            line-height: 1;
        }
        .close-button:hover {
            color: #333;
        }
    `);

    // 创建设置面板
    function createSettingsPanel() {
        const panel = document.createElement('div');
        panel.className = 'settings-panel';
        panel.innerHTML = `
            <div class="panel-header">
                <h4 style="margin: 0;">登录信息设置</h4>
                <span class="close-button" title="关闭面板">×</span>
            </div>
            <input type="text" id="username-setting" placeholder="账号" value="${GM_getValue('username', '')}">
            <br>
            <div class="password-container">
                <input type="password" id="password-setting" placeholder="密码" value="${GM_getValue('password', '')}">
                <span class="toggle-password" title="显示/隐藏密码">👁️</span>
            </div>
            <br>
            <button id="save-settings">保存设置</button>
        `;
        document.body.appendChild(panel);

        // 添加关闭按钮事件监听
        const closeButton = panel.querySelector('.close-button');
        closeButton.addEventListener('click', function() {
            panel.style.display = 'none';
        });

        // 显示/隐藏密码功能
        const togglePassword = panel.querySelector('.toggle-password');
        const passwordInput = document.getElementById('password-setting');

        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
        });

        // 保存设置按钮点击事件
        document.getElementById('save-settings').addEventListener('click', function() {
            const username = document.getElementById('username-setting').value;
            const password = document.getElementById('password-setting').value;
            GM_setValue('username', username);
            GM_setValue('password', password);
            alert('设置已保存！');

            // 立即填充表单
            fillForm(username, password);
        });
    }

    // 触发输入事件
    function triggerInputEvent(element) {
        const events = ['input', 'change', 'blur', 'keyup'];
        events.forEach(eventType => {
            const event = new Event(eventType, { bubbles: true });
            element.dispatchEvent(event);
        });
    }

    // 填充表单函数
    function fillForm(username, password) {
        // 尝试获取律师登录页面的输入框
        let usernameInput = document.evaluate('//*[@id="login_lawyer_name"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        let passwordInput = document.evaluate('//*[@id="login_lawyer_psw"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

        // 如果没有找到律师登录页面的输入框，尝试获取普通登录页面的输入框
        if (!usernameInput || !passwordInput) {
            usernameInput = document.evaluate('//*[@id="login_user_name"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            passwordInput = document.evaluate('//*[@id="psw"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        }

        if (usernameInput && passwordInput) {
            // 填充用户名
            usernameInput.value = username;
            triggerInputEvent(usernameInput);

            // 填充密码
            passwordInput.value = password;
            triggerInputEvent(passwordInput);

            // 确保密码字段保持type="password"
            passwordInput.setAttribute('type', 'password');
        }
    }

    // 主函数
    function main() {
        // 等待一小段时间确保页面元素都加载完成
        setTimeout(() => {
            // 创建设置面板
            createSettingsPanel();

            // 获取保存的账号密码
            const username = GM_getValue('username', '');
            const password = GM_getValue('password', '');

            // 如果有保存的账号密码，自动填充
            if (username && password) {
                fillForm(username, password);
            }
        }, 500);
    }

    // 等待页面加载完成后执行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', main);
    } else {
        main();
    }
})();