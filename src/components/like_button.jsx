// 导入所需组件和图标
import { Space } from "antd";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";
// 导入 useEffect 和 useState hook
import { useEffect, useState } from "react";

// 定义点赞按钮组件
export default function LikeButton({ defaultNumber, liked, onLike, onUnlike }) {
    // 使用 useState hook 初始化状态
    const [isLiked, setIsLiked] = useState(liked); // 是否已点赞
    const [number, setNumber] = useState(defaultNumber); // 点赞数

    // 使用 useEffect hook 在组件更新时更新状态
    useEffect(() => {
        // 更新点赞状态和点赞数
        setIsLiked(liked);
        setNumber(defaultNumber);
    }, [liked, defaultNumber]);

    // 处理点赞或取消点赞事件
    const handleLikeOrUnlike = async (e) => {
        e.preventDefault();
        // 如果尚未点赞，则执行点赞操作
        if (!isLiked) {
            // 调用点赞回调函数，并检查点赞是否成功
            if (await onLike?.()) {
                // 更新状态：已点赞，点赞数加一
                setIsLiked(true);
                setNumber(number => number + 1);
            }
        } else {
            // 如果已点赞，则执行取消点赞操作
            // 调用取消点赞回调函数，并检查取消点赞是否成功
            if (await onUnlike?.()) {
                // 更新状态：未点赞，点赞数减一
                setIsLiked(false);
                setNumber(number => number - 1);
            }
        }
    }

    return (
        <Space size="small">
            {/* 点赞图标 */}
            <button onClick={handleLikeOrUnlike} style={{ background: "none", border: "none", padding: "0", cursor: "pointer" }}>
                {/* 根据点赞状态选择显示实心或空心图标 */}
                {isLiked ? <LikeFilled /> : <LikeOutlined />}
            </button>
            {/* 显示点赞数 */}
            {number}
        </Space>

    );
}
