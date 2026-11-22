export const profile = {
  name: 'Nikil N',
  shortName: 'Nikil',
  role: 'Software Engineer at Honeywell',
  location: 'Madurai, Tamil Nadu, India',
  email: 'nikilnnatarajan@gmail.com',
  phone: '+91 86670 28456',
  phoneHref: 'tel:+918667028456',
  github: 'https://github.com/',
  linkedin: 'https://www.linkedin.com/',
  resume: '/Nikil-N-Resume.pdf',
  status: 'Open to SDE roles',
}

export const navItems = [
  {
    label: 'Home',
    href: '/',
    menu: {
      title: 'On the homepage',
      items: [
        { title: 'Selected Work', description: 'Projects in web and computer vision', href: '/#work' },
        { title: 'Capabilities', description: 'What I bring to a team', href: '/#capabilities' },
        { title: 'How I Work', description: 'Four steps from problem to release', href: '/#process' },
      ],
    },
  },
  {
    label: 'About',
    href: '/about',
    menu: {
      title: 'Story & credentials',
      items: [
        { title: 'About Me', description: 'Background, values and approach', href: '/about' },
        { title: 'Resume / CV', description: 'Download the full resume', href: profile.resume, tag: 'PDF' },
        { title: 'Experience', description: 'Honeywell, TCE and before', href: '/about#experience' },
      ],
    },
  },
  {
    label: 'Work',
    href: '/#work',
    menu: {
      title: 'Selected projects',
      items: [
        { title: 'Dr.Rel', description: 'Railway information website', href: '/#work', tag: 'FEATURED' },
        { title: 'Yoga Pose Classification', description: 'Computer vision with MediaPipe', href: '/#work' },
      ],
    },
  },
  { label: 'Contact', href: '/#contact' },
] as const

export const pillars = [
  { label: 'Software Engineering', text: 'Enterprise C++ and C# / .NET' },
  { label: 'Web Development', text: 'React, Express and PostgreSQL' },
  { label: 'Computer Vision', text: 'OpenCV and MediaPipe models' },
]

export const homeStats = [
  { value: 3, suffix: '', label: ['Business-critical', 'features shipped'] },
  { value: 1, suffix: '+', label: ['Years at', 'Honeywell'], highlight: true },
  { value: 8.87, suffix: '', decimals: 2, label: ['CGPA in', 'B.E. CSE'] },
]

export const aboutStats = [
  { value: 3, suffix: '', label: 'Features shipped', note: 'Business-critical work in an enterprise access control product.' },
  { value: 50, suffix: '+', label: 'Product features', note: 'The scale of the Pro-Watch platform I contribute to.' },
  { value: 10, suffix: '+', label: 'Integrations', note: 'Connected systems the product supports in the field.' },
  { value: 8.87, suffix: '', decimals: 2, label: 'CGPA', note: 'B.E. Computer Science, Thiagarajar College of Engineering.' },
]

export const projects = [
  {
    id: 'dr-rel',
    title: 'Dr.Rel',
    subtitle: 'Railway information website',
    tags: ['Web App', 'Full Stack', 'React'],
    description:
      'A website for railway enthusiasts to explore locomotives and coaches, and look up any train including its live running status.',
    points: [
      'Built a catalogue to explore railway locomotives and coaches.',
      'Added train lookup, including the train’s live running status.',
      'Built the frontend in React with an Express API on PostgreSQL.',
    ],
    stack: ['React.js', 'Express.js', 'PostgreSQL'],
    image: '/images/dr-rel.png',
    imageAlt: 'Dr.Rel railway website showing live train running status',
    dark: true,
  },
  {
    id: 'yoga-pose',
    title: 'Yoga Pose Classification',
    subtitle: 'Computer vision model',
    tags: ['Computer Vision', 'Python', 'ML'],
    description:
      'A computer vision model that classifies yoga poses such as Warrior and Tree from pose landmarks and joint angles.',
    points: [
      'Extracted body pose landmarks from video frames with MediaPipe.',
      'Calculated joint angles to describe each posture.',
      'Classified poses, including Warrior and Tree, from the angle features.',
    ],
    stack: ['Python', 'OpenCV (cv2)', 'MediaPipe'],
    image: '/images/yoga-pose.png',
    imageAlt: 'Yoga pose classifier showing a skeleton overlay on a Tree pose',
    dark: false,
  },
]

export const capabilities = [
  {
    title: 'Enterprise Software',
    icon: 'cpu',
    description:
      'Building and maintaining components of a large access control product in C++, C# (.NET) and Microsoft SQL Server.',
    tags: ['C++', 'C# / .NET', 'MSSQL'],
  },
  {
    title: 'Computer Vision',
    icon: 'scan',
    description:
      'Practical vision models with OpenCV and MediaPipe that turn landmarks and geometry into reliable classifications.',
    tags: ['Python', 'OpenCV', 'MediaPipe'],
  },
]

export const process = [
  { title: 'Understand', text: 'Read the requirement, the existing code and the people who depend on it.' },
  { title: 'Design', text: 'Plan a clean, object-oriented approach that fits the system around it.' },
  { title: 'Build', text: 'Implement, debug and validate the change with care for edge cases.' },
  { title: 'Ship', text: 'Support the release, resolve issues fast and keep the product stable.' },
]

export const achievements = [
  {
    quote: 'Second Runner-up in ML MANIA.',
    detail:
      'A machine learning contest run by the CSI Association of Thiagarajar College of Engineering, where my team placed third overall.',
    title: 'ML MANIA',
    meta: 'CSI Association, TCE · 2023–2024',
    initials: 'ML',
  },
  {
    quote: 'Second Runner-up in ACE THE ADT’S.',
    detail:
      'A data structures and algorithms competition run by the Computer Science and Engineering Association at TCE.',
    title: 'ACE THE ADT’S',
    meta: 'CSE Association, TCE · 2022–2023',
    initials: 'AD',
  },
  {
    quote: 'Office Bearer, Institution of Engineers.',
    detail:
      'Helped organise events and activities for the Institution of Engineers (IE) Student Chapter at Thiagarajar College of Engineering.',
    title: 'IE Student Chapter',
    meta: 'Thiagarajar College of Engineering · Sep 2023 onward',
    initials: 'IE',
  },
  {
    quote: 'Six Sigma Green Belt, certified at Honeywell.',
    detail:
      'Trained in data-driven process improvement, a discipline I bring to debugging, validation and release work.',
    title: 'Six Sigma Green Belt',
    meta: 'Honeywell Technologies',
    initials: '6σ',
  },
]

export const timeline = [
  {
    date: 'Jun 2025 — Present',
    role: 'Software Engineer 1',
    org: 'Honeywell Technologies · Madurai',
    text: 'Contributing to 3 business-critical features in Pro-Watch, an enterprise access control application with 50+ features and 10+ integrations. I work in C++, C# (.NET) and MSSQL, and support releases through debugging, issue resolution and validation.',
  },
  {
    date: '2021 — 2025',
    role: 'B.E. Computer Science and Engineering',
    org: 'Thiagarajar College of Engineering · Anna University',
    text: 'Graduated with a CGPA of 8.87/10. Built Dr.Rel and a yoga pose classifier, placed in ML MANIA and ACE THE ADT’S, and served as an IE Student Chapter office bearer.',
  },
  {
    date: '2021',
    role: 'Higher Secondary Education (XII)',
    org: 'The TVS School · Madurai',
    text: 'Completed higher secondary education with 96.33%.',
  },
  {
    date: '2019',
    role: 'Secondary Education (X)',
    org: 'Indira Gandhi Memorial Matric Hr. Sec. School · Madurai',
    text: 'Completed secondary education with 95.2%.',
  },
]

export const expertise = [
  { title: 'Object-Oriented Design', icon: 'boxes', text: 'Clean classes and clear responsibilities.' },
  { title: 'Enterprise .NET', icon: 'server', text: 'C# and ASP.NET Core services.' },
  { title: 'Systems in C++', icon: 'cpu', text: 'Performance-aware product code.' },
  { title: 'Databases', icon: 'database', text: 'Relational modelling in MSSQL and PostgreSQL.' },
  { title: 'Web Frontends', icon: 'layout', text: 'HTML, CSS, JavaScript and React.' },
  { title: 'Debugging & Release', icon: 'bug', text: 'Finding root causes and keeping releases stable.' },
]

export const tools = [
  { name: 'C++', use: 'Product components' },
  { name: 'C#', use: 'Application logic' },
  { name: '.NET', use: 'ASP.NET Core APIs' },
  { name: 'MSSQL', use: 'Enterprise data' },
  { name: 'Java', use: 'OOP fundamentals' },
  { name: 'Python', use: 'Vision and scripts' },
  { name: 'React', use: 'Web interfaces' },
  { name: 'OpenCV', use: 'Image pipelines' },
]

export const values = [
  { title: 'Clarity', icon: 'eye', text: 'Readable code and plain communication, so the next person can move fast.' },
  { title: 'Reliability', icon: 'shield', text: 'Validate thoroughly. A release should be something the team can trust.' },
  { title: 'Curiosity', icon: 'sparkles', text: 'Keep learning, from enterprise systems to vision models and the web.' },
]

export const certifications = [
  {
    title: 'The Complete 2024 Web Development Bootcamp',
    issuer: 'Udemy',
    text: 'Full-stack web foundations: HTML, CSS, JavaScript, Node, Express, React and databases.',
  },
  {
    title: 'Python for Computer Vision with OpenCV and Deep Learning',
    issuer: 'Udemy',
    text: 'Image processing, object detection and deep learning models for vision tasks.',
  },
  {
    title: 'Six Sigma Green Belt Certification',
    issuer: 'Honeywell Technologies',
    text: 'Structured, data-driven problem solving and process improvement.',
  },
  {
    title: 'FS’tival 23 Project Demonstration',
    issuer: 'Dept. of CSE, TCE',
    text: 'Presented a project demonstration built in Blender for the department festival.',
  },
]
