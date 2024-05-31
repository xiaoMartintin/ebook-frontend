// Import necessary components and hooks
import { Button, Form, Input, Modal, Row, Col } from "antd";
import React from "react";
import useMessage from "antd/es/message/useMessage";
// Import placeOrder service method and handleBaseApiResponse utility
import { placeOrder } from "../service/order";
import { handleBaseApiResponse } from "../utils/message";
// Import logo image
const logo = process.env.PUBLIC_URL + '/logo512.png';

const { TextArea } = Input;

// Define the PlaceOrderModal component
export default function PlaceOrderModal({
                                            selectedItems, // 选中的商品项列表
                                            onOk, // 确认下单后的回调函数
                                            onCancel // 取消下单的回调函数
                                        }) {
    // Create a form instance using the Form hook
    const [form] = Form.useForm();
    // Get message API and contextHolder
    const [messageApi, contextHolder] = useMessage();

    // Handle form submission
    const handleSubmit = async ({ address, receiver, tel }) => {
        // Check if all required fields are filled
        if (!address || !receiver || !tel) {
            // Display error message
            messageApi.error("Please fill in all required fields!");
            return;
        }
        // Construct order information object
        let orderInfo = {
            address,
            receiver,
            tel,
            itemIds: selectedItems.map(item => item.id) // 从选中的商品项中提取商品ID
        };
        // Send place order request
        let res = await placeOrder(orderInfo);
        // Handle place order response
        handleBaseApiResponse(res, messageApi, onOk);
    };

    return (
        <Modal
            title={
                <Row align="middle" justify="center">
                    <Col>
                        <img src={logo} alt="Logo" style={{ height: "50px", marginRight: "10px" }} />
                    </Col>
                    <Col>
                        <h2 style={{ margin: 0, fontFamily: "'PT Serif', 'Helvetica', sans-serif" }}>Please Confirm Your Order</h2>
                    </Col>
                </Row>
            } // 模态框标题与logo
            visible={true} // 模态框可见性
            onCancel={onCancel} // 取消的回调函数
            footer={null} // 不显示底部按钮
            width={600} // 模态框宽度
            centered // 居中显示模态框
        >
            {contextHolder} {/* 显示消息通知 */}
            {/* 订单表单 */}
            <Form
                form={form} // 表单实例
                layout="vertical" // 表单布局
                onFinish={handleSubmit} // 提交表单的回调函数
                preserve={false} // 重置表单时不保留字段值
            >
                {/* 收件人输入框 */}
                <Form.Item
                    name="receiver"
                    label="Recipient"
                    required // 必填项
                    rules={[{ required: true, message: "Please enter the recipient's name!" }]} // 校验规则
                >
                    <Input placeholder="Enter recipient's name" />
                </Form.Item>
                {/* 电话输入框 */}
                <Form.Item
                    name="tel"
                    label="Telephone"
                    required // 必填项
                    rules={[{ required: true, message: "Please enter the telephone number!" }]} // 校验规则
                >
                    <Input placeholder="Enter telephone number" />
                </Form.Item>
                {/* 地址输入框 */}
                <Form.Item
                    name="address"
                    label="Address"
                    required // 必填项
                    rules={[{ required: true, message: "Please enter the address!" }]} // 校验规则
                >
                    <TextArea rows={2} maxLength={200} placeholder="Enter delivery address" />
                </Form.Item>
                {/* 提交按钮 */}
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: "100%", borderRadius: "8px" }}>
                        Submit Order
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}
