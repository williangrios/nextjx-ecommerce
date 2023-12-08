import React, { ReactNode } from 'react';
import { ConfigProvider } from 'antd';

function ThemeProvider({ children }: { children: ReactNode }) {
    return (
        <div>
            <ConfigProvider theme={{ token: { colorPrimary: "#000"} }}>
                {children}
            </ConfigProvider>
        </div >
    )
}

export default ThemeProvider