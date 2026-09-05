const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();

const PORT = 5000;


// ================= MIDDLEWARE =================

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


// ================= FILE UPLOAD =================

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },

    filename: function (req, file, cb) {

        const fileName =
            Date.now() + "-" + file.originalname;

        cb(null, fileName);
    }

});

const upload = multer({
    storage: storage
});


// ================= HOME =================

app.get("/", function (req, res) {

    res.json({
        message: "AI Virtual Teacher Backend is running successfully!"
    });

});


// ================= STUDENT DATA =================

app.get("/api/student", function (req, res) {

    res.json({

        name: "Sneha",

        role: "Student",

        learningProgress: 68,

        quizAccuracy: 92,

        studyTime: "12h",

        streak: 7

    });

});


// ================= MATERIAL UPLOAD =================

app.post(
    "/api/materials/upload",
    upload.single("material"),
    function (req, res) {

        if (!req.file) {

            return res.status(400).json({

                success: false,

                message: "No material uploaded."

            });

        }


        res.json({

            success: true,

            message: "Material uploaded successfully.",

            file: req.file.filename,

            aiStatus: "Material analyzed successfully.",

            aiInsight:
                "AI identified important concepts and prepared a personalized learning path."

        });

    }
);


// ================= AI LEARNING PLAN =================

app.get("/api/learning-plan", function (req, res) {

    res.json({

        success: true,

        plan: [

            {
                step: 1,
                title: "Review previous concept",
                status: "completed"
            },

            {
                step: 2,
                title: "Watch AI Teacher lesson",
                status: "current"
            },

            {
                step: 3,
                title: "Practice questions",
                status: "upcoming"
            },

            {
                step: 4,
                title: "Personalized quiz",
                status: "upcoming"
            }

        ]

    });

});


// ================= AI TEACHER =================

app.post("/api/teacher/ask", function (req, res) {

    const question = req.body.question;


    if (!question) {

        return res.status(400).json({

            success: false,

            message: "Question is required."

        });

    }


    // Demo AI response

    res.json({

        success: true,

        question: question,

        answer:
            "Great question! Let me explain it step-by-step in simple language with an example so that the concept becomes easier to understand.",

        recommendation:
            "After this explanation, try solving a few practice questions.",

        teacher: "AI Virtual Teacher"

    });

});


// ================= QUIZ =================

app.get("/api/quiz", function (req, res) {

    res.json({

        success: true,

        questionNumber: 1,

        totalQuestions: 5,

        question:
            "Which approach is best for understanding a difficult concept?",

        options: [

            "Memorize everything",

            "Understand the concept with examples",

            "Skip the difficult concept",

            "Only read the title"

        ],

        correctAnswer: 1

    });

});


// ================= QUIZ SUBMIT =================

app.post("/api/quiz/submit", function (req, res) {

    const answer = req.body.answer;


    if (answer === 1) {

        res.json({

            success: true,

            correct: true,

            message:
                "Correct! Your conceptual understanding is improving.",

            score: 92

        });

    } else {

        res.json({

            success: true,

            correct: false,

            message:
                "AI recommends reviewing the concept again.",

            score: 74

        });

    }

});


// ================= PROGRESS =================

app.get("/api/progress", function (req, res) {

    res.json({

        overallProgress: 68,

        quizAccuracy: 92,

        studyTime: "12h",

        streak: 7,

        conceptUnderstanding: 82,

        practicePerformance: 74,

        consistency: 91,

        aiRecommendation:
            "Spend 15 more minutes revising the concepts where your performance is lower."

    });

});


// ================= START SERVER =================
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});


app.listen(PORT, () => {
    console.log(
        `AI Virtual Teacher Backend running at http://localhost:${PORT}`
    );
});