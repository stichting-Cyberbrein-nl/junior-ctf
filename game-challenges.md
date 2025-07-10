# Game Challenges and Quizzes

## Overview

The game includes various quizzes and challenges designed to test players' knowledge of cybersecurity and encryption concepts. These challenges are implemented in `src/quizzes.js`.

## Quiz Categories

### 1. Cybersecurity Quiz
- **ID**: cybersecurity
- **Difficulty**: Medium
- **Total Questions**: 10
- **Passing Score**: 7
- **Flag**: FLAG_QUIZ{crypto_knowledge_master}

#### Sample Questions:
1. **What is encryption?**
   - Correct Answer: The process of encoding data so only authorized people can read it
   - Explanation: Encryption converts readable data into an encoded form

2. **Caesar Cipher Example**
   - Correct Answer: ABC → DEF
   - Explanation: Caesar Cipher shifts letters by a fixed number of positions

3. **Password Purpose**
   - Correct Answer: To verify identity and grant access
   - Explanation: Passwords ensure only authorized users can access accounts

4. **Phishing Definition**
   - Correct Answer: Attempt to steal sensitive information by impersonating trusted entities
   - Explanation: Phishing is a form of social engineering

5. **HTTPS Meaning**
   - Correct Answer: Hypertext Transfer Protocol Secure - connection is encrypted
   - Explanation: HTTPS indicates encrypted connection between browser and website

## Challenge Structure

Each quiz follows this structure:
```javascript
{
    id: "unique_id",
    title: "Quiz Title",
    description: "Description",
    image: "Emoji/Image",
    color: "Theme Color",
    difficulty: "Level",
    totalQuestions: Number,
    passingScore: Number,
    flagName: "FLAG_NAME",
    flagValue: "FLAG_VALUE",
    questions: [
        {
            id: Number,
            question: "Question Text",
            options: ["Option 1", "Option 2", "Option 3", "Option 4"],
            correctAnswer: Index,
            explanation: "Detailed explanation"
        }
    ]
}
```

## Learning Objectives

1. **Cybersecurity Basics**
   - Understanding encryption
   - Password security
   - Online safety

2. **Encryption Methods**
   - Caesar Cipher
   - Basic cryptography
   - Secure communication

3. **Online Safety**
   - Phishing awareness
   - Secure connections
   - Password management

## Tips for Success

1. **Study the Material**
   - Review encryption lessons
   - Practice with examples
   - Understand key concepts

2. **Take Your Time**
   - Read questions carefully
   - Consider all options
   - Review explanations

3. **Use Resources**
   - Reference materials
   - Practice problems
   - External learning tools

## Next Steps

This documentation will be expanded to include:
- Additional quiz categories
- Detailed solutions
- Advanced challenges
- Tips and tricks 