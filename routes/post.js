const express = require("express");
const {isAuthenticated} = require("../middleware/funcionMiddelware.js");
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
        res.status(500).send("Error al cargar el foro.");
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
        console.error(error)
        res.status(500).send("Error al crear el post.");
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
        return res.redirect("/post/foro")
    } catch (error) {
        console.error(error)
        return res.status(500).send("Error al eliminar el post");
    }
})

module.exports = router