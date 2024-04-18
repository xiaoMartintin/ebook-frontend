import { Card } from "antd";       // 导入Ant Design的Card组件
import ApiDocs from "../components/api_docs";  // 导入ApiDocs组件，用于显示API文档
import { BasicLayout } from "../components/layout";  // 导入BasicLayout布局组件，用于页面布局

/**
 * ApiPage 组件，用于展示API文档。
 * 该组件在BasicLayout布局中嵌入一个Card组件，Card组件中包含ApiDocs组件。
 * 通过这种结构，页面保持了结构的清晰和功能的集中。
 *
 * @returns 返回ApiPage组件的JSX结构。
 */
export default function ApiPage() {
    return (
        <BasicLayout>
            {/* 使用BasicLayout作为页面的基本布局容器 */}
            <Card className="card-container" bordered={false} style={{ maxWidth: 800, margin: "auto" }}>
                {/* Card组件用于容纳ApiDocs，设置最大宽度和自动边距 */}
                <ApiDocs />
                {/* 嵌入ApiDocs组件，该组件负责渲染API文档的内容 */}
            </Card>
        </BasicLayout>
    );
}

