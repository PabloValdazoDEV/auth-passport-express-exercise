const express = require("express");
const {isAuthenticated} = require("../middleware/isAuthenticated");
const router = express.Router()
const prisma = require('../prisma/prisma.js')


router.get("/foro", isAuthenticated, async(req,res)=>{
    const { passport } = req.session
    try {
        const isAdmin = await prisma.user.findUnique({
            where:{
                id: passport.user
            }
        })
        let posts = await prisma.post.findMany({
            include:{
                User: {
                    select: {
                        username:true, 
                        admin:true
                    }
                }
            }
        })
        posts = posts.map(post => {
            if(isAdmin.admin){
                return {
                    ...post,
                    isOwner: true
                };
            }else {
                return {
                    ...post,
                    isOwner: post.id_user === passport.user
                };
            }
        });
        res.render("foro", {
            posts,
            layout: "authMain"
        })
    } catch (error) {
        console.error(error)
    }
    
})

router.post("/create", isAuthenticated, async (req,res)=>{
    const { title, content } = req.body
    const { passport } = req.session

    try {
        await prisma.post.create({
            data:{
                title,
                content,
                id_user: passport.user
            } 
        })
        res.redirect("/post/foro")
    } catch (error) {
        res.render("/auth/login")
        console.error(error)
    }
})
router.get("/create", isAuthenticated, (req,res)=>{
    res.render("newComment", { layout: "authMain" })
})

router.delete("/delete/:id", isAuthenticated, async (req, res)=>{
    const { id } = req.params

    try {
        await prisma.post.delete({
            where:{
                id
            }
        })
        res.redirect("/post/foro")
    } catch (error) {
        
    }
})

module.exports = router