export const htmlTopics = [
    {
        id: 'html-basics',
        name: 'Basics of HTML',
        category: 'html',
        level: 'beginner',
        order: 1,
        icon: '📄',
        color: '#F97316',
        subtopics: [
            'What is HTML',
            'HTML Syntax & Structure',
            'Elements, Tags, and Attributes',
            'HTML Document Structure (<!DOCTYPE html>, <html>, <head>, <body>)',
            'Comments in HTML (<!-- comment -->)',
            'HTML Editors and Browsers'
        ],
        prerequisites: []
    },
    {
        id: 'html-text-formatting',
        name: 'Text Formatting',
        category: 'html',
        level: 'beginner',
        order: 2,
        icon: '📝',
        color: '#F97316',
        subtopics: [
            'Headings (<h1> to <h6>)',
            'Paragraphs (<p>)',
            'Line breaks (<br>)',
            'Horizontal rule (<hr>)',
            'Bold, Italic, Underline (<b>, <strong>, <i>, <em>, <u>)',
            'Superscript & Subscript (<sup>, <sub>)',
            'Blockquote (<blockquote>)',
            'Preformatted text (<pre>)',
            'Small and Marked text (<small>, <mark>)'
        ],
        prerequisites: ['html-basics']
    },
    {
        id: 'html-lists',
        name: 'Lists',
        category: 'html',
        level: 'beginner',
        order: 3,
        icon: '📋',
        color: '#F97316',
        subtopics: [
            'Ordered Lists (<ol>)',
            'Unordered Lists (<ul>)',
            'Definition Lists (<dl>, <dt>, <dd>)',
            'Nested Lists'
        ],
        prerequisites: ['html-text-formatting']
    },
    {
        id: 'html-links',
        name: 'Links & Navigation',
        category: 'html',
        level: 'beginner',
        order: 4,
        icon: '🔗',
        color: '#F97316',
        subtopics: [
            'Anchor Tag (<a href="">)',
            'Absolute & Relative URLs',
            'Target Attribute (_blank, _self, _parent, _top)',
            'Email Links (mailto:)',
            'Telephone Links (tel:)',
            'Page Navigation & Bookmarks (#id)'
        ],
        prerequisites: ['html-lists']
    },
    {
        id: 'html-images',
        name: 'Images',
        category: 'html',
        level: 'beginner',
        order: 5,
        icon: '🖼️',
        color: '#F97316',
        subtopics: [
            'Image Tag (<img src="" alt="">)',
            'Image Attributes (width, height, title)',
            'Image as Link',
            'Image Maps (<map> & <area>)'
        ],
        prerequisites: ['html-links']
    },
    {
        id: 'html-multimedia',
        name: 'Multimedia',
        category: 'html',
        level: 'beginner',
        order: 6,
        icon: '🎵',
        color: '#F97316',
        subtopics: [
            'Audio (<audio>) with controls',
            'Video (<video>) with controls',
            'Embed External Media (<embed>)',
            'iFrame (<iframe>)'
        ],
        prerequisites: ['html-images']
    },
    {
        id: 'html-tables',
        name: 'Tables',
        category: 'html',
        level: 'beginner',
        order: 7,
        icon: '📊',
        color: '#F97316',
        subtopics: [
            'Table Tags (<table>, <tr>, <td>, <th>)',
            'Table Headers and Footers (<thead>, <tbody>, <tfoot>)',
            'Table Caption (<caption>)',
            'Merging Cells (colspan, rowspan)',
            'Table Styling Basics'
        ],
        prerequisites: ['html-multimedia']
    },
    {
        id: 'html-forms',
        name: 'Forms',
        category: 'html',
        level: 'beginner',
        order: 8,
        icon: '📝',
        color: '#F97316',
        subtopics: [
            'Form Tag (<form>)',
            'Input Types (text, password, email, number, checkbox, radio, submit, reset, file, date, color, etc.)',
            'Textarea (<textarea>)',
            'Select Dropdown (<select> & <option>)',
            'Buttons (<button>)',
            'Form Attributes (action, method, autocomplete, required, placeholder, readonly, disabled)',
            'Form Validation (HTML5 validation attributes)',
            'Fieldsets & Legends (<fieldset>, <legend>)'
        ],
        prerequisites: ['html-tables']
    },
    {
        id: 'html-semantic',
        name: 'Semantic HTML',
        category: 'html',
        level: 'intermediate',
        order: 9,
        icon: '🏛️',
        color: '#F97316',
        subtopics: [
            'Header, Footer, Nav, Main, Section, Article, Aside, Figure, Figcaption',
            'Importance of Semantic HTML for SEO & Accessibility'
        ],
        prerequisites: ['html-forms']
    },
    {
        id: 'html5-features',
        name: 'HTML5 Features',
        category: 'html',
        level: 'intermediate',
        order: 10,
        icon: '⚡',
        color: '#F97316',
        subtopics: [
            'Audio & Video',
            'Canvas (<canvas>) for drawing graphics',
            'SVG (<svg>) graphics',
            'Local Storage & Session Storage',
            'New Input Types in Forms (email, url, number, date, range, etc.)',
            'Microdata & Data Attributes (data-*)'
        ],
        prerequisites: ['html-semantic']
    },
    {
        id: 'html-metadata-seo',
        name: 'Metadata & SEO',
        category: 'html',
        level: 'intermediate',
        order: 11,
        icon: '🔍',
        color: '#F97316',
        subtopics: [
            'Meta Tags (<meta>)',
            'Title (<title>)',
            'Description, Keywords, Author',
            'Viewport for Responsive Design (<meta name="viewport">)',
            'Favicon (<link rel="icon">)'
        ],
        prerequisites: ['html5-features']
    },
    {
        id: 'html-css-js-links',
        name: 'Links to CSS & JS',
        category: 'html',
        level: 'intermediate',
        order: 12,
        icon: '🔌',
        color: '#F97316',
        subtopics: [
            'Linking External CSS (<link rel="stylesheet" href="">)',
            'Internal CSS (<style> tag)',
            'Linking External JS (<script src="">)',
            'Inline JavaScript'
        ],
        prerequisites: ['html-metadata-seo']
    },
    {
        id: 'html-apis-advanced',
        name: 'HTML APIs & Advanced',
        category: 'html',
        level: 'advanced',
        order: 13,
        icon: '🚀',
        color: '#F97316',
        subtopics: [
            'Drag & Drop API',
            'Geolocation API',
            'Web Storage API',
            'Web Workers',
            'Canvas & SVG Advanced',
            'ARIA & Accessibility Attributes (aria-*)',
            'Responsive HTML Design (viewport & media queries)'
        ],
        prerequisites: ['html-css-js-links']
    },
    {
        id: 'html-deprecated',
        name: 'Deprecated / Obsolete Tags (for reference)',
        category: 'html',
        level: 'advanced',
        order: 14,
        icon: '⚠️',
        color: '#F97316',
        subtopics: [
            '<font>, <center>, <big>, <strike>, <tt>, <applet>, <frame>, <frameset>'
        ],
        prerequisites: ['html-apis-advanced']
    }
];
export const cssTopics = [
    {
        id: 'css-basics',
        name: 'Basics of CSS',
        category: 'css',
        level: 'beginner',
        order: 1,
        icon: '🎨',
        color: '#3B82F6',
        subtopics: [
            'What is CSS',
            'Syntax and Selectors',
            'Inline, Internal, and External CSS',
            'Comments in CSS (/* comment */)',
            'CSS Colors (color, background-color, color names, HEX, RGB, HSL)',
            'CSS Units (px, em, rem, %, vh, vw, ch, ex)',
            'CSS Fonts (font-family, font-size, font-weight, font-style, line-height)'
        ],
        prerequisites: []
    },
    {
        id: 'css-selectors',
        name: 'CSS Selectors',
        category: 'css',
        level: 'beginner',
        order: 2,
        icon: '🎯',
        color: '#3B82F6',
        subtopics: [
            'Universal Selector (*)',
            'Type / Element Selector',
            'Class Selector (.class)',
            'ID Selector (#id)',
            'Grouping Selectors (,)',
            'Descendant / Child / Adjacent / Sibling Selectors (div p, div > p, div + p, div ~ p)',
            'Attribute Selectors ([attr], [attr=value], [attr^=value], [attr$=value], [attr*=value])',
            'Pseudo-classes (:hover, :focus, :active, :first-child, :last-child, :nth-child())',
            'Pseudo-elements (::before, ::after, ::first-letter, ::first-line)'
        ],
        prerequisites: ['css-basics']
    },
    {
        id: 'css-box-model',
        name: 'Box Model',
        category: 'css',
        level: 'beginner',
        order: 3,
        icon: '📦',
        color: '#3B82F6',
        subtopics: [
            'Content, Padding, Border, Margin',
            'Width & Height',
            'Box-sizing (content-box, border-box)',
            'Outline vs Border',
            'Overflow (visible, hidden, scroll, auto)'
        ],
        prerequisites: ['css-selectors']
    },
    {
        id: 'css-backgrounds',
        name: 'CSS Backgrounds',
        category: 'css',
        level: 'beginner',
        order: 4,
        icon: '🌄',
        color: '#3B82F6',
        subtopics: [
            'Background Color',
            'Background Image (background-image)',
            'Background Repeat, Position, Size (background-repeat, background-position, background-size)',
            'Background Attachment (scroll, fixed, local)',
            'Gradients (linear-gradient, radial-gradient)'
        ],
        prerequisites: ['css-box-model']
    },
    {
        id: 'css-text',
        name: 'CSS Text',
        category: 'css',
        level: 'beginner',
        order: 5,
        icon: '🔤',
        color: '#3B82F6',
        subtopics: [
            'Text Color, Alignment (text-align)',
            'Text Decoration (underline, overline, line-through, none)',
            'Text Transform (uppercase, lowercase, capitalize)',
            'Letter Spacing (letter-spacing) & Word Spacing (word-spacing)',
            'Line Height (line-height)',
            'Text Shadow (text-shadow)',
            'Font Style & Weight'
        ],
        prerequisites: ['css-backgrounds']
    },
    {
        id: 'css-display-position',
        name: 'CSS Display & Positioning',
        category: 'css',
        level: 'beginner',
        order: 6,
        icon: '📐',
        color: '#3B82F6',
        subtopics: [
            'Display Types (block, inline, inline-block, none, flex, grid)',
            'Visibility (visible, hidden)',
            'Positioning (static, relative, absolute, fixed, sticky)',
            'Z-index',
            'Float & Clear',
            'Overflow control (overflow-x, overflow-y)'
        ],
        prerequisites: ['css-text']
    },
    {
        id: 'css-flexbox',
        name: 'CSS Flexbox',
        category: 'css',
        level: 'intermediate',
        order: 7,
        icon: '🧘',
        color: '#3B82F6',
        subtopics: [
            'Display Flex',
            'Flex Direction (row, row-reverse, column, column-reverse)',
            'Justify Content (flex-start, flex-end, center, space-between, space-around)',
            'Align Items (stretch, flex-start, flex-end, center, baseline)',
            'Align Self',
            'Flex Wrap (wrap, nowrap, wrap-reverse)',
            'Flex Grow, Shrink, Basis',
            'Gap property (row-gap, column-gap)'
        ],
        prerequisites: ['css-display-position']
    },
    {
        id: 'css-grid',
        name: 'CSS Grid',
        category: 'css',
        level: 'intermediate',
        order: 8,
        icon: '🔲',
        color: '#3B82F6',
        subtopics: [
            'Display Grid',
            'Grid Template Rows & Columns',
            'Grid Gap',
            'Grid Areas',
            'Grid Auto-flow',
            'Align Items & Justify Items in Grid',
            'Grid Lines, Tracks, and Cells',
            'Fractional Units (fr) and Repeat Function (repeat())'
        ],
        prerequisites: ['css-flexbox']
    },
    {
        id: 'css-transitions-animations',
        name: 'CSS Transitions & Animations',
        category: 'css',
        level: 'intermediate',
        order: 9,
        icon: '✨',
        color: '#3B82F6',
        subtopics: [
            'Transition Property, Duration, Timing Function',
            'Transform Property (translate, rotate, scale, skew)',
            'Keyframe Animations (@keyframes)',
            'Animation Properties (animation-name, animation-duration, animation-iteration-count, animation-delay, animation-timing-function, animation-fill-mode)'
        ],
        prerequisites: ['css-grid']
    },
    {
        id: 'css-pseudo',
        name: 'CSS Pseudo-classes & Pseudo-elements',
        category: 'css',
        level: 'intermediate',
        order: 10,
        icon: '👻',
        color: '#3B82F6',
        subtopics: [
            ':hover, :focus, :active, :visited, :link',
            ':first-child, :last-child, :nth-child()',
            '::before, ::after, ::first-line, ::first-letter'
        ],
        prerequisites: ['css-transitions-animations']
    },
    {
        id: 'css-transforms',
        name: 'CSS Transforms',
        category: 'css',
        level: 'intermediate',
        order: 11,
        icon: '🔄',
        color: '#3B82F6',
        subtopics: [
            '2D Transforms (translate, rotate, scale, skew)',
            '3D Transforms (rotateX, rotateY, rotateZ, perspective)',
            'Transform Origin'
        ],
        prerequisites: ['css-pseudo']
    },
    {
        id: 'css-media-queries',
        name: 'CSS Media Queries & Responsive Design',
        category: 'css',
        level: 'intermediate',
        order: 12,
        icon: '📱',
        color: '#3B82F6',
        subtopics: [
            'Media Query Syntax (@media)',
            'Breakpoints for Mobile, Tablet, Desktop',
            'Responsive Typography & Images',
            'Mobile-first vs Desktop-first approach',
            'Viewport units (vh, vw)'
        ],
        prerequisites: ['css-transforms']
    },
    {
        id: 'css-variables-functions',
        name: 'CSS Variables & Functions',
        category: 'css',
        level: 'advanced',
        order: 13,
        icon: '🔧',
        color: '#3B82F6',
        subtopics: [
            'CSS Custom Properties (--variable-name)',
            'var() function',
            'CSS Functions (calc(), min(), max(), clamp())'
        ],
        prerequisites: ['css-media-queries']
    },
    {
        id: 'css-filters-effects',
        name: 'CSS Filters & Effects',
        category: 'css',
        level: 'advanced',
        order: 14,
        icon: '🎭',
        color: '#3B82F6',
        subtopics: [
            'Filters (blur(), brightness(), contrast(), grayscale(), invert(), sepia())',
            'Box Shadow',
            'Text Shadow',
            'Opacity',
            'Blend Modes (mix-blend-mode, background-blend-mode)'
        ],
        prerequisites: ['css-variables-functions']
    },
    {
        id: 'css-advanced-misc',
        name: 'CSS Advanced & Misc',
        category: 'css',
        level: 'advanced',
        order: 15,
        icon: '🏆',
        color: '#3B82F6',
        subtopics: [
            'Object-fit & Object-position',
            'Overflow & Scroll Behavior',
            'Scroll Snap',
            'Clip-path',
            'Writing Modes',
            'Counters (counter-reset, counter-increment)',
            'Sticky Footer/Header',
            'Accessibility with CSS'
        ],
        prerequisites: ['css-filters-effects']
    },
    {
        id: 'css-deprecated',
        name: 'Deprecated / Obsolete CSS',
        category: 'css',
        level: 'advanced',
        order: 16,
        icon: '⚠️',
        color: '#3B82F6',
        subtopics: [
            'Some old properties like float for layouts (superseded by flex/grid)',
            'Vendor prefixes (-webkit-, -moz-) — mostly replaced by modern standards'
        ],
        prerequisites: ['css-advanced-misc']
    }
];

export const allTopics = [...htmlTopics, ...cssTopics];

export const getTopicById = (id: string) => {
    return allTopics.find(topic => topic.id === id);
};