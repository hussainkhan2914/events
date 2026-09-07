/**
 * CampusEvents - Central Data Store & Theme Engine
 * Realistic college event database, theme system, and local storage management
 */

// ==========================================================================
// 1. THEME-BASED BACKGROUND SYSTEM
// ==========================================================================
const CATEGORY_THEMES = {
    'Sports': {
        name: 'Sports & Athletics',
        badgeClass: 'badge-sports',
        accentColor: '#10b981',
        icon: 'trophy',
        // Default high-res college athletics/sports ground
        image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
        tag: 'Athletic & Competitive'
    },
    'Cricket': {
        name: 'Cricket Championship',
        badgeClass: 'badge-sports',
        accentColor: '#059669',
        icon: 'trophy',
        // High-res realistic cricket stadium, pitch, players playing cricket
        image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80',
        tag: 'Cricket Pitch & Stadium'
    },
    'Technical': {
        name: 'Technology & Innovation',
        badgeClass: 'badge-technical',
        accentColor: '#0284c7',
        icon: 'code',
        // High-res students coding in college hackathon / tech lab
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
        tag: 'Coding & Innovation'
    },
    'Cultural': {
        name: 'Cultural & Performing Arts',
        badgeClass: 'badge-cultural',
        accentColor: '#c026d3',
        icon: 'sparkles',
        // High-res college cultural stage lighting & dance
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
        tag: 'Festive & Stage'
    },
    'Music': {
        name: 'Live Music & Concert',
        badgeClass: 'badge-music',
        accentColor: '#e11d48',
        icon: 'music',
        // High-res college music concert & stage instruments
        image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
        tag: 'Live Concert & Band'
    },
    'Workshop': {
        name: 'Interactive Workshop',
        badgeClass: 'badge-workshop',
        accentColor: '#d97706',
        icon: 'wrench',
        // High-res interactive college classroom & mentor training
        image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
        tag: 'Hands-on Learning'
    },
    'Seminar': {
        name: 'Academic Seminar & Talks',
        badgeClass: 'badge-seminar',
        accentColor: '#7c3aed',
        icon: 'graduation-cap',
        // High-res speaker in university auditorium lecture hall
        image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
        tag: 'Academic & Keynote'
    },
    'Arts': {
        name: 'Fine Arts & Creative Design',
        badgeClass: 'badge-arts',
        accentColor: '#6366f1',
        icon: 'palette',
        // High-res student artwork & exhibition hall
        image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=80',
        tag: 'Creative & Exhibition'
    },
    'Competitions': {
        name: 'Competitive Challenges',
        badgeClass: 'badge-competitions',
        accentColor: '#ea580c',
        icon: 'award',
        // High-res team competition & quiz bowl
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
        tag: 'Championship & Quiz'
    }
};

/**
 * Dynamic theme selector based on category and event title
 */
function getEventTheme(category, title = '') {
    const titleLower = title.toLowerCase();
    const catLower = category.toLowerCase();

    // Specific sport prioritizing cricket
    if (titleLower.includes('cricket') || (catLower === 'sports' && titleLower.includes('pitch'))) {
        return CATEGORY_THEMES['Cricket'];
    }
    if (titleLower.includes('robot') || titleLower.includes('ai') || titleLower.includes('hackathon') || titleLower.includes('code')) {
        return CATEGORY_THEMES['Technical'];
    }
    if (titleLower.includes('dance') || titleLower.includes('drama') || titleLower.includes('theatre')) {
        return CATEGORY_THEMES['Cultural'];
    }
    if (titleLower.includes('music') || titleLower.includes('sing') || titleLower.includes('band')) {
        return CATEGORY_THEMES['Music'];
    }

    // Direct category match
    if (CATEGORY_THEMES[category]) {
        return CATEGORY_THEMES[category];
    }

    // Fallback based on closest category
    for (const key of Object.keys(CATEGORY_THEMES)) {
        if (catLower.includes(key.toLowerCase())) {
            return CATEGORY_THEMES[key];
        }
    }

    return CATEGORY_THEMES['Technical'];
}

// ==========================================================================
// 2. REALISTIC INITIAL EVENT DATA
// ==========================================================================
const DEFAULT_EVENTS = [
    {
        id: 'CE-EVT-01',
        title: 'Tech Hackathon 2026',
        category: 'Technical',
        tagline: 'Build innovative solutions with your team in 24 hours',
        date: '2026-09-20',
        time: '09:00 AM – 06:00 PM',
        venue: 'Computer Science Lab 3, Tech Block',
        organizer: 'Department of Computer Science & Engineering',
        teamSize: '2 - 4 Members',
        eligibility: 'All Engineering & BCA / MCA students',
        registrationDeadline: 'September 18, 2026',
        isFeatured: true,
        rules: [
            'Teams must bring their own laptops and development hardware.',
            'All code must be written during the hackathon hours. Pre-existing codebases are strictly disqualified.',
            'Mentors will evaluate projects based on innovation, design, usability, and technical execution.',
            'Final working prototype must be submitted to GitHub along with a 3-minute video presentation.'
        ],
        description: 'Tech Hackathon 2026 is the flagship annual coding sprint challenging student engineers to build functional prototypes solving real-world challenges in AI, EdTech, Healthcare, and Smart Campus systems. Cash prizes, certificates, and incubator mentorship await the winners.',
        customImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80'
    },
    {
        id: 'CE-EVT-02',
        title: 'Annual Inter-College Cricket Tournament',
        category: 'Sports',
        tagline: 'Witness the highest level of campus cricketing intensity and spirit',
        date: '2026-09-22',
        time: '08:30 AM – 05:00 PM',
        venue: 'College Main Cricket Ground',
        organizer: 'Department of Physical Education & Sports Council',
        teamSize: '11 Players + 4 Substitutes',
        eligibility: 'Undergraduate and Postgraduate college students',
        registrationDeadline: 'September 19, 2026',
        isFeatured: false,
        rules: [
            'Tournament will be conducted in a 15-over knockout format following standard ICC/BCCI rules.',
            'Proper white cricket attire and personal protective equipment are mandatory for all batsman and wicketkeepers.',
            'Umpires decisions are final and binding in all match situations.',
            'College ID cards must be verified before each fixture.'
        ],
        description: 'The premier collegiate cricket championship featuring 16 top college teams competing for the prestigious Campus Championship Trophy. Matches will be live scored with high-energy crowd support.',
        customImage: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80'
    },
    {
        id: 'CE-EVT-03',
        title: 'Rangmanch Cultural Fest & Dance Championship',
        category: 'Cultural',
        tagline: 'Expressive rhythm, theatrical drama, and celebratory arts',
        date: '2026-09-24',
        time: '04:00 PM – 09:30 PM',
        venue: 'Main College Auditorium & Open Air Theatre',
        organizer: 'Campus Cultural Affairs Committee',
        teamSize: 'Solo or Group (up to 10)',
        eligibility: 'Open to all enrolled university students',
        registrationDeadline: 'September 21, 2026',
        isFeatured: false,
        rules: [
            'Performance duration: Solo (3-5 minutes), Group (6-10 minutes).',
            'Soundtracks must be submitted on a pen drive 2 hours prior to the event.',
            'Costumes and themes must uphold academic decency and ethical standards.',
            'Judging criteria includes synchronization, costume design, choreography, and audience impact.'
        ],
        description: 'A dazzling evening of classical, folk, contemporary, and hip-hop dance performances bringing together performers from across colleges. Experience captivating choreography and vibrant stage lighting.',
        customImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80'
    },
    {
        id: 'CE-EVT-04',
        title: 'Rhythm Symphony: Campus Live Band Night',
        category: 'Music',
        tagline: 'Electrifying college rock, acoustic melodies, and vocal harmonies',
        date: '2026-09-27',
        time: '05:30 PM – 10:00 PM',
        venue: 'Campus Amphitheatre & Central Lawn',
        organizer: 'Music & Band Society',
        teamSize: 'Bands (3 - 7 Members) or Solo Vocals',
        eligibility: 'Student musicians and university music clubs',
        registrationDeadline: 'September 24, 2026',
        isFeatured: false,
        rules: [
            'Time limit per band is 20 minutes including 5 minutes for stage setup and sound check.',
            'Drum kit and standard stage amplifiers provided; musicians must bring guitars, processors, and cables.',
            'At least one original composition or creative musical arrangement is encouraged.'
        ],
        description: 'An unforgettable campus concert spotlighting the finest student bands, singer-songwriters, and acoustic artists. Featuring dynamic stage lighting, booming audio systems, and passionate crowd energy.',
        customImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80'
    },
    {
        id: 'CE-EVT-05',
        title: 'Full-Stack Web & Cloud Deployment Workshop',
        category: 'Workshop',
        tagline: 'Practical hands-on training from zero to production deployment',
        date: '2026-09-29',
        time: '10:00 AM – 04:00 PM',
        venue: 'Seminar Hall 2 & Lab 4',
        organizer: 'Google Developer Student Club & CSE Dept',
        teamSize: 'Individual Participation',
        eligibility: '1st, 2nd, and 3rd year engineering students',
        registrationDeadline: 'September 27, 2026',
        isFeatured: false,
        rules: [
            'Bring your laptop with Node.js and VS Code installed.',
            'Free cloud credits and API keys will be distributed at the venue.',
            'Certificates of Completion will be issued to students who build and deploy their project during the session.'
        ],
        description: 'Gain hands-on experience building modern, responsive web applications using REST APIs, responsive frameworks, and deploying live applications on cloud platforms with custom domains.',
        customImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80'
    },
    {
        id: 'CE-EVT-06',
        title: 'AI & Machine Learning Keynote Seminar',
        category: 'Seminar',
        tagline: 'Exploring Generative AI, Large Language Models, and Future Careers',
        date: '2026-10-02',
        time: '11:00 AM – 02:00 PM',
        venue: 'Dr. APJ Abdul Kalam Auditorium',
        organizer: 'Department of Information Technology & AI/ML Cell',
        teamSize: 'Individual Attendance',
        eligibility: 'Open to all students, research scholars, and faculty',
        registrationDeadline: 'September 30, 2026',
        isFeatured: false,
        rules: [
            'Attendees are requested to be seated 15 minutes before the keynote address.',
            'Interactive Q&A session will follow the presentations.',
            'Digital attendance will be marked for academic credit.'
        ],
        description: 'Distinguished industry experts and research scientists address the latest trends in Generative AI, computer vision, and career paths in data science. Includes a 45-minute open panel discussion.',
        customImage: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80'
    },
    {
        id: 'CE-EVT-07',
        title: 'Speed Coding & Algorithm Battle',
        category: 'Technical',
        tagline: 'Test your problem-solving speed, data structures, and algorithmic logic',
        date: '2026-10-05',
        time: '02:00 PM – 05:00 PM',
        venue: 'Computer Center Lab 1',
        organizer: 'Coding & Competitive Programming Club',
        teamSize: 'Individual',
        eligibility: 'All college students',
        registrationDeadline: 'October 03, 2026',
        isFeatured: false,
        rules: [
            'Programming languages permitted: C++, Java, Python, and C.',
            'Platform will run automated test cases with strict memory and runtime limits.',
            'Internet browsing outside the competition portal is strictly disabled during the contest.'
        ],
        description: 'A 3-hour competitive programming challenge with problems ranging from array manipulation to dynamic programming and graph algorithms. Live leaderboard updates continuously as submissions are judged.',
        customImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80'
    },
    {
        id: 'CE-EVT-08',
        title: 'KalaKriti: Annual Art & Photography Exhibition',
        category: 'Arts',
        tagline: 'Celebrating student artistic expression, canvas paintings, and visual design',
        date: '2026-10-08',
        time: '10:00 AM – 05:00 PM',
        venue: 'Campus Art Gallery, Student Activity Center',
        organizer: 'Fine Arts & Photography Club',
        teamSize: 'Individual Artists',
        eligibility: 'All students with passion for painting, sketching, or digital art',
        registrationDeadline: 'October 06, 2026',
        isFeatured: false,
        rules: [
            'Artwork entries can include acrylic, watercolor, oil, digital paintings, and photography.',
            'All artworks must be framed or mounted ready for display.',
            'Visitors and jury will vote for Best in Show and Category Winners.'
        ],
        description: 'A curated visual showcase of student talent including oil paintings, digital vector graphics, campus landscape photography, and handmade sculptures with gallery walkthroughs and public voting.',
        customImage: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=80'
    },
    {
        id: 'CE-EVT-09',
        title: 'Brainwave Inter-College Quiz Championship',
        category: 'Competitions',
        tagline: 'The ultimate battle of intellect, general awareness, and rapid recall',
        date: '2026-10-12',
        time: '01:30 PM – 05:30 PM',
        venue: 'Conference Hall B',
        organizer: 'Campus Quiz & Literary Society',
        teamSize: '2 Members per Team',
        eligibility: 'College undergraduate students',
        registrationDeadline: 'October 10, 2026',
        isFeatured: false,
        rules: [
            'Preliminary written round of 30 questions to shortlist the top 6 teams for the stage finals.',
            'Stage rounds include buzzer round, audio-visual round, and rapid-fire questions.',
            'Negative marking applies on incorrect buzzer attempts.'
        ],
        description: 'Test your knowledge across science, technology, world history, pop culture, sports, and current affairs in this fast-paced collegiate quiz challenge featuring an electronic buzzer system.',
        customImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80'
    }
];

// ==========================================================================
// 3. ANNOUNCEMENTS DATA
// ==========================================================================
const DEFAULT_ANNOUNCEMENTS = [
    {
        id: 'ANN-01',
        title: 'Tech Hackathon 2026: Team Registration Deadline Extended',
        date: 'September 07, 2026',
        category: 'Technical',
        urgent: true,
        content: 'Due to overwhelming interest, online registration for Tech Hackathon 2026 has been extended until September 18 at 11:59 PM. Ensure your GitHub handle and team details are submitted.'
    },
    {
        id: 'ANN-02',
        title: 'Cricket Tournament Team Trials & Pitch Inspection',
        date: 'September 06, 2026',
        category: 'Sports',
        urgent: false,
        content: 'Team captain briefing and jersey verification for the Annual Cricket Tournament will take place on the Main Cricket Ground on September 19 at 3:00 PM.'
    },
    {
        id: 'ANN-03',
        title: 'Web & Cloud Bootcamp: Lab Venue Confirmation',
        date: 'September 05, 2026',
        category: 'Workshop',
        urgent: false,
        content: 'The Full-Stack Web & Cloud Workshop will be conducted in Computer Lab 4. Registered attendees must check their student emails for pre-installed development prerequisites.'
    },
    {
        id: 'ANN-04',
        title: 'Cultural Fest Auditions for Solo & Group Dance',
        date: 'September 04, 2026',
        category: 'Cultural',
        urgent: false,
        content: 'Auditions for the Rangmanch Dance Championship are scheduled this Thursday in the Auditorium from 3:30 PM to 6:00 PM. Please bring your music track.'
    }
];

// ==========================================================================
// 4. LEADERBOARD DATA
// ==========================================================================
const DEFAULT_LEADERBOARDS = {
    'Hackathons': [
        { rank: 1, name: 'Team BinaryCrafters', members: 'Hussain, Danish & Team', department: 'CSE (3rd Year)', points: 980, wins: 4, badge: 'Gold Champion' },
        { rank: 2, name: 'CodeWarriors AI', members: 'Ateeq & Team', department: 'IT (2nd Year)', points: 890, wins: 3, badge: 'Silver' },
        { rank: 3, name: 'CyberKnights', members: 'Farhan & Zeeshan', department: 'AI/DS (2nd Year)', points: 840, wins: 2, badge: 'Bronze' },
        { rank: 4, name: 'Algorithmix', members: 'Sarah & Imran', department: 'CSE (2nd Year)', points: 760, wins: 2, badge: 'Finalist' },
        { rank: 5, name: 'NullPointers', members: 'Yasin & Team', department: 'ECE (3rd Year)', points: 710, wins: 1, badge: 'Finalist' }
    ],
    'Cricket': [
        { rank: 1, name: 'CSE Strikers XI', members: 'Captain: Zaid Ahmed', department: 'CSE Department', points: 120, wins: 6, badge: 'Champs' },
        { rank: 2, name: 'Mechanical Blasters', members: 'Captain: Ateeq Khan', department: 'Mechanical Dept', points: 100, wins: 5, badge: 'Runners-up' },
        { rank: 3, name: 'ECE Supernovas', members: 'Captain: Danish Ali', department: 'ECE Department', points: 80, wins: 4, badge: '3rd Place' },
        { rank: 4, name: 'Civil Dynamos', members: 'Captain: Bilal Khan', department: 'Civil Department', points: 60, wins: 3, badge: 'Top 4' }
    ],
    'Coding': [
        { rank: 1, name: 'Mohammed Hussain', members: 'Roll: 1604-22-733-045', department: 'CSE (3rd Year)', points: 1450, wins: 5, badge: 'Master Coder' },
        { rank: 2, name: 'Syed Ateeq', members: 'Roll: 1604-23-733-028', department: 'CSE (2nd Year)', points: 1320, wins: 4, badge: 'Expert' },
        { rank: 3, name: 'Danish Khan', members: 'Roll: 1604-23-733-019', department: 'IT (2nd Year)', points: 1210, wins: 3, badge: 'Candidate Master' },
        { rank: 4, name: 'Ayesha Fatima', members: 'Roll: 1604-23-733-054', department: 'AI/DS (2nd Year)', points: 1150, wins: 3, badge: 'Specialist' }
    ],
    'Quiz': [
        { rank: 1, name: 'The Quizzards', members: 'Hussain & Yasin', department: 'CSE & ECE', points: 420, wins: 3, badge: 'Quiz Master' },
        { rank: 2, name: 'Curious Minds', members: 'Rehan & Danish', department: 'IT (2nd Year)', points: 380, wins: 2, badge: 'Runner-up' },
        { rank: 3, name: 'Apex Thinkers', members: 'Adnan & Farooq', department: 'CSE (3rd Year)', points: 340, wins: 2, badge: '3rd Place' }
    ]
};

// ==========================================================================
// 5. GALLERY DATA (REALISTIC EVENT PHOTOS BY CATEGORY)
// ==========================================================================
const DEFAULT_GALLERY = [
    {
        id: 'GAL-01',
        title: 'Annual Cricket Tournament: Final Over Celebration',
        category: 'Sports',
        image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80',
        caption: 'College cricket teams battling under the stadium floodlights in a thrilling 15-over knockout finale.'
    },
    {
        id: 'GAL-02',
        title: 'Tech Hackathon: Late Night Collaborative Coding',
        category: 'Technical',
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
        caption: 'Student engineers programming smart campus web solutions during the 24-hour hackathon.'
    },
    {
        id: 'GAL-03',
        title: 'Rangmanch Dance Championship: Stage Lighting',
        category: 'Cultural',
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
        caption: 'Vibrant stage lighting and synchronized dance choreography in the main college auditorium.'
    },
    {
        id: 'GAL-04',
        title: 'Live Campus Rock Concert: Rhythm Symphony',
        category: 'Cultural',
        image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
        caption: 'Student music band performing live before a cheering crowd at the campus amphitheatre.'
    },
    {
        id: 'GAL-05',
        title: 'Full-Stack Web Development Practical Lab',
        category: 'Workshops',
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
        caption: 'Hands-on mentorship session guiding 2nd year students through API integration and cloud deployment.'
    },
    {
        id: 'GAL-06',
        title: 'AI & Data Science Keynote Address',
        category: 'Seminars',
        image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
        caption: 'Distinguished guest speaker presenting future opportunities in Generative AI and machine learning.'
    },
    {
        id: 'GAL-07',
        title: 'Cricket Match Opening Toss & Pitch Inspection',
        category: 'Sports',
        image: 'https://images.unsplash.com/photo-1531415074868-83633a0e5b82?auto=format&fit=crop&w=1200&q=80',
        caption: 'Captains meeting on the college pitch prior to the inter-departmental cricket tournament.'
    },
    {
        id: 'GAL-08',
        title: 'Robotics Challenge: Autonomous Obstacle Course',
        category: 'Technical',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
        caption: 'Engineering teams testing custom embedded microcontroller rovers on the competition track.'
    },
    {
        id: 'GAL-09',
        title: 'KalaKriti Student Painting & Art Exhibition',
        category: 'Cultural',
        image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=80',
        caption: 'Exhibition hall showcasing vibrant canvas oil paintings and sketches made by campus artists.'
    }
];

// ==========================================================================
// 6. LOCAL STORAGE HELPERS
// ==========================================================================
const STORAGE_KEYS = {
    EVENTS: 'campusEvents_events_data_v2',
    REGISTRATIONS: 'campusEvents_registrations_v2',
    ANNOUNCEMENTS: 'campusEvents_announcements_v2'
};

function getEvents() {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.EVENTS);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.warn('Storage read error, using defaults', e);
    }
    // Initialize defaults if not present
    saveEvents(DEFAULT_EVENTS);
    return DEFAULT_EVENTS;
}

function saveEvents(events) {
    try {
        localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
    } catch (e) {
        console.error('Failed to save events', e);
    }
}

function getEventById(id) {
    const events = getEvents();
    return events.find(e => e.id === id || String(e.id) === String(id));
}

function addEvent(eventData) {
    const events = getEvents();
    const newId = 'CE-EVT-' + String(Date.now()).slice(-4);
    const newEvent = { id: newId, ...eventData };
    events.unshift(newEvent);
    saveEvents(events);
    return newEvent;
}

function deleteEvent(id) {
    let events = getEvents();
    events = events.filter(e => e.id !== id && String(e.id) !== String(id));
    saveEvents(events);
    return events;
}

function getRegistrations() {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.REGISTRATIONS);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.warn('Storage read error', e);
    }

    // Default sample student registrations for realistic preview
    const sampleRegistrations = [
        {
            regId: 'CE-2026-8492',
            name: 'Mohammed Hussain',
            email: 'hussain.student@shadan.edu',
            phone: '9876543210',
            college: 'Shadan College of Engineering and Technology',
            branch: 'Computer Science and Engineering',
            year: '2nd Year',
            rollNumber: '1604-23-733-045',
            eventTitle: 'Tech Hackathon 2026',
            eventId: 'CE-EVT-01',
            teamName: 'BinaryCrafters',
            venue: 'Computer Science Lab 3, Tech Block',
            eventDate: 'September 20, 2026',
            registeredAt: '2026-09-05 14:32',
            status: 'Registered'
        },
        {
            regId: 'CE-2026-3108',
            name: 'Mohammed Hussain',
            email: 'hussain.student@shadan.edu',
            phone: '9876543210',
            college: 'Shadan College of Engineering and Technology',
            branch: 'Computer Science and Engineering',
            year: '2nd Year',
            rollNumber: '1604-23-733-045',
            eventTitle: 'Annual Inter-College Cricket Tournament',
            eventId: 'CE-EVT-02',
            teamName: 'CSE Strikers XI',
            venue: 'College Main Cricket Ground',
            eventDate: 'September 22, 2026',
            registeredAt: '2026-09-06 10:15',
            status: 'Registered'
        }
    ];
    saveRegistrations(sampleRegistrations);
    return sampleRegistrations;
}

function saveRegistrations(regs) {
    try {
        localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(regs));
    } catch (e) {
        console.error('Failed to save registrations', e);
    }
}

function addRegistration(regData) {
    const regs = getRegistrations();
    const regId = 'CE-2026-' + Math.floor(1000 + Math.random() * 9000);
    const newReg = {
        regId,
        registeredAt: new Date().toLocaleString(),
        status: 'Registered',
        ...regData
    };
    regs.unshift(newReg);
    saveRegistrations(regs);
    return newReg;
}

function cancelRegistration(regId) {
    let regs = getRegistrations();
    regs = regs.filter(r => r.regId !== regId);
    saveRegistrations(regs);
    return regs;
}

function getAnnouncements() {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
        if (stored) return JSON.parse(stored);
    } catch (e) {
        console.warn('Storage read error', e);
    }
    saveAnnouncements(DEFAULT_ANNOUNCEMENTS);
    return DEFAULT_ANNOUNCEMENTS;
}

function saveAnnouncements(anns) {
    try {
        localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(anns));
    } catch (e) {
        console.error('Failed to save announcements', e);
    }
}

function addAnnouncement(annData) {
    const anns = getAnnouncements();
    const newAnn = {
        id: 'ANN-' + String(Date.now()).slice(-4),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        ...annData
    };
    anns.unshift(newAnn);
    saveAnnouncements(anns);
    return newAnn;
}

// Date formatter
function formatDisplayDate(dateStr) {
    if (!dateStr) return '';
    try {
        const parts = dateStr.split('-');
        if (parts.length === 3) {
            const date = new Date(parts[0], parts[1] - 1, parts[2]);
            return {
                day: date.getDate(),
                month: date.toLocaleString('en-US', { month: 'short' }),
                full: date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
            };
        }
    } catch (e) {
        // Fallback
    }
    return { day: '20', month: 'SEP', full: dateStr };
}
