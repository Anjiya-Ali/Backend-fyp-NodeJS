const express = require('express')
const connectToMongo=require('./Models/Db')
const crypto = require('crypto');
const bodyParser = require('body-parser');
const path = require('path');
const fetchuser = require('./Middlewares/fetchuser');
const checkCommunityMember = require('./Middlewares/checkCommunityMember');
const checkCommunity = require('./Middlewares/checkCommunity');
const checkCommunityPost = require('./Middlewares/checkCommunityPost');
const checkNotCommunityPost = require('./Middlewares/checkNotCommunityPost');

const secret = crypto.randomBytes(32).toString('hex');

const app = express()
const port = 3000
var cors = require('cors') 

connectToMongo();

app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use('/Uploads', express.static('Uploads'));

app.use('/api/Codes',require('./Routes/Code'))
app.use('/api/User',require('./Routes/User'))
app.use('/api/Student',require('./Routes/Student'))
app.use('/api/Teacher',require('./Routes/Teacher'))
app.use('/api/SocialHub',require('./Routes/SocialHub'))
app.use('/api/TeacherCourses',require('./Routes/TeacherCourses'))
app.use('/api/TeacherLessons',require('./Routes/TeacherLessons'))
app.use('/api/TeacherTopics',require('./Routes/TeacherTopics'))
app.use('/api/TeacherQuizzes',require('./Routes/TeacherQuizzes'))
app.use('/api/TeacherQuizzes',require('./Routes/TeacherQuizzes'))
app.use('/api/CourseEnrollment',require('./Routes/CourseEnrollment'))
app.use('/api/CourseProgression',require('./Routes/CourseProgression'))
app.use('/api/LiveSession',require('./Routes/LiveSession'))
app.use('/api/JointAccount',require('./Routes/JointAccount'))
app.use('/api/Admin',require('./Routes/Admin'))
app.use('/api/Community/getOne/:communityId/Post/:postId/Comment', fetchuser, checkCommunity, checkCommunityMember, checkCommunityPost, require('./Routes/CommentsCommunityPosts'));
app.use('/api/Community/getOne/:communityId/Post', fetchuser, checkCommunity, checkCommunityMember, require('./Routes/CommunityPosts'))
app.use('/api/Community', require('./Routes/Community'))
app.use('/api/Post/:postId/Comment', fetchuser, checkNotCommunityPost, require('./Routes/CommentsPosts'))
app.use('/api/Post', fetchuser, require('./Routes/Posts'))

app.listen(port, '172.16.57.195',() => {
  console.log(`Example app listening on port ${port}`)
})