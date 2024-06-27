import { ConfigProvider, theme } from 'antd';
import AppRouter from './page/router';
import { UserContext } from './lib/context';
import { useEffect, useState } from 'react';
import { getMe } from './service/userService';
import LZString from 'lz-string';

function App() {
    const [user, setUser] = useState(() => {
        const compressedUser = localStorage.getItem('user');
        if (compressedUser) {
            try {
                const decompressedUser = LZString.decompress(compressedUser);
                return JSON.parse(decompressedUser);
            } catch (e) {
                console.error('Failed to decompress user data:', e);
                return null;
            }
        }
        return null;
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const me = await getMe();
            if (me) {
                const { id, username, nickname, balance, is_admin } = me; // 只存储必要的字段
                const minimalUser = { id, username, nickname, balance, is_admin };
                setUser(minimalUser);
                const compressedMe = LZString.compress(JSON.stringify(minimalUser));
                localStorage.setItem('user', compressedMe);
            }
            setLoading(false);
        };
        fetchUser();
    }, []);

    const themeToken = {
        colorPrimary: "#00A3D9",
        colorInfo: "#00A3D9"
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <ConfigProvider
            theme={{
                algorithm: theme.defaultAlgorithm,
                token: themeToken
            }}
        >
            <UserContext.Provider value={{ user, setUser }}>
                <AppRouter />
            </UserContext.Provider>
        </ConfigProvider>
    );
}

export default App;
