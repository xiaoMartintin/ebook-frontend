// 用户名头像组件
export default function UsernameAvatar({ username }) {
    // 获取用户名的首个字符
    const firstChar = [...username].slice(0)[0];
    return (
        <div style={{
            // 设置样式
            height: 40, // 高度
            width: 40, // 宽度
            borderRadius: 20, // 边框圆角
            backgroundColor: '#1DA57A', // 背景颜色
            textAlign: 'center', // 文本居中
            lineHeight: '40px', // 行高
            fontSize: 18, // 字体大小
            color: 'white', // 字体颜色
        }}>
            {firstChar} {/* 显示首个字符 */}
        </div>
    );
}
