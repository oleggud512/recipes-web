const express = require("express")
const mustache = require("mustache")
const cors = require("cors")
const fs = require("fs")
const path = require("path")
const config = require("./config")

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.use("/dist", express.static(path.join(__dirname, 'dist')))
app.use("/css", express.static(path.join(__dirname, 'css')))

app.get("/", (req, res) => {
  res.redirect("/recipes")
})

app.get("/recipes", async (req, res) => {
  fs.readFile("./templates/recipes.html", 'utf8', (er, template) => {
    const rendered = mustache.render(template, { someth: 'render template' })
    res.send(rendered)
  })
})

app.get("/recipes/:id", (req, res) => {
  const id = req.params.id
  fs.readFile("./templates/recipe.html", 'utf8', (er, template) => {
    res.send(template)
  })
})

app.get("/recipes/:id/edit", (req, res) => {
  const id = req.params.id
  fs.readFile("./templates/edit_recipe.html", 'utf8', (er, template) => {
    res.send(template)
  })
})

app.get("/groceries", (req, res) => {
  fs.readFile("./templates/groceries.html", 'utf8', (er, template) => {
    res.send(template)
  })
})


app.listen(config.PORT, config.HOST, () => {
  console.log(`kpp web is up and running on port ${config.PORT}`)
})