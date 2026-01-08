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

// Mock lessons with all categories
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
        // Load lessons
        const savedLessons = localStorage.getItem(LESSONS_STORAGE_KEY);
        if (savedLessons) {
            appState.lessons = JSON.parse(savedLessons);
        } else {
            // Initialize with mock lessons
            appState.lessons = [...MOCK_LESSONS];
            saveLessonsToStorage();
        }
        
        // Load accesses
        const savedAccesses = localStorage.getItem(ACCESSES_STORAGE_KEY);
        if (savedAccesses) {
            MOCK_ACCESSES = JSON.parse(savedAccesses);
        }
        
        // Load wallet state
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

function cleanupOldData() {
    try {
        const saved = localStorage.getItem(WALLET_STORAGE_KEY);
        if (saved) {
            const state = JSON.parse(saved);
            const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
            
            if (state.lastConnected && state.lastConnected < weekAgo) {
                localStorage.removeItem(WALLET_STORAGE_KEY);
            }
        }
    } catch (error) {
        console.error('Error cleaning up old data:', error);
    }
}

// Wallet Functions
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

        // Update create page UI
        if (window.location.pathname.includes('create.html')) {
            updateCreatePageUI();
        }

        // Check lesson access
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
            } else {
                disconnectWallet();
            }
        });
    }
}

// Lessons Functions
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
        }, 500);

    } catch (error) {
        console.error('Error loading lessons:', error);
        showError(lessonsList, 'Failed to load lessons. Using saved data.');
        renderLessons(appState.lessons);
        updateLessonCount(appState.lessons.length);
        initCategoryFilters();
    }
}

async function createLesson(formData) {
    try {
        // Проверка соединения кошелька
        if (!appState.connectedWallet) {
            throw new Error('Please connect your wallet first');
        }

        if (!formData.title || formData.title.length < 3) {
            throw new Error('Lesson title must be at least 3 characters');
        }

        if (!formData.description || formData.description.length < 10) {
            throw new Error('Please provide a meaningful description (min 10 characters)');
        }

        if (!formData.content_data || formData.content_data.length < 20) {
            throw new Error('Lesson content is too short (min 20 characters)');
        }

        if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
            throw new Error('Price must be a positive number');
        }

        const newLesson = {
            id: Date.now().toString(),
            title: formData.title,
            description: formData.description,
            price: parseFloat(formData.price).toFixed(2),
            content_type: formData.content_type || 'text',
            content_data: formData.content_data,
            category: formData.category || 'web3',
            tags: formData.tags || '',
            duration: formData.duration || '30',
            prerequisites: formData.prerequisites || '',
            outcomes: formData.outcomes || '',
            author: appState.walletAddress ? 
                `${appState.walletAddress.slice(0, 4)}...${appState.walletAddress.slice(-4)}` : 
                'Anonymous',
            created_at: new Date().toISOString(),
            authorId: appState.walletAddress || 'anonymous',
            views: 0,
            purchases: 0
        };

        // Добавляем урок
        appState.lessons.unshift(newLesson);
        saveLessonsToStorage();

        showNotification('Lesson created successfully!', 'success');

        // Обновляем UI если мы на главной
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
            renderLessons(appState.lessons);
            updateLessonCount(appState.lessons.length);
            updateStats();
        }

        return newLesson;

    } catch (error) {
        console.error('Error creating lesson:', error);
        showNotification(error.message, 'error');
        throw error;
    }
}

function renderLessons(lessons) {
    const lessonsList = document.getElementById('lessons-list');
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

function initCategoryFilters() {
    const filters = document.querySelectorAll('.category-filter');
    if (!filters.length) return;

    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            filters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
            const category = filter.dataset.category;
            filterLessons(category);
        });
    });
}

function filterLessons(category) {
    if (category === 'all') {
        renderLessons(appState.lessons);
    } else {
        const filteredLessons = appState.lessons.filter(lesson => 
            lesson.category === category
        );
        renderLessons(filteredLessons);
    }
}

// Lesson Page Functions
async function loadLesson(lessonId) {
    try {
        const lesson = appState.lessons.find(l => l.id === lessonId);
        if (!lesson) {
            throw new Error('Lesson not found');
        }

        appState.currentLesson = lesson;
        updateLessonUI(lesson);

        // Load related lessons
        loadRelatedLessons(lesson);

        if (appState.connectedWallet) {
            await checkLessonAccess();
        }

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

    // Find lessons with same category or tags
    const relatedLessons = appState.lessons
        .filter(l => l.id !== lesson.id && (l.category === lesson.category || 
                 l.tags.split(',').some(tag => lesson.tags.includes(tag))))
        .slice(0, 3);

    relatedLessonsContainer.innerHTML = '';

    relatedLessons.forEach(lesson => {
        const lessonCard = document.createElement('div');
        lessonCard.className = 'lesson-card';
        lessonCard.dataset.id = lesson.id;

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
                    <i class="${getContentTypeIcon(lesson.content_type)}"></i>
                    ${getContentTypeName(lesson.content_type)}
                </div>
            </div>
        `;

        lessonCard.addEventListener('click', () => {
            window.location.href = `lesson.html?id=${lesson.id}`;
        });

        relatedLessonsContainer.appendChild(lessonCard);
    });
}

async function checkLessonAccess() {
    if (!appState.currentLesson || !appState.connectedWallet || !appState.walletAddress) return;

    try {
        const accessKey = `${appState.walletAddress}_${appState.currentLesson.id}`;
        const hasAccess = MOCK_ACCESSES[accessKey] === true || 
                         (MOCK_ACCESSES[accessKey] && MOCK_ACCESSES[accessKey].unlocked);

        if (hasAccess) {
            unlockLesson();
        }
    } catch (error) {
        console.error('Error checking access:', error);
    }
}

function unlockLesson() {
    const lockedContent = document.getElementById('locked-content');
    const unlockedContent = document.getElementById('unlocked-content');
    const lessonContent = document.getElementById('lesson-content');
    const unlockButtons = document.querySelectorAll('[id*="unlock"], .btn-unlock');

    if (lockedContent && unlockedContent) {
        lockedContent.style.display = 'none';
        unlockedContent.style.display = 'block';

        unlockButtons.forEach(btn => {
            btn.style.display = 'none';
        });

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

// Payment Functions
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
            price: appState.currentLesson.price
        };

        saveAccessesToStorage();
        unlockLesson();

        showNotification(`Successfully purchased "${appState.currentLesson.title}"!`, 'success');
        return true;

    } catch (error) {
        console.error('Payment error:', error);
        showNotification('Payment failed. Please try again.', 'error');
        return false;
    }
}

async function handlePayment() {
    const confirmPaymentBtn = document.getElementById('confirm-payment');
    if (!confirmPaymentBtn) return;

    const originalText = confirmPaymentBtn.innerHTML;
    
    confirmPaymentBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    confirmPaymentBtn.disabled = true;

    const success = await processPayment();

    if (success) {
        const paymentModal = document.getElementById('payment-modal');
        if (paymentModal) {
            paymentModal.style.display = 'none';
        }
    }

    confirmPaymentBtn.innerHTML = originalText;
    confirmPaymentBtn.disabled = false;
}

// Helper Functions
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
    const stats = {
        totalLessons: appState.lessons.length,
        totalCreators: new Set(appState.lessons.map(l => l.author)).size,
        totalEarned: appState.lessons.reduce((sum, lesson) => sum + parseFloat(lesson.price), 0) * 10
    };

    document.querySelectorAll('.stat-item').forEach(item => {
        const label = item.querySelector('.stat-label').textContent;
        const value = item.querySelector('.stat-value');
        
        if (label.includes('Lessons')) value.textContent = stats.totalLessons;
        if (label.includes('Creators')) value.textContent = stats.totalCreators;
        if (label.includes('Earned')) value.textContent = `$${stats.totalEarned.toFixed(2)}`;
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function scrollToLessons() {
    const lessonsSection = document.querySelector('.lessons-section');
    if (lessonsSection) {
        lessonsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function initIndexPage() {
    console.log('Initializing index page...');
    
    const connectButtons = document.querySelectorAll('.connect-btn');
    connectButtons.forEach(btn => {
        btn.addEventListener('click', initPhantomWallet);
    });

    loadLessons();
    updateStats();
    initCategoryFilters();

    // Browse Lessons button
    const browseBtn = document.getElementById('browse-lessons');
    if (browseBtn) {
        browseBtn.addEventListener('click', scrollToLessons);
    }

    const viewAllBtn = document.getElementById('view-all-lessons');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', (e) => {
            e.preventDefault();
            filterLessons('all');
        });
    }

    const learnMoreBtn = document.getElementById('learn-more');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToTop();
        });
    }

    const paymentModal = document.getElementById('payment-modal');
    const closeModalBtn = document.getElementById('close-modal');
    
    if (closeModalBtn && paymentModal) {
        closeModalBtn.addEventListener('click', () => {
            paymentModal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', (event) => {
        const paymentModal = document.getElementById('payment-modal');
        if (paymentModal && event.target === paymentModal) {
            paymentModal.style.display = 'none';
        }
    });
}

function initLessonPage() {
    console.log('Initializing lesson page...');
    
    const connectButtons = document.querySelectorAll('.connect-btn');
    connectButtons.forEach(btn => {
        btn.addEventListener('click', initPhantomWallet);
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const lessonId = urlParams.get('id');
    
    if (!lessonId) {
        showNotification('No lesson selected. Redirecting to home...', 'error');
        setTimeout(() => window.location.href = 'index.html', 2000);
        return;
    }
    
    loadLesson(lessonId);
    
    const unlockButtons = [
        document.getElementById('unlock-lesson'),
        document.getElementById('unlock-lesson-btn')
    ].filter(Boolean);
    
    unlockButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (!appState.connectedWallet) {
                showNotification('Please connect your wallet first', 'error');
                return;
            }
            
            const paymentModal = document.getElementById('payment-modal');
            if (paymentModal) {
                paymentModal.style.display = 'flex';
            }
        });
    });
    
    const saveBtn = document.getElementById('save-later');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            if (!appState.currentLesson) return;
            const savedLessons = JSON.parse(localStorage.getItem('uni402_saved_lessons') || '[]');
            if (!savedLessons.includes(appState.currentLesson.id)) {
                savedLessons.push(appState.currentLesson.id);
                localStorage.setItem('uni402_saved_lessons', JSON.stringify(savedLessons));
                showNotification('Lesson saved for later!', 'success');
            }
        });
    }
    
    const browseAllBtn = document.getElementById('browse-all');
    if (browseAllBtn) {
        browseAllBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'index.html';
        });
    }
    
    const paymentModal = document.getElementById('payment-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const confirmPaymentBtn = document.getElementById('confirm-payment');
    
    if (closeModalBtn && paymentModal) {
        closeModalBtn.addEventListener('click', () => {
            paymentModal.style.display = 'none';
        });
    }
    
    if (confirmPaymentBtn) {
        confirmPaymentBtn.addEventListener('click', handlePayment);
    }
    
    window.addEventListener('click', (event) => {
        const paymentModal = document.getElementById('payment-modal');
        if (paymentModal && event.target === paymentModal) {
            paymentModal.style.display = 'none';
        }
    });
}

function updateCreatePageUI() {
    const walletWarning = document.getElementById('wallet-warning');
    const creatorInfo = document.getElementById('creator-info');
    const creatorAddress = document.getElementById('creator-address');
    const publishBtn = document.getElementById('publish-btn');

    if (appState.connectedWallet && appState.walletAddress) {
        if (walletWarning) walletWarning.style.display = 'none';
        if (creatorInfo) creatorInfo.style.display = 'block';
        if (creatorAddress) {
            creatorAddress.textContent = `${appState.walletAddress.slice(0, 6)}...${appState.walletAddress.slice(-4)}`;
        }
        if (publishBtn) publishBtn.disabled = false;
    } else {
        if (walletWarning) walletWarning.style.display = 'block';
        if (creatorInfo) creatorInfo.style.display = 'none';
        if (publishBtn) publishBtn.disabled = true;
    }
}

function initCreatePage() {
    console.log('Initializing create page...');
    
    const connectButtons = document.querySelectorAll('.connect-btn');
    connectButtons.forEach(btn => {
        btn.addEventListener('click', initPhantomWallet);
    });

    updateCreatePageUI();

    const lessonForm = document.getElementById('lesson-form');
    if (lessonForm) {
        lessonForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!appState.connectedWallet || !appState.walletAddress) {
                showNotification('Please connect your wallet first to create lessons', 'error');
                return;
            }
            
            const formData = {
                title: document.getElementById('lesson-title').value.trim(),
                description: document.getElementById('lesson-description').value.trim(),
                price: document.getElementById('lesson-price').value,
                content_type: document.getElementById('content-type').value,
                category: document.getElementById('lesson-category').value,
                tags: document.getElementById('lesson-tags').value.trim(),
                duration: document.getElementById('lesson-duration').value || '30',
                content_data: document.getElementById('content-data').value.trim(),
                prerequisites: document.getElementById('lesson-prerequisites').value.trim(),
                outcomes: document.getElementById('lesson-outcomes').value.trim()
            };
            
            if (!formData.title || formData.title.length < 3) {
                showNotification('Lesson title must be at least 3 characters', 'error');
                return;
            }
            
            if (!formData.description || formData.description.length < 10) {
                showNotification('Please provide a meaningful description (min 10 characters)', 'error');
                return;
            }
            
            if (!formData.content_data || formData.content_data.length < 20) {
                showNotification('Lesson content is too short (min 20 characters)', 'error');
                return;
            }
            
            const submitBtn = lessonForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Publishing...';
            submitBtn.disabled = true;
            
            try {
                const newLesson = await createLesson(formData);
                
                showNotification('Lesson created successfully! Redirecting to homepage...', 'success');
                
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
                
            } catch (error) {
                console.error('Error creating lesson:', error);
                showNotification(error.message || 'Failed to create lesson. Please try again.', 'error');
                
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    
    const contentTypeSelect = document.getElementById('content-type');
    const contentHelpText = document.getElementById('content-help');
    
    if (contentTypeSelect && contentHelpText) {
        contentTypeSelect.addEventListener('change', (e) => {
            const type = e.target.value;
            let helpText = '';
            
            switch(type) {
                case 'video':
                    helpText = 'Paste YouTube, Vimeo, or Loom URL. Example: https://youtube.com/watch?v=...';
                    break;
                case 'pdf':
                    helpText = 'Use Google Drive, Dropbox, or OneDrive link with public access enabled';
                    break;
                case 'external_url':
                    helpText = 'Paste any external URL where your content is hosted';
                    break;
                case 'audio':
                    helpText = 'Use SoundCloud, Spotify, or direct audio file link (MP3)';
                    break;
                default:
                    helpText = 'For videos, paste YouTube/Vimeo URL. For PDFs, use Google Drive/Dropbox link.';
            }
            
            contentHelpText.textContent = helpText;
        });
    }
}

function initApp() {
    // Инициализация хранилища
    initStorage();
    cleanupOldData();
    
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
}

document.addEventListener('DOMContentLoaded', initApp);


window.app = {
    state: appState,
    connectWallet: initPhantomWallet,
    disconnectWallet: disconnectWallet,
    loadLessons: loadLessons,
    processPayment: processPayment,
    createLesson: createLesson,
    saveLessonsToStorage: saveLessonsToStorage
};
