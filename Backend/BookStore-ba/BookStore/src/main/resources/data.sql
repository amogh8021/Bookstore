-- =====================================================
-- SQL Initialization Script for Recommended Authors
-- =====================================================
-- This script adds book data for the recommended authors
-- displayed in the frontend AuthorSection component.
-- Using INSERT IGNORE to prevent duplicates
-- =====================================================

-- 1. James Clear - Atomic Habits (Self-Help)
INSERT IGNORE INTO book (id, author, title, genre, description, price, quantity, published_date, featured, image_url)
VALUES (
    1001,
    'James Clear',
    'Atomic Habits',
    'Self-Help',
    'An Easy & Proven Way to Build Good Habits & Break Bad Ones. Tiny Changes, Remarkable Results. No matter your goals, Atomic Habits offers a proven framework for improving every day.',
    499.00,
    50,
    '2018-10-16',
    true,
    'https://images-na.ssl-images-amazon.com/images/I/51B7kuGGJTL._SX329_BO1,204,203,200_.jpg'
);

-- 2. Robert Kiyosaki - Rich Dad Poor Dad (Finance)
INSERT IGNORE INTO book (id, author, title, genre, description, price, quantity, published_date, featured, image_url)
VALUES (
    1002,
    'Robert Kiyosaki',
    'Rich Dad Poor Dad',
    'Finance',
    'What the Rich Teach Their Kids About Money That the Poor and Middle Class Do Not! This book will help you break out of the proverbial rat race, teach you what the rich teach their kids about money and help you on the path to financial freedom.',
    399.00,
    45,
    '1997-04-01',
    true,
    'https://images-na.ssl-images-amazon.com/images/I/51AuGZd45BL._SX331_BO1,204,203,200_.jpg'
);

-- 3. Arundhati Roy - The God of Small Things (Fiction)
INSERT IGNORE INTO book (id, author, title, genre, description, price, quantity, published_date, featured, image_url)
VALUES (
    1003,
    'Arundhati Roy',
    'The God of Small Things',
    'Fiction',
    'The internationally acclaimed Booker Prize-winning novel. A story of forbidden love and childhood memory set against the backdrop of political turbulence in Kerala. A masterpiece of contemporary literature.',
    450.00,
    40,
    '1997-01-01',
    true,
    'https://images-na.ssl-images-amazon.com/images/I/51b1H3VjdEL._SX324_BO1,204,203,200_.jpg'
);

-- 4. Neha Dixit - The Anatomy of Hate (Journalism/Non-Fiction)
INSERT IGNORE INTO book (id, author, title, genre, description, price, quantity, published_date, featured, image_url)
VALUES (
    1004,
    'Neha Dixit',
    'The Anatomy of Hate',
    'Journalism',
    'Collection of investigative journalism pieces exploring social issues, political dynamics, and human rights in contemporary India. Award-winning reportage that reveals hidden truths and gives voice to the marginalized.',
    550.00,
    30,
    '2019-06-15',
    true,
    'https://images-na.ssl-images-amazon.com/images/I/41gZvVKPBpL._SX323_BO1,204,203,200_.jpg'
);

-- Additional popular books by these authors to enrich the catalog

-- James Clear - Clear Thinking
INSERT IGNORE INTO book (id, author, title, genre, description, price, quantity, published_date, featured, image_url)
VALUES (
    1005,
    'James Clear',
    'Clear Thinking',
    'Self-Help',
    'Turning Ordinary Moments into Extraordinary Results. Learn how to make better decisions and achieve remarkable outcomes through clear thinking.',
    525.00,
    35,
    '2023-10-03',
    false,
    'https://images-na.ssl-images-amazon.com/images/I/41tCqBF5VlL._SX329_BO1,204,203,200_.jpg'
);

-- Robert Kiyosaki - Cashflow Quadrant
INSERT IGNORE INTO book (id, author, title, genre, description, price, quantity, published_date, featured, image_url)
VALUES (
    1006,
    'Robert Kiyosaki',
    'Cashflow Quadrant',
    'Finance',
    'Rich Dad''s Guide to Financial Freedom. Learn about the four cashflow quadrants and how to move from the left side (employee/self-employed) to the right side (business owner/investor).',
    425.00,
    38,
    '1998-01-01',
    false,
    'https://images-na.ssl-images-amazon.com/images/I/51OYg9oNvvL._SX331_BO1,204,203,200_.jpg'
);

-- Robert Kiyosaki - Rich Dad's Guide to Investing
INSERT IGNORE INTO book (id, author, title, genre, description, price, quantity, published_date, featured, image_url)
VALUES (
    1007,
    'Robert Kiyosaki',
    'Rich Dad''s Guide to Investing',
    'Finance',
    'What the Rich Invest In That the Poor and Middle Class Do Not! Learn the advanced strategies and mindset of wealthy investors.',
    475.00,
    32,
    '2000-01-01',
    false,
    'https://images-na.ssl-images-amazon.com/images/I/51xwN0gFZfL._SX331_BO1,204,203,200_.jpg'
);

-- Arundhati Roy - The Ministry of Utmost Happiness
INSERT IGNORE INTO book (id, author, title, genre, description, price, quantity, published_date, featured, image_url)
VALUES (
    1008,
    'Arundhati Roy',
    'The Ministry of Utmost Happiness',
    'Fiction',
    'A novel about love, loss, and hope. Roy''s second novel after two decades weaves together the stories of people navigating India''s social and political landscape.',
    499.00,
    35,
    '2017-06-06',
    false,
    'https://images-na.ssl-images-amazon.com/images/I/41VQZ7xF8qL._SX324_BO1,204,203,200_.jpg'
);

-- Arundhati Roy - Azadi
INSERT IGNORE INTO book (id, author, title, genre, description, price, quantity, published_date, featured, image_url)
VALUES (
    1009,
    'Arundhati Roy',
    'Azadi',
    'Non-Fiction',
    'Freedom, Fascism, Fiction. A collection of essays investigating the nature of democracy and exploring how writers, activists, and citizens can resist.',
    350.00,
    40,
    '2020-06-02',
    false,
    'https://images-na.ssl-images-amazon.com/images/I/41XyT7VLz1L._SX323_BO1,204,203,200_.jpg'
);

