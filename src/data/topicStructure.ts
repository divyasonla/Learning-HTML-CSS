import { Topic } from '@/types';

// Minimal topic skeleton - AI will generate detailed content for each
export const htmlTopics: Topic[] = [
  {
    id: 'html-basics',
    name: 'HTML Basics & Syntax',
    category: 'html',
    level: 'beginner',
    order: 1,
    icon: '📄',
    color: '#F97316',
    subtopics: ['Document structure', 'Tags', 'Elements', 'DOCTYPE'],
    prerequisites: [],
    content: {
      definition: "HTML (HyperText Markup Language) is the standard language for creating web pages. It provides the basic structure and content of a webpage using elements called tags.",
      importance: "Understanding HTML basics is essential for anyone who wants to build websites. It forms the foundation of all web development, allowing you to create and organize content, add images, links, and more.",
      keyConcepts: [
        {
          title: "Document Structure",
          explanation: "Every HTML page starts with a DOCTYPE and has <html>, <head>, and <body> tags. The <head> contains meta info, while <body> contains visible content."
        },
        {
          title: "Tags",
          explanation: "Tags are keywords surrounded by angle brackets. They define elements on the page, like <p> for paragraphs or <h1> for headings."
        },
        {
          title: "Elements",
          explanation: "An element consists of a start tag, content, and an end tag. For example, <p>Hello</p> is a paragraph element."
        },
        {
          title: "DOCTYPE",
          explanation: "The <!DOCTYPE html> declaration tells the browser to use the latest HTML version."
        }
      ],
      proTip: "Practice each concept as you learn. The best way to master HTML is through hands-on coding!",
      syntax: "<html>\n  <head>\n    <title>Page Title</title>\n  </head>\n  <body>\n    <!-- Page content goes here -->\n  </body>\n</html>",
      examples: [
        {
          title: "Basic HTML Document",
          html: "<!DOCTYPE html>\n<html>\n<head>\n  <title>My First Page</title>\n</head>\n<body>\n  <h1>Hello, World!</h1>\n  <p>This is my first HTML page.</p>\n</body>\n</html>",
          css: "",
          explanation: "This example shows the basic structure of an HTML document. The <html> tag wraps the whole page, <head> contains meta information, and <body> contains the visible content."
        },
        {
          title: "Using Headings and Paragraphs",
          html: "<body>\n  <h1>Main Heading</h1>\n  <h2>Subheading</h2>\n  <p>This is a paragraph of text.</p>\n</body>",
          css: "",
          explanation: "Headings (<h1> to <h6>) are used for titles and subtitles. <p> defines a paragraph."
        }
      ],
      commonMistakes: [
        "Forgetting to close tags (e.g., <p> instead of </p>)",
        "Not nesting elements properly",
        "Misspelling tag names (HTML is not case-sensitive, but consistency is best)"
      ],
      bestPractices: [
        "Always use proper indentation for readability",
        "Use semantic tags where possible",
        "Keep your code clean and organized"
      ]
    }
  },
  {
    id: 'html-elements',
    name: 'Elements & Attributes',
    category: 'html',
    level: 'beginner',
    order: 2,
    icon: '🏷️',
    color: '#F97316',
    subtopics: ['Attributes', 'Global attributes', 'ID & Class', 'Data attributes'],
    prerequisites: ['html-basics'],
    content: {
      definition: `HTML elements are the building blocks of web pages. An element usually consists of a start tag, content, and an end tag. Attributes provide additional information about elements and are always included in the opening tag.`,
      importance: `Knowing how to use elements and attributes allows you to structure content meaningfully and add extra information, such as links, images, or styling hooks.`,
      syntax: `<tagname attribute="value">Content</tagname>`,
      examples: [
        {
          title: 'Basic Element with Attribute',
          html: `<a href="https://www.example.com">Visit Example</a>` ,
          css: '',
          explanation: 'This anchor (<a>) element creates a clickable link. The href attribute specifies the link destination.'
        },
        {
          title: 'Using ID and Class Attributes',
          html: `<p id="intro" class="highlight">Welcome to HTML!</p>`,
          css: `.highlight { color: blue; }`,
          explanation: 'The id attribute uniquely identifies the element. The class attribute is used for styling multiple elements.'
        }
      ],
      commonMistakes: [
        'Forgetting to use quotes around attribute values',
        'Using the same id for multiple elements',
        'Misspelling attribute names'
      ],
      bestPractices: [
        'Use classes for styling, ids for unique identification',
        'Keep attribute values descriptive and meaningful',
        'Avoid inline styles; use CSS instead'
      ]
    }
  },
  {
    id: 'html-text',
    name: 'Text Formatting',
    category: 'html',
    level: 'beginner',
    order: 3,
    icon: '📝',
    color: '#F97316',
    subtopics: ['Headings', 'Paragraphs', 'Bold & Italic', 'Quotes'],
    prerequisites: ['html-elements'],
    content: {
      definition: "Text formatting in HTML allows you to structure and style text using various tags, such as headings, paragraphs, bold, italic, and quotes.",
      importance: "Proper text formatting makes your content readable, organized, and visually appealing. It helps users and search engines understand the structure and meaning of your content.",
      keyConcepts: [
        {
          title: "Headings",
          explanation: "HTML provides six levels of headings, from <h1> (most important) to <h6> (least important). Use them to organize your content hierarchically."
        },
        {
          title: "Paragraphs",
          explanation: "The <p> tag defines a paragraph of text. Browsers automatically add space before and after each paragraph."
        },
        {
          title: "Bold & Italic",
          explanation: "Use <b> or <strong> for bold text, and <i> or <em> for italic text. <strong> and <em> also add semantic meaning."
        },
        {
          title: "Quotes",
          explanation: "The <blockquote> tag is for long quotations, and <q> is for short inline quotes. Both help distinguish quoted text."
        }
      ],
      proTip: "Use headings to break up content and make it easier to scan. Avoid using bold or italic for large blocks of text.",
      syntax: `<h1>Heading 1</h1>\n<p>This is a paragraph.</p>`,
      examples: [
        {
          title: "Using Headings",
          html: `<h1>Main Title</h1>\n<h2>Section Title</h2>\n<h3>Subsection</h3>` ,
          css: '',
          explanation: "This example shows three levels of headings. Use <h1> for the main title, <h2> for sections, and <h3> for subsections."
        },
        {
          title: "Paragraphs",
          html: `<p>This is a paragraph of text. HTML automatically adds space before and after paragraphs.</p>` ,
          css: '',
          explanation: "The <p> tag defines a paragraph. Paragraphs help separate blocks of text."
        },
        {
          title: "Bold & Italic Text",
          html: `<p>This is <b>bold</b> and this is <i>italic</i>.</p>\n<p>This is <strong>important</strong> and this is <em>emphasized</em>.</p>` ,
          css: '',
          explanation: "<b> and <i> are for visual styling. <strong> and <em> add meaning: <strong> for importance, <em> for emphasis."
        },
        {
          title: "Quotations",
          html: `<blockquote>\n  This is a long quote from someone famous.\n</blockquote>\n<p>He said, <q>Practice makes perfect.</q></p>` ,
          css: '',
          explanation: "<blockquote> is for long quotes, usually indented. <q> is for short, inline quotes."
        }
      ],
      commonMistakes: [
        "Using headings out of order (e.g., <h3> before <h2>)",
        "Forgetting to close tags",
        "Using bold or italic for entire paragraphs"
      ],
      bestPractices: [
        "Use headings to organize content logically",
        "Keep paragraphs short and focused",
        "Use semantic tags (<strong>, <em>) for meaning, not just style"
      ]
    }
  },
  {
    id: 'html-lists',
    name: 'Lists',
    category: 'html',
    level: 'beginner',
    order: 4,
    icon: '📋',
    color: '#F97316',
    subtopics: ['Ordered lists', 'Unordered lists', 'Nested lists', 'Description lists'],
    prerequisites: ['html-text'],
    content: {
      definition: "Lists in HTML help you organize content into ordered, unordered, or descriptive groups. They make information easier to read and understand.",
      importance: "Lists are essential for structuring steps, features, or grouped information. They improve readability and help users scan content quickly.",
      keyConcepts: [
        {
          title: "Ordered Lists",
          explanation: "Use <ol> for numbered lists. Each item is wrapped in an <li> (list item) tag."
        },
        {
          title: "Unordered Lists",
          explanation: "Use <ul> for bulleted lists. Each item is wrapped in an <li> tag."
        },
        {
          title: "Nested Lists",
          explanation: "You can place a list inside another list item to create sub-lists."
        },
        {
          title: "Description Lists",
          explanation: "Use <dl> for name/value pairs, with <dt> for the term and <dd> for the description."
        }
      ],
      proTip: "Use lists to break up information and make it easier to scan. Avoid using lists for layout purposes.",
      syntax: `<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n</ul>`,
      examples: [
        {
          title: "Ordered List",
          html: `<ol>\n  <li>First</li>\n  <li>Second</li>\n  <li>Third</li>\n</ol>`,
          css: '',
          explanation: "<ol> creates a numbered list. Each <li> is a list item."
        },
        {
          title: "Unordered List",
          html: `<ul>\n  <li>Apple</li>\n  <li>Banana</li>\n  <li>Cherry</li>\n</ul>`,
          css: '',
          explanation: "<ul> creates a bulleted list. Each <li> is a list item."
        },
        {
          title: "Nested List",
          html: `<ul>\n  <li>Fruits\n    <ul>\n      <li>Apple</li>\n      <li>Banana</li>\n    </ul>\n  </li>\n  <li>Vegetables</li>\n</ul>`,
          css: '',
          explanation: "A list inside another <li> creates a nested list."
        },
        {
          title: "Description List",
          html: `<dl>\n  <dt>HTML</dt>\n  <dd>Markup language for web pages.</dd>\n  <dt>CSS</dt>\n  <dd>Styles web pages.</dd>\n</dl>`,
          css: '',
          explanation: "<dl> is for name/value pairs. <dt> is the term, <dd> is the description."
        }
      ],
      commonMistakes: [
        "Forgetting to close <li> tags",
        "Using <ul> or <ol> without <li> children",
        "Confusing <dt> and <dd> in description lists"
      ],
      bestPractices: [
        "Use lists for grouping related items",
        "Keep list items short and clear",
        "Use nested lists sparingly for clarity"
      ]
    }
  },
  {
  id: 'html-links',
  name: 'Links & Navigation',
  category: 'html',
  level: 'beginner',
  order: 5,
  icon: '🔗',
  color: '#F97316',
  subtopics: ['Anchor tags', 'Internal links', 'External links', 'Navigation'],
  prerequisites: ['html-lists'],
  content: {
    definition: 'HTML links allow users to navigate between pages or sections using anchor tags.',
    importance: 'Links connect web pages together and form the backbone of the web.',
    keyConcepts: [
      { title: 'Anchor Tag', explanation: 'The <a> tag is used to create links.' },
      { title: 'Internal Links', explanation: 'Navigate within the same website.' },
      { title: 'External Links', explanation: 'Navigate to other websites.' },
      { title: 'Navigation Menus', explanation: 'Links grouped for site navigation.' }
    ],
    proTip: 'Always use descriptive link text.',
    syntax: `<a href="url">Link text</a>`,
    examples: [
      {
        title: 'External Link',
        html: `<a href="https://google.com">Google</a>`,
        css: '',
        explanation: 'Opens Google website.'
      },
      {
        title: 'Internal Link',
        html: `<a href="#section1">Go to Section</a>`,
        css: '',
        explanation: 'Scrolls to same page section.'
      }
    ],
    commonMistakes: [
      'Missing href attribute',
      'Using "click here" as link text'
    ],
    bestPractices: [
      'Use semantic navigation',
      'Ensure links are accessible'
    ]
  }
},

  {
  id: 'html-images',
  name: 'Images',
  category: 'html',
  level: 'beginner',
  order: 6,
  icon: '🖼️',
  color: '#F97316',
  subtopics: ['Img tag', 'Alt text', 'Image formats', 'Responsive images'],
  prerequisites: ['html-links'],
  content: {
    definition: 'Images are added using the <img> tag.',
    importance: 'Images enhance user experience and visual appeal.',
    keyConcepts: [
      { title: 'img tag', explanation: 'Used to embed images.' },
      { title: 'alt text', explanation: 'Improves accessibility and SEO.' },
      { title: 'Formats', explanation: 'JPEG, PNG, SVG, WebP.' },
      { title: 'Responsive Images', explanation: 'Images that adapt to screen size.' }
    ],
    proTip: 'Always use alt attribute.',
    syntax: `<img src="image.jpg" alt="description" />`,
    examples: [
      {
        title: 'Basic Image',
        html: `<img src="photo.jpg" alt="My Photo" />`,
        css: '',
        explanation: 'Displays an image.'
      }
    ],
    commonMistakes: [
      'Missing alt text',
      'Using large unoptimized images'
    ],
    bestPractices: [
      'Optimize images',
      'Use responsive sizing'
    ]
  }
}
,
  {
  id: 'html-media',
  name: 'Audio & Video',
  category: 'html',
  level: 'intermediate',
  order: 7,
  icon: '🎬',
  color: '#F97316',
  subtopics: ['Audio element', 'Video element', 'Controls', 'Sources'],
  prerequisites: ['html-images'],
  content: {
    definition: 'HTML provides audio and video elements to embed media directly into web pages.',
    importance: 'Media elements enhance user engagement by allowing sound and video playback without external plugins.',
    keyConcepts: [
      { title: 'Audio Element', explanation: '<audio> is used to embed sound content.' },
      { title: 'Video Element', explanation: '<video> is used to embed video content.' },
      { title: 'Controls', explanation: 'Controls attribute adds play, pause, volume options.' },
      { title: 'Source Tag', explanation: '<source> specifies media files.' }
    ],
    proTip: 'Always provide fallback text for unsupported browsers.',
    syntax: `<audio controls>\n  <source src="audio.mp3" type="audio/mpeg">\n</audio>`,
    examples: [
      {
        title: 'Audio Example',
        html: `<audio controls><source src="song.mp3"></audio>`,
        css: '',
        explanation: 'Plays an audio file with controls.'
      },
      {
        title: 'Video Example',
        html: `<video controls width="300"><source src="movie.mp4"></video>`,
        css: '',
        explanation: 'Plays a video with controls.'
      }
    ],
    commonMistakes: [
      'Forgetting controls attribute',
      'Using unsupported formats'
    ],
    bestPractices: [
      'Provide multiple formats',
      'Optimize media size'
    ]
  }
}
,
  {
  id: 'html-tables',
  name: 'Tables',
  category: 'html',
  level: 'intermediate',
  order: 8,
  icon: '📊',
  color: '#F97316',
  subtopics: ['Table structure', 'Headers', 'Colspan & Rowspan', 'Styling tables'],
  prerequisites: ['html-media'],
  content: {
    definition: 'HTML tables organize data into rows and columns.',
    importance: 'Tables are useful for displaying structured data like reports or comparisons.',
    keyConcepts: [
      { title: 'Table Structure', explanation: 'Uses <table>, <tr>, <td> tags.' },
      { title: 'Headers', explanation: '<th> defines header cells.' },
      { title: 'Colspan & Rowspan', explanation: 'Merge columns or rows.' },
      { title: 'Styling Tables', explanation: 'CSS improves table appearance.' }
    ],
    proTip: 'Use tables only for data, not layouts.',
    syntax: `<table><tr><td>Data</td></tr></table>`,
    examples: [
      {
        title: 'Basic Table',
        html: `<table><tr><th>Name</th></tr><tr><td>Divya</td></tr></table>`,
        css: '',
        explanation: 'Simple table with header.'
      }
    ],
    commonMistakes: [
      'Using tables for layout',
      'Missing <th> tags'
    ],
    bestPractices: [
      'Use semantic headers',
      'Style with CSS'
    ]
  }
}
,
  {
  id: 'html-forms',
  name: 'Forms',
  category: 'html',
  level: 'intermediate',
  order: 9,
  icon: '📋',
  color: '#F97316',
  subtopics: ['Form elements', 'Input types', 'Labels', 'Validation'],
  prerequisites: ['html-tables'],
  content: {
    definition: 'HTML forms collect user input.',
    importance: 'Forms enable interaction like login, signup, and feedback.',
    keyConcepts: [
      { title: 'Form Element', explanation: '<form> wraps form controls.' },
      { title: 'Input Types', explanation: 'Text, email, password, checkbox etc.' },
      { title: 'Labels', explanation: '<label> improves accessibility.' },
      { title: 'Validation', explanation: 'Built-in input validation.' }
    ],
    proTip: 'Always associate labels with inputs.',
    syntax: `<form><input type="text"></form>`,
    examples: [
      {
        title: 'Login Form',
        html: `<form><input type="email"><input type="password"></form>`,
        css: '',
        explanation: 'Simple login form.'
      }
    ],
    commonMistakes: [
      'Missing name attribute',
      'No validation'
    ],
    bestPractices: [
      'Use semantic input types',
      'Validate inputs'
    ]
  }
}
,
  {
  id: 'html-semantic',
  name: 'Semantic HTML',
  category: 'html',
  level: 'intermediate',
  order: 10,
  icon: '🏛️',
  color: '#F97316',
  subtopics: ['Header & Footer', 'Nav & Main', 'Article & Section', 'Aside'],
  prerequisites: ['html-forms'],
  content: {
    definition: 'Semantic HTML uses meaningful tags to define content structure.',
    importance: 'Improves accessibility, SEO, and readability.',
    keyConcepts: [
      { title: 'Header & Footer', explanation: 'Top and bottom sections.' },
      { title: 'Nav & Main', explanation: 'Navigation and main content.' },
      { title: 'Article & Section', explanation: 'Independent content blocks.' },
      { title: 'Aside', explanation: 'Side content.' }
    ],
    proTip: 'Prefer semantic tags over divs.',
    syntax: `<header><nav></nav></header>`,
    examples: [
      {
        title: 'Semantic Layout',
        html: `<header>Header</header><main>Main</main>`,
        css: '',
        explanation: 'Semantic page structure.'
      }
    ],
    commonMistakes: [
      'Overusing divs',
      'Incorrect tag usage'
    ],
    bestPractices: [
      'Use correct semantics',
      'Improve accessibility'
    ]
  }
}
,
  {
  id: 'html5-features',
  name: 'HTML5 Features',
  category: 'html',
  level: 'advanced',
  order: 11,
  icon: '⚡',
  color: '#F97316',
  subtopics: ['Canvas', 'SVG', 'Drag & Drop', 'Geolocation'],
  prerequisites: ['html-semantic'],
  content: {
    definition: 'HTML5 introduces modern APIs and features.',
    importance: 'Enables rich web applications.',
    keyConcepts: [
      { title: 'Canvas', explanation: 'Draw graphics via JS.' },
      { title: 'SVG', explanation: 'Scalable vector graphics.' },
      { title: 'Drag & Drop', explanation: 'Drag elements.' },
      { title: 'Geolocation', explanation: 'Get user location.' }
    ],
    proTip: 'Use feature detection.',
    syntax: `<canvas id="myCanvas"></canvas>`,
    examples: [
      {
        title: 'Canvas',
        html: `<canvas width="200" height="100"></canvas>`,
        css: '',
        explanation: 'Canvas element.'
      }
    ],
    commonMistakes: [
      'Ignoring browser support'
    ],
    bestPractices: [
      'Use fallbacks'
    ]
  }
},

  {
  id: 'html-meta',
  name: 'Metadata & SEO',
  category: 'html',
  level: 'advanced',
  order: 12,
  icon: '🔍',
  color: '#F97316',
  subtopics: ['Meta tags', 'Open Graph', 'SEO basics', 'Accessibility'],
  prerequisites: ['html5-features'],
  content: {
    definition: 'Metadata provides information about the webpage.',
    importance: 'Essential for SEO and accessibility.',
    keyConcepts: [
      { title: 'Meta Tags', explanation: 'Define page metadata.' },
      { title: 'Open Graph', explanation: 'Social sharing previews.' },
      { title: 'SEO Basics', explanation: 'Search optimization.' },
      { title: 'Accessibility', explanation: 'Inclusive design.' }
    ],
    proTip: 'Always define meta description.',
    syntax: `<meta name="description" content="...">`,
    examples: [
      {
        title: 'Meta Description',
        html: `<meta name="description" content="My site">`,
        css: '',
        explanation: 'SEO description.'
      }
    ],
    commonMistakes: [
      'Missing meta tags'
    ],
    bestPractices: [
      'Optimize metadata'
    ]
  }
}
,
  {
  id: 'html-linking',
  name: 'Linking CSS & JS',
  category: 'html',
  level: 'advanced',
  order: 13,
  icon: '🔌',
  color: '#F97316',
  subtopics: ['Link tag', 'Script tag', 'Async & Defer', 'External resources'],
  prerequisites: ['html-meta'],
  content: {
    definition: 'HTML links external CSS and JS files.',
    importance: 'Separates structure, style, and behavior.',
    keyConcepts: [
      { title: 'Link Tag', explanation: 'Links CSS.' },
      { title: 'Script Tag', explanation: 'Links JS.' },
      { title: 'Async & Defer', explanation: 'Script loading.' },
      { title: 'External Resources', explanation: 'CDNs.' }
    ],
    proTip: 'Use defer for scripts.',
    syntax: `<link rel="stylesheet" href="style.css">`,
    examples: [
      {
        title: 'Link CSS',
        html: `<link rel="stylesheet" href="style.css">`,
        css: '',
        explanation: 'External CSS.'
      }
    ],
    commonMistakes: [
      'Blocking scripts'
    ],
    bestPractices: [
      'Optimize loading'
    ]
  }
}
,
  {
  id: 'html-apis',
  name: 'HTML APIs',
  category: 'html',
  level: 'advanced',
  order: 14,
  icon: '🚀',
  color: '#F97316',
  subtopics: ['Web Storage', 'Web Workers', 'History API', 'Notifications'],
  prerequisites: ['html-linking'],
  content: {
    definition: 'HTML APIs provide advanced browser capabilities.',
    importance: 'Enable modern web applications.',
    keyConcepts: [
      { title: 'Web Storage', explanation: 'Local & session storage.' },
      { title: 'Web Workers', explanation: 'Background tasks.' },
      { title: 'History API', explanation: 'URL manipulation.' },
      { title: 'Notifications', explanation: 'User alerts.' }
    ],
    proTip: 'Check permissions.',
    syntax: `localStorage.setItem('key','value')`,
    examples: [
      {
        title: 'Local Storage',
        html: '',
        css: '',
        explanation: 'Stores data in browser.'
      }
    ],
    commonMistakes: [
      'Ignoring permissions'
    ],
    bestPractices: [
      'Use APIs responsibly'
    ]
  }
}

];

export const cssTopics: Topic[] = [
  {
    id: 'css-basics',
    name: 'CSS Basics & Syntax',
    category: 'css',
    level: 'beginner',
    order: 1,
    icon: '🎨',
    color: '#3B82F6',
    subtopics: ['Selectors', 'Properties', 'Values', 'Comments'],
    prerequisites: [],
    content: {
      definition: "CSS (Cascading Style Sheets) is used to style and layout web pages. It controls colors, fonts, spacing, and more, making HTML content visually appealing.",
      importance: "CSS separates content from design, allowing you to change the look of your site without altering the HTML. It is essential for responsive, attractive websites.",
      keyConcepts: [
        {
          title: "Selectors",
          explanation: "Selectors target HTML elements to apply styles. For example, 'p' targets all <p> tags."
        },
        {
          title: "Properties",
          explanation: "Properties define what you want to change, like color, font-size, or margin."
        },
        {
          title: "Values",
          explanation: "Values specify the settings for properties, such as red, 16px, or 1.5em."
        },
        {
          title: "Comments",
          explanation: "Comments (/* ... */) help you explain your code. They are ignored by browsers."
        }
      ],
      proTip: "Use comments to document your CSS. It helps you and others understand your code later.",
      syntax: `selector { property: value; }`,
      examples: [
        {
          title: "Selector Example",
          html: `<p>This is a paragraph.</p>` ,
          css: `p { color: blue; }`,
          explanation: "This CSS targets all <p> elements and sets their text color to blue."
        },
        {
          title: "Property and Value",
          html: `<h1>Hello!</h1>` ,
          css: `h1 { font-size: 32px; }`,
          explanation: "The font-size property changes the size of the <h1> text."
        },
        {
          title: "Adding Comments",
          html: `<div>Box</div>` ,
          css: `/* This makes the box red */\ndiv { background: red; }`,
          explanation: "Comments help explain your code. Browsers ignore them."
        }
      ],
      commonMistakes: [
        "Missing semicolons after properties",
        "Using invalid selectors",
        "Forgetting to close comment blocks"
      ],
      bestPractices: [
        "Keep your CSS organized and commented",
        "Use clear, descriptive selectors",
        "Group related styles together"
      ]
    }
  },
  {
  id: 'css-selectors',
  name: 'Selectors',
  category: 'css',
  level: 'beginner',
  order: 2,
  icon: '🎯',
  color: '#3B82F6',
  subtopics: ['Element selectors', 'Class selectors', 'ID selectors', 'Combinators'],
  prerequisites: ['css-basics'],
  content: {
    definition: 'CSS selectors target HTML elements for styling.',
    importance: 'Without selectors, CSS cannot apply styles.',
    keyConcepts: [
      { title: 'Element Selector', explanation: 'Targets all elements of a type.' },
      { title: 'Class Selector', explanation: 'Targets elements with class.' },
      { title: 'ID Selector', explanation: 'Targets unique elements.' },
      { title: 'Combinators', explanation: 'Define element relationships.' }
    ],
    proTip: 'Use classes for reusable styles.',
    syntax: `selector { property: value; }`,
    examples: [
      {
        title: 'Class Selector',
        html: `<p class="text">Hello</p>`,
        css: `.text { color: blue; }`,
        explanation: 'Applies style to class.'
      }
    ],
    commonMistakes: [
      'Overusing IDs',
      'Complex selectors'
    ],
    bestPractices: [
      'Keep selectors simple',
      'Use meaningful class names'
    ]
  }
}
,
  {
  id: 'css-box-model',
  name: 'Box Model',
  category: 'css',
  level: 'beginner',
  order: 3,
  icon: '📦',
  color: '#3B82F6',
  subtopics: ['Margin', 'Padding', 'Border', 'Content'],
  prerequisites: ['css-selectors'],
  content: {
    definition: 'The CSS box model defines the layout and spacing of elements.',
    importance: 'Understanding the box model is essential for controlling layout and spacing.',
    keyConcepts: [
      { title: 'Content', explanation: 'Actual content inside the element.' },
      { title: 'Padding', explanation: 'Space between content and border.' },
      { title: 'Border', explanation: 'Wraps padding and content.' },
      { title: 'Margin', explanation: 'Space outside the element.' }
    ],
    proTip: 'Use box-sizing: border-box to simplify layouts.',
    syntax: `box-sizing: border-box;`,
    examples: [
      {
        title: 'Box Model Example',
        html: `<div class="box">Box</div>`,
        css: `.box { margin:10px; padding:10px; border:1px solid black; }`,
        explanation: 'Demonstrates margin, padding, and border.'
      }
    ],
    commonMistakes: [
      'Ignoring margin collapse',
      'Forgetting box-sizing'
    ],
    bestPractices: [
      'Use consistent spacing',
      'Prefer border-box'
    ]
  }
}
,
  {
  id: 'css-text',
  name: 'Text & Fonts',
  category: 'css',
  level: 'beginner',
  order: 5,
  icon: '✏️',
  color: '#3B82F6',
  subtopics: ['Font family', 'Font size', 'Text alignment', 'Web fonts'],
  prerequisites: ['css-colors'],
  content: {
    definition: 'CSS text and font properties control typography.',
    importance: 'Good typography improves readability.',
    keyConcepts: [
      { title: 'Font Family', explanation: 'Defines font type.' },
      { title: 'Font Size', explanation: 'Controls text size.' },
      { title: 'Text Alignment', explanation: 'Aligns text.' },
      { title: 'Web Fonts', explanation: 'Use external fonts.' }
    ],
    proTip: 'Use rem units for scalable fonts.',
    syntax: `font-size: 16px;`,
    examples: [
      {
        title: 'Font Styling',
        html: `<p>Hello</p>`,
        css: `p { font-family: Arial; font-size:18px; }`,
        explanation: 'Styles text.'
      }
    ],
    commonMistakes: [
      'Using too many fonts'
    ],
    bestPractices: [
      'Limit font families',
      'Use readable sizes'
    ]
  }
}
,
  {
  id: 'css-display',
  name: 'Display & Positioning',
  category: 'css',
  level: 'intermediate',
  order: 6,
  icon: '📐',
  color: '#3B82F6',
  subtopics: ['Display types', 'Position', 'Float', 'Z-index'],
  prerequisites: ['css-text'],
  content: {
    definition: 'Controls how elements are displayed and positioned.',
    importance: 'Essential for layout design.',
    keyConcepts: [
      { title: 'Display', explanation: 'Block, inline, inline-block, none.' },
      { title: 'Position', explanation: 'Static, relative, absolute, fixed.' },
      { title: 'Float', explanation: 'Positions elements horizontally.' },
      { title: 'Z-index', explanation: 'Controls stacking order.' }
    ],
    proTip: 'Prefer flexbox or grid over floats.',
    syntax: `position: relative;`,
    examples: [
      {
        title: 'Position Example',
        html: `<div class="box">Box</div>`,
        css: `.box { position: relative; top:10px; }`,
        explanation: 'Moves element.'
      }
    ],
    commonMistakes: [
      'Overusing z-index'
    ],
    bestPractices: [
      'Use modern layouts'
    ]
  }
}
,
   {
    id: 'css-flexbox',
    name: 'Flexbox',
    category: 'css',
    level: 'intermediate',
    order: 7,
    icon: '🧘',
    color: '#3B82F6',
    subtopics: ['Flex container', 'Flex items', 'Alignment', 'Ordering'],
    prerequisites: ['css-display']
  },
  {
  id: 'css-grid',
  name: 'CSS Grid',
  category: 'css',
  level: 'intermediate',
  order: 8,
  icon: '🔲',
  color: '#3B82F6',
  subtopics: ['Grid container', 'Grid items', 'Template areas', 'Gap'],
  prerequisites: ['css-flexbox'],
  content: {
    definition: 'CSS Grid is a two-dimensional layout system.',
    importance: 'Ideal for complex layouts.',
    keyConcepts: [
      { title: 'Grid Container', explanation: 'display:grid.' },
      { title: 'Grid Items', explanation: 'Children elements.' },
      { title: 'Template Areas', explanation: 'Named layout areas.' },
      { title: 'Gap', explanation: 'Spacing between items.' }
    ],
    proTip: 'Use grid for page layouts.',
    syntax: `display: grid;`,
    examples: [
      {
        title: 'Grid Layout',
        html: `<div class="grid"><div>1</div><div>2</div></div>`,
        css: `.grid { display:grid; grid-template-columns:1fr 1fr; }`,
        explanation: 'Two-column grid.'
      }
    ],
    commonMistakes: [
      'Overcomplicating grid'
    ],
    bestPractices: [
      'Keep grid simple'
    ]
  }
}
,{
  id: 'css-grid',
  name: 'CSS Grid',
  category: 'css',
  level: 'intermediate',
  order: 8,
  icon: '🔲',
  color: '#3B82F6',
  subtopics: ['Grid container', 'Grid items', 'Template areas', 'Gap'],
  prerequisites: ['css-flexbox'],
  content: {
    definition: 'CSS Grid is a two-dimensional layout system.',
    importance: 'Ideal for complex layouts.',
    keyConcepts: [
      { title: 'Grid Container', explanation: 'display:grid.' },
      { title: 'Grid Items', explanation: 'Children elements.' },
      { title: 'Template Areas', explanation: 'Named layout areas.' },
      { title: 'Gap', explanation: 'Spacing between items.' }
    ],
    proTip: 'Use grid for page layouts.',
    syntax: `display: grid;`,
    examples: [
      {
        title: 'Grid Layout',
        html: `<div class="grid"><div>1</div><div>2</div></div>`,
        css: `.grid { display:grid; grid-template-columns:1fr 1fr; }`,
        explanation: 'Two-column grid.'
      }
    ],
    commonMistakes: [
      'Overcomplicating grid'
    ],
    bestPractices: [
      'Keep grid simple'
    ]
  }
}
,
  {
  id: 'css-transitions',
  name: 'Transitions & Animations',
  category: 'css',
  level: 'intermediate',
  order: 9,
  icon: '✨',
  color: '#3B82F6',
  subtopics: ['Transitions', 'Keyframes', 'Animation properties', 'Timing'],
  prerequisites: ['css-grid'],
  content: {
    definition: 'CSS animations add motion effects.',
    importance: 'Improves user experience.',
    keyConcepts: [
      { title: 'Transitions', explanation: 'Smooth property changes.' },
      { title: 'Keyframes', explanation: 'Define animation steps.' },
      { title: 'Animation Properties', explanation: 'Duration, delay.' },
      { title: 'Timing', explanation: 'Ease functions.' }
    ],
    proTip: 'Animate transform & opacity.',
    syntax: `transition: all 0.3s ease;`,
    examples: [
      {
        title: 'Hover Animation',
        html: `<button>Hover</button>`,
        css: `button:hover { transform: scale(1.1); }`,
        explanation: 'Hover animation.'
      }
    ],
    commonMistakes: [
      'Animating expensive properties'
    ],
    bestPractices: [
      'Keep animations subtle'
    ]
  }
}
,
  {
  id: 'css-pseudo',
  name: 'Pseudo-classes & Elements',
  category: 'css',
  level: 'intermediate',
  order: 10,
  icon: '👻',
  color: '#3B82F6',
  subtopics: ['Hover & Focus', 'First & Last child', 'Before & After', 'Not & Nth-child'],
  prerequisites: ['css-transitions'],
  content: {
    definition: 'Pseudo selectors target special element states.',
    importance: 'Enhances interactivity.',
    keyConcepts: [
      { title: ':hover', explanation: 'Mouse hover.' },
      { title: ':focus', explanation: 'Focused element.' },
      { title: '::before/after', explanation: 'Insert content.' },
      { title: ':nth-child', explanation: 'Pattern matching.' }
    ],
    proTip: 'Use focus styles for accessibility.',
    syntax: `a:hover { color:red; }`,
    examples: [
      {
        title: 'Hover Effect',
        html: `<a href="#">Link</a>`,
        css: `a:hover { text-decoration:underline; }`,
        explanation: 'Hover style.'
      }
    ],
    commonMistakes: [
      'Ignoring focus states'
    ],
    bestPractices: [
      'Support keyboard users'
    ]
  }
}
,
  {
  id: 'css-transforms',
  name: 'Transforms',
  category: 'css',
  level: 'advanced',
  order: 11,
  icon: '🔄',
  color: '#3B82F6',
  subtopics: ['Translate', 'Rotate', 'Scale', '3D transforms'],
  prerequisites: ['css-pseudo'],
  content: {
    definition: 'Transforms modify element shape and position.',
    importance: 'Used in animations.',
    keyConcepts: [
      { title: 'Translate', explanation: 'Move element.' },
      { title: 'Rotate', explanation: 'Rotate element.' },
      { title: 'Scale', explanation: 'Resize element.' },
      { title: '3D Transforms', explanation: 'Depth effects.' }
    ],
    proTip: 'Combine with transitions.',
    syntax: `transform: rotate(45deg);`,
    examples: [
      {
        title: 'Rotate',
        html: `<div class="box"></div>`,
        css: `.box { transform: rotate(10deg); }`,
        explanation: 'Rotates element.'
      }
    ],
    commonMistakes: [
      'Forgetting transform origin'
    ],
    bestPractices: [
      'Use subtle transforms'
    ]
  }
}
,
  {
  id: 'css-media',
  name: 'Media Queries',
  category: 'css',
  level: 'advanced',
  order: 12,
  icon: '📱',
  color: '#3B82F6',
  subtopics: ['Breakpoints', 'Mobile first', 'Responsive design', 'Print styles'],
  prerequisites: ['css-transforms'],
  content: {
    definition: 'Media queries adapt styles to screen sizes.',
    importance: 'Essential for responsive design.',
    keyConcepts: [
      { title: 'Breakpoints', explanation: 'Screen widths.' },
      { title: 'Mobile First', explanation: 'Design for small screens first.' },
      { title: 'Responsive Design', explanation: 'Flexible layouts.' },
      { title: 'Print Styles', explanation: 'Styles for print.' }
    ],
    proTip: 'Use mobile-first approach.',
    syntax: `@media (max-width: 768px) {}`,
    examples: [
      {
        title: 'Responsive Text',
        html: `<p>Text</p>`,
        css: `@media(max-width:600px){ p{font-size:14px;} }`,
        explanation: 'Responsive font size.'
      }
    ],
    commonMistakes: [
      'Too many breakpoints'
    ],
    bestPractices: [
      'Use flexible units'
    ]
  }
}
,
  {
  id: 'css-variables',
  name: 'CSS Variables',
  category: 'css',
  level: 'advanced',
  order: 13,
  icon: '🔧',
  color: '#3B82F6',
  subtopics: ['Custom properties', 'Var function', 'Theming', 'Fallbacks'],
  prerequisites: ['css-media'],
  content: {
    definition: 'CSS variables store reusable values.',
    importance: 'Simplifies theming.',
    keyConcepts: [
      { title: 'Custom Properties', explanation: '--variable-name.' },
      { title: 'var()', explanation: 'Access variable.' },
      { title: 'Theming', explanation: 'Dynamic themes.' },
      { title: 'Fallbacks', explanation: 'Default values.' }
    ],
    proTip: 'Define variables in :root.',
    syntax: `--primary: #333;`,
    examples: [
      {
        title: 'Variable Example',
        html: `<div class="box"></div>`,
        css: `:root { --color:red; } .box{color:var(--color);}`,
        explanation: 'Uses variable.'
      }
    ],
    commonMistakes: [
      'Overusing variables'
    ],
    bestPractices: [
      'Use for repeated values'
    ]
  }
}
,
  {
  id: 'css-filters',
  name: 'Filters & Effects',
  category: 'css',
  level: 'advanced',
  order: 14,
  icon: '🎭',
  color: '#3B82F6',
  subtopics: ['Blur', 'Brightness', 'Drop shadow', 'Blend modes'],
  prerequisites: ['css-variables'],
  content: {
    definition: 'CSS filters apply visual effects.',
    importance: 'Enhances UI effects.',
    keyConcepts: [
      { title: 'Blur', explanation: 'Softens image.' },
      { title: 'Brightness', explanation: 'Adjusts light.' },
      { title: 'Drop Shadow', explanation: 'Shadow effect.' },
      { title: 'Blend Modes', explanation: 'Color blending.' }
    ],
    proTip: 'Use filters sparingly.',
    syntax: `filter: blur(5px);`,
    examples: [
      {
        title: 'Blur Image',
        html: `<img src="img.jpg">`,
        css: `img{filter:blur(2px);}`,
        explanation: 'Blur effect.'
      }
    ],
    commonMistakes: [
      'Performance issues'
    ],
    bestPractices: [
      'Avoid heavy filters'
    ]
  }
}
,
  {
  id: 'css-advanced',
  name: 'Advanced CSS',
  category: 'css',
  level: 'advanced',
  order: 15,
  icon: '🏆',
  color: '#3B82F6',
  subtopics: ['CSS architecture', 'Performance', 'Best practices', 'Modern CSS'],
  prerequisites: ['css-filters'],
  content: {
    definition: 'Advanced CSS focuses on scalable and performant styles.',
    importance: 'Required for large applications.',
    keyConcepts: [
      { title: 'CSS Architecture', explanation: 'BEM, SMACSS.' },
      { title: 'Performance', explanation: 'Optimize rendering.' },
      { title: 'Best Practices', explanation: 'Maintainable code.' },
      { title: 'Modern CSS', explanation: 'New features.' }
    ],
    proTip: 'Keep CSS modular.',
    syntax: `@layer components;`,
    examples: [
      {
        title: 'BEM Naming',
        html: `<div class="card__title"></div>`,
        css: `.card__title{}`,
        explanation: 'BEM structure.'
      }
    ],
    commonMistakes: [
      'Unorganized CSS'
    ],
    bestPractices: [
      'Document styles'
    ]
  }
}

];

export const allTopics = [...htmlTopics, ...cssTopics];

export const getTopicById = (id: string): Topic | undefined => {
  return allTopics.find(topic => topic.id === id);
};
