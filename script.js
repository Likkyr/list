const API_BASE_URL = window.location.origin;
const CREATOR_WALLET = 'Hx402UniPayCreatorAddress123456789';
const USDC_MINT = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';

const appState = {
    connectedWallet: false,
    walletAddress: null,
    currentLesson: null,
    lessons: []
};


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

        updateWalletUI();
        showNotification('Wallet connected successfully!');

       
        if (window.location.pathname.includes('lesson.html')) {
            await checkLessonAccess();
        }

        return true;
    } catch (err) {
        console.error('Wallet connection error:', err);
        if (err.code === 4001) {
            showNotification('Connection rejected by user', 'error');
        } else {
            showNotification('Failed to connect wallet', 'error');
        }
        return false;
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
        updateWalletUI();
        showNotification('Wallet disconnected');
    } catch (error) {
        console.error('Error disconnecting wallet:', error);
    }
}


const MOCK_LESSONS = [
    {
        id: '1',
        title: 'Introduction to Web3 Development',
        description: 'Learn the fundamentals of Web3 development including smart contracts, wallets, and decentralized applications.',
        price: '0.02',
        content_type: 'text',
        content_data: '# Introduction to Web3 Development\n\nWelcome to the world of Web3 development!',
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
        content_data: '# Solana Smart Contracts 101\n\n## Introduction to Solana',
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
        title: 'Advanced DeFi Strategies',
        description: 'Learn advanced DeFi strategies including yield farming, liquidity providing, and risk management.',
        price: '0.05',
        content_type: 'pdf',
        content_data: 'defi_strategies.pdf',
        author: 'DeFi Expert',
        created_at: '2024-02-01',
        category: 'defi',
        tags: 'defi,yield-farming,liquidity'
    },
    // New 20 lessons...
    {
        id: '5',
        title: 'JavaScript Fundamentals for Beginners',
        description: 'Master the basics of JavaScript programming with hands-on exercises and projects.',
        price: '0.02',
        content_type: 'interactive',
        content_data: 'Interactive JavaScript course with quizzes and coding exercises.',
        author: 'Code Academy',
        created_at: '2024-02-05',
        category: 'programming',
        tags: 'javascript,programming,beginners'
    },
    {
        id: '6',
        title: 'Python Data Science Bootcamp',
        description: 'Complete guide to data science using Python, pandas, and scikit-learn.',
        price: '0.05',
        content_type: 'text',
        content_data: 'Python data science course material',
        author: 'Data Science Pro',
        created_at: '2024-02-10',
        category: 'programming',
        tags: 'python,data-science,machine-learning'
    },
    {
        id: '7',
        title: 'React Native Mobile Development',
        description: 'Build cross-platform mobile apps with React Native and Expo.',
        price: '0.04',
        content_type: 'video',
        content_data: 'https://www.youtube.com/embed/react-native-course',
        author: 'Mobile Dev Expert',
        created_at: '2024-02-12',
        category: 'programming',
        tags: 'react-native,mobile,development'
    },
    {
        id: '8',
        title: 'Bitcoin & Cryptocurrency Basics',
        description: 'Understand Bitcoin, cryptocurrency markets, and how to safely store your crypto.',
        price: '0.02',
        content_type: 'text',
        content_data: 'Bitcoin fundamentals course',
        author: 'Crypto Educator',
        created_at: '2024-02-15',
        category: 'crypto',
        tags: 'bitcoin,cryptocurrency,wallet'
    },
    {
        id: '9',
        title: 'NFT Creation & Marketing Guide',
        description: 'Learn how to create, mint, and market your own NFT collections successfully.',
        price: '0.03',
        content_type: 'text',
        content_data: 'NFT creation guide',
        author: 'NFT Creator',
        created_at: '2024-02-18',
        category: 'nft',
        tags: 'nft,art,marketplace'
    },
    {
        id: '10',
        title: 'Smart Contract Security Audit',
        description: 'Learn how to audit smart contracts for security vulnerabilities and best practices.',
        price: '0.05',
        content_type: 'text',
        content_data: 'Smart contract security course',
        author: 'Security Auditor',
        created_at: '2024-02-20',
        category: 'web3',
        tags: 'security,audit,smart-contracts'
    },
    {
        id: '11',
        title: 'Web3.js & Ethers.js Tutorial',
        description: 'Master Web3.js and Ethers.js libraries for interacting with Ethereum blockchain.',
        price: '0.03',
        content_type: 'code',
        content_data: 'Web3.js and Ethers.js code examples',
        author: 'Blockchain Dev',
        created_at: '2024-02-22',
        category: 'web3',
        tags: 'web3js,ethersjs,ethereum'
    },
    {
        id: '12',
        title: 'AI Prompt Engineering Mastery',
        description: 'Learn advanced techniques for writing effective AI prompts for ChatGPT and other models.',
        price: '0.02',
        content_type: 'text',
        content_data: 'AI prompt engineering course',
        author: 'AI Expert',
        created_at: '2024-02-25',
        category: 'ai',
        tags: 'ai,prompt-engineering,chatgpt'
    },
    {
        id: '13',
        title: 'Solidity Programming Complete Course',
        description: 'From beginner to advanced Solidity programming for Ethereum smart contracts.',
        price: '0.05',
        content_type: 'interactive',
        content_data: 'Solidity programming course',
        author: 'Solidity Master',
        created_at: '2024-02-28',
        category: 'programming',
        tags: 'solidity,ethereum,smart-contracts'
    },
    {
        id: '14',
        title: 'DAO Governance & Management',
        description: 'Learn how to create and manage Decentralized Autonomous Organizations (DAOs).',
        price: '0.03',
        content_type: 'text',
        content_data: 'DAO management course',
        author: 'DAO Specialist',
        created_at: '2024-03-01',
        category: 'web3',
        tags: 'dao,governance,management'
    },
    {
        id: '15',
        title: 'Crypto Trading Strategies 2024',
        description: 'Advanced trading strategies for cryptocurrency markets with risk management.',
        price: '0.04',
        content_type: 'video',
        content_data: 'https://www.youtube.com/embed/trading-course',
        author: 'Trading Pro',
        created_at: '2024-03-03',
        category: 'crypto',
        tags: 'trading,crypto,strategies'
    },
    {
        id: '16',
        title: 'Web Design Fundamentals',
        description: 'Learn modern web design principles, UI/UX best practices, and responsive design.',
        price: '0.02',
        content_type: 'text',
        content_data: 'Web design fundamentals course',
        author: 'Design Expert',
        created_at: '2024-03-05',
        category: 'design',
        tags: 'design,ui,ux,web-design'
    },
    {
        id: '17',
        title: 'Personal Finance with Crypto',
        description: 'How to manage personal finances and invest in cryptocurrency responsibly.',
        price: '0.02',
        content_type: 'text',
        content_data: 'Personal finance with crypto course',
        author: 'Finance Coach',
        created_at: '2024-03-08',
        category: 'personal',
        tags: 'finance,crypto,investment'
    },
    {
        id: '18',
        title: 'Digital Marketing for Creators',
        description: 'Marketing strategies for content creators and digital entrepreneurs.',
        price: '0.03',
        content_type: 'audio',
        content_data: 'Audio lessons on digital marketing',
        author: 'Marketing Guru',
        created_at: '2024-03-10',
        category: 'marketing',
        tags: 'marketing,creators,social-media'
    },
    {
        id: '19',
        title: 'Rust Programming for Blockchain',
        description: 'Learn Rust programming language specifically for blockchain development.',
        price: '0.04',
        content_type: 'code',
        content_data: 'Rust for blockchain code examples',
        author: 'Rust Developer',
        created_at: '2024-03-12',
        category: 'programming',
        tags: 'rust,blockchain,solana'
    },
    {
        id: '20',
        title: 'Business Development in Web3',
        description: 'How to build and scale successful businesses in the Web3 ecosystem.',
        price: '0.05',
        content_type: 'text',
        content_data: 'Web3 business development course',
        author: 'Web3 Entrepreneur',
        created_at: '2024-03-15',
        category: 'business',
        tags: 'business,web3,entrepreneurship'
    },
    {
        id: '21',
        title: 'Technical Analysis Masterclass',
        description: 'Complete guide to technical analysis for crypto and traditional markets.',
        price: '0.03',
        content_type: 'video',
        content_data: 'https://www.youtube.com/embed/ta-course',
        author: 'TA Expert',
        created_at: '2024-03-18',
        category: 'crypto',
        tags: 'technical-analysis,trading,charts'
    },
    {
        id: '22',
        title: 'Mindfulness & Productivity',
        description: 'Techniques to improve focus, productivity, and mental well-being.',
        price: '0.01',
        content_type: 'audio',
        content_data: 'Mindfulness audio lessons',
        author: 'Wellness Coach',
        created_at: '2024-03-20',
        category: 'personal',
        tags: 'mindfulness,productivity,wellness'
    },
    {
        id: '23',
        title: 'GraphQL API Development',
        description: 'Build efficient GraphQL APIs with Node.js and Apollo Server.',
        price: '0.03',
        content_type: 'code',
        content_data: 'GraphQL API development course',
        author: 'API Developer',
        created_at: '2024-03-22',
        category: 'programming',
        tags: 'graphql,api,nodejs'
    },
    {
        id: '24',
        title: 'Content Creation Mastery',
        description: 'How to create engaging content that attracts and retains audiences.',
        price: '0.02',
        content_type: 'text',
        content_data: 'Content creation course',
        author: 'Content Creator',
        created_at: '2024-03-25',
        category: 'marketing',
        tags: 'content,creation,marketing'
    }
];


const MOCK_ACCESSES = {};

async function loadLessons() {
    const lessonsList = document.getElementById('lessons-list');
    if (!lessonsList) return;

    try {
        showLoading(lessonsList);

       
        setTimeout(() => {
            appState.lessons = MOCK_LESSONS;
            renderLessons(MOCK_LESSONS);
            updateLessonCount(MOCK_LESSONS.length);
            initCategoryFilters(); // Добавляем инициализацию фильтров
        }, 500);

    } catch (error) {
        console.error('Error loading lessons:', error);
        showError(lessonsList, 'Failed to load lessons. Using demo data.');
        
       
        appState.lessons = MOCK_LESSONS;
        renderLessons(MOCK_LESSONS);
        updateLessonCount(MOCK_LESSONS.length);
        initCategoryFilters(); // Добавляем инициализацию фильтров
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
    const allLessons = appState.lessons || MOCK_LESSONS;
    
    if (category === 'all') {
        renderLessons(allLessons);
    } else {
        const filteredLessons = allLessons.filter(lesson => 
            lesson.category === category
        );
        renderLessons(filteredLessons);
    }
}

async function loadLesson(lessonId) {
    try {
       
        const lesson = MOCK_LESSONS.find(l => l.id === lessonId);
        if (!lesson) {
            throw new Error('Lesson not found');
        }

        appState.currentLesson = lesson;
        updateLessonUI(lesson);

       
        if (appState.connectedWallet) {
            await checkLessonAccess();
        }

    } catch (error) {
        console.error('Error loading lesson:', error);
        showNotification('Failed to load lesson. Redirecting to home...', 'error');
        
        setTimeout(() => {
            window.location.href = '/';
        }, 2000);
    }
}

async function checkLessonAccess() {
    if (!appState.currentLesson || !appState.connectedWallet || !appState.walletAddress) return;

    try {
      
        const accessKey = `${appState.walletAddress}_${appState.currentLesson.id}`;
        const hasAccess = MOCK_ACCESSES[accessKey] === true;

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
    const unlockButtons = document.querySelectorAll('[id*="unlock"]');

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
                                allowfullscreen></iframe>
                    </div>
                `;
            } else if (appState.currentLesson.content_type === 'pdf') {
                lessonContent.innerHTML = `
                    <div class="pdf-container">
                        <p>This lesson contains a PDF file: <strong>${appState.currentLesson.content_data}</strong></p>
                        <p>Download link will be available after purchase.</p>
                    </div>
                `;
            } else {
                lessonContent.innerHTML = marked.parse(appState.currentLesson.content_data || 'No content available');
            }
        }

        showNotification('Lesson unlocked successfully!');
    }
}

async function createLesson(formData) {
    try {
       
        if (!formData.title || !formData.price || !formData.description) {
            throw new Error('Title, price, and description are required');
        }

        if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
            throw new Error('Price must be a positive number');
        }

       
        const newLesson = {
            id: (MOCK_LESSONS.length + 1).toString(),
            title: formData.title,
            description: formData.description || '',
            price: parseFloat(formData.price).toFixed(2),
            content_type: formData.content_type || 'text',
            content_data: formData.content_data || '',
            category: formData.category || 'web3',
            tags: formData.tags || '',
            duration: formData.duration || '30',
            author: appState.connectedWallet ? 
                `${appState.walletAddress.slice(0, 4)}...${appState.walletAddress.slice(-4)}` : 
                'Anonymous',
            created_at: new Date().toISOString().split('T')[0]
        };

        
        MOCK_LESSONS.unshift(newLesson); // Add to beginning

        showNotification('Lesson created successfully!', 'success');

        
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
            renderLessons(MOCK_LESSONS);
            updateLessonCount(MOCK_LESSONS.length);
            updateStats();
        }

        return newLesson;

    } catch (error) {
        console.error('Error creating lesson:', error);
        showNotification(error.message, 'error');
        throw error;
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
        MOCK_ACCESSES[accessKey] = true;

        
        unlockLesson();

        showNotification(`Successfully purchased "${appState.currentLesson.title}"!`, 'success');
        return true;

    } catch (error) {
        console.error('Payment error:', error);
        showNotification('Payment failed. Please try again.', 'error');
        return false;
    }
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
        'external_url': 'External Link',
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
            <p>Loading...</p>
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
        element.textContent = count;
    });
}

function updateLessonUI(lesson) {
    
    document.title = `${lesson.title} | UniPay`;

    
    const elements = {
        'lesson-title': lesson.title,
        'lesson-description': lesson.description || 'No description',
        'lesson-price': formatPrice(lesson.price),
        'payment-lesson-title': lesson.title,
        'payment-price': formatPrice(lesson.price),
        'lesson-author': lesson.author || 'Creator'
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

function initIndexPage() {
    console.log('Initializing index page...');
    
   
    const connectButtons = document.querySelectorAll('.connect-btn');
    connectButtons.forEach(btn => {
        btn.addEventListener('click', initPhantomWallet);
    });

 
    loadLessons();

    
    updateStats();

    initCategoryFilters();  

    
    const heroActions = document.querySelectorAll('.hero-actions button');
    heroActions.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (btn.classList.contains('btn-secondary')) {
              
                const lessonsSection = document.querySelector('.lessons-section');
                if (lessonsSection) {
                    lessonsSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });


    initCategoryFilters();
}

function updateStats() {
    const stats = {
        totalLessons: MOCK_LESSONS.length,
        totalCreators: new Set(MOCK_LESSONS.map(l => l.author)).size,
        totalEarned: MOCK_LESSONS.reduce((sum, lesson) => sum + parseFloat(lesson.price), 0) * 10 
    };

    document.querySelectorAll('.stat-item').forEach(item => {
        const label = item.querySelector('.stat-label').textContent;
        const value = item.querySelector('.stat-value');
        
        if (label.includes('Lessons')) value.textContent = stats.totalLessons;
        if (label.includes('Creators')) value.textContent = stats.totalCreators;
        if (label.includes('Earned')) value.textContent = `$${stats.totalEarned.toFixed(2)}`;
    });
}

function initLessonPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const lessonId = urlParams.get('id');

    if (!lessonId) {
        showNotification('No lesson selected. Redirecting to home...', 'error');
        setTimeout(() => window.location.href = '/', 2000);
        return;
    }

   
    const connectButtons = document.querySelectorAll('.connect-btn');
    connectButtons.forEach(btn => {
        btn.addEventListener('click', initPhantomWallet);
    });

    
    const unlockButtons = [
        document.getElementById('unlock-lesson'),
        document.getElementById('unlock-lesson-btn'),
        document.getElementById('confirm-payment')
    ].filter(Boolean);

    unlockButtons.forEach(btn => {
        if (btn.id === 'confirm-payment') {
            btn.addEventListener('click', handlePayment);
        } else {
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
        }
    });

    
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

    
    loadLesson(lessonId);
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

function initCreatePage() {
    
    const connectButtons = document.querySelectorAll('.connect-btn');
    connectButtons.forEach(btn => {
        btn.addEventListener('click', initPhantomWallet);
    });

    
    const lessonForm = document.getElementById('lesson-form');
    if (lessonForm) {
        lessonForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!appState.connectedWallet) {
                showNotification('Please connect your wallet first', 'error');
                return;
            }
            
            const formData = {
                title: document.getElementById('lesson-title').value,
                description: document.getElementById('lesson-description').value,
                price: document.getElementById('lesson-price').value,
                content_type: document.getElementById('content-type').value,
                category: document.getElementById('lesson-category').value,
                tags: document.getElementById('lesson-tags').value,
                duration: document.getElementById('lesson-duration').value,
                content_data: document.getElementById('content-data').value,
                prerequisites: document.getElementById('lesson-prerequisites').value,
                outcomes: document.getElementById('lesson-outcomes').value
            };
            
            const submitBtn = lessonForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Publishing...';
            submitBtn.disabled = true;
            
            try {
                await createLesson(formData);
                
                showNotification('Lesson created successfully! Redirecting...', 'success');
                
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
                
            } catch (error) {
                console.error('Error creating lesson:', error);
                showNotification(error.message || 'Failed to create lesson', 'error');
                
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
}

function initApp() {
   
    if (!document.querySelector('#app-styles')) {
        const style = document.createElement('style');
        style.id = 'app-styles';
        style.textContent = `
            .loading-state {
                text-align: center;
                padding: 60px 20px;
            }
            .spinner {
                width: 40px;
                height: 40px;
                border: 4px solid rgba(255, 255, 255, 0.1);
                border-top: 4px solid var(--primary);
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 20px;
            }
            .error-state {
                text-align: center;
                padding: 60px 20px;
                color: var(--text-medium);
            }
            .error-state i {
                color: #ef4444;
                margin-bottom: 20px;
            }
            .connect-btn.connected {
                background: linear-gradient(135deg, #10b981, #059669);
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--bg-medium);
                border: 1px solid var(--border-light);
                border-radius: var(--radius-md);
                padding: 16px 20px;
                box-shadow: var(--shadow-lg);
                z-index: 9999;
                animation: slideIn 0.3s ease;
                max-width: 400px;
                border-left: 4px solid var(--accent);
                backdrop-filter: blur(10px);
            }
            .notification-error {
                border-left-color: #ef4444;
            }
            .notification-info {
                border-left-color: var(--secondary);
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 12px;
                color: var(--text-dark);
                font-weight: 500;
            }
            .notification-content i {
                font-size: 20px;
            }
            .notification-success i {
                color: var(--accent);
            }
            .notification-error i {
                color: #ef4444;
            }
            .notification-info i {
                color: var(--secondary);
            }
            .hide {
                animation: slideOut 0.3s ease forwards;
            }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            .video-container {
                position: relative;
                padding-bottom: 56.25%;
                height: 0;
                overflow: hidden;
                margin: 20px 0;
                border-radius: var(--radius-md);
            }
            .video-container iframe {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border: none;
            }
            .pdf-container {
                background: rgba(255, 255, 255, 0.05);
                padding: 20px;
                border-radius: var(--radius-md);
                margin: 20px 0;
            }
            .category-filters {
                display: flex;
                flex-wrap: wrap;
                gap: 12px;
                margin-bottom: 32px;
                padding-bottom: 24px;
                border-bottom: 1px solid var(--border-light);
            }
            .category-filter {
                padding: 10px 20px;
                background: rgba(30, 41, 59, 0.6);
                border: 1px solid var(--border-light);
                border-radius: 20px;
                color: var(--text-medium);
                font-size: 14px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            .category-filter:hover {
                border-color: var(--primary);
                color: var(--primary);
                transform: translateY(-2px);
            }
            .category-filter.active {
                background: var(--gradient-primary);
                color: white;
                border-color: var(--primary);
                box-shadow: var(--glow-primary);
            }
        `;
        document.head.appendChild(style);
    }

    
    if (typeof marked !== 'undefined') {
        marked.setOptions({
            breaks: true,
            gfm: true,
            headerIds: false
        });
    }

    
    const path = window.location.pathname;
    
    if (path.includes('lesson.html')) {
        initLessonPage();
    } else if (path.includes('create.html')) {
        initCreatePage();
    } else {
        
        initIndexPage();
    }

    
    checkPhantomSupport();
}


document.addEventListener('DOMContentLoaded', initApp);

window.app = {
    state: appState,
    connectWallet: initPhantomWallet,
    disconnectWallet: disconnectWallet,
    loadLessons: loadLessons,
    processPayment: processPayment,
    createLesson: createLesson
};

async function processPaymentWithX402() {
    if (!appState.connectedWallet || !appState.walletAddress) {
        showNotification('Please connect your wallet first', 'error');
        return false;
    }

    if (!appState.currentLesson) {
        showNotification('No lesson selected', 'error');
        return false;
    }

    try {
        showNotification('Processing payment via x402 protocol...', 'info');

        
        const paymentData = {
            from: appState.walletAddress,
            to: CREATOR_WALLET,
            amount: parseFloat(appState.currentLesson.price),
            token: USDC_MINT,
            lessonId: appState.currentLesson.id,
            timestamp: Date.now(),
            network: 'solana'
        };


        const transaction = {
            message: `Unlock lesson: ${appState.currentLesson.id}`,
            amount: paymentData.amount,
            recipient: paymentData.to,
            data: JSON.stringify(paymentData)
        };

    
        const signature = await window.solana.signMessage(
            new TextEncoder().encode(JSON.stringify(transaction))
        );

    
        await new Promise(resolve => setTimeout(resolve, 2000));

        
        const accessKey = `${appState.walletAddress}_${appState.currentLesson.id}`;
        MOCK_ACCESSES[accessKey] = {
            signature: signature.signature,
            timestamp: Date.now(),
            protocol: 'x402'
        };

        unlockLesson();
        
        showNotification(`Successfully purchased via x402 protocol!`, 'success');
        return true;

    } catch (error) {
        console.error('x402 Payment error:', error);
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

    const success = await processPaymentWithX402();

    if (success) {
        const paymentModal = document.getElementById('payment-modal');
        if (paymentModal) paymentModal.style.display = 'none';
    }

    confirmPaymentBtn.innerHTML = originalText;
    confirmPaymentBtn.disabled = false;
}