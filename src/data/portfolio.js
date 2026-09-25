/**
 * Centralized Portfolio Data Model — Samarth SS Mission Control
 * Source of truth for identity, navigation, projects, skills, and telemetry.
 */

export const portfolioData = {
  identity: {
    name: 'Samarth',
    brandSymbol: 'SS',
    role: 'Python Developer | AI & Agentic AI Enthusiast',
    positioning: [
      'Python Backend Developer',
      'RAG & Generative AI',
      'Agentic AI',
      'AI Applications',
    ],
    primaryFocus: ['Python', 'DSA', 'Full Stack', 'AI/ML', 'Agentic AI'],
    heroIntro: 'Building practical backend systems and intelligent AI applications.',
    heroSupporting: 'Exploring RAG, LLMs, Agentic AI, and automation through real-world projects.',
    status: 'SYSTEM NOMINAL // ALL TELEMETRY CHANNELS ACTIVE',
    coordinates: '28°36\'50"N 77°12\'18"E',
    version: 'v4.2.0-PROD',
  },

  sections: [
    { id: 'hero', label: 'Hero', code: '00' },
    { id: 'work', label: 'Work', code: '01' },
    { id: 'skills', label: 'Skills', code: '02' },
    { id: 'about', label: 'About', code: '03' },
    { id: 'focus', label: 'Focus', code: '04' },
    { id: 'contact', label: 'Contact', code: '05' },
  ],

  projects: [
    {
      id: 'executive-email-agent',
      number: '01',
      title: 'Executive Email Agent',
      shape: 'cube',
      description:
        'An intelligent executive email and calendar agent built with a LangGraph ReAct loop and tool calling.',
      highlights: [
        'Email reading & summarization',
        'Contextual email replies & drafts',
        'Calendar checking & meeting booking',
        'Birthday memory & automated workflows',
        'Multiple LLM providers & Ollama support',
        'ReAct-based agent workflow',
      ],
      technologies: ['LangGraph', 'ReAct', 'LLMs', 'Ollama', 'Tool Calling', 'Python'],
      repository: 'DAILY-EMAIL-READING-AGENT',
      repoUrl: 'https://github.com/Samarth-Satoddi/DAILY-EMAIL-READING-AGENT',
      isComingSoon: false,
    },
    {
      id: 'ai-order-system-whatsapp',
      number: '02',
      title: 'AI Order System using WhatsApp',
      shape: 'torus',
      description:
        'An AI-powered ordering system designed to handle customer orders through WhatsApp.',
      highlights: [
        'Conversational customer ordering flow',
        'Automated order intake and validation',
        'Instant response parsing via AI',
        'End-to-end messaging automation',
      ],
      technologies: ['Python', 'AI', 'WhatsApp', 'Automation'],
      repository: 'AI-ORDER-SYSTEM-USING-WATSAP',
      repoUrl: 'https://github.com/Samarth-Satoddi/AI-ORDER-SYSTEM-USING-WATSAP',
      isComingSoon: false,
    },
    {
      id: 'notebookllm',
      number: '03',
      title: 'NotebookLLM',
      shape: 'octahedron',
      description:
        'An AI-powered project focused on interacting with and working with notebook-based information using LLMs.',
      highlights: [
        'Notebook knowledge querying',
        'Contextual reasoning over unstructured notes',
        'Document-grounded question answering',
        'Python-driven LLM synthesis pipeline',
      ],
      technologies: ['LLMs', 'AI', 'Python'],
      repository: 'NOTEBOOKLLM',
      repoUrl: 'https://github.com/Samarth-Satoddi/NOTEBOOKLLM',
      isComingSoon: false,
    },
    {
      id: 'medical-rag',
      number: '04',
      title: 'Medical RAG',
      shape: 'icosahedron',
      description:
        'A Retrieval-Augmented Generation project focused on building an AI system for medical knowledge retrieval and question answering.',
      highlights: [
        'Domain-specific medical knowledge retrieval',
        'Semantic chunking and embedding generation',
        'Vector similarity search over corpus',
        'Grounded question answering with citation context',
      ],
      technologies: ['RAG', 'LLMs', 'Embeddings', 'Vector Search', 'Python'],
      repository: 'MRDICAL-RAG-INITIALSTART',
      repoUrl: 'https://github.com/Samarth-Satoddi/MRDICAL-RAG-INITIALSTART',
      isComingSoon: false,
    },
    {
      id: 'music-agentic-ai',
      number: '05',
      title: 'Music Agentic AI',
      shape: 'cone',
      description:
        'An Agentic AI project focused on intelligent music-related interactions and automation.',
      highlights: [
        'Agent-driven playlist curation & discovery',
        'Multi-step music preference reasoning',
        'Automated audio metadata orchestration',
      ],
      status: 'Coming Soon',
      technologies: ['Agentic AI', 'AI Agents', 'Automation'],
      repository: '[REPLACE: Add repository when available]',
      repoUrl: null,
      isComingSoon: true,
    },
    {
      id: 'restaurant-application',
      number: '06',
      title: 'Restaurant Application',
      shape: 'dodecahedron',
      description:
        'A full-stack restaurant application currently under development.',
      highlights: [
        'Full-stack ordering and menu management',
        'Relational schema design & transactional persistence',
        'Backend service APIs and client interfaces',
      ],
      status: 'Coming Soon',
      technologies: ['Full Stack', 'Backend', 'Database'],
      repository: '[REPLACE: Add repository when available]',
      repoUrl: null,
      isComingSoon: true,
    },
  ],

  // Primary 18 skills selected for the 3D Fibonacci Sphere
  sphereSkills: [
    { name: 'Python', category: 'core' },
    { name: 'FastAPI', category: 'backend' },
    { name: 'REST APIs', category: 'backend' },
    { name: 'LangChain', category: 'ai' },
    { name: 'LangGraph', category: 'ai' },
    { name: 'RAG', category: 'ai' },
    { name: 'LLMs', category: 'ai' },
    { name: 'Ollama', category: 'ai' },
    { name: 'Prompt Engineering', category: 'ai' },
    { name: 'CrewAI', category: 'ai' },
    { name: 'AI Agents', category: 'ai' },
    { name: 'Multi-Agent Systems', category: 'ai' },
    { name: 'Tool Calling', category: 'ai' },
    { name: 'Embeddings', category: 'data' },
    { name: 'Vector Databases', category: 'data' },
    { name: 'Vector Search', category: 'data' },
    { name: 'Chroma', category: 'data' },
    { name: 'Git', category: 'tools' },
  ],

  // Comprehensive skill categories for secondary view
  skillCategories: [
    {
      name: 'Backend & Systems',
      items: ['Python', 'FastAPI', 'REST APIs', 'SQL', 'Database Design'],
    },
    {
      name: 'Agentic AI & Orchestration',
      items: [
        'AI Agents',
        'Multi-Agent Systems',
        'LangGraph',
        'LangChain',
        'CrewAI',
        'Tool Calling',
      ],
    },
    {
      name: 'Generative AI & RAG',
      items: [
        'RAG Systems',
        'LLMs',
        'Embeddings',
        'Vector Search',
        'Semantic Search',
        'Cosine Similarity',
        'Ollama',
        'Prompt Engineering',
      ],
    },
    {
      name: 'Data & Developer Tools',
      items: ['Vector Databases', 'Chroma', 'Git', 'GitHub', 'Docker'],
    },
  ],

  capabilities: [
    'Build backend applications with Python',
    'Develop APIs and backend systems',
    'Build RAG-based AI applications',
    'Work with embeddings, vector search, and LLMs',
    'Build AI agents and multi-agent systems',
    'Develop intelligent automation systems',
  ],

  currentFocus: [
    'Python Backend Development',
    'FastAPI & REST APIs',
    'Generative AI & LLM Applications',
    'Retrieval-Augmented Generation (RAG)',
    'Agentic AI & Multi-Agent Systems',
    'LangChain',
    'LangGraph',
    'Tool Calling',
    'Vector Databases',
    'Semantic Search',
    'Local LLMs with Ollama',
    'AI-Powered Automation',
  ],

  about: {
    coreMessage:
      'Samarth is focused on building practical backend systems and intelligent AI applications. He works with Python, APIs, RAG, LLMs, embeddings, vector search, AI agents, multi-agent systems, and automation. He is exploring these technologies through real-world projects.',
    primaryRole: 'Python Developer | AI & Agentic AI Enthusiast',
    focusAreas: [
      'Python Backend Developer',
      'RAG & Generative AI',
      'Agentic AI',
      'AI Applications',
    ],
    technicalBreadth: ['Python', 'DSA', 'Full Stack', 'AI/ML', 'Agentic AI'],
  },

  openTo: [
    'Collaboration on AI & Backend projects',
    'Building practical AI applications',
    'Exploring Agentic AI & RAG',
    'Software development opportunities',
  ],

  contact: {
    email: '[REPLACE: Email address]',
    github: {
      username: 'Samarth-Satoddi',
      url: 'https://github.com/Samarth-Satoddi',
    },
    linkedin: {
      name: 'Samarth Satoddi',
      url: 'https://www.linkedin.com/in/samarth-satoddi',
    },
  },
};
