const express = require('express')
const lodash = require('lodash')

const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+"/public"))
app.set("view engine", "ejs")

const homeContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non gravida odio. Nullam et euismod erat, ut condimentum ante. Nulla ultrices purus dictum sodales posuere. Mauris bibendum suscipit odio semper convallis. Etiam ac nibh pulvinar, eleifend turpis fermentum, accumsan nibh. Pellentesque a lectus non leo luctus fringilla."
const aboutContent = "Nulla sapien neque, efficitur eget venenatis non, elementum vitae libero. Vestibulum cursus urna sed tortor laoreet tempus. Mauris rutrum risus urna, at molestie elit posuere sit amet. Curabitur non suscipit nibh. Sed venenatis nisl sed commodo laoreet. Aliquam imperdiet risus et maximus molestie. Etiam maximus, augue at posuere mattis, purus lectus commodo tortor, eget volutpat magna neque pretium augue."
const contactContent = "Proin in condimentum risus. Quisque quis mollis nunc. Nunc lacinia, ex non faucibus pulvinar, ipsum libero fringilla mi, vehicula ultricies ante mauris sit amet felis. Vestibulum et magna sit amet velit placerat accumsan. In hac habitasse platea dictumst."
const posts = []

app.get('/', function(req, res) {
    res.render("home", {
        startingContent : homeContent,
        blogs : posts
    })
})

app.get("/contact", function(req, res) {
    res.render("contact", {
        content : contactContent
    })
})

app.get("/about", function(req, res) {
    res.render("about", {
        content : aboutContent
    })
})

app.get("/compose", function(req, res) {
    res.render("compose")
})

app.post("/compose", function(req, res) {
    const post = {title : req.body.blogTitle, body : req.body.blogPost}
    posts.push(post)
    res.redirect("/")
})

app.get("/posts/:postTitle", function(req, res) {
    var j = 0
    for(var i = 0; i < posts.length; i++) {
        if(lodash.lowerCase(req.params.postTitle) == lodash.lowerCase(posts[i].title)){
            j = i+1
            break
        }
    }
    if(j == 0) {
        res.send("NOT FOUND")
    } else {
        res.render("post", {
            content: posts[j-1]
        })
    }
})

app.listen(process.env.PORT || 3000, function() {
    console.log('Server started at port 3000')
})