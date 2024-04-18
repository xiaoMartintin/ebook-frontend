// 导入Swagger UI React组件和其样式文件
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
// 导入API文档的URL，此URL在common.js中定义
import { API_DOCS_URL } from "../service/common";

/**
 * ApiDocs组件用于展示Swagger API文档。
 * 组件使用SwaggerUI组件渲染指定的API_DOCS_URL，从而在应用中嵌入API文档。
 *
 * @returns React组件，显示Swagger UI界面
 */
export default function ApiDocs() {
    // 使用SwaggerUI组件，通过url属性指定API文档的地址
    // 此组件会自动处理API文档的渲染和用户交互
    return <SwaggerUI url={API_DOCS_URL} />;
}
