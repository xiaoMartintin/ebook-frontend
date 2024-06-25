import { ConfigProvider, theme } from 'antd';
import AppRouter from './page/router';
import { UserContext } from './lib/context';
import { useEffect, useState } from 'react';
import { getMe } from './service/userService';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const me = await getMe();
            setUser(me);
        };
        fetchUser();
    }, []);

    const themeToken = {
        colorPrimary: "#00A3D9",
        colorInfo: "#00A3D9"
    };

    return (
        <ConfigProvider
            theme={{
                algorithm: theme.defaultAlgorithm,
                token: themeToken
            }}
        >
            <UserContext.Provider value={user}>
                <AppRouter />
            </UserContext.Provider>
        </ConfigProvider>
    );
}

export default App;
