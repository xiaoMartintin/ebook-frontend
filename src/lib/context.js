// 导入 React 库
import React from "react";

// 创建并导出一个 React 上下文（Context）
// 上下文用于在组件间共享数据，而不需要显式地通过每个组件层传递 props
// 这里创建的上下文初始值为 null，表示默认没有任何数据
export const UserContext = React.createContext(null);
