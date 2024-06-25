import { ConfigProvider, theme } from 'antd';
import AppRouter from './page/router';
import { UserContext } from './lib/context';
import { useEffect, useState } from 'react';
import { getMe } from './service/userService';

function App() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const me = await getMe();
            if (me) {
                setUser(me);
                localStorage.setItem('user', JSON.stringify(me));
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
