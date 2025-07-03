import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {DataProvider} from "/src/providers/DataProvider"
import {LanguageProvider} from "/src/providers/LanguageProvider"
import {ThemeProvider} from "/src/providers/ThemeProvider"
import {GlobalStateProvider} from "/src/providers/GlobalStateProvider"
import {FeedbacksProvider} from "/src/providers/FeedbacksProvider"
import {WindowProvider} from "/src/providers/WindowProvider"
import App from "/src/components/App.jsx"
import Preloader from "/src/components/Preloader.jsx"

const AppProviders = ({ children }) => (
    <DataProvider>
        <LanguageProvider>
            <FeedbacksProvider>
                <WindowProvider>
                    <ThemeProvider>
                        <GlobalStateProvider>
                            {children}
                        </GlobalStateProvider>
                    </ThemeProvider>
                </WindowProvider>
            </FeedbacksProvider>
        </LanguageProvider>
    </DataProvider>
)

let container = null

// Console message for fellow developers
if (typeof console !== 'undefined' && console.log) {
    console.log(
        '%c🚀 Hey there, fellow developer!',
        'color: #36ec65; font-size: 16px; font-weight: bold;'
    );
    console.log(
        '%cLike what you see? Let\'s connect!\n' +
        'GitHub: https://github.com/ThomasJButler\n' +
        'Portfolio: https://thomasjbutler.github.io/',
        'color: #888; font-size: 12px;'
    );
}

document.addEventListener('DOMContentLoaded', function(event) {
    if(container)
        return

    container = document.getElementById('root')
    createRoot(document.getElementById('root')).render(
        <StrictMode>
            <Preloader>
                <AppProviders>
                    <App/>
                </AppProviders>
            </Preloader>
        </StrictMode>
    )
})
