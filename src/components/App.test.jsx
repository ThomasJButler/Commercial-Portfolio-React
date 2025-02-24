import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { DataProvider } from '../providers/DataProvider';
import { LanguageProvider } from '../providers/LanguageProvider';
import { FeedbacksProvider } from '../providers/FeedbacksProvider';
import { WindowProvider } from '../providers/WindowProvider';

// Mock the useData hook
jest.mock('../providers/DataProvider', () => ({
    useData: () => ({
        getSettings: () => ({
            profile: {
                logoUrl: 'logo.svg',
                profilePictureUrl: 'profile.jpg'
            },
            supportedLanguages: []
        }),
        getStrings: () => ({}),
        getSections: () => [],
        getCategories: () => [],
        getCategorySections: () => [],
        listImagesForCache: () => []
    }),
    DataProvider: ({ children }) => <>{children}</> // Mock the DataProvider
}));

// Mock the useLanguage hook
jest.mock('../providers/LanguageProvider', () => ({
    useLanguage: () => ({
        selectedLanguageId: 'en',
        getString: (key) => key,
    }),
    LanguageProvider: ({ children }) => <>{children}</> // Mock the LanguageProvider
}));

// Mock the useFeedbacks hook
jest.mock('../providers/FeedbacksProvider', () => ({
    useFeedbacks: () => ({
        listSpinnerActivities: () => [],
        isAnimatedCursorEnabled: () => false,
        isAnimatedCursorActive: () => false,
        isModalOpen: () => false,
        displayingNotification: null,
        killNotification: () => { },
        displayingYoutubeVideo: null,
        hideYoutubeVideo: () => { },
        displayingGallery: null,
        hideGallery: () => { },
        pendingConfirmation: null,
        hideConfirmationDialog: () => { }
    }),
    FeedbacksProvider: ({ children }) => <>{children}</> // Mock the FeedbacksProvider
}));

// Mock the useWindow hook
jest.mock('../providers/WindowProvider', () => ({
    useWindow: () => ({
        isBreakpoint: () => false,
        isMobileLayout: () => false,
        focusMainView: () => { }
    }),
    WindowProvider: ({ children }) => <>{children}</> // Mock the WindowProvider
}));

describe('App Component', () => {
    it('renders without crashing', () => {
        render(
            <DataProvider>
                <LanguageProvider>
                    <FeedbacksProvider>
                        <WindowProvider>
                            <App />
                        </WindowProvider>
                    </FeedbacksProvider>
                </LanguageProvider>
            </DataProvider>
        );
    });

    it('renders the Portfolio component', () => {
        render(
            <DataProvider>
                <LanguageProvider>
                    <FeedbacksProvider>
                        <WindowProvider>
                            <App />
                        </WindowProvider>
                    </FeedbacksProvider>
                </LanguageProvider>
            </DataProvider>
        );
        expect(screen.getByClassName('portfolio-wrapper')).toBeInTheDocument();
    });
});