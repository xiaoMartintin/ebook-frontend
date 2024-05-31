// 导入所需组件和方法
import { Button, Form, Input, Modal, Row, Col } from "antd";
import React from "react";
import useMessage from "antd/es/message/useMessage"; // 使用消息提示 hook
import { handleBaseApiResponse } from "../utils/message"; // 导入处理基本 API 响应的方法
import { changePassword } from "../service/user"; // 导入修改密码的服务方法

const { Password } = Input;

// 导出修改密码模态框组件
export default function ChangePasswordModal({
                                                onOk, // 确认修改密码后的回调函数
                                                onCancel // 取消修改密码的回调函数
                                            }) {
    const [form] = Form.useForm(); // 使用表单 hook
    const [messageApi, contextHolder] = useMessage(); // 获取消息提示 API

    // 处理提交表单事件
    const handleSubmit = async ({ password, confirm }) => {
        // 检查是否填写完整信息
        if (!password || !confirm) {
            messageApi.error("Please fill in all required fields!");
            return;
        }
        // 检查新密码和确认新密码是否一致
        if (password !== confirm) {
            messageApi.error("The new password and confirmation do not match!");
            return;
        }
        // 构造请求体
        let request = {
            password
        };
        // 发送修改密码请求
        let res = await changePassword(request);
        // 处理修改密码响应
        handleBaseApiResponse(res, messageApi, onOk);
    };

    return (
        <Modal
            title={
                <Row align="middle" justify="center">
                    <Col>
                        <img src={process.env.PUBLIC_URL + '/logo512.png'} alt="Logo" style={{ height: "50px", marginRight: "10px" }} />
                    </Col>
                    <Col>
                        <h2 style={{ margin: 0, fontFamily: "'PT Serif', 'Helvetica', sans-serif" }}>Change Password</h2>
                    </Col>
                </Row>
            } // 模态框标题
            visible={true} // 是否可见
            onCancel={onCancel} // 点击取消的回调函数
            footer={null} // 不显示底部按钮
            width={600} // 宽度
            centered // 模态框居中显示
        >
            {contextHolder} {/* 显示消息提示 */}
            {/* 密码修改表单 */}
            <Form
                form={form} // 表单实例
                layout="vertical" // 表单布局方式
                onFinish={handleSubmit} // 提交表单的回调函数
                preserve={false} // 重置表单时清空所有字段值
            >
                {/* 新密码输入框 */}
                <Form.Item
                    name="password"
                    label="New Password"
                    required
                    rules={[{ required: true, message: 'Please enter the new password!' }]} // 验证规则
                >
                    <Password placeholder="Enter new password" />
                </Form.Item>
                {/* 确认新密码输入框 */}
                <Form.Item
                    name="confirm"
                    label="Confirm New Password"
                    required
                    rules={[{ required: true, message: 'Please confirm the new password!' }]} // 验证规则
                >
                    <Password placeholder="Confirm new password" />
                </Form.Item>
                {/* 提交按钮 */}
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: "100%", borderRadius: "8px" }}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};
