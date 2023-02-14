const express = require('express')
const {verifyToken} = require('../middleware/verifyToken.js')
const {isAdmin} =  require('../middleware/isAdmin.js')
const {register, login, loginAdmin, logout} = require('../controllers/AuthController.js')
const {createAdmin, getAllAdmin, getAdminById, updateAdmin, deleteAdmin} = require('../controllers/AdminController.js')
const {createUser, getAllUser, getUserById, updateUser, deleteUser} = require('../controllers/UserController.js')
const {createCourse, getAllCourse, getCourseById, updateCourse, deleteCourse} = require('../controllers/CourseController.js')
const {createCourseCat, getAllCourseCat, getCourseCatById, updateCourseCat, deleteCourseCat} = require('../controllers/CourseCategoryController.js')
const {createUserCourse, getAllUserCourse, getCourseByUserId, getUserByCourseId, updateUserCourse, deleteUserCourse} = require('../controllers/UserCourseController.js')
const router = express.Router()

// Auth Route
router.post('/register', register)
router.post('/login-admin', loginAdmin)
router.post('/login', login)
router.post('/logout', logout)

// Admin Route
router.post('/admin', createAdmin)
router.get('/admin', verifyToken, isAdmin, getAllAdmin)
router.get('/admin/:id', verifyToken, isAdmin, getAdminById)
router.put('/admin/:id', verifyToken, isAdmin, updateAdmin)
router.delete('/admin/:id', verifyToken, isAdmin, deleteAdmin)

// User Route
router.post('/user', createUser)
router.get('/user', verifyToken, getAllUser)
router.get('/user/:id', verifyToken, getUserById)
router.put('/user/:id', verifyToken, updateUser)
router.delete('/user/:id', verifyToken, deleteUser)

// Course Route
router.post('/course', verifyToken, isAdmin, createCourse)
router.get('/course', verifyToken, getAllCourse)
router.get('/course/:id', verifyToken, getCourseById)
router.put('/course/:id', verifyToken, isAdmin, updateCourse)
router.delete('/course/:id', verifyToken, isAdmin, deleteCourse)

// Course Category Route
router.post('/course-category', verifyToken, isAdmin, createCourseCat)
router.get('/course-category', verifyToken, isAdmin, getAllCourseCat)
router.get('/course-category/:id', verifyToken, isAdmin, getCourseCatById)
router.put('/course-category/:id', verifyToken, isAdmin, updateCourseCat)
router.delete('/course-category/:id', verifyToken, isAdmin, deleteCourseCat)

// User Course Route
router.post('/user-course', verifyToken, createUserCourse)
router.get('/user-course', verifyToken, getAllUserCourse)
router.get('/user-course/user/:id', verifyToken, getCourseByUserId)
router.get('/user-course/course/:id', verifyToken, getUserByCourseId)
router.put('/user-course/:id', verifyToken, updateUserCourse)
router.delete('/user-course/:id', verifyToken, deleteUserCourse)

module.exports = {router}