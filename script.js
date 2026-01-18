const API_BASE_URL = window.location.origin;
const CREATOR_WALLET = 'Hx402UniPayCreatorAddress123456789';
const USDC_MINT = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
const WALLET_STORAGE_KEY = 'uni402_wallet_state';
const LESSONS_STORAGE_KEY = 'uni402_lessons';
const ACCESSES_STORAGE_KEY = 'uni402_accesses';

const appState = {
    connectedWallet: false,
    walletAddress: null,
    currentLesson: null,
    lessons: []
};

let MOCK_ACCESSES = {};


const MOCK_LESSONS = [
    {
        id: '1',
        title: 'Introduction to Web3 Development',
        description: 'Learn the fundamentals of Web3 development including smart contracts, wallets, and decentralized applications.',
        price: '0.02',
        content_type: 'text',
        content_data: '# Introduction to Web3 Development\n\nWelcome to the world of Web3 development! This is where the internet evolves from centralized platforms to decentralized protocols. In this lesson, we will explore:\n\n## What is Web3?\nWeb3 represents the third generation of internet services that leverage blockchain technology to create decentralized applications (dApps).\n\n## Key Concepts\n- Smart Contracts\n- Decentralized Storage\n- Digital Wallets\n- Token Economics\n\n## Getting Started\nTo begin your Web3 journey, you need:\n1. A cryptocurrency wallet\n2. Understanding of blockchain basics\n3. Basic programming knowledge\n\n## Real-World Applications\n- DeFi (Decentralized Finance)\n- NFTs (Non-Fungible Tokens)\n- DAOs (Decentralized Autonomous Organizations)\n- Web3 Social Platforms',
        author: 'Web3 Academy',
        created_at: '2024-01-15',
        category: 'web3',
        tags: 'web3,blockchain,development'
    },
    {
        id: '2',
        title: 'Solana Smart Contracts 101',
        description: 'A comprehensive guide to writing and deploying smart contracts on the Solana blockchain using Rust.',
        price: '0.03',
        content_type: 'text',
        content_data: '# Solana Smart Contracts 101\n\n## Introduction to Solana\nSolana is a high-performance blockchain designed for scalability and speed. It can process over 50,000 transactions per second!\n\n## Why Rust?\nSolana smart contracts (called programs) are written in Rust because:\n- Memory safety without garbage collection\n- Zero-cost abstractions\n- Excellent performance\n- Strong type system\n\n## Setting Up Your Environment\n```bash\n# Install Solana CLI\nsh -c "$(curl -sSfL https://release.solana.com/stable/install)"\n\n# Install Rust\ncurl --proto "=https" --tlsv1.2 -sSf https://sh.rustup.rs | sh\n```\n\n## Your First Solana Program\n```rust\nuse solana_program::{\n    account_info::AccountInfo,\n    entrypoint,\n    entrypoint::ProgramResult,\n    pubkey::Pubkey,\n};\n\nentrypoint!(process_instruction);\n\nfn process_instruction(\n    program_id: &Pubkey,\n    accounts: &[AccountInfo],\n    instruction_data: &[u8],\n) -> ProgramResult {\n    // Your program logic here\n    Ok(())\n}\n```',
        author: 'Solana Masters',
        created_at: '2024-01-20',
        category: 'web3',
        tags: 'solana,rust,smart-contracts'
    },
    {
        id: '3',
        title: 'Building Your First dApp',
        description: 'Step-by-step tutorial on building a complete decentralized application from scratch.',
        price: '0.04',
        content_type: 'video',
        content_data: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        author: 'dApp Builder',
        created_at: '2024-01-25',
        category: 'web3',
        tags: 'dapp,development,tutorial'
    },
    {
        id: '4',
        title: 'Introduction to Digital Marketing',
        description: 'Learn the fundamentals of digital marketing including SEO, social media, and email marketing.',
        price: '0.02',
        content_type: 'text',
        content_data: '# Digital Marketing Fundamentals\n\n## What is Digital Marketing?\nDigital marketing encompasses all marketing efforts that use an electronic device or the internet...',
        author: 'Marketing Pro',
        created_at: '2024-01-10',
        category: 'marketing',
        tags: 'marketing,seo,social-media'
    },
    {
        id: '5',
        title: 'UI/UX Design Principles',
        description: 'Essential principles for creating user-friendly interfaces and engaging user experiences.',
        price: '0.03',
        content_type: 'text',
        content_data: '# UI/UX Design Principles\n\n## User-Centered Design\nAlways design with the user in mind...',
        author: 'Design Expert',
        created_at: '2024-01-05',
        category: 'design',
        tags: 'design,ui,ux'
    },
    {
        id: '6',
        title: 'Personal Productivity Systems',
        description: 'Build effective productivity systems to achieve your goals and manage time efficiently.',
        price: '0.02',
        content_type: 'text',
        content_data: '# Personal Productivity Systems\n\n## Time Management Techniques\nLearn various techniques to manage your time effectively...',
        author: 'Productivity Coach',
        created_at: '2024-01-08',
        category: 'personal',
        tags: 'productivity,time-management,goals'
    },
    {
        id: '7',
        title: 'Python Programming Basics',
        description: 'Learn Python programming from scratch with hands-on examples and projects.',
        price: '0.02',
        content_type: 'text',
        content_data: '# Python Programming Basics\n\n## Introduction to Python\nPython is a versatile and beginner-friendly programming language...',
        author: 'Code Master',
        created_at: '2024-01-12',
        category: 'programming',
        tags: 'python,programming,basics'
    },
    {
        id: '8',
        title: 'Cryptocurrency Trading Guide',
        description: 'Essential guide to cryptocurrency trading strategies and risk management.',
        price: '0.03',
        content_type: 'text',
        content_data: '# Cryptocurrency Trading Guide\n\n## Trading Basics\nUnderstanding market trends and trading psychology...',
        author: 'Crypto Trader',
        created_at: '2024-01-18',
        category: 'crypto',
        tags: 'crypto,trading,investing'
    },
    {
        id: '9',
        title: 'DeFi Yield Farming Explained',
        description: 'Complete guide to DeFi yield farming strategies and protocols.',
        price: '0.04',
        content_type: 'text',
        content_data: '# DeFi Yield Farming Explained\n\n## What is Yield Farming?\nYield farming involves lending or staking crypto assets to earn rewards...',
        author: 'DeFi Expert',
        created_at: '2024-01-22',
        category: 'defi',
        tags: 'defi,yield-farming,crypto'
    },
    {
        id: '10',
        title: 'NFT Creation and Marketing',
        description: 'Learn how to create, mint, and market your own NFT collections.',
        price: '0.03',
        content_type: 'text',
        content_data: '# NFT Creation and Marketing\n\n## Creating Your NFT\nStep-by-step guide to creating digital art for NFTs...',
        author: 'NFT Creator',
        created_at: '2024-01-28',
        category: 'nft',
        tags: 'nft,art,blockchain'
    },
    {
        id: '11',
        title: 'Machine Learning Fundamentals',
        description: 'Introduction to machine learning concepts and algorithms for beginners.',
        price: '0.04',
        content_type: 'text',
        content_data: '# Machine Learning Fundamentals\n\n## What is Machine Learning?\nMachine learning is a subset of artificial intelligence...',
        author: 'AI Researcher',
        created_at: '2024-02-01',
        category: 'ai',
        tags: 'ai,machine-learning,data-science'
    },
    {
        id: '12',
        title: 'Startup Business Plan',
        description: 'Learn how to create a compelling business plan for your startup.',
        price: '0.03',
        content_type: 'text',
        content_data: '# Startup Business Plan\n\n## Executive Summary\nCrafting a compelling overview of your business...',
        author: 'Business Coach',
        created_at: '2024-02-05',
        category: 'business',
        tags: 'business,startup,planning'
    }
];

function initStorage() {
    try {
        const savedLessons = localStorage.getItem(LESSONS_STORAGE_KEY);
        if (savedLessons) {
            appState.lessons = JSON.parse(savedLessons);
        } else {
            appState.lessons = [...MOCK_LESSONS];
            saveLessonsToStorage();
        }
        
        const savedAccesses = localStorage.getItem(ACCESSES_STORAGE_KEY);
        if (savedAccesses) {
            MOCK_ACCESSES = JSON.parse(savedAccesses);
        }
        
        loadWalletState();
        
        console.log('Storage initialized:', {
            lessons: appState.lessons.length,
            accesses: Object.keys(MOCK_ACCESSES).length,
            wallet: appState.connectedWallet
        });
        
    } catch (error) {
        console.error('Error initializing storage:', error);
        appState.lessons = [...MOCK_LESSONS];
        MOCK_ACCESSES = {};
    }
}

function saveLessonsToStorage() {
    try {
        localStorage.setItem(LESSONS_STORAGE_KEY, JSON.stringify(appState.lessons));
    } catch (error) {
        console.error('Error saving lessons to storage:', error);
    }
}

function saveWalletState() {
    try {
        const walletState = {
            connected: appState.connectedWallet,
            address: appState.walletAddress,
            lastConnected: Date.now()
        };
        localStorage.setItem(WALLET_STORAGE_KEY, JSON.stringify(walletState));
    } catch (error) {
        console.error('Error saving wallet state:', error);
    }
}

function loadWalletState() {
    try {
        const saved = localStorage.getItem(WALLET_STORAGE_KEY);
        if (saved) {
            const state = JSON.parse(saved);
            const isRecent = Date.now() - state.lastConnected < 24 * 60 * 60 * 1000;
            
            if (isRecent && state.connected && state.address) {
                appState.connectedWallet = state.connected;
                appState.walletAddress = state.address;
                return true;
            }
        }
    } catch (error) {
        console.error('Error loading wallet state:', error);
    }
    return false;
}

function clearWalletState() {
    try {
        localStorage.removeItem(WALLET_STORAGE_KEY);
    } catch (error) {
        console.error('Error clearing wallet state:', error);
    }
}

function saveAccessesToStorage() {
    try {
        localStorage.setItem(ACCESSES_STORAGE_KEY, JSON.stringify(MOCK_ACCESSES));
    } catch (error) {
        console.error('Error saving accesses:', error);
    }
}


function hasLessonAccess(lessonId) {
    if (!appState.walletAddress) return false;
    
    const accessKey = `${appState.walletAddress}_${lessonId}`;
    return MOCK_ACCESSES[accessKey] === true || 
           (MOCK_ACCESSES[accessKey] && MOCK_ACCESSES[accessKey].unlocked);
}


function getUserPurchasedLessons() {
    if (!appState.walletAddress) return [];
    
    const purchasedLessons = [];
    appState.lessons.forEach(lesson => {
        if (hasLessonAccess(lesson.id)) {
            purchasedLessons.push(lesson);
        }
    });
    return purchasedLessons;
}


function checkPhantomSupport() {
    if (!window.solana || !window.solana.isPhantom) {
        showNotification('Please install Phantom wallet!', 'error');
        
        const connectButtons = document.querySelectorAll('.connect-btn');
        connectButtons.forEach(btn => {
            btn.innerHTML = '<i class="fas fa-external-link-alt"></i> Install Phantom';
            btn.onclick = () => {
                window.open('https://phantom.app/', '_blank');
            };
        });
        
        return false;
    }
    return true;
}

async function initPhantomWallet() {
    if (!checkPhantomSupport()) {
        return false;
    }

    try {
        const resp = await window.solana.connect();
        appState.walletAddress = resp.publicKey.toString();
        appState.connectedWallet = true;

        saveWalletState();
        updateWalletUI();
        showNotification('Wallet connected successfully!');

        if (window.location.pathname.includes('create.html')) {
            updateCreatePageUI();
        }

        if (window.location.pathname.includes('lesson.html')) {
            await checkLessonAccess();
        }

        return true;
    } catch (err) {
        console.error('Wallet connection error:', err);
        handleWalletError(err);
        return false;
    }
}

function handleWalletError(err) {
    let message = 'Failed to connect wallet';
    
    if (err.code === 4001) {
        message = 'Connection rejected by user';
    } else if (err.code === -32002) {
        message = 'Connection request already pending';
    } else if (err.message?.includes('phantom')) {
        message = 'Phantom wallet error. Please refresh and try again.';
    }
    
    showNotification(message, 'error');
}

async function restoreWalletConnection() {
    const hasSavedState = loadWalletState();
    
    if (hasSavedState && window.solana && window.solana.isPhantom) {
        try {
            if (!window.solana.isConnected) {
                const resp = await window.solana.connect();
                appState.walletAddress = resp.publicKey.toString();
                appState.connectedWallet = true;
            }
            
            updateWalletUI();
            console.log('Wallet connection restored');
            
            if (window.location.pathname.includes('lesson.html')) {
                await checkLessonAccess();
            }
            
        } catch (error) {
            console.error('Failed to restore wallet connection:', error);
            clearWalletState();
        }
    }
}

function updateWalletUI() {
    const connectButtons = document.querySelectorAll('.connect-btn');
    connectButtons.forEach(btn => {
        if (appState.connectedWallet && appState.walletAddress) {
            const shortAddress = `${appState.walletAddress.slice(0, 4)}...${appState.walletAddress.slice(-4)}`;
            btn.innerHTML = `<i class="fas fa-wallet"></i> ${shortAddress}`;
            btn.classList.add('connected');
            btn.onclick = disconnectWallet;
        } else {
            btn.innerHTML = '<i class="fas fa-wallet"></i> Connect Wallet';
            btn.classList.remove('connected');
            btn.onclick = initPhantomWallet;
        }
    });
}

async function disconnectWallet() {
    try {
        if (window.solana && window.solana.disconnect) {
            await window.solana.disconnect();
        }
        appState.connectedWallet = false;
        appState.walletAddress = null;
        clearWalletState();
        updateWalletUI();
        showNotification('Wallet disconnected');
    } catch (error) {
        console.error('Error disconnecting wallet:', error);
    }
}

function setupWalletListeners() {
    if (window.solana) {
        window.solana.on('connect', () => {
            console.log('Wallet connected');
            appState.connectedWallet = true;
            appState.walletAddress = window.solana.publicKey.toString();
            saveWalletState();
            updateWalletUI();
            
            if (window.location.pathname.includes('lesson.html')) {
                setTimeout(() => {
                    checkLessonAccess();
                }, 500);
            }
        });
        
        window.solana.on('disconnect', () => {
            console.log('Wallet disconnected');
            appState.connectedWallet = false;
            appState.walletAddress = null;
            clearWalletState();
            updateWalletUI();
        });
        
        window.solana.on('accountChanged', (publicKey) => {
            console.log('Account changed:', publicKey);
            if (publicKey) {
                appState.walletAddress = publicKey.toString();
                saveWalletState();
                updateWalletUI();
                showNotification('Wallet account changed', 'info');
                
                if (window.location.pathname.includes('lesson.html')) {
                    setTimeout(() => {
                        checkLessonAccess();
                    }, 500);
                }
            } else {
                disconnectWallet();
            }
        });
    }
}


async function loadLessons() {
    const lessonsList = document.getElementById('lessons-list');
    if (!lessonsList) return;

    try {
        showLoading(lessonsList);

        setTimeout(() => {
            renderLessons(appState.lessons);
            updateLessonCount(appState.lessons.length);
            updateStats();
            initCategoryFilters();
            
            updatePurchasedLessonsUI();
        }, 500);

    } catch (error) {
        console.error('Error loading lessons:', error);
        showError(lessonsList, 'Failed to load lessons. Using saved data.');
        renderLessons(appState.lessons);
        updateLessonCount(appState.lessons.length);
        initCategoryFilters();
    }
}

function renderLessons(lessons, container) {
    const lessonsList = container || document.getElementById('lessons-list');
    if (!lessonsList) return;

    lessonsList.innerHTML = '';

    if (!lessons || lessons.length === 0) {
        lessonsList.innerHTML = `
            <div class="no-lessons" style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
                <i class="fas fa-book fa-3x" style="color: var(--text-light); margin-bottom: 20px;"></i>
                <h3>No lessons found</h3>
                <p style="color: var(--text-medium); margin-bottom: 20px;">No lessons available yet. Be the first to create one!</p>
                <a href="create.html" class="btn-primary">
                    <i class="fas fa-plus-circle"></i>
                    Create Lesson
                </a>
            </div>
        `;
        return;
    }

    lessons.forEach(lesson => {
        const lessonCard = document.createElement('div');
        lessonCard.className = 'lesson-card';
        lessonCard.dataset.id = lesson.id;
        lessonCard.dataset.category = lesson.category || 'all';
        
        const hasAccess = hasLessonAccess(lesson.id);
        
        lessonCard.innerHTML = `
            <div class="lesson-header">
                <h3 class="lesson-title">${escapeHtml(lesson.title)}</h3>
                <span class="lesson-price">${formatPrice(lesson.price)}</span>
            </div>
            <p class="lesson-description">${escapeHtml(lesson.description || 'No description')}</p>
            <div class="lesson-footer">
                <div class="lesson-author">
                    <div class="author-avatar">${getInitials(lesson.author || lesson.title)}</div>
                    <span class="author-name">${escapeHtml(lesson.author || 'Creator')}</span>
                </div>
                <div class="lesson-type">
                    ${hasAccess ? '<span class="purchased-badge"><i class="fas fa-check-circle"></i> Purchased</span>' : ''}
                    <i class="${getContentTypeIcon(lesson.content_type)}"></i>
                    ${getContentTypeName(lesson.content_type)}
                </div>
            </div>
        `;

        lessonCard.addEventListener('click', () => {
            window.location.href = `lesson.html?id=${lesson.id}`;
        });

        lessonsList.appendChild(lessonCard);
    });
}


async function loadLesson(lessonId) {
    try {
        const lesson = appState.lessons.find(l => l.id === lessonId);
        if (!lesson) {
            throw new Error('Lesson not found');
        }

        appState.currentLesson = lesson;
        updateLessonUI(lesson);

        loadRelatedLessons(lesson);

        await checkLessonAccess();

    } catch (error) {
        console.error('Error loading lesson:', error);
        showNotification('Failed to load lesson. Redirecting to home...', 'error');
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }
}

function loadRelatedLessons(lesson) {
    const relatedLessonsContainer = document.getElementById('related-lessons');
    if (!relatedLessonsContainer) return;
    
    const relatedLessons = appState.lessons.filter(l => 
        l.id !== lesson.id && 
        (l.category === lesson.category || 
         l.tags.split(',').some(tag => lesson.tags.split(',').includes(tag.trim())))
    ).slice(0, 3);
    
    if (relatedLessons.length > 0) {
        renderLessons(relatedLessons, relatedLessonsContainer);
    } else {
        const randomLessons = appState.lessons
            .filter(l => l.id !== lesson.id)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);
        
        if (randomLessons.length > 0) {
            renderLessons(randomLessons, relatedLessonsContainer);
        } else {
            relatedLessonsContainer.innerHTML = `
                <div class="no-lessons" style="grid-column: 1 / -1; text-align: center; padding: 40px 20px;">
                    <p style="color: var(--text-medium);">No other lessons available yet.</p>
                </div>
            `;
        }
    }
}

async function checkLessonAccess() {
    if (!appState.currentLesson) return;

    if (appState.connectedWallet && appState.walletAddress) {
        const accessKey = `${appState.walletAddress}_${appState.currentLesson.id}`;
        const hasAccess = MOCK_ACCESSES[accessKey] === true || 
                         (MOCK_ACCESSES[accessKey] && MOCK_ACCESSES[accessKey].unlocked);

        if (hasAccess) {
            unlockLesson();
            return true;
        }
    }
    
    return false;
}

function unlockLesson() {
    const lockedContent = document.getElementById('locked-content');
    const unlockedContent = document.getElementById('unlocked-content');
    const lessonContent = document.getElementById('lesson-content');
    const unlockButtons = document.querySelectorAll('[id*="unlock"], .btn-unlock');
    const unlockMainButton = document.getElementById('unlock-lesson');

    if (lockedContent && unlockedContent) {
        lockedContent.style.display = 'none';
        unlockedContent.style.display = 'block';

        unlockButtons.forEach(btn => {
            btn.style.display = 'none';
        });
        
        if (unlockMainButton) {
            unlockMainButton.style.display = 'none';
        }

        if (lessonContent && appState.currentLesson) {
            if (appState.currentLesson.content_type === 'video') {
                lessonContent.innerHTML = `
                    <div class="video-container">
                        <iframe src="${appState.currentLesson.content_data}" 
                                frameborder="0" 
                                allowfullscreen
                                style="width: 100%; height: 400px; border-radius: 12px;"></iframe>
                    </div>
                `;
            } else if (appState.currentLesson.content_type === 'pdf') {
                lessonContent.innerHTML = `
                    <div class="pdf-container">
                        <p>This lesson contains a PDF file. Download link:</p>
                        <a href="${appState.currentLesson.content_data}" 
                           target="_blank" 
                           class="btn-primary"
                           style="display: inline-block; margin-top: 10px;">
                            <i class="fas fa-download"></i> Download PDF
                        </a>
                    </div>
                `;
            } else if (appState.currentLesson.content_type === 'external_url') {
                lessonContent.innerHTML = `
                    <div class="external-link-container">
                        <p>This lesson is hosted externally. Click the link below to access:</p>
                        <a href="${appState.currentLesson.content_data}" 
                           target="_blank" 
                           class="btn-primary"
                           style="display: inline-block; margin-top: 10px;">
                            <i class="fas fa-external-link-alt"></i> Access Lesson
                        </a>
                    </div>
                `;
            } else {
                lessonContent.innerHTML = marked.parse(appState.currentLesson.content_data || 'No content available');
            }
        }

        showNotification('Lesson unlocked successfully!');
    }
}


async function processPayment() {
    if (!appState.connectedWallet) {
        showNotification('Please connect your wallet first', 'error');
        return false;
    }

    if (!appState.currentLesson) {
        showNotification('No lesson selected', 'error');
        return false;
    }

    try {
        showNotification('Processing payment...', 'info');

        await new Promise(resolve => setTimeout(resolve, 1500));

        const accessKey = `${appState.walletAddress}_${appState.currentLesson.id}`;
        MOCK_ACCESSES[accessKey] = {
            unlocked: true,
            timestamp: Date.now(),
            lessonId: appState.currentLesson.id,
            price: appState.currentLesson.price,
            walletAddress: appState.walletAddress
        };

        saveAccessesToStorage();
        
        unlockLesson();

        showNotification(`Successfully purchased "${appState.currentLesson.title}"!`, 'success');
        
        updateStats();
        
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
            updatePurchasedLessonsUI();
        }
        
        return true;

    } catch (error) {
        console.error('Payment error:', error);
        showNotification('Payment failed. Please try again.', 'error');
        return false;
    }
}

function updatePurchasedLessonsUI() {
    const purchasedLessons = getUserPurchasedLessons();
    const purchasedCount = purchasedLessons.length;
    
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        const label = item.querySelector('.stat-label');
        if (label && label.textContent.includes('Unlocked')) {
            const value = item.querySelector('.stat-value');
            if (value) {
                value.textContent = purchasedCount;
            }
        }
    });
    
    document.querySelectorAll('.lesson-card').forEach(card => {
        const lessonId = card.dataset.id;
        if (hasLessonAccess(lessonId)) {
            const lessonType = card.querySelector('.lesson-type');
            if (lessonType && !lessonType.querySelector('.purchased-badge')) {
                const badge = document.createElement('span');
                badge.className = 'purchased-badge';
                badge.innerHTML = '<i class="fas fa-check-circle"></i> Purchased';
                lessonType.insertBefore(badge, lessonType.firstChild);
            }
        }
    });
}


function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function getInitials(text) {
    if (!text) return '??';
    return text.split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

function formatPrice(price) {
    return `${parseFloat(price).toFixed(2)} USDC`;
}

function getContentTypeIcon(type) {
    const icons = {
        'text': 'fas fa-file-alt',
        'video': 'fas fa-video',
        'pdf': 'fas fa-file-pdf',
        'external_url': 'fas fa-external-link-alt',
        'interactive': 'fas fa-gamepad',
        'code': 'fas fa-code',
        'audio': 'fas fa-volume-up'
    };
    return icons[type] || 'fas fa-file';
}

function getContentTypeName(type) {
    const names = {
        'text': 'Text',
        'video': 'Video',
        'pdf': 'PDF',
        'external_url': 'External',
        'interactive': 'Interactive',
        'code': 'Code',
        'audio': 'Audio'
    };
    return names[type] || 'Text';
}

function showLoading(element) {
    if (!element) return;

    element.innerHTML = `
        <div class="loading-state" style="grid-column: 1 / -1;">
            <div class="spinner"></div>
            <p>Loading lessons...</p>
        </div>
    `;
}

function showError(element, message) {
    if (!element) return;

    element.innerHTML = `
        <div class="error-state" style="grid-column: 1 / -1;">
            <i class="fas fa-exclamation-triangle fa-2x"></i>
            <p>${message}</p>
            <button class="btn-primary" onclick="location.reload()">Try Again</button>
        </div>
    `;
}

function showNotification(message, type = 'success') {
    const oldNotifications = document.querySelectorAll('.notification');
    oldNotifications.forEach(n => n.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icon = type === 'success' ? 'check-circle' : 
                 type === 'error' ? 'exclamation-circle' : 
                 type === 'info' ? 'info-circle' : 'bell';
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${icon}"></i>
            <span>${escapeHtml(message)}</span>
        </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('hide');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function updateLessonCount(count) {
    const countElements = document.querySelectorAll('[id*="lesson-count"], [id*="stat-value"]');
    countElements.forEach(element => {
        if (element.id.includes('lesson-count') || element.textContent.includes('Lessons')) {
            element.textContent = count;
        }
    });
}

function updateLessonUI(lesson) {
    document.title = `${lesson.title} | Uni402`;

    const elements = {
        'lesson-title': lesson.title,
        'lesson-description': lesson.description || 'No description',
        'lesson-price': formatPrice(lesson.price),
        'payment-lesson-title': lesson.title,
        'payment-price': formatPrice(lesson.price)
    };

    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) element.textContent = value;
    });

    const lessonType = document.getElementById('lesson-type');
    if (lessonType) {
        lessonType.innerHTML = `
            <i class="${getContentTypeIcon(lesson.content_type)}"></i>
            ${getContentTypeName(lesson.content_type)}
        `;
    }
}

function updateStats() {
    const purchasedLessons = getUserPurchasedLessons();
    const stats = {
        totalLessons: appState.lessons.length,
        purchasedLessons: purchasedLessons.length,
        totalEarned: purchasedLessons.reduce((sum, lesson) => sum + parseFloat(lesson.price), 0)
    };

    document.querySelectorAll('.stat-item').forEach(item => {
        const label = item.querySelector('.stat-label').textContent;
        const value = item.querySelector('.stat-value');
        
        if (label.includes('Lessons Available')) value.textContent = stats.totalLessons;
        if (label.includes('Lessons Unlocked')) value.textContent = stats.purchasedLessons;
        if (label.includes('Earned')) value.textContent = `$${stats.totalEarned.toFixed(2)}`;
    });
}

function initCategoryFilters() {
    const filters = document.querySelectorAll('.category-filter');
    const lessonsList = document.getElementById('lessons-list');
    
    if (!filters.length || !lessonsList) return;
    
    filters.forEach(filter => {
        filter.addEventListener('click', function() {
            filters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.dataset.category;
            filterLessons(category);
        });
    });
}

function filterLessons(category) {
    const lessonCards = document.querySelectorAll('.lesson-card');
    
    lessonCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
            card.style.display = 'none';
        }
    });
}

function generateLessonId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function initCreatePage() {
    console.log('Initializing create page');
    
    const publishBtn = document.getElementById('publish-btn');
    const form = document.getElementById('lesson-form');
    const walletWarning = document.getElementById('wallet-warning');
    const creatorInfo = document.getElementById('creator-info');
    
    if (publishBtn && form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handlePublishLesson();
        });
    }
    
    if (walletWarning) {
        if (!appState.connectedWallet) {
            walletWarning.style.display = 'block';
        } else {
            walletWarning.style.display = 'none';
        }
    }
    
    if (creatorInfo && appState.connectedWallet && appState.walletAddress) {
        creatorInfo.style.display = 'block';
        const addressElement = document.getElementById('creator-address');
        if (addressElement) {
            addressElement.textContent = `${appState.walletAddress.slice(0, 6)}...${appState.walletAddress.slice(-4)}`;
        }
    }
    
    const contentTypeSelect = document.getElementById('content-type');
    const contentHelp = document.getElementById('content-help');
    const contentDataTextarea = document.getElementById('content-data');
    
    if (contentTypeSelect && contentHelp && contentDataTextarea) {
        contentTypeSelect.addEventListener('change', function() {
            const type = this.value;
            
            switch(type) {
                case 'video':
                    contentHelp.textContent = 'For videos, paste YouTube/Vimeo embed URL (e.g., https://www.youtube.com/embed/VIDEO_ID)';
                    contentDataTextarea.placeholder = 'https://www.youtube.com/embed/...';
                    break;
                case 'pdf':
                    contentHelp.textContent = 'For PDFs, use a public Google Drive/Dropbox link or any direct download URL';
                    contentDataTextarea.placeholder = 'https://drive.google.com/file/d/...';
                    break;
                case 'external_url':
                    contentHelp.textContent = 'For external lessons, paste the full URL where your content is hosted';
                    contentDataTextarea.placeholder = 'https://your-website.com/lesson';
                    break;
                case 'audio':
                    contentHelp.textContent = 'For audio, paste a direct MP3 URL or SoundCloud/Spotify embed link';
                    contentDataTextarea.placeholder = 'https://soundcloud.com/...';
                    break;
                default:
                    contentHelp.textContent = 'Write your lesson content here. Markdown is supported.';
                    contentDataTextarea.placeholder = 'Write your lesson content here...';
            }
        });
    }
}

function handlePublishLesson() {
    if (!appState.connectedWallet) {
        showNotification('Please connect your wallet first', 'error');
        return false;
    }

    const title = document.getElementById('lesson-title')?.value.trim();
    const description = document.getElementById('lesson-description')?.value.trim();
    const price = document.getElementById('lesson-price')?.value;
    const contentData = document.getElementById('content-data')?.value.trim();
    const author = appState.walletAddress ? 
        `${appState.walletAddress.slice(0, 6)}...${appState.walletAddress.slice(-4)}` : 
        'Anonymous';
    const category = document.getElementById('lesson-category')?.value;
    const tags = document.getElementById('lesson-tags')?.value.trim() || '';
    const contentType = document.getElementById('content-type')?.value;
    const duration = document.getElementById('lesson-duration')?.value || '30';
    const prerequisites = document.getElementById('lesson-prerequisites')?.value.trim() || '';
    const outcomes = document.getElementById('lesson-outcomes')?.value.trim() || '';

    if (!title || !description || !price || !contentData) {
        showNotification('Please fill all required fields', 'error');
        return false;
    }

    if (title.length < 3) {
        showNotification('Title must be at least 3 characters', 'error');
        return false;
    }

    if (description.length < 10) {
        showNotification('Description must be at least 10 characters', 'error');
        return false;
    }

    if (contentData.length < 20) {
        showNotification('Lesson content must be at least 20 characters', 'error');
        return false;
    }

    try {
        const publishBtn = document.getElementById('publish-btn');
        const originalText = publishBtn.innerHTML;
        publishBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Publishing...';
        publishBtn.disabled = true;

        const newLesson = {
            id: generateLessonId(),
            title: title,
            description: description,
            price: price,
            content_type: contentType || 'text',
            content_data: contentData,
            author: author,
            created_at: new Date().toISOString().split('T')[0],
            category: category || 'general',
            tags: tags,
            duration: duration + ' min',
            prerequisites: prerequisites,
            outcomes: outcomes
        };

        console.log('Creating new lesson:', newLesson);

        appState.lessons.push(newLesson);
        
        saveLessonsToStorage();
        
        showNotification('Lesson published successfully!', 'success');
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);

        return true;

    } catch (error) {
        console.error('Error publishing lesson:', error);
        showNotification('Failed to publish lesson. Please try again.', 'error');
        
        const publishBtn = document.getElementById('publish-btn');
        if (publishBtn) {
            publishBtn.innerHTML = '<i class="fas fa-save"></i> <span class="btn-text">Publish Lesson</span>';
            publishBtn.disabled = false;
        }
        return false;
    }
}

function updateCreatePageUI() {
    const walletWarning = document.getElementById('wallet-warning');
    const creatorInfo = document.getElementById('creator-info');
    
    if (walletWarning) {
        walletWarning.style.display = appState.connectedWallet ? 'none' : 'block';
    }
    
    if (creatorInfo) {
        if (appState.connectedWallet && appState.walletAddress) {
            creatorInfo.style.display = 'block';
            const addressElement = document.getElementById('creator-address');
            if (addressElement) {
                addressElement.textContent = `${appState.walletAddress.slice(0, 6)}...${appState.walletAddress.slice(-4)}`;
            }
        } else {
            creatorInfo.style.display = 'none';
        }
    }
}

function initIndexPage() {
    console.log('Initializing index page');
    loadLessons();
}

function initLessonPage() {
    console.log('Initializing lesson page');
    const urlParams = new URLSearchParams(window.location.search);
    const lessonId = urlParams.get('id');
    
    if (lessonId) {
        loadLesson(lessonId);
    } else {
        showNotification('No lesson ID provided', 'error');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }
    
    const unlockLessonBtn = document.getElementById('unlock-lesson-btn');
    if (unlockLessonBtn) {
        unlockLessonBtn.addEventListener('click', processPayment);
    }
    
    const mainUnlockBtn = document.getElementById('unlock-lesson');
    if (mainUnlockBtn) {
        mainUnlockBtn.addEventListener('click', function() {
            if (!appState.connectedWallet) {
                initPhantomWallet();
            } else {
                processPayment();
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const browseBtn = document.getElementById('browse-lessons');
    if (browseBtn) {
        browseBtn.addEventListener('click', function() {
            const lessonsSection = document.querySelector('.lessons-section');
            if (lessonsSection) {
                lessonsSection.scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }
        });
    }
    
    const connectPhantomBtn = document.getElementById('connect-phantom');
    if (connectPhantomBtn) {
        connectPhantomBtn.addEventListener('click', initPhantomWallet);
    }
    
    const closeModalBtn = document.getElementById('close-modal');
    const paymentModal = document.getElementById('payment-modal');
    
    if (closeModalBtn && paymentModal) {
        closeModalBtn.addEventListener('click', function() {
            paymentModal.style.display = 'none';
        });
        
        paymentModal.addEventListener('click', function(e) {
            if (e.target === paymentModal) {
                paymentModal.style.display = 'none';
            }
        });
    }
});

function initApp() {
    initStorage();
    
    if (typeof marked !== 'undefined') {
        marked.setOptions({
            breaks: true,
            gfm: true,
            headerIds: false
        });
    }
    
    setupWalletListeners();
    restoreWalletConnection();
    updateWalletUI();
    
    const path = window.location.pathname;
    
    if (path.includes('lesson.html')) {
        initLessonPage();
    } else if (path.includes('create.html')) {
        initCreatePage();
    } else {
        initIndexPage();
    }
    
    setTimeout(() => {
        updatePurchasedLessonsUI();
    }, 1000);
}


window.addEventListener('DOMContentLoaded', initApp);
