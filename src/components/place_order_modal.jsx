// 导入所需组件和 hook
import { Button, Form, Input, Modal } from "antd";
import React from "react";
import useMessage from "antd/es/message/useMessage";
// 导入下单服务方法和处理基本 API 响应的方法
import { placeOrder } from "../service/order";
import { handleBaseApiResponse } from "../utils/message";

const { TextArea } = Input;

// 下单模态框组件
export default function PlaceOrderModal({
                                            selectedItems, // 选中的商品项列表
                                            onOk, // 确认下单后的回调函数
                                            onCancel // 取消下单的回调函数
                                        }) {
    // 使用 Form hook 创建表单实例
    const [form] = Form.useForm();
    // 获取消息提示 API 和 contextHolder
    const [messageApi, contextHolder] = useMessage();

    // 提交表单事件处理函数
    const handleSubmit = async ({ address, receiver, tel }) => {
        // 检查是否填写完整信息
        if (!address || !receiver || !tel) {
            // 弹出错误消息提示
            messageApi.error("请填写完整信息！");
            return;
        }
        // 构造下单信息对象
        let orderInfo = {
            address,
            receiver,
            tel,
            itemIds: selectedItems.map(item => item.id) // 从选中的商品项中提取商品 ID
        }
        // 发送下单请求
        let res = await placeOrder(orderInfo);
        // 处理下单响应
        handleBaseApiResponse(res, messageApi, onOk);
    };

    return (
        <Modal
            title={"确认下单"} // 模态框标题
            visible={true} // 是否可见
            onOk={onOk} // 点击确定的回调函数
            onCancel={onCancel} // 点击取消的回调函数
            footer={null} // 不显示底部按钮
            width={800} // 宽度
        >
            {contextHolder} {/* 显示消息提示 */}
            {/* 下单表单 */}
            <Form
                form={form} // 表单实例
                layout="vertical" // 表单布局方式
                onFinish={handleSubmit} // 提交表单的回调函数
                preserve={false} // 重置表单时清空所有字段值
            >
                {/* 收货人输入框 */}
                <Form.Item
                    name="receiver"
                    label="收货人"
                    required // 必填项
                >
                    <Input />
                </Form.Item>
                {/* 联系电话输入框 */}
                <Form.Item
                    name="tel"
                    label="联系电话"
                    required // 必填项
                >
                    <Input />
                </Form.Item>
                {/* 收货地址输入框 */}
                <Form.Item
                    name="address"
                    label="收货地址"
                    required // 必填项
                >
                    <TextArea rows={2} maxLength={817} />
                </Form.Item>
                {/* 提交按钮 */}
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};
