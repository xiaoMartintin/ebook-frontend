import { ConfigProvider, theme } from 'antd';
import AppRouter from './components/router';

function App() {
  // 定义自定义主题颜色
  const themeToken = {
    colorPrimary: "#00A3D9", // 主要颜色
    colorInfo: "#00A3D9" // 信息颜色
  };

  return (
      <ConfigProvider
          theme={{
            algorithm: theme.defaultAlgorithm, // 使用默认算法
            token: themeToken // 应用自定义主题颜色
          }}
      >
        {/* 渲染应用程序路由 */}
        <AppRouter />
      </ConfigProvider>
  );
}

export default App;