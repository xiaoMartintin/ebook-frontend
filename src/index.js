import ReactDOM from 'react-dom/client';
import App from './App';
import './css/global.css';

// 创建根节点
const root = ReactDOM.createRoot(
    document.getElementById('root') // 获取具有 id 为 'root' 的 DOM 元素
);

// 在根节点上渲染应用程序
root.render(
    <App /> // 渲染 App 组件作为应用程序的根组件
);